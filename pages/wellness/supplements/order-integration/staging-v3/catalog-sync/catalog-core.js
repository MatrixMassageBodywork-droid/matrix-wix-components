/* Matrix Supplements / Phase 3: source-validated catalog projections.
   Pure JavaScript. No network, payment, email, or customer data. */
(function (root) {
  'use strict';
  function fault(code) { const e = new Error(code); e.code = code; throw e; }
  function assert(ok, code) { if (!ok) fault(code); }
  function str(v) { return String(v == null ? '' : v).trim(); }
  function priceToCents(value) {
    const valueText = str(value);
    assert(/^\d+(?:\.\d{1,2})?$/.test(valueText), 'INVALID_PRICE');
    const p = valueText.split('.');
    const n = Number(p[0]) * 100 + Number((p[1] || '').padEnd(2, '0'));
    assert(Number.isSafeInteger(n) && n > 0 && n <= 100000000, 'INVALID_PRICE_RANGE');
    return n;
  }
  function itemKey(s) { const x = str(s); assert(/^[A-Z0-9][A-Z0-9_-]{2,79}$/.test(x), 'INVALID_ITEM_ID'); return x; }
  function rowsToObjects(rows, expectedColumns) {
    assert(Array.isArray(rows) && rows.length > 0, 'MISSING_SHEET');
    const headers = rows[0].map(str);
    assert(expectedColumns.every((name, i) => headers[i] === name), 'SCHEMA_MISMATCH');
    return rows.slice(1).filter(r => Array.isArray(r) && r.some(x => str(x))).map(r =>
      Object.fromEntries(expectedColumns.map((h, i) => [h, r[i] == null ? '' : r[i]])));
  }
  const ITEM_COLUMNS = [
    'Item ID / SKU', 'Type', 'Display name', 'Size / variant', 'Short public description',
    'Everyday price USD', 'Monthly price USD', 'Savings USD', 'Savings %',
    'Offer revision', 'Catalog status', 'Image URL', 'Source / product URL',
    'Resale/MAP review', 'Owner approval', 'Source checked'
  ];
  const COMPONENT_COLUMNS = [
    'Bundle ID', 'Bundle revision', 'Component SKU', 'Quantity per bundle',
    'Size snapshot', 'Active from', 'Active to', 'Approval status', 'Source / evidence', 'Notes'
  ];
  const RELEASE_COLUMNS = [
    'Placement ID', 'Offer ID', 'Display section', 'Catalog reference', 'Copy approval',
    'Pricing approval', 'Policy approval', 'Wix sync', 'Public state', 'Version'
  ];
  function normalizeRows(itemsRows, componentsRows, releasesRows) {
    const rawItems = rowsToObjects(itemsRows, ITEM_COLUMNS);
    const rawComponents = rowsToObjects(componentsRows, COMPONENT_COLUMNS);
    rowsToObjects(releasesRows, RELEASE_COLUMNS); // Schema only: never enable public launch from catalog code.
    const seen = new Set();
    const rejected = [], candidates = [];
    for (const raw of rawItems) {
      const idText = str(raw['Item ID / SKU']);
      if (!idText || idText === 'TEMPLATE') continue;
      try {
        const itemId = itemKey(idText);
        assert(!seen.has(itemId), 'DUPLICATE_ITEM_ID'); seen.add(itemId);
        const kind = str(raw.Type);
        assert(kind === 'PRODUCT' || kind === 'BUNDLE', 'INVALID_KIND');
        const eligible = str(raw['Catalog status']) === 'APPROVED' &&
          str(raw['Resale/MAP review']) === 'REVIEWED' &&
          str(raw['Owner approval']) === 'APPROVED';
        if (!eligible) { rejected.push({itemId, code:'ITEM_NOT_APPROVED'}); continue; }
        const name = str(raw['Display name']);
        assert(name.length >= 4 && name.length <= 120, 'INVALID_NAME');
        const version = str(raw['Offer revision']);
        assert(/^[A-Z0-9][A-Z0-9-]{2,39}$/.test(version), 'INVALID_REVISION');
        const everydayPriceCents = priceToCents(raw['Everyday price USD']);
        const monthlyPriceCents = priceToCents(raw['Monthly price USD']);
        assert(monthlyPriceCents <= everydayPriceCents, 'MONTHLY_PRICE_EXCEEDS_EVERYDAY');
        const imageUrl = str(raw['Image URL']);
        assert(!imageUrl || /^https:\/\//.test(imageUrl), 'INVALID_IMAGE_URL');
        const description = str(raw['Short public description']);
        assert(description.length >= 8 && description.length <= 600, 'INVALID_DESCRIPTION');
        candidates.push({itemId,kind,name,variant:str(raw['Size / variant']),description,
          everydayPriceCents,monthlyPriceCents,imageUrl,version});
      } catch (e) { rejected.push({itemId:idText,code:e.code||'BAD_ROW'}); }
    }
    const productMap = new Map(candidates.filter(x => x.kind === 'PRODUCT').map(x => [x.itemId,x]));
    const final = [];
    for(const item of candidates){
      if(item.kind !== 'BUNDLE') { final.push({...item,components:[]}); continue; }
      try {
        const components = rawComponents.filter(x => str(x['Bundle ID']) === item.itemId && str(x['Bundle revision']) === item.version);
        assert(components.length > 0 && components.length <= 24, 'BUNDLE_COMPONENTS_MISSING');
        const keys = new Set();
        const built = components.map(c => {
          assert(str(c['Approval status']) === 'APPROVED', 'COMPONENT_NOT_APPROVED');
          const sku = itemKey(c['Component SKU']);
          assert(!keys.has(sku), 'DUPLICATE_BUNDLE_COMPONENT'); keys.add(sku);
          const p = productMap.get(sku); assert(p, 'UNKNOWN_BUNDLE_COMPONENT');
          const qty = Number(c['Quantity per bundle']);
          assert(Number.isInteger(qty) && qty > 0 && qty <= 24,'INVALID_COMPONENT_QUANTITY');
          return {sku,quantity:qty,name:p.name};
        });
        final.push({...item,components:built,description:item.description + ' Includes: ' + built.map(x=>`${x.quantity} × ${x.name}`).join(', ') + '.'});
      } catch (e) { rejected.push({itemId:item.itemId,code:e.code||'BAD_BUNDLE'}); }
    }
    return {items:final.sort((a,b)=>a.itemId.localeCompare(b.itemId)),rejected,
      publicReleaseEnabled:false,invoiceCreateEnabled:false,invoiceEmailEnabled:false};
  }
  function orderQuote(cart, snapshot) {
    assert(Array.isArray(cart) && cart.length>0 && cart.length<=20,'INVALID_CART');
    const byId = new Map(snapshot.items.map(x=>[x.itemId,x]));
    const quantities = new Map();
    for(const line of cart){
      assert(line && typeof line==='object' && !Array.isArray(line), 'INVALID_LINE');
      assert(Object.keys(line).sort().join('|') === 'itemId|quantity', 'CLIENT_FIELD_FORBIDDEN');
      const id=itemKey(line.itemId), quantity=line.quantity;
      assert(Number.isInteger(quantity) && quantity>0 && quantity<=12,'INVALID_QUANTITY');
      assert(byId.has(id),'UNAVAILABLE_ITEM');
      quantities.set(id,(quantities.get(id)||0)+quantity);
      assert(quantities.get(id)<=12,'QUANTITY_LIMIT');
    }
    const lines=[...quantities].sort((a,b)=>a[0].localeCompare(b[0])).map(([id,quantity])=>{
      const item=byId.get(id);
      return {itemId:id,kind:item.kind,displayName:item.name,quantity,
        monthlyUnitCents:item.monthlyPriceCents,everydayUnitCents:item.everydayPriceCents,
        monthlyLineCents:quantity*item.monthlyPriceCents,
        everydayLineCents:quantity*item.everydayPriceCents,
        version:item.version,components:item.components.map(x=>({...x}))};
    });
    const monthlyTotalCents=lines.reduce((n,x)=>n+x.monthlyLineCents,0);
    const everydayTotalCents=lines.reduce((n,x)=>n+x.everydayLineCents,0);
    return {lines,monthlyTotalCents,everydayTotalCents,savingsCents:everydayTotalCents-monthlyTotalCents,
      quotePreviewOnly:true,invoiceReady:false};
  }
  function toWixPrivateRecords(snapshot) {
    return snapshot.items.map(item=>({
      id:'MCV3-'+item.itemId,
      data:{itemId:item.itemId,kind:item.kind,publicName:item.name,shortDescription:item.description.slice(0,1024),
        imageUrl:item.imageUrl,monthlyPriceCents:item.monthlyPriceCents,
        everydayPriceCents:item.everydayPriceCents,offerVersion:item.version,
        releaseState:'STAGED_PRIVATE',publicSlot:'NONE',sourceUpdated:'2026-11-14T00:00:00.000Z'}
    }));
  }
  const api={ITEM_COLUMNS,COMPONENT_COLUMNS,RELEASE_COLUMNS,priceToCents,normalizeRows,orderQuote,toWixPrivateRecords};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  root.MatrixCatalogCoreV3=api;
})(typeof globalThis==='object'?globalThis:this);
