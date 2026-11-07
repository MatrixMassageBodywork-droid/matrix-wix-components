/**
 * MATRIX SQUARE SERVICE MANAGER 1.7.0 — STAFF-ONLY PAYMENTS + EXISTING BLOOD MOON UPDATE
 * Additive queue worker for ChatGPT -> Google Sheet -> Square Catalog API.
 *
 * SECURITY / SCOPE
 * - Reuses existing Script Property SQUARE_ACCESS_TOKEN. Never logs it.
 * - Catalog ITEMS_READ / ITEMS_WRITE only.
 * - New services: 3% fee modifier per price variation; Cash Payment $0.
 * - New providers unassigned, booking disabled until owner sets up Square.
 * - Existing trigger matrixSquareServiceManagerTick166 remains unchanged.
 * - Does not touch customers, payments, appointments, messages, staff, subscriptions, inventory, taxes, or permissions.
 * - External writes require BOTH Configuration SERVICE_WRITE_ENABLED=TRUE and queue Status=APPROVED.
 * - APPROVED payload hash must equal the PREVIEW_READY fingerprint.
 */

const MSSM166 = Object.freeze({
  spreadsheetId: '1KrdvY1ooc7Kat6CKZQwTRXqFek9dhHnruqOnlaAaA9M',
  requestsSheet: 'Service Requests',
  configSheet: 'Configuration',
  auditSheet: 'Audit Log',
  tokenProperty: 'SQUARE_ACCESS_TOKEN',
  squareBase: 'https://connect.squareup.com',
  maxRowsPerRun: 8,
  columns: Object.freeze({
    REQUEST_ID: 0,
    REQUESTED_AT: 1,
    UPDATED_AT: 2,
    STATUS: 3,
    OPERATION: 4,
    RAW_DICTATION: 5,
    PARSED_INTENT: 6,
    RESOLVED_CONTEXT: 7,
    PROPOSED_CHANGE: 8,
    APPROVAL_FINGERPRINT: 9,
    APPROVED_AT: 10,
    IDEMPOTENCY_KEY: 11,
    SQUARE_ITEM_ID: 12,
    SQUARE_VARIATION_IDS: 13,
    VERIFICATION_JSON: 14,
    ERROR: 15,
    REFERENCE_ITEM_ID: 16,
    EXISTING_MATCH_ITEM_ID: 17,
    EXISTING_MATCH_CONFIDENCE: 18,
    NOTES: 19
  }),
  // Known-good CURRENT reference items from the 2026-10-16 catalog mirror.
  // Runtime retrieval remains authoritative; a missing/deleted/stale reference blocks instead of silently substituting.
  references: Object.freeze({
    MASSAGE: Object.freeze({ id: 'D6WBEWYNPLZ5ET3YB4APHMVT', name: 'Custom Therapeutic Massage' }),
    FACIAL: Object.freeze({ id: 'IUTRINR4YWTL7ULZ3QVEK4QG', name: 'Custom Facial' }),
    HEAD_SPA: Object.freeze({ id: 'JBJI7MD5EU2QM3E4MQXE5TSK', name: 'Matrix Signature Head Spa' }),
    WELLNESS: Object.freeze({ id: 'O3M6MJG44YUUVFQNJFJC7WUC', name: 'Red & Near Infrared Light Therapy | Matrix Wellness & Biotech' }),
    WAXING: Object.freeze({ id: 'YY2UJGDPSWQQ5HHCOKYYRTBE', name: 'Body Waxing' }),
    MASSAGE_ADD_ON: Object.freeze({ id: 'ALTWJZ3RB262JHYLIBHQLK7A', name: 'Therapeutic Cupping' }),
    ADD_ON: Object.freeze({ id: 'ALTWJZ3RB262JHYLIBHQLK7A', name: 'Therapeutic Cupping' })
  })
});

function matrixSquareServiceManagerPreflight166() {
  const cfg = mssm166Config_();
  const tokenPresent = !!PropertiesService.getScriptProperties().getProperty(MSSM166.tokenProperty);
  const result = {
    ok: false,
    tokenPresent: tokenPresent,
    managerEnabled: mssm166Bool_(cfg.SERVICE_MANAGER_ENABLED),
    writeEnabled: mssm166Bool_(cfg.SERVICE_WRITE_ENABLED),
    apiVersion: cfg.SQUARE_API_VERSION || '2026-09-16',
    locationId: cfg.SQUARE_LOCATION_ID || '',
    queueSpreadsheetId: MSSM166.spreadsheetId,
    references: {},
    errors: []
  };
  if (!tokenPresent) result.errors.push('SQUARE_ACCESS_TOKEN missing from Script Properties.');
  if (!result.locationId) result.errors.push('SQUARE_LOCATION_ID missing from Configuration.');
  if (result.errors.length) return result;

  Object.keys(MSSM166.references).forEach(function(family) {
    try {
      const r = mssm166Retrieve_(MSSM166.references[family].id, true, cfg);
      result.references[family] = mssm166SummarizeReference_(r, family);
    } catch (e) {
      result.references[family] = { ok: false, error: mssm166SafeError_(e) };
      result.errors.push(family + ' reference failed.');
    }
  });
  result.ok = tokenPresent && !!result.locationId && !result.errors.length;
  mssm166Audit_('', 'PREFLIGHT', result.ok ? 'PASS' : 'FAIL', JSON.stringify(result), '', '', '');
  return result;
}

function matrixSquareServiceManagerInspectStructures166() {
  const cfg = mssm166Config_();
  const tokenPresent = !!PropertiesService.getScriptProperties().getProperty(MSSM166.tokenProperty);
  const result = {
    ok: false,
    tokenPresent: tokenPresent,
    apiVersion: cfg.SQUARE_API_VERSION || '2026-09-16',
    locationId: cfg.SQUARE_LOCATION_ID || '',
    structures: {},
    errors: []
  };
  if (!tokenPresent) result.errors.push('SQUARE_ACCESS_TOKEN missing from Script Properties.');
  if (!result.locationId) result.errors.push('SQUARE_LOCATION_ID missing from Configuration.');
  if (result.errors.length) return result;

  ['MASSAGE', 'FACIAL', 'HEAD_SPA', 'WELLNESS', 'WAXING', 'ADD_ON'].forEach(function(family) {
    try {
      const ref = mssm166ResolveReference_(family, '', cfg);
      if (!ref || !ref.object) throw new Error('Reference unavailable.');
      const structure = mssm166ReferenceStructure_(ref, family, cfg);
      result.structures[family] = {
        item_id: structure.item_id,
        item_name: structure.item_name,
        item_version: structure.item_version,
        category_labels: structure.category_labels,
        payment_structure: structure.payment_structure,
        massage_modifier_structure: structure.massage_modifier_structure,
        all_modifier_lists: structure.all_modifier_lists,
        item_options: structure.item_options,
        variation_names: structure.variation_names,
        structure_signature: structure.structure_signature
      };
    } catch (e) {
      result.structures[family] = { ok: false, error: mssm166SafeError_(e) };
      result.errors.push(family + ' structure inspection failed.');
    }
  });
  result.ok = !result.errors.length;
  mssm166Audit_('', 'STRUCTURE_INSPECTION', result.ok ? 'PASS' : 'FAIL', JSON.stringify(result), '', '', '');
  return result;
}

function matrixSquareServiceManagerTick166() {
  const cfg = mssm166Config_();
  if (!mssm166Bool_(cfg.SERVICE_MANAGER_ENABLED)) {
    return { ok: false, status: 'DISABLED', processed: 0 };
  }

  const ss = SpreadsheetApp.openById(MSSM166.spreadsheetId);
  const sh = ss.getSheetByName(MSSM166.requestsSheet);
  if (!sh) throw new Error('Service Requests sheet missing.');
  const values = sh.getDataRange().getValues();
  let processed = 0;
  const results = [];

  for (let i = 1; i < values.length && processed < MSSM166.maxRowsPerRun; i++) {
    const row = values[i];
    const status = String(row[MSSM166.columns.STATUS] || '').trim();
    if (!['RESOLVE_REQUESTED', 'HASH_REQUESTED', 'APPROVED'].includes(status)) continue;
    processed++;
    try {
      let r;
      if (status === 'RESOLVE_REQUESTED') r = mssm166ResolveRow_(sh, i + 1, row, cfg);
      if (status === 'HASH_REQUESTED') r = mssm166HashRow_(sh, i + 1, row);
      if (status === 'APPROVED') r = mssm166ApplyRow_(sh, i + 1, row, cfg);
      results.push(r);
    } catch (e) {
      const msg = mssm166SafeError_(e);
      mssm166SetRow_(sh, i + 1, { status: 'ERROR', error: msg, updatedAt: new Date() });
      mssm166Audit_(String(row[0] || ''), 'WORKER', 'ERROR', msg, String(row[12] || ''), String(row[13] || ''), '');
      results.push({ requestId: String(row[0] || ''), ok: false, error: msg });
    }
  }
  return { ok: true, processed: processed, results: results };
}

function matrixSquareServiceManagerInstallTrigger166() {
  const fn = 'matrixSquareServiceManagerTick166';
  const existing = ScriptApp.getProjectTriggers().filter(function(t) { return t.getHandlerFunction() === fn; });
  if (existing.length > 1) throw new Error('Multiple existing MSSM triggers found. Stop and reconcile.');
  if (existing.length === 1) return { ok: true, created: false, triggerId: existing[0].getUniqueId() };
  const t = ScriptApp.newTrigger(fn).timeBased().everyMinutes(1).create();
  return { ok: true, created: true, triggerId: t.getUniqueId() };
}

function matrixSquareServiceManagerRemoveTrigger166() {
  const fn = 'matrixSquareServiceManagerTick166';
  let removed = 0;
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === fn) { ScriptApp.deleteTrigger(t); removed++; }
  });
  return { ok: true, removed: removed };
}

function mssm166ResolveRow_(sh, rowNum, row, cfg) {
  const requestId = String(row[MSSM166.columns.REQUEST_ID] || '').trim();
  const operation = String(row[MSSM166.columns.OPERATION] || '').trim().toUpperCase();
  const intent = mssm166ParseJson_(row[MSSM166.columns.PARSED_INTENT], 'Parsed Intent JSON');
  if (!requestId) throw new Error('Request ID is required.');
  if (!['CREATE', 'UPDATE'].includes(operation)) throw new Error('Operation must be CREATE or UPDATE.');

  const family = mssm166NormalizeFamily_(intent.service_family || intent.family || '');
  const proposedName = String(intent.proposed_name || intent.service_name || '').trim();
  if (!proposedName) {
    return mssm166NeedsInput_(sh, rowNum, requestId, ['Service name/working name is required.']);
  }

  const duplicateMatches = mssm166FindItemsByText_(proposedName, cfg)
    .filter(function(x) { return x && x.item_data && !x.is_deleted && !x.item_data.is_archived; });
  const exactMatches = duplicateMatches.filter(function(x) {
    return mssm166Norm_(x.item_data.name) === mssm166Norm_(proposedName);
  });

  let existingItem = null;
  const requestedExistingId = String(intent.existing_item_id || row[MSSM166.columns.EXISTING_MATCH_ITEM_ID] || '').trim();
  if (requestedExistingId) existingItem = mssm166Retrieve_(requestedExistingId, true, cfg).object;
  if (!existingItem && operation === 'UPDATE') {
    if (exactMatches.length === 1) existingItem = exactMatches[0];
    else if (exactMatches.length > 1) {
      return mssm166NeedsInput_(sh, rowNum, requestId, ['More than one active Square item has this exact name. Supply the Square item ID to update.']);
    } else {
      return mssm166NeedsInput_(sh, rowNum, requestId, ['No exact active Square service match was found. Confirm the existing service name or item ID.']);
    }
  }
  if (operation === 'CREATE' && exactMatches.length) {
    const match = exactMatches[0];
    const context = { existing_exact_match: { id: match.id, name: match.item_data.name, version: match.version } };
    mssm166SetRow_(sh, rowNum, {
      status: 'NEEDS_USER_INPUT',
      context: JSON.stringify(context),
      existingMatchItemId: match.id,
      existingMatchConfidence: 'EXACT',
      notes: 'Exact active service already exists. Use UPDATE to avoid a duplicate.',
      updatedAt: new Date()
    });
    return { requestId: requestId, status: 'NEEDS_USER_INPUT', reason: 'EXACT_DUPLICATE' };
  }

  const ref = mssm166ResolveReference_(family, intent.reference_service_item_id, cfg);
  if (!ref || !ref.object || ref.object.is_deleted || !ref.object.item_data) {
    return mssm166NeedsInput_(sh, rowNum, requestId, ['No safe live Square reference service could be resolved for this service family.']);
  }
  if (ref.object.item_data.product_type !== 'APPOINTMENTS_SERVICE') {
    return mssm166NeedsInput_(sh, rowNum, requestId, ['Reference item is not an APPOINTMENTS_SERVICE.']);
  }

  const structure = mssm166ReferenceStructure_(ref, family, cfg);
  const problems = [];
  if (!structure.category_ids.length) problems.push('Reference service has no live category mapping.');
  if (!structure.payment_structure.verified) problems.push('Payment/CCF/cash structure could not be verified on the live reference service.');
  if (family === 'MASSAGE' && !structure.massage_modifier_structure.verified) {
    problems.push('Massage modifier/add-on structure could not be verified on the live Massage reference service.');
  }
  if (problems.length) {
    const blockedContext = { family: family, reference: structure, questions: problems };
    mssm166SetRow_(sh, rowNum, {
      status: 'NEEDS_USER_INPUT',
      context: JSON.stringify(blockedContext),
      referenceItemId: ref.object.id,
      existingMatchItemId: existingItem ? existingItem.id : '',
      existingMatchConfidence: existingItem ? 'EXACT' : '',
      notes: 'Live Square structure needs review before a proposal can be approved.',
      updatedAt: new Date()
    });
    return { requestId: requestId, status: 'NEEDS_USER_INPUT', reason: 'STRUCTURE_UNRESOLVED', problems: problems };
  }

  const context = {
    schema_version: '1.0',
    resolved_at: new Date().toISOString(),
    operation: operation,
    family: family,
    location_id: cfg.SQUARE_LOCATION_ID,
    api_version: cfg.SQUARE_API_VERSION || '2026-09-16',
    reference: structure,
    existing_item: existingItem ? mssm166SummarizeExisting_(existingItem) : null,
    existing_snapshot: existingItem ? mssm166Clone_(existingItem) : null,
    duplicate_candidates: duplicateMatches.slice(0, 10).map(mssm166SummarizeExisting_),
    rules: {
      category_source: 'LIVE_REFERENCE',
      payment_source: 'LIVE_REFERENCE',
      massage_modifiers_source: family === 'MASSAGE' ? 'LIVE_REFERENCE' : 'N/A',
      no_browser_fallback: true
    }
  };

  mssm166SetRow_(sh, rowNum, {
    status: 'READY_FOR_DRAFT',
    context: JSON.stringify(context),
    referenceItemId: ref.object.id,
    existingMatchItemId: existingItem ? existingItem.id : '',
    existingMatchConfidence: existingItem ? 'EXACT' : '',
    error: '',
    notes: 'Live Square structure resolved. ChatGPT may prepare Proposed Change JSON.',
    updatedAt: new Date()
  });
  mssm166Audit_(requestId, 'RESOLVE', 'READY_FOR_DRAFT', JSON.stringify({ family: family, referenceItemId: ref.object.id }), existingItem ? existingItem.id : '', '', ref.object.version || '');
  return { requestId: requestId, status: 'READY_FOR_DRAFT', family: family, referenceItemId: ref.object.id };
}

function mssm166HashRow_(sh, rowNum, row) {
  const requestId = String(row[MSSM166.columns.REQUEST_ID] || '').trim();
  const contextRaw = String(row[MSSM166.columns.RESOLVED_CONTEXT] || '').trim();
  const proposalRaw = String(row[MSSM166.columns.PROPOSED_CHANGE] || '').trim();
  if (!contextRaw || !proposalRaw) throw new Error('Resolved context and Proposed Change JSON are required before hashing.');
  const context = mssm166ParseJson_(contextRaw, 'Resolved Square Context JSON');
  const proposal = mssm166ParseJson_(proposalRaw, 'Proposed Change JSON');
  mssm166ValidateProposal_(proposal, context);
  const canonical = mssm166StableStringify_(proposal);
  const fp = mssm166Sha256_(canonical);
  mssm166SetRow_(sh, rowNum, {
    status: 'PREVIEW_READY',
    fingerprint: fp,
    error: '',
    notes: 'Approval fingerprint locked. Any proposal change requires re-hash and new approval.',
    updatedAt: new Date()
  });
  mssm166Audit_(requestId, 'HASH', 'PREVIEW_READY', fp, '', '', '');
  return { requestId: requestId, status: 'PREVIEW_READY', approvalFingerprint: fp };
}

function mssm166ApplyRow_(sh, rowNum, row, cfg) {
  const requestId=String(row[MSSM166.columns.REQUEST_ID]||'').trim();
  if (!mssm166Bool_(cfg.SERVICE_WRITE_ENABLED)) {
    mssm166SetRow_(sh,rowNum,{status:'PREVIEW_READY',error:'SETUP REQUIRED: SERVICE_WRITE_ENABLED is FALSE.',updatedAt:new Date()});
    return {requestId:requestId,status:'SETUP_REQUIRED'};
  }
  const proposal=mssm166ParseJson_(row[MSSM166.columns.PROPOSED_CHANGE],'Proposed Change JSON');
  const context=mssm166ParseJson_(row[MSSM166.columns.RESOLVED_CONTEXT],'Resolved Square Context JSON');
  const storedFp=String(row[MSSM166.columns.APPROVAL_FINGERPRINT]||'').trim();
  const currentFp=mssm166Sha256_(mssm166StableStringify_(proposal));
  if (!storedFp||storedFp!==currentFp) throw new Error('Approval fingerprint mismatch. Re-preview and approve again.');
  mssm166ValidateProposal_(proposal,context);
  const liveRef=mssm166Retrieve_(context.reference.item_id,true,cfg);
  const liveStructure=mssm166ReferenceStructure_(liveRef,context.family,cfg);
  if (liveStructure.structure_signature!==context.reference.structure_signature) {
    throw new Error('Live reference category/payment/modifier structure changed after preview. Re-resolve before writing.');
  }
  mssm166SetRow_(sh,rowNum,{status:'PROCESSING',error:'',updatedAt:new Date()});
  const idem=String(row[MSSM166.columns.IDEMPOTENCY_KEY]||'').trim()||Utilities.getUuid();
  if (!row[MSSM166.columns.IDEMPOTENCY_KEY]) sh.getRange(rowNum,MSSM166.columns.IDEMPOTENCY_KEY+1).setValue(idem);
  const operation=String(proposal.operation||context.operation||'').toUpperCase();
  let writeResponse;
  if (operation==='CREATE') writeResponse=mssm166CreateService_(proposal,context,liveRef,idem,cfg);
  else if (operation==='UPDATE') writeResponse=mssm166UpdateService_(proposal,context,liveRef,idem,cfg);
  else throw new Error('Unsupported operation.');
  const itemId=writeResponse.itemId;
  let verify,verification;
  try {
    verify=mssm166Retrieve_(itemId,true,cfg);
    verification=mssm166VerifySaved_(proposal,context,verify,cfg,writeResponse);
  } catch(e) {
    verification={ok:false,errors:['Read-back failed after Square write: '+mssm166SafeError_(e)]};
  }
  if (!verification.ok) {
    // Square may have written already. Do not requeue or retry and accidentally duplicate.
    mssm166SetRow_(sh,rowNum,{status:'VERIFY_FAILED_MANUAL_REVIEW',squareItemId:itemId,
      verification:JSON.stringify(verification),error:verification.errors.join(' | '),
      notes:'Square write may have occurred. Inspect this item manually; NEVER auto-retry.',updatedAt:new Date()});
    mssm166Audit_(requestId,'APPLY','VERIFY_FAILED_MANUAL_REVIEW',JSON.stringify(verification),itemId,'','');
    return {requestId:requestId,status:'VERIFY_FAILED_MANUAL_REVIEW',itemId:itemId};
  }
  const variationIds=(verify.object.item_data.variations||[]).map(function(v){return v.id;});
  mssm166SetRow_(sh,rowNum,{status:'SAVED_VERIFIED',squareItemId:itemId,
    squareVariationIds:variationIds.join(' | '),verification:JSON.stringify(verification),error:'',
    notes:'Square read-back matches approved catalog proposal. Provider assignment/manual booking release still pending for CREATE.',
    updatedAt:new Date()});
  mssm166Audit_(requestId,'APPLY','SAVED_VERIFIED',JSON.stringify(verification.summary),itemId,variationIds.join(' | '),verify.object.version||'');
  return {requestId:requestId,status:'SAVED_VERIFIED',itemId:itemId,variationIds:variationIds,
    providerAssignmentPending:operation==='CREATE'};
}

function mssm166CreateService_(proposal, context, liveRef, idem, cfg) {
  // MSSM168: one atomic Square batch creates the service AND a payment modifier
  // list dedicated to this service. Existing shared Square lists are never changed.
  // Fresh exact-name duplicate guard; do not create another live catalog item.
  const existingNames = mssm166FindItemsByText_(proposal.name, cfg).filter(function(x) {
    return x && x.item_data && !x.is_deleted && !x.item_data.is_archived &&
      mssm166Norm_(x.item_data.name) === mssm166Norm_(proposal.name);
  });
  if (existingNames.length) throw new Error('Existing Square service already has this exact name: '+existingNames[0].id+'. Do not create a duplicate.');
  const itemId = '#mssm168_item';
  const paymentListId = '#mssm168_payment_list';
  const pay = mssm168BuildPaymentList_(proposal.name, proposal.variations, paymentListId);
  const modifierInfo = [mssm168NewPaymentInfo_(paymentListId)]
    .concat(mssm168MassageExtras_(context));
  const itemData = {
    name: proposal.name,
    description_html: mssm166DescriptionHtml_(proposal.description),
    product_type: 'APPOINTMENTS_SERVICE',
    categories: context.reference.categories.map(function(c){ return {id:c.id}; }),
    modifier_list_info: modifierInfo,
    variations: proposal.variations.map(function(v, i) {
      return {
        type: 'ITEM_VARIATION', id: '#mssm168_var_' + (i + 1),
        present_at_all_locations: false,
        present_at_location_ids: [context.location_id],
        item_variation_data: {
          item_id: itemId,
          name: v.name || mssm166VariationName_(v.duration_minutes),
          pricing_type: 'FIXED_PRICING',
          price_money: {amount: Number(v.price_amount_cents), currency: 'USD'},
          service_duration: Number(v.duration_minutes) * 60000,
          // The owner assigns staff and enables booking in Square.
          available_for_booking: false
          // team_member_ids deliberately omitted
        }
      };
    })
  };
  if (typeof liveRef.object.item_data.is_taxable === 'boolean') itemData.is_taxable = liveRef.object.item_data.is_taxable;
  if (liveRef.object.item_data.tax_ids) itemData.tax_ids = mssm166Clone_(liveRef.object.item_data.tax_ids);
  itemData.skip_modifier_screen = false; // Staff must choose one checkout payment modifier.
  if (liveRef.object.item_data.reporting_category && liveRef.object.item_data.reporting_category.id) itemData.reporting_category = {id:liveRef.object.item_data.reporting_category.id};
  const item = {
    type:'ITEM', id:itemId, present_at_all_locations:false,
    present_at_location_ids:[context.location_id], item_data:itemData
  };
  const resp = mssm166Api_('POST','/v2/catalog/batch-upsert', {
    idempotency_key: idem, batches:[{objects:[pay.list, item]}]
  },cfg);
  const resultItem = (resp.objects || []).find(function(o) { return o.type === 'ITEM' && o.item_data && o.item_data.name === proposal.name; });
  if (!resultItem || !resultItem.id) throw new Error('Square batch returned no new service item. STOP and inspect before retry.');
  const mapped = mssm168MappedId_(resp, paymentListId);
  const attached = (resultItem.item_data.modifier_list_info || []).map(function(x){return x.modifier_list_id;});
  const actualPaymentId = mapped || attached.find(function(id) {
    return !modifierInfo.slice(1).some(function(x) {return x.modifier_list_id === id;});
  });
  if (!actualPaymentId) throw new Error('Square batch saved but did not identify its payment list. Inspect item '+resultItem.id+' before retry.');
  return { itemId:resultItem.id, paymentListId:actualPaymentId, paymentOptions:pay.options,
    providerMode:'OWNER_MANUAL_UNASSIGNED', created:true };
}

function mssm166UpdateService_(proposal, context, liveRef, idem, cfg) {
  if (mssmRLPriceMode_(proposal)) return mssmRLUpdatePrice_(proposal,context,idem,cfg);
  const targetId = String(proposal.existing_item_id || (context.existing_item && context.existing_item.id) || '').trim();
  if (!targetId) throw new Error('UPDATE requires existing_item_id.');
  const retrieved = mssm166Retrieve_(targetId, true, cfg);
  const current = retrieved.object;
  if (!current || current.is_deleted || !current.item_data) throw new Error('Target Square item is unavailable/deleted.');
  if (current.item_data.product_type !== 'APPOINTMENTS_SERVICE') throw new Error('Target item is not an APPOINTMENTS_SERVICE.');
  // Never update an item that changed after the owner saw its preview.
  if (Number(proposal.expected_item_version) !== Number(current.version)) {
    throw new Error('Target item version does not match approved preview. Re-resolve, preview, and approve again.');
  }
  const obj = mssm166Clone_(current);
  delete obj.updated_at; delete obj.created_at; delete obj.is_deleted;
  if (obj.item_data) { delete obj.item_data.channels; delete obj.item_data.description_plaintext; }
  const changes = Array.isArray(proposal.fields_to_change) ? proposal.fields_to_change : [];
  if (changes.length && changes.some(function(x) {
    return ['name','description','category','variations','payment_structure'].indexOf(x) < 0;
  })) throw new Error('UPDATE contains unsupported field. Request explicit implementation review.');
  const doName = changes.length ? changes.indexOf('name') >= 0 : !!proposal.name;
  const doDescription = changes.length ? changes.indexOf('description') >= 0 : !!proposal.description;
  const doCategory = changes.indexOf('category') >= 0;
  const doVariations = changes.length ? changes.indexOf('variations') >= 0 : !!(proposal.variations && proposal.variations.length);
  const doPayment = doVariations || changes.indexOf('payment_structure') >= 0;
  if (doName) obj.item_data.name = proposal.name;
  if (doDescription) obj.item_data.description_html = mssm166DescriptionHtml_(proposal.description);
  if (doCategory) obj.item_data.categories = context.reference.categories.map(function(c){ return {id:c.id}; });
  if (doVariations) {
    obj.item_data.variations = mssm166MergeVariations_(current.item_data.variations || [],proposal.variations || [],targetId,context.location_id);
  }
  if (!doPayment) {
    // Description/name only: do not replace payment lists, prices, provider IDs, or any modifiers.
    const resp = mssm166Api_('POST','/v2/catalog/object',{idempotency_key:idem,object:obj},cfg);
    if (!resp.catalog_object || resp.catalog_object.id !== targetId) throw new Error('Square update response missing target. Inspect item before retry.');
    return {itemId:targetId,created:false,paymentListId:null,
      previousModifierIds:(current.item_data.modifier_list_info||[]).map(function(x){return x.modifier_list_id;})};
  }
  // Price/duration changes: make a NEW item-specific cash + 3%-CCF list; never
  // modify a shared list, and preserve all unrelated modifiers and staff IDs.
  const payVars = obj.item_data.variations.map(function(v) {
    return {duration_minutes:Number(v.item_variation_data.service_duration)/60000,
      price_amount_cents:Number(v.item_variation_data.price_money.amount)};
  });
  const paymentListId = '#mssm168_payment_list';
  const pay = mssm168BuildPaymentList_(obj.item_data.name,payVars,paymentListId);
  const preserve = mssm168NonpaymentModifierInfo_(retrieved,cfg);
  obj.item_data.modifier_list_info = [mssm168NewPaymentInfo_(paymentListId)].concat(preserve);
  const resp = mssm166Api_('POST','/v2/catalog/batch-upsert',{
    idempotency_key:idem,batches:[{objects:[pay.list,obj]}]
  },cfg);
  const resultItem = (resp.objects || []).find(function(o){return o.type==='ITEM' && o.id===targetId;});
  if (!resultItem || !resultItem.id) throw new Error('Square batch did not return updated item. Inspect before retry.');
  const attached=(resultItem.item_data.modifier_list_info||[]).map(function(x){return x.modifier_list_id;});
  const mapped=mssm168MappedId_(resp,paymentListId);
  const actualPaymentId=mapped||attached.find(function(id){return preserve.every(function(x){return x.modifier_list_id!==id;});});
  if (!actualPaymentId) throw new Error('Square batch saved but the payment-list ID is unresolved. Inspect before retry.');
  return {itemId:targetId,paymentListId:actualPaymentId,paymentOptions:pay.options,
    providerMode:'PRESERVE_EXISTING',created:false};
}

function mssm166MergeVariations_(currentVars, proposedVars, itemId, locationId) {
  if (!Array.isArray(currentVars) || !Array.isArray(proposedVars)) throw new Error('Variation arrays required.');
  if (proposedVars.some(function(v){return v && v.replace_all_variations===true;})) {
    throw new Error('Destructive replace-all variations is disabled. Existing durations must be preserved.');
  }
  const currentByDuration = Object.create(null);
  const currentIds = Object.create(null);
  currentVars.forEach(function(v) {
    if (!v || typeof v.id!=='string' || !v.id.trim() || !v.item_variation_data || currentIds[v.id]) {
      throw new Error('Existing variation identity is missing or duplicated. Stop for review.');
    }
    currentIds[v.id]=true;
    const mins=Number(v.item_variation_data.service_duration || 0)/60000;
    if (mins) (currentByDuration[String(mins)] || (currentByDuration[String(mins)]=[])).push(v);
  });
  const proposedDurations=Object.create(null);
  proposedVars.forEach(function(p) {
    if (!p || !Number.isFinite(Number(p.duration_minutes)) || !(Number(p.duration_minutes)>0)) throw new Error('Valid proposed duration required.');
    const key=String(Number(p.duration_minutes));
    if (proposedDurations[key]) throw new Error('Repeated proposed duration is ambiguous. Re-preview with explicit variation identity.');
    proposedDurations[key]=true;
    if ((currentByDuration[key] || []).length>1) throw new Error('Multiple existing variations have this duration. Explicit identity review required; no merge performed.');
  });
  const result=[];
  const matchedIds=Object.create(null);
  proposedVars.forEach(function(p,i) {
    const mins=Number(p.duration_minutes);
    const matches=currentByDuration[String(mins)] || [];
    const existing=matches[0];
    if (existing) {
      matchedIds[existing.id]=true;
      const v=mssm166Clone_(existing);
      delete v.updated_at;delete v.created_at;delete v.is_deleted;
      v.item_variation_data.item_id=itemId;
      v.item_variation_data.name=p.name||v.item_variation_data.name||mssm166VariationName_(mins);
      v.item_variation_data.pricing_type='FIXED_PRICING';
      v.item_variation_data.price_money={amount:Number(p.price_amount_cents),currency:'USD'};
      v.item_variation_data.service_duration=mins*60000;
      // Existing assignments/bookability remain intact unless owner explicitly changed booking.
      if (typeof p.available_for_booking==='boolean') v.item_variation_data.available_for_booking=p.available_for_booking;
      result.push(v);
    } else {
      if (p.available_for_booking===true) throw new Error('New duration cannot be made bookable before manual provider assignment.');
      result.push({type:'ITEM_VARIATION',id:'#mssm168_extra_var_'+(i+1),
        present_at_all_locations:false,present_at_location_ids:[locationId],
        item_variation_data:{item_id:itemId,name:p.name||mssm166VariationName_(mins),
          pricing_type:'FIXED_PRICING',price_money:{amount:Number(p.price_amount_cents),currency:'USD'},
          service_duration:mins*60000,available_for_booking:false}});
    }
  });
  currentVars.forEach(function(v) {
    if (!matchedIds[v.id]) result.push(v);
  });
  return result;
}

function mssm166ValidateProposal_(p, context) {
  if (mssmRLPriceMode_(p)) return mssmRLValidatePrice_(p,context);
  if (!p || typeof p !== 'object') throw new Error('Proposed Change JSON must be an object.');
  if (['CREATE','UPDATE'].indexOf(String(p.operation || '').toUpperCase())<0) throw new Error('Proposal operation must be CREATE or UPDATE.');
  if (!String(p.name || '').trim()) throw new Error('Proposal name is required.');
  if (!String(p.description || '').trim()) throw new Error('Proposal description is required.');
  if (p.product_type !== 'APPOINTMENTS_SERVICE') throw new Error('product_type must be APPOINTMENTS_SERVICE.');
  mssm168PaymentOptions_(p.variations);
  if (!context || !context.reference || !context.reference.structure_signature) throw new Error('Resolved Square context is incomplete.');
  if (!context.reference.payment_structure || !context.reference.payment_structure.verified) throw new Error('Payment structure reference is not verified.');
  if (context.family==='MASSAGE' && (!context.reference.massage_modifier_structure || !context.reference.massage_modifier_structure.verified)) {
    throw new Error('Massage modifier structure has not been verified.');
  }
  if (String(p.operation).toUpperCase()==='CREATE') {
    if (p.variations.some(function(v){return v.available_for_booking===true;})) {
      throw new Error('Owner assigns staff manually. New service must remain unavailable for booking until owner setup.');
    }
    if (p.provider_mode && p.provider_mode!=='OWNER_MANUAL_UNASSIGNED') {
      throw new Error('New services use OWNER_MANUAL_UNASSIGNED provider mode.');
    }
  } else {
    if (!p.existing_item_id && !(context.existing_item && context.existing_item.id)) throw new Error('UPDATE target ID missing.');
    if (!Number.isSafeInteger(Number(p.expected_item_version)) || !(Number(p.expected_item_version)>0)) {
      throw new Error('UPDATE requires expected_item_version from the exact approved preview.');
    }
    if (context.existing_item && Number(p.expected_item_version)!==Number(context.existing_item.version)) {
      throw new Error('UPDATE expected_item_version differs from resolved context. Re-resolve.');
    }
  }
}

function mssm166VerifySaved_(proposal, context, retrieved, cfg, writeResponse) {
  if (mssmRLPriceMode_(proposal)) return mssmRLVerifyPrice_(proposal,context,retrieved);
  const errors=[];
  const obj=retrieved.object;
  const item=obj && obj.item_data;
  if (!item) return {ok:false,errors:['Retrieved Square item has no item_data.']};
  if (item.name!==proposal.name) errors.push('Name mismatch.');
  const plain=String(item.description_plaintext||item.description||'').replace(/\s+/g,' ').trim();
  const expected=String(proposal.description||'').replace(/\s+/g,' ').trim();
  if (plain && expected && plain!==expected) errors.push('Description mismatch.');
  if (item.product_type!=='APPOINTMENTS_SERVICE') errors.push('Product type mismatch.');
  const catIds=(item.categories||[]).map(function(c){return c.id;}).sort();
  const expectedCats=(context.reference.categories||[]).map(function(c){return c.id;}).sort();
  if (JSON.stringify(catIds)!==JSON.stringify(expectedCats) && String(proposal.operation).toUpperCase()==='CREATE') errors.push('Category mismatch.');
  const actualVars=(item.variations||[]).map(function(v) {
    const d=v.item_variation_data||{};
    return {id:v.id,duration_minutes:Number(d.service_duration||0)/60000,
      price_amount_cents:Number(d.price_money&&d.price_money.amount||0),
      available_for_booking:d.available_for_booking===true,
      team_member_ids:d.team_member_ids||[],name:d.name};
  });
  const created=String(proposal.operation).toUpperCase()==='CREATE';
  (proposal.variations||[]).forEach(function(v){
    const found=actualVars.find(function(a){return a.duration_minutes===Number(v.duration_minutes);});
    if (!found) errors.push('Missing '+v.duration_minutes+'-minute variation.');
    else if (found.price_amount_cents!==Number(v.price_amount_cents)) errors.push('Price mismatch for '+v.duration_minutes+' minutes.');
  });
  if (created) actualVars.forEach(function(v) {
    if (v.available_for_booking) errors.push('New service is prematurely bookable at '+v.duration_minutes+' min.');
    if (v.team_member_ids.length) errors.push('New service has unexpected provider assignments.');
  });
  const actualMods=(item.modifier_list_info||[]).map(function(x){return x.modifier_list_id;});
  if (writeResponse && writeResponse.paymentListId) {
    if (actualMods.indexOf(writeResponse.paymentListId)<0) errors.push('Dedicated payment modifier list is not attached.');
    try {
      const related=(retrieved.related_objects||[]).find(function(x){return x.id===writeResponse.paymentListId;});
      const list=related || mssm166Retrieve_(writeResponse.paymentListId,false,cfg).object;
      const data=list&&list.modifier_list_data;
      if (!data) errors.push('Dedicated payment modifier list cannot be retrieved.');
      else {
        const expectedOptions=mssm168PaymentOptions_(actualVars);
        const actualOptions=(data.modifiers||[]).map(function(m){
          return {name:String(m.modifier_data&&m.modifier_data.name||''),
            cents:Number(m.modifier_data&&m.modifier_data.price_money&&m.modifier_data.price_money.amount||0)};
        });
        const wanted=[{name:'Cash Payment',cents:0}].concat(expectedOptions.map(function(o) {
          return {name:o.card_label,cents:o.credit_card_ccf_cents};
        }));
        if (wanted.length!==actualOptions.length) errors.push('Wrong number of cash/CCF options.');
        wanted.forEach(function(w) {
          if (actualOptions.filter(function(x){return x.name===w.name && x.cents===w.cents;}).length!==1)
            errors.push('Payment option mismatch: '+w.name);
        });
        if (Number(data.max_selected_modifiers)!==1) errors.push('Payment list must allow at most one option.');
        if (Number(data.min_selected_modifiers)!==1) errors.push('Payment list must require one staff selection.');
        if ((data.modifiers||[]).some(function(m){return !m.modifier_data||m.modifier_data.hidden_online!==true;})) errors.push('Payment modifiers must be hidden online.');
      }
    } catch(e) {errors.push('Payment list verification error: '+mssm166SafeError_(e));}
    if (created && context.family==='MASSAGE') {
      mssm168MassageExtras_(context).forEach(function(x){
        if (actualMods.indexOf(x.modifier_list_id)<0) errors.push('Missing existing Massage modifier list '+x.modifier_list_id);
      });
    }
  } else if (writeResponse && writeResponse.previousModifierIds) {
    const previous=writeResponse.previousModifierIds.slice().sort();
    if (JSON.stringify(previous)!==JSON.stringify(actualMods.slice().sort())) errors.push('Unapproved modifier change.');
  }
  return {ok:!errors.length,errors:errors,summary:{item_id:obj.id,version:obj.version,
    name:item.name,category_ids:catIds,variations:actualVars,
    modifier_list_ids:actualMods,payment_list_id:writeResponse&&writeResponse.paymentListId||null,
    provider_assignment:created?'OWNER_MANUAL_UNASSIGNED':'PRESERVED',
    booking_ready:!created}};
}

function mssm166ResolveReference_(family, explicitId, cfg) {
  const id = String(explicitId || '').trim();
  if (id) return mssm166Retrieve_(id, true, cfg);
  const known = MSSM166.references[family];
  if (!known) return null;
  try {
    const r = mssm166Retrieve_(known.id, true, cfg);
    if (r.object && !r.object.is_deleted && r.object.item_data && r.object.item_data.product_type === 'APPOINTMENTS_SERVICE') return r;
  } catch (e) {}
  const found = mssm166FindItemsByText_(known.name, cfg).filter(function(x) {
    return x.item_data && !x.is_deleted && !x.item_data.is_archived && mssm166Norm_(x.item_data.name) === mssm166Norm_(known.name);
  });
  if (found.length !== 1) return null;
  return mssm166Retrieve_(found[0].id, true, cfg);
}

function mssm166ReferenceStructure_(retrieved, family, cfg) {
  const item = retrieved.object;
  const related = retrieved.related_objects || [];
  const byId = {};
  related.forEach(function(o) { byId[o.id] = o; });
  const categories = (item.item_data.categories || []).map(function(c) { return { id: c.id, ordinal: c.ordinal }; });
  const categoryLabels = categories.map(function(c) {
    const o = byId[c.id] || mssm166Retrieve_(c.id, false, cfg).object;
    return { id: c.id, name: o && o.category_data ? o.category_data.name : '' };
  });

  const modifierInfos = mssm166Clone_(item.item_data.modifier_list_info || []);
  const modifierLists = modifierInfos.map(function(info) {
    let o = byId[info.modifier_list_id];
    if (!o) o = mssm166Retrieve_(info.modifier_list_id, false, cfg).object;
    const md = o && o.modifier_list_data;
    return {
      id: info.modifier_list_id,
      name: md ? md.name : '',
      item_info: info,
      modifiers: md && md.modifiers ? md.modifiers.map(function(m) {
        return {
          id: m.id,
          name: m.modifier_data && m.modifier_data.name || '',
          price_amount_cents: m.modifier_data && m.modifier_data.price_money ? Number(m.modifier_data.price_money.amount || 0) : null,
          currency: m.modifier_data && m.modifier_data.price_money ? m.modifier_data.price_money.currency : null
        };
      }) : []
    };
  });

  const itemOptions = (item.item_data.item_options || []).map(function(io) {
    let o = byId[io.item_option_id];
    if (!o) o = mssm166Retrieve_(io.item_option_id, true, cfg).object;
    return { id: io.item_option_id, name: o && o.item_option_data ? o.item_option_data.name : '', raw: io };
  });

  const payMods = modifierLists.filter(mssm166PaymentLike_);
  const payOptions = itemOptions.filter(function(x) { return mssm166PaymentText_(x.name); });
  const payVars = (item.item_data.variations || []).filter(function(v) {
    return mssm166PaymentText_(v.item_variation_data && v.item_variation_data.name || '');
  }).map(function(v) { return { id: v.id, name: v.item_variation_data.name }; });

  let paymentKind = 'NONE';
  if (payMods.length) paymentKind = 'MODIFIER_LIST';
  else if (payOptions.length) paymentKind = 'ITEM_OPTION';
  else if (payVars.length) paymentKind = 'VARIATION';

  const nonPaymentMods = modifierLists.filter(function(x) { return !mssm166PaymentLike_(x); });
  const paymentStructure = {
    // Phase 1 can clone payment structure exactly only when Square represents it as an item modifier list.
    // If the live account uses item options or payment-specific variations, block rather than approximate.
    verified: paymentKind === 'MODIFIER_LIST',
    kind: paymentKind,
    modifier_lists: payMods,
    item_options: payOptions,
    variation_labels: payVars,
    needs_implementation_review: paymentKind !== 'MODIFIER_LIST'
  };
  const massageModifierStructure = {
    verified: family !== 'MASSAGE' ? true : nonPaymentMods.length > 0,
    modifier_lists: family === 'MASSAGE' ? nonPaymentMods : []
  };

  const signatureSource = {
    item_id: item.id,
    version: item.version,
    categories: categories,
    payment: paymentStructure,
    massage: massageModifierStructure
  };
  const signature = mssm166Sha256_(mssm166StableStringify_(signatureSource));
  return {
    item_id: item.id,
    item_name: item.item_data.name,
    item_version: item.version,
    categories: categories,
    category_labels: categoryLabels,
    category_ids: categories.map(function(c) { return c.id; }),
    payment_structure: paymentStructure,
    massage_modifier_structure: massageModifierStructure,
    all_modifier_lists: modifierLists,
    item_options: itemOptions,
    variation_names: (item.item_data.variations || []).map(function(v) { return v.item_variation_data && v.item_variation_data.name || ''; }),
    is_taxable: item.item_data.is_taxable,
    tax_ids: item.item_data.tax_ids || [],
    skip_modifier_screen: item.item_data.skip_modifier_screen,
    structure_signature: signature
  };
}

function mssm166DesiredModifierInfo_(context) {
  const out = [];
  const pay = context.reference.payment_structure || {};
  if (pay.kind === 'MODIFIER_LIST') {
    (pay.modifier_lists || []).forEach(function(x) { if (x.item_info) out.push(mssm166Clone_(x.item_info)); });
  }
  if (context.family === 'MASSAGE') {
    (context.reference.massage_modifier_structure.modifier_lists || []).forEach(function(x) { if (x.item_info) out.push(mssm166Clone_(x.item_info)); });
  }
  const seen = {};
  return out.filter(function(x) {
    if (!x || !x.modifier_list_id || seen[x.modifier_list_id]) return false;
    seen[x.modifier_list_id] = true;
    return true;
  });
}

function mssm166SummarizeReference_(retrieved, family) {
  const o = retrieved.object;
  return {
    ok: !!(o && !o.is_deleted),
    family: family,
    id: o && o.id,
    name: o && o.item_data && o.item_data.name,
    productType: o && o.item_data && o.item_data.product_type,
    version: o && o.version,
    categoryIds: o && o.item_data ? (o.item_data.categories || []).map(function(c) { return c.id; }) : [],
    modifierListIds: o && o.item_data ? (o.item_data.modifier_list_info || []).map(function(m) { return m.modifier_list_id; }) : [],
    itemOptionIds: o && o.item_data ? (o.item_data.item_options || []).map(function(x) { return x.item_option_id; }) : []
  };
}

function mssm166SummarizeExisting_(o) {
  return {
    id: o.id,
    version: o.version,
    name: o.item_data && o.item_data.name,
    product_type: o.item_data && o.item_data.product_type,
    category_ids: o.item_data ? (o.item_data.categories || []).map(function(c) { return c.id; }) : [],
    variation_count: o.item_data && o.item_data.variations ? o.item_data.variations.length : 0
  };
}

function mssm166FindItemsByText_(text, cfg) {
  const body = {
    text_filter: String(text || '').slice(0, 255),
    enabled_location_ids: cfg.SQUARE_LOCATION_ID ? [cfg.SQUARE_LOCATION_ID] : undefined,
    product_types: ['APPOINTMENTS_SERVICE'],
    archived_state: 'ARCHIVED_STATE_NOT_ARCHIVED',
    limit: 100
  };
  if (!body.enabled_location_ids) delete body.enabled_location_ids;
  const items=[];
  const seenCursors=Object.create(null);
  const seenIds=Object.create(null);
  // A bound is a fail-closed hold, never permission to use a partial duplicate search.
  for (let page=0;page<100;page++) {
    const r=mssm166Api_('POST','/v2/catalog/search-catalog-items',body,cfg);
    if (!r || typeof r!=='object' || Array.isArray(r) || Object.prototype.hasOwnProperty.call(r,'raw') ||
        (r.errors && (!Array.isArray(r.errors) || r.errors.length)) ||
        (r.items!==undefined && !Array.isArray(r.items)) ||
        (r.cursor!==undefined && (typeof r.cursor!=='string' || (r.cursor!=='' && !r.cursor.trim())))) {
      throw new Error('Catalog search response invalid. No partial result accepted.');
    }
    (r.items || []).forEach(function(item) {
      if (!item || item.type!=='ITEM' || typeof item.id!=='string' || !item.id.trim() || seenIds[item.id] ||
          !item.item_data || typeof item.item_data!=='object' || Array.isArray(item.item_data) ||
          typeof item.item_data.name!=='string' || !item.item_data.name.trim() ||
          (item.is_deleted!==undefined && typeof item.is_deleted!=='boolean') ||
          (item.item_data.is_archived!==undefined && typeof item.item_data.is_archived!=='boolean')) {
        throw new Error('Catalog search item identity invalid or repeated. No partial result accepted.');
      }
      seenIds[item.id]=true;
      items.push(item);
    });
    // Square returns an empty string when this is the final page (live verified 2026-11-07).
    if (r.cursor===undefined || r.cursor==='') return items;
    if (seenCursors[r.cursor]) throw new Error('Catalog search cursor repeated. No partial result accepted.');
    seenCursors[r.cursor]=true;
    body.cursor=r.cursor;
  }
  throw new Error('Catalog search page limit reached. No partial result accepted.');
}

function mssm166Retrieve_(id, includeRelated, cfg) {
  const path = '/v2/catalog/object/' + encodeURIComponent(id) + (includeRelated ? '?include_related_objects=true' : '');
  return mssm166Api_('GET', path, null, cfg);
}

function mssm166Api_(method, path, body, cfg) {
  const token = PropertiesService.getScriptProperties().getProperty(MSSM166.tokenProperty);
  if (!token) throw new Error('SQUARE_ACCESS_TOKEN missing.');
  const opts = {
    method: method,
    muteHttpExceptions: true,
    headers: {
      'Authorization': 'Bearer ' + token,
      'Square-Version': cfg.SQUARE_API_VERSION || '2026-09-16',
      'Content-Type': 'application/json'
    }
  };
  if (body !== null && body !== undefined) opts.payload = JSON.stringify(body);
  const res = UrlFetchApp.fetch(MSSM166.squareBase + path, opts);
  const code = res.getResponseCode();
  const text = res.getContentText();
  let json = {};
  try { json = text ? JSON.parse(text) : {}; } catch (e) { json = { raw: text }; }
  if (code < 200 || code >= 300) {
    const safe = json && json.errors ? JSON.stringify(json.errors) : ('HTTP ' + code);
    throw new Error('Square API ' + method + ' ' + path.split('?')[0] + ' failed: ' + safe);
  }
  return json;
}

function mssm166Config_() {
  const ss = SpreadsheetApp.openById(MSSM166.spreadsheetId);
  const sh = ss.getSheetByName(MSSM166.configSheet);
  if (!sh) throw new Error('Configuration sheet missing.');
  const vals = sh.getDataRange().getValues();
  const cfg = {};
  for (let i = 1; i < vals.length; i++) {
    const key = String(vals[i][0] || '').trim();
    if (key) cfg[key] = vals[i][1];
  }
  return cfg;
}

function mssm166SetRow_(sh, rowNum, patch) {
  const c = MSSM166.columns;
  if (patch.requestId !== undefined) sh.getRange(rowNum, c.REQUEST_ID + 1).setValue(patch.requestId);
  if (patch.status !== undefined) sh.getRange(rowNum, c.STATUS + 1).setValue(patch.status);
  if (patch.context !== undefined) sh.getRange(rowNum, c.RESOLVED_CONTEXT + 1).setValue(patch.context);
  if (patch.proposal !== undefined) sh.getRange(rowNum, c.PROPOSED_CHANGE + 1).setValue(patch.proposal);
  if (patch.fingerprint !== undefined) sh.getRange(rowNum, c.APPROVAL_FINGERPRINT + 1).setValue(patch.fingerprint);
  if (patch.approvedAt !== undefined) sh.getRange(rowNum, c.APPROVED_AT + 1).setValue(patch.approvedAt);
  if (patch.squareItemId !== undefined) sh.getRange(rowNum, c.SQUARE_ITEM_ID + 1).setValue(patch.squareItemId);
  if (patch.squareVariationIds !== undefined) sh.getRange(rowNum, c.SQUARE_VARIATION_IDS + 1).setValue(patch.squareVariationIds);
  if (patch.verification !== undefined) sh.getRange(rowNum, c.VERIFICATION_JSON + 1).setValue(patch.verification);
  if (patch.error !== undefined) sh.getRange(rowNum, c.ERROR + 1).setValue(patch.error);
  if (patch.referenceItemId !== undefined) sh.getRange(rowNum, c.REFERENCE_ITEM_ID + 1).setValue(patch.referenceItemId);
  if (patch.existingMatchItemId !== undefined) sh.getRange(rowNum, c.EXISTING_MATCH_ITEM_ID + 1).setValue(patch.existingMatchItemId);
  if (patch.existingMatchConfidence !== undefined) sh.getRange(rowNum, c.EXISTING_MATCH_CONFIDENCE + 1).setValue(patch.existingMatchConfidence);
  if (patch.notes !== undefined) sh.getRange(rowNum, c.NOTES + 1).setValue(patch.notes);
  if (patch.updatedAt !== undefined) sh.getRange(rowNum, c.UPDATED_AT + 1).setValue(patch.updatedAt);
}

function mssm166NeedsInput_(sh, rowNum, requestId, questions) {
  const context = { questions: questions };
  mssm166SetRow_(sh, rowNum, { status: 'NEEDS_USER_INPUT', context: JSON.stringify(context), notes: questions.join(' | '), updatedAt: new Date() });
  mssm166Audit_(requestId, 'RESOLVE', 'NEEDS_USER_INPUT', questions.join(' | '), '', '', '');
  return { requestId: requestId, status: 'NEEDS_USER_INPUT', questions: questions };
}

function mssm166Audit_(requestId, event, status, details, itemId, variationIds, version) {
  try {
    const ss = SpreadsheetApp.openById(MSSM166.spreadsheetId);
    const sh = ss.getSheetByName(MSSM166.auditSheet);
    if (!sh) return;
    sh.appendRow([new Date(), requestId || '', event || '', status || '', mssm166Truncate_(details || '', 20000), itemId || '', variationIds || '', version || '']);
  } catch (e) {}
}

function mssm166PaymentLike_(x) {
  const text = [x.name || ''].concat((x.modifiers || []).map(function(m) { return m.name || ''; })).join(' ');
  return mssm166PaymentText_(text);
}

function mssm166PaymentText_(text) {
  return /(^|\W)(ccf|cash|payment|credit|card|processing|convenience|service\s*fee|finance|financing)(\W|$)/i.test(String(text || ''));
}

function mssm166NormalizeFamily_(x) {
  const s = String(x || '').trim().toUpperCase().replace(/[\s\/-]+/g, '_');
  if (/MASSAGE/.test(s) && /ADD/.test(s)) return 'MASSAGE_ADD_ON';
  if (/MASSAGE/.test(s)) return 'MASSAGE';
  if (/FACIAL|ESTHET/.test(s)) return 'FACIAL';
  if (/HEAD.*SPA|SCALP/.test(s)) return 'HEAD_SPA';
  if (/WAX/.test(s)) return 'WAXING';
  if (/ADD_ON|ENHANCEMENT/.test(s)) return 'ADD_ON';
  if (/WELLNESS|RED.*LIGHT|SAUNA|BIOTECH/.test(s)) return 'WELLNESS';
  return s;
}

function mssm166DescriptionHtml_(plain) {
  const safe = String(plain || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return safe.split(/\n\s*\n/).map(function(p) { return '<p>' + p.replace(/\n/g, '<br>') + '</p>'; }).join('');
}

function mssm166VariationName_(mins) {
  return Number(mins) + ' Minute' + (Number(mins) === 1 ? '' : 's');
}

function mssm166ParseJson_(value, label) {
  if (value && typeof value === 'object') return value;
  const s = String(value || '').trim();
  if (!s) throw new Error(label + ' is blank.');
  try { return JSON.parse(s); } catch (e) { throw new Error(label + ' is invalid JSON.'); }
}

function mssm166Bool_(v) {
  return String(v).trim().toUpperCase() === 'TRUE';
}

function mssm166Norm_(v) {
  return String(v || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
}

function mssm166Clone_(v) {
  return JSON.parse(JSON.stringify(v === undefined ? null : v));
}

function mssm166StableStringify_(obj) {
  if (obj === null || typeof obj !== 'object') return JSON.stringify(obj);
  if (Array.isArray(obj)) return '[' + obj.map(mssm166StableStringify_).join(',') + ']';
  return '{' + Object.keys(obj).sort().map(function(k) { return JSON.stringify(k) + ':' + mssm166StableStringify_(obj[k]); }).join(',') + '}';
}

function mssm166Sha256_(text) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(text), Utilities.Charset.UTF_8);
  return bytes.map(function(b) { const v = (b < 0 ? b + 256 : b).toString(16); return v.length === 1 ? '0' + v : v; }).join('');
}

function mssm166SafeError_(e) {
  return mssm166Truncate_(String(e && e.message ? e.message : e), 3000).replace(/Bearer\s+[A-Za-z0-9._~+\/-]+/gi, 'Bearer [REDACTED]');
}

function mssm166Truncate_(s, n) {
  s = String(s || '');
  return s.length > n ? s.slice(0, n) + '…' : s;
}


function matrixSquareServiceManagerSummary166() {
  const cfg = mssm166Config_();
  const families = [
    'MASSAGE', 'FACIAL', 'HEAD_SPA',
    'WELLNESS', 'WAXING', 'ADD_ON'
  ];

  families.forEach(function(family) {
    try {
      const ref = mssm166ResolveReference_(family, '', cfg);
      const s = mssm166ReferenceStructure_(ref, family, cfg);
      const data = {
        category: s.category_labels,
        paymentVerified: s.payment_structure.verified,
        paymentKind: s.payment_structure.kind,
        paymentLists: s.payment_structure.modifier_lists.map(function(x) {
          return {
            id: x.id,
            name: x.name,
            options: x.modifiers.map(function(m) {
              return {
                name: m.name,
                cents: m.price_amount_cents
              };
            })
          };
        }),
        massageVerified: s.massage_modifier_structure.verified,
        massageLists: s.massage_modifier_structure.modifier_lists.map(function(x) {
          return { id: x.id, name: x.name };
        })
      };

      mssm166Audit_(
        '',
        'STRUCTURE_CHECK_' + family,
        data.paymentVerified && data.massageVerified ? 'PASS' : 'REVIEW',
        JSON.stringify(data), '', '', ''
      );
    } catch (e) {
      mssm166Audit_(
        '',
        'STRUCTURE_CHECK_' + family,
        'ERROR',
        mssm166SafeError_(e), '', '', ''
      );
    }
  });
}


/**
 * MSSM168 — CALCULATED PAYMENT / OWNER-MANUAL-PROVIDER EXTENSION
 * - Cash Payment $0; 3%-CCF per variation, rounded to nearest cent.
 * - Each item gets a dedicated modifier list (atomic Square catalog batch).
 * - New services have no team_member_ids and are not bookable until owner setup.
 * - Existing shared modifier lists are NEVER updated.
 * - Existing Massage enhancement lists are linked unchanged.
 * - Does not inspect or modify actual tender/payment transaction type; staff picks
 *   the proper option at checkout. A modifier is not an automatic surcharge.
 */
const MSSM168 = Object.freeze({ version:'1.7.0', ccfPercent:3,
  newServiceProviderMode:'OWNER_MANUAL_UNASSIGNED' });

function mssm168PaymentOptions_(vars) {
  if (!Array.isArray(vars) || vars.length<1 || vars.length>250) throw new Error('Service must have between 1 and 250 variations.');
  const seen={};
  return vars.map(function(v) {
    const minutes=Number(v.duration_minutes);
    const cents=Number(v.price_amount_cents);
    if (!Number.isSafeInteger(minutes) || minutes<1 || minutes>1500) throw new Error('Duration must be a positive whole number, at most 1500 minutes.');
    if (!Number.isSafeInteger(cents) || cents<0 || cents>1000000000) throw new Error('Price must be a valid whole-cent USD amount.');
    if (v.currency && String(v.currency)!=='USD') throw new Error('Only USD is supported.');
    if (seen[String(minutes)]) throw new Error('Duplicate duration is not allowed: '+minutes+' minutes.');
    seen[String(minutes)]=true;
    const ccf=Math.floor((cents*3+50)/100);
    return {duration_minutes:minutes,price_amount_cents:cents,cash_fee_cents:0,
      credit_card_ccf_cents:ccf,
      card_label:'CCF-3 - '+minutes+' '+(minutes===1?'Minute':'Minutes')+' ($'+(ccf/100).toFixed(2)+')'};
  });
}

function mssm168BuildPaymentList_(serviceName,vars,listId) {
  const options=mssm168PaymentOptions_(vars);
  const modifiers=[{type:'MODIFIER',id:'#mssm168_cash',present_at_all_locations:true,
    modifier_data:{name:'Cash Payment',modifier_list_id:listId,
      price_money:{amount:0,currency:'USD'},hidden_online:true,on_by_default:false,ordinal:0}}];
  options.forEach(function(o,i){
    modifiers.push({type:'MODIFIER',id:'#mssm168_ccf_'+(i+1),present_at_all_locations:true,
      modifier_data:{name:o.card_label,modifier_list_id:listId,
        price_money:{amount:o.credit_card_ccf_cents,currency:'USD'},
        hidden_online:true,on_by_default:false,ordinal:i+1}});
  });
  const list={type:'MODIFIER_LIST',id:listId,present_at_all_locations:true,
    modifier_list_data:{name:('Payment Method - '+serviceName).slice(0,255),
      modifier_type:'LIST',min_selected_modifiers:1,max_selected_modifiers:1,
      allow_quantities:false,hidden_from_customer:false,modifiers:modifiers}};
  return {list:list,options:options};
}

function mssm168NewPaymentInfo_(listId) {
  return {modifier_list_id:listId,enabled:true,min_selected_modifiers:1,
    max_selected_modifiers:1,allow_quantities:'NO'};
}

function mssm168IsPaymentList_(name) {
  return /^(payment\s*(?:method|option|type)s?|ccf(?:[-\s]|$)|credit\s*card\s*fee|cash\s*payment)/i.test(String(name||'').trim());
}

function mssm168MassageExtras_(context) {
  if (context.family!=='MASSAGE') return [];
  const lists=context.reference.all_modifier_lists||[];
  const out=[];
  lists.forEach(function(x){
    if (mssm168IsPaymentList_(x.name)) return;
    // Cupping lists may themselves contain cash/CCF modifiers; preserve the
    // entire existing linked list instead of misclassifying it as a fee list.
    if (x.item_info && x.item_info.modifier_list_id) out.push(mssm166Clone_(x.item_info));
  });
  if (!out.length) throw new Error('Massage add-ons cannot be verified; block CREATE.');
  return out;
}

function mssm168NonpaymentModifierInfo_(retrieved,cfg) {
  const infos=mssm166Clone_(retrieved.object.item_data.modifier_list_info||[]);
  const byId={};(retrieved.related_objects||[]).forEach(function(x){byId[x.id]=x;});
  const keep=[];
  infos.forEach(function(info){
    const obj=byId[info.modifier_list_id]||mssm166Retrieve_(info.modifier_list_id,false,cfg).object;
    if (!obj || !obj.modifier_list_data) throw new Error('Cannot identify existing modifier list '+info.modifier_list_id);
    const name=String(obj.modifier_list_data.name||'');
    if (mssm168IsPaymentList_(name)) return;
    if (/\b(?:ccf|card\s*fee|payment|cash)\b/i.test(name)) {
      throw new Error('Possible unrecognized existing payment list '+name+'; stop to protect existing modifiers.');
    }
    keep.push(info);
  });
  return keep;
}

function mssm168MappedId_(response,clientId) {
  const mapping=(response.id_mappings||[]).find(function(x){return x.client_object_id===clientId;});
  return mapping && mapping.object_id || '';
}

/** Local tests; never calls Square, never touches spreadsheet/triggers or writes. */
function matrixSquareServiceManagerSelfTest168() {
  const samples=[
    {duration_minutes:45,price_amount_cents:9500,expected:285},
    {duration_minutes:16,price_amount_cents:6599,expected:198},
    {duration_minutes:60,price_amount_cents:11000,expected:330},
    {duration_minutes:90,price_amount_cents:16000,expected:480},
    {duration_minutes:30,price_amount_cents:6500,expected:195},
    {duration_minutes:1,price_amount_cents:50,expected:2}
  ];
  const plan=mssm168PaymentOptions_(samples);
  const errors=[];
  plan.forEach(function(x,i){if(x.credit_card_ccf_cents!==samples[i].expected) errors.push('CCF mismatch: '+samples[i].duration_minutes);});
  const list=mssm168BuildPaymentList_('Test Facial',samples,'#mssm_test_list');
  if (list.list.modifier_list_data.modifiers.length!==samples.length+1) errors.push('Wrong payment modifier count');
  if (list.list.modifier_list_data.max_selected_modifiers!==1) errors.push('Can select multiple payment methods');
  if (list.list.modifier_list_data.min_selected_modifiers!==1) errors.push('Payment option must be required');
  if (list.list.modifier_list_data.modifiers.some(function(m){return m.modifier_data.hidden_online!==true;})) errors.push('Payment options must be hidden online');
  if (mssm168NewPaymentInfo_('#test').min_selected_modifiers!==1) errors.push('Item payment override must require one selection');
  const massageContext={family:'MASSAGE',reference:{all_modifier_lists:[
    {name:'Payment Method - Massage',item_info:{modifier_list_id:'PAY'}},
    {name:'Add Massage Enhancements',item_info:{modifier_list_id:'EXTRAS'}},
    {name:'Add-on: Therapeutic Cupping',item_info:{modifier_list_id:'CUPPING'},
      modifiers:[{name:'Cash Payment'},{name:'CCF-3'}]}
  ]}};
  const extras=mssm168MassageExtras_(massageContext).map(function(x){return x.modifier_list_id;});
  if (extras.indexOf('EXTRAS')<0||extras.indexOf('CUPPING')<0||extras.indexOf('PAY')>=0) errors.push('Massage enhancement selection mismatch');
  return {ok:!errors.length,version:MSSM168.version,tests:samples.length,
    sampleCashFee:0,sample45Min95DollarCcf:plan[0].credit_card_ccf_cents,
    providerMode:MSSM168.newServiceProviderMode,
    onlineBookingForNewService:false,oldTriggerFunctionPreserved:true,
    paymentListIsDedicated:true,liveSquareWritesPerformed:0,errors:errors};
}


/**
 * MSSM170 TARGETED UPDATE — EXISTING BLOOD MOON GLOW ONLY
 * Manual functions, not wired into the minute trigger; no new catalog IDs.
 * STAGE: item price/description + SAME existing payment list, booking stays OFF.
 * RELEASE: only after stage and staff identity read-only verification, assign Lexy and enable booking.
 * DISABLE: optional safety rollback of this service's online booking only.
 * Never edits Square customers, bookings, payments, team settings, shared modifiers, or other catalog objects.
 */
const MSSM170BLOOD = Object.freeze({
  itemId: 'GI7BP2M6LLYV65VG35L3PSIZ',
  variationId: '643NHKZRIO5CKJYOSGPLRMNS',
  paymentListId: '4IRWU4Y6TCXRLKQUQOWKR5WM',
  initialItemVersion: 1792233020250,
  categoryId: '3SSRUH5ROJGE7DMXNZSTR2J6',
  locationId: 'LGNQ4P8GPMSEQ',
  name: 'Blood Moon Glow Hydrating Facial',
  providerName: 'Lexy Salazar',
  providerId: 'TMPI8PcGwojPrWrm',
  oldPriceCents: 9500,
  priceCents: 8500,
  oldCcfCents: 285,
  ccfCents: 255,
  durationMs: 2700000,
  oldCardLabel: 'CCF-3 - 45 Minutes ($2.85)',
  cardLabel: 'CCF-3 - 45 Minutes ($2.55)',
  description: [
    'Best for: Dull, dry, or dehydrated-looking skin seeking a smoother, more radiant finish.',
    'Indulge in a luxurious, limited-edition facial that leaves skin feeling soft, replenished, and beautifully refreshed. Your 45-minute treatment begins with a thorough facial cleanse, gentle warm steam and skin-appropriate exfoliation, followed by a relaxing facial massage. Red light photobiomodulation (LED light therapy) is included as a noninvasive step in this restorative skincare ritual.',
    'Next, our Vampire PLLA jelly facial mask provides a cooling, moisture-rich finish to help skin feel supple and hydrated. Customized hydrating serums, moisturizer, and protective skincare complete your luminous glow.',
    'A seasonal Halloween facial at Matrix Massage & Bodywork in Salem, Wisconsin. Steam and exfoliation are adjusted to your skin’s sensitivity.'
  ].join('\n\n'),
  stageKey: 'mssm170-bloodmoon-price-fee-staffonly-20261017',
  releaseKey: 'mssm170-bloodmoon-lexy-bookable-20261017',
  disableKey: 'mssm170-bloodmoon-booking-disable-20261017'
});

function mssm170Copy_(x) { return JSON.parse(JSON.stringify(x)); }
function mssm170Norm_(s) { return String(s||'').trim().toLowerCase().replace(/\s+/g,' '); }
function mssm170SameText_(a,b) { return mssm170Norm_(a)===mssm170Norm_(b); }
function mssm170Safe_(e) { return mssm166SafeError_(e); }
function mssm170Fail_(s) { throw new Error('MSSM170_TARGET_BLOCKED: '+s); }
function mssm170Clean_(obj) {
  const x=mssm170Copy_(obj);
  function walk(o) {
    if (!o||typeof o!=='object') return;
    if (Array.isArray(o)) {o.forEach(walk);return;}
    delete o.updated_at; delete o.created_at;
    if (o.is_deleted===true) mssm170Fail_('Refusing to change deleted catalog object.');
    delete o.is_deleted;
    Object.keys(o).forEach(function(k){walk(o[k]);});
  }
  walk(x);
  // Square API read-only and legacy fields are omitted without changing current category identities.
  if (x.type==='ITEM') {
    delete x.item_data.channels;
    delete x.item_data.description_plaintext;
    delete x.item_data.category_id;
    if (x.item_data.categories) x.item_data.categories=x.item_data.categories.map(function(c){return {id:c.id};});
    if (x.item_data.reporting_category&&x.item_data.reporting_category.id)
      x.item_data.reporting_category={id:x.item_data.reporting_category.id};
  }
  return x;
}
function mssm170Read_(cfg) {
  const item=mssm166Retrieve_(MSSM170BLOOD.itemId,true,cfg).object;
  const list=mssm166Retrieve_(MSSM170BLOOD.paymentListId,false,cfg).object;
  if (!item||item.is_deleted||item.type!=='ITEM'||!item.item_data) mssm170Fail_('Target Square item missing/deleted.');
  if (!list||list.is_deleted||list.type!=='MODIFIER_LIST'||!list.modifier_list_data) mssm170Fail_('Target payment list missing/deleted.');
  const d=item.item_data;const ld=list.modifier_list_data;
  if (item.id!==MSSM170BLOOD.itemId||d.name!==MSSM170BLOOD.name||d.product_type!=='APPOINTMENTS_SERVICE')
    mssm170Fail_('Item identity/name/product type changed.');
  const cats=(d.categories||[]).map(function(c){return c.id;});
  if (cats.length!==1||cats[0]!==MSSM170BLOOD.categoryId) mssm170Fail_('Category differs from verified facial category.');
  const vs=d.variations||[];
  if (vs.length!==1||vs[0].id!==MSSM170BLOOD.variationId||
      Number(vs[0].item_variation_data&&vs[0].item_variation_data.service_duration)!==MSSM170BLOOD.durationMs)
    mssm170Fail_('Unexpected variation count/ID/duration.');
  const v=vs[0];const vd=v.item_variation_data;
  const feeInfos=(d.modifier_list_info||[]).filter(function(x){return x.modifier_list_id===MSSM170BLOOD.paymentListId;});
  if (feeInfos.length!==1||feeInfos[0].enabled===false) mssm170Fail_('Dedicated payment list missing/disabled or duplicated.');
  if (ld.name!=='Payment Method - '+MSSM170BLOOD.name||ld.modifier_type!=='LIST')
    mssm170Fail_('Payment list identity/type changed.');
  const mods=ld.modifiers||[];
  const cash=mods.filter(function(m){return m.modifier_data&&m.modifier_data.name==='Cash Payment';});
  const card=mods.filter(function(m){return m.modifier_data&&/^CCF-3 - 45 Minutes \(\$2\.(?:85|55)\)$/.test(m.modifier_data.name);});
  if (mods.length!==2||cash.length!==1||card.length!==1) mssm170Fail_('Expected exactly two original payment choices.');
  if (Number(cash[0].modifier_data.price_money&&cash[0].modifier_data.price_money.amount)!==0||
      cash[0].modifier_data.price_money.currency!=='USD'||card[0].modifier_data.price_money.currency!=='USD')
    mssm170Fail_('Cash/card currency or cash fee mismatch.');
  if (cash[0].modifier_data.modifier_list_id!==list.id||card[0].modifier_data.modifier_list_id!==list.id)
    mssm170Fail_('Modifier list reference changed.');
  const matches=mssm166Api_('POST','/v2/catalog/search',{
    object_types:['ITEM'],
    query:{items_for_modifier_list_query:{modifier_list_ids:[MSSM170BLOOD.paymentListId]}},limit:100
  },cfg);
  if (matches.cursor) mssm170Fail_('Modifier list association search returned pagination; cannot confirm exclusivity.');
  const linked=(matches.objects||[]).filter(function(o){return !o.is_deleted;}).map(function(o){return o.id;});
  if (linked.length!==1||linked[0]!==MSSM170BLOOD.itemId)
    mssm170Fail_('Payment list not exclusive to the target item: '+linked.join(', '));
  const staffIds=vd.team_member_ids||[];
  const orig=Number(vd.price_money&&vd.price_money.amount)===MSSM170BLOOD.oldPriceCents&&
    Number(card[0].modifier_data.price_money.amount)===MSSM170BLOOD.oldCcfCents&&
    card[0].modifier_data.name===MSSM170BLOOD.oldCardLabel&&
    !vd.available_for_booking&&staffIds.length===0&&
    item.version===MSSM170BLOOD.initialItemVersion;
  const staged=Number(vd.price_money&&vd.price_money.amount)===MSSM170BLOOD.priceCents&&
    Number(card[0].modifier_data.price_money.amount)===MSSM170BLOOD.ccfCents&&
    card[0].modifier_data.name===MSSM170BLOOD.cardLabel&&
    ld.min_selected_modifiers===1&&ld.max_selected_modifiers===1&&ld.allow_quantities===false&&
    feeInfos[0].min_selected_modifiers===1&&feeInfos[0].max_selected_modifiers===1&&
    feeInfos[0].allow_quantities==='NO'&&
    mods.every(function(m){return m.modifier_data.hidden_online===true&&m.modifier_data.on_by_default!==true;})&&
    d.skip_modifier_screen===false&&
    (d.description_html===mssm166DescriptionHtml_(MSSM170BLOOD.description)||
      (d.description_plaintext&&mssm170SameText_(d.description_plaintext,MSSM170BLOOD.description)))&&
    vd.service_duration===MSSM170BLOOD.durationMs;
  const released=staged&&vd.available_for_booking===true&&staffIds.length===1&&staffIds[0]===MSSM170BLOOD.providerId;
  const stagedOffline=staged&&vd.available_for_booking!==true&&staffIds.length===0;
  const offlineWithLexy=staged&&vd.available_for_booking!==true&&staffIds.length===1&&staffIds[0]===MSSM170BLOOD.providerId;
  if (!orig&&!stagedOffline&&!released&&!offlineWithLexy)
    mssm170Fail_('Target is neither the expected initial state nor a verified updated state. Read back before making any other change.');
  return {item:item,list:list,variation:v,cash:cash[0],card:card[0],feeInfo:feeInfos[0],
    phase:released?'RELEASED_VERIFIED':stagedOffline?'STAGED_VERIFIED':offlineWithLexy?'BOOKING_DISABLED':'ORIGINAL_VERIFIED'};
}
/** READ-ONLY; no Queue edits and no Catalog writes. */
function matrixMSSM170Preflight() {
  try {
    const cfg=mssm166Config_();
    if (cfg.SQUARE_LOCATION_ID!==MSSM170BLOOD.locationId||
        cfg.PROVIDER_MAP_JSON&&JSON.parse(cfg.PROVIDER_MAP_JSON)[MSSM170BLOOD.providerName]!==MSSM170BLOOD.providerId)
      mssm170Fail_('Matrix Square location/provider mapping changed.');
    const r=mssm170Read_(cfg);
    return {ok:true,phase:r.phase,itemId:r.item.id,variationId:r.variation.id,
      itemVersion:r.item.version,paymentListId:r.list.id,paymentListVersion:r.list.version,
      currentPriceCents:Number(r.variation.item_variation_data.price_money.amount),
      currentCcfCents:Number(r.card.modifier_data.price_money.amount),
      checkoutRequiredMin:Number(r.feeInfo.min_selected_modifiers||0),
      bookingEnabled:r.variation.item_variation_data.available_for_booking===true,
      teamMemberIds:r.variation.item_variation_data.team_member_ids||[],
      plannedPriceCents:MSSM170BLOOD.priceCents,plannedCcfCents:MSSM170BLOOD.ccfCents,
      writes:0};
  } catch(e){return {ok:false,phase:'BLOCKED',error:mssm170Safe_(e),writes:0};}
}
/** Exactly two EXISTING Square catalog objects are modified in one atomic batch. */
function matrixMSSM170StageApproved() {
  const cfg=mssm166Config_();
  if (!mssm166Bool_(cfg.SERVICE_MANAGER_ENABLED)||!mssm166Bool_(cfg.SERVICE_WRITE_ENABLED))
    mssm170Fail_('Existing owner-approved Square write gates are disabled.');
  const l=LockService.getScriptLock(); if (!l.tryLock(30000)) mssm170Fail_('Writer lock unavailable.');
  try {
    const r=mssm170Read_(cfg);
    if (r.phase!=='ORIGINAL_VERIFIED') return {ok:true,phase:r.phase,writeCount:0,itemId:r.item.id};
    const item=mssm170Clean_(r.item),list=mssm170Clean_(r.list);
    item.item_data.description_html=mssm166DescriptionHtml_(MSSM170BLOOD.description);
    item.item_data.skip_modifier_screen=false;
    const v=item.item_data.variations[0];
    v.item_variation_data.price_money={amount:MSSM170BLOOD.priceCents,currency:'USD'};
    v.item_variation_data.available_for_booking=false;
    // Still offline/unassigned. Provider + booking are a separate gated release.
    if (v.item_variation_data.team_member_ids&&v.item_variation_data.team_member_ids.length)
      mssm170Fail_('Unexpected team member before stage.');
    const info=item.item_data.modifier_list_info.filter(function(x){return x.modifier_list_id===MSSM170BLOOD.paymentListId;})[0];
    info.enabled=true;info.min_selected_modifiers=1;info.max_selected_modifiers=1;
    info.allow_quantities='NO';
    info.modifier_overrides=(list.modifier_list_data.modifiers||[]).map(function(m){
      return {modifier_id:m.id,hidden_online_override:'YES',on_by_default_override:'NO'};
    });
    const ld=list.modifier_list_data;
    ld.min_selected_modifiers=1;ld.max_selected_modifiers=1;ld.allow_quantities=false;
    ld.hidden_from_customer=false; // Checkout fee is not a customer booking choice, but remains visible on receipts.
    ld.modifiers.forEach(function(m){
      m.modifier_data.hidden_online=true;m.modifier_data.on_by_default=false;
      if (m.modifier_data.name===MSSM170BLOOD.oldCardLabel) {
        m.modifier_data.name=MSSM170BLOOD.cardLabel;
        m.modifier_data.price_money={amount:MSSM170BLOOD.ccfCents,currency:'USD'};
      }
    });
    const reply=mssm166Api_('POST','/v2/catalog/batch-upsert',{
      idempotency_key:MSSM170BLOOD.stageKey,batches:[{objects:[list,item]}]
    },cfg);
    const ids=(reply.objects||[]).map(function(o){return o.id;}).sort();
    if (ids.indexOf(MSSM170BLOOD.itemId)<0||ids.indexOf(MSSM170BLOOD.paymentListId)<0)
      mssm170Fail_('Catalog write response ambiguous; do NOT retry before fresh read-back.');
    const check=mssm170Read_(cfg);
    if (check.phase!=='STAGED_VERIFIED') mssm170Fail_('Write response returned but target read-back is not STAGED_VERIFIED. Do not retry.');
    return {ok:true,phase:'STAGED_VERIFIED',itemId:check.item.id,variationId:check.variation.id,
      paymentListId:check.list.id,priceCents:MSSM170BLOOD.priceCents,
      ccfCents:MSSM170BLOOD.ccfCents,checkoutRequired:true,hiddenOnline:true,
      bookingEnabled:false,providerAssigned:false,writeCount:1};
  } finally {l.releaseLock();}
}
/** READ-ONLY booking-profile identity check: do not alter team settings. */
function matrixMSSM170LexyReadOnly() {
  try {
    const cfg=mssm166Config_();
    const r=mssm166Api_('GET','/v2/bookings/team-member-booking-profiles/'+encodeURIComponent(MSSM170BLOOD.providerId),null,cfg);
    const p=r.team_member_booking_profile;
    if (!p||p.team_member_id!==MSSM170BLOOD.providerId||
        !mssm170SameText_(p.display_name,MSSM170BLOOD.providerName)||p.is_bookable!==true)
      mssm170Fail_('Lexy Square booking profile is not exact and currently bookable; leave service offline.');
    return {ok:true,teamMemberId:p.team_member_id,displayName:p.display_name,isBookable:true,writes:0};
  }catch(e){return {ok:false,error:mssm170Safe_(e),writes:0};}
}
/** Manual live release: only after STAGED_VERIFIED and a passed Lexy profile check. */
function matrixMSSM170ReleaseApproved() {
  const cfg=mssm166Config_();
  if (!mssm166Bool_(cfg.SERVICE_MANAGER_ENABLED)||!mssm166Bool_(cfg.SERVICE_WRITE_ENABLED))
    mssm170Fail_('Existing Square write gates disabled.');
  const p=matrixMSSM170LexyReadOnly();if (!p.ok) mssm170Fail_(p.error);
  const l=LockService.getScriptLock();if (!l.tryLock(30000)) mssm170Fail_('Writer lock unavailable.');
  try {
    const r=mssm170Read_(cfg);
    if (r.phase==='RELEASED_VERIFIED') return {ok:true,phase:'RELEASED_VERIFIED',writeCount:0,itemId:r.item.id};
    if (r.phase!=='STAGED_VERIFIED') mssm170Fail_('Refusing booking release before stage is verified.');
    const item=mssm170Clean_(r.item);
    const vd=item.item_data.variations[0].item_variation_data;
    if (vd.team_member_ids&&vd.team_member_ids.length) mssm170Fail_('Unexpected provider assignment.');
    vd.team_member_ids=[MSSM170BLOOD.providerId];vd.available_for_booking=true;
    const ret=mssm166Api_('POST','/v2/catalog/object',{
      idempotency_key:MSSM170BLOOD.releaseKey,object:item
    },cfg);
    if (!ret.catalog_object||ret.catalog_object.id!==MSSM170BLOOD.itemId)
      mssm170Fail_('Release response ambiguous; check Square before retry.');
    const check=mssm170Read_(cfg);
    if (check.phase!=='RELEASED_VERIFIED') mssm170Fail_('Square release read-back did not match; stop.');
    return {ok:true,phase:'RELEASED_VERIFIED',itemId:check.item.id,
      variationId:check.variation.id,teamMemberId:MSSM170BLOOD.providerId,
      priceCents:MSSM170BLOOD.priceCents,ccfCents:MSSM170BLOOD.ccfCents,writeCount:1};
  }finally{l.releaseLock();}
}
/** Safety rollback if actual customer booking screen is blocked or exposes payment options. */
function matrixMSSM170DisableBookingSafely() {
  const cfg=mssm166Config_();
  if (!mssm166Bool_(cfg.SERVICE_MANAGER_ENABLED)||!mssm166Bool_(cfg.SERVICE_WRITE_ENABLED))
    mssm170Fail_('Square write gate unavailable for safety rollback.');
  const l=LockService.getScriptLock();if (!l.tryLock(30000)) mssm170Fail_('Writer lock unavailable.');
  try {
    const r=mssm170Read_(cfg);
    if (r.phase==='BOOKING_DISABLED'||r.phase==='STAGED_VERIFIED')
      return {ok:true,phase:r.phase,writeCount:0,itemId:r.item.id};
    if (r.phase!=='RELEASED_VERIFIED') mssm170Fail_('Cannot safely disable an unrecognized live state.');
    const item=mssm170Clean_(r.item);
    item.item_data.variations[0].item_variation_data.available_for_booking=false;
    const ret=mssm166Api_('POST','/v2/catalog/object',{
      idempotency_key:MSSM170BLOOD.disableKey,object:item
    },cfg);
    if (!ret.catalog_object||ret.catalog_object.id!==MSSM170BLOOD.itemId)
      mssm170Fail_('Disable response uncertain. Read Square back before retry.');
    const check=mssm170Read_(cfg);
    if (check.phase!=='BOOKING_DISABLED') mssm170Fail_('Booking disable read-back did not match.');
    return {ok:true,phase:'BOOKING_DISABLED',bookingEnabled:false,writeCount:1,itemId:check.item.id};
  }finally{l.releaseLock();}
}
/** Offline-only local check of exact immutable target, math and future worker defaults. */
function matrixMSSM170SelfTest() {
  const errors=[];
  const c=MSSM170BLOOD;
  if (c.itemId!=='GI7BP2M6LLYV65VG35L3PSIZ'||c.variationId!=='643NHKZRIO5CKJYOSGPLRMNS'||
      c.paymentListId!=='4IRWU4Y6TCXRLKQUQOWKR5WM') errors.push('Target IDs altered');
  if (Math.round(c.priceCents*0.03)!==c.ccfCents) errors.push('CCF calculation invalid');
  const payment=mssm168BuildPaymentList_(c.name,[{duration_minutes:45,price_amount_cents:8500}],'#test');
  if (payment.options[0].credit_card_ccf_cents!==255) errors.push('Incorrect CCF option');
  const info=mssm168NewPaymentInfo_('#test');
  if (payment.list.modifier_list_data.min_selected_modifiers!==1||
      payment.list.modifier_list_data.max_selected_modifiers!==1||
      info.min_selected_modifiers!==1||info.max_selected_modifiers!==1) errors.push('Payment choice not required exactly once');
  if (payment.list.modifier_list_data.modifiers.some(function(m){return m.modifier_data.hidden_online!==true;}))
    errors.push('Payment modifier can appear online');
  if (c.description.indexOf('photobiomodulation')<0||c.description.indexOf('facial massage')<0||
      c.description.indexOf('steam')<0||c.description.indexOf('PLLA')<0) errors.push('Description missing treatment steps');
  return {ok:errors.length===0,version:'1.7.0',itemId:c.itemId,priceCents:8500,
    ccfCents:255,checkoutRequired:true,paymentChoicesHiddenOnline:true,
    selfTestSquareCalls:0,errors:errors};
}

/** Owner-authorized red-light base-price-only updates, 2026-11-07.
 * Uses the existing queue, fingerprint, write gate and verification flow.
 * Never creates/deletes variations or alters modifiers, durations or staff.
 */
const MSSMRLPRICE20261107={
  'O3M6MJG44YUUVFQNJFJC7WUC':{variation:'VZBMYNIH4FS4P3Q73KI42QDX',cents:2599,duration:1200000},
  'DLX3E64HZHTJUWFLFVUJIIML':{variation:'NEZMDCUOGHNV5XLZRBJVX5PI',cents:1499,duration:0},
  'S276Q6HDDTNWVV745WKVDKT6':{variation:'VC4XTO2AGWL55ZLVWQ7TBDOT',cents:2299,duration:1200000}
};
function mssmRLPriceMode_(p){return p&&p.update_mode==='MSSM_RED_LIGHT_PRICE_ONLY_20261107';}
function mssmRLValidatePrice_(p,c){
  const target=MSSMRLPRICE20261107[p.existing_item_id];
  if(!target||p.operation!=='UPDATE'||p.product_type!=='APPOINTMENTS_SERVICE')throw new Error('Red-light price target not authorized.');
  if(JSON.stringify(p.fields_to_change)!==JSON.stringify(['variation_prices']))throw new Error('Price-only scope required.');
  if(p.variations!==undefined||p.provider_mode!==undefined)throw new Error('Price-only request may not change variations/providers.');
  if(!c||!c.reference||!c.reference.structure_signature||!c.existing_snapshot)throw new Error('Fresh complete target snapshot required.');
  const o=c.existing_snapshot,d=o.item_data;
  if(o.id!==p.existing_item_id||o.is_deleted||!d||d.is_archived||d.product_type!=='APPOINTMENTS_SERVICE')throw new Error('Active target mismatch.');
  if(!Number.isSafeInteger(p.expected_item_version)||p.expected_item_version!==o.version)throw new Error('Price-only target version mismatch.');
  if(p.name!==d.name||p.description!==String(d.description_plaintext||d.description||''))throw new Error('Price-only request cannot change copy.');
  if(!Array.isArray(p.price_updates)||p.price_updates.length!==1)throw new Error('One exact authorized price required.');
  const u=p.price_updates[0];
  if(u.variation_id!==target.variation||u.price_amount_cents!==target.cents||u.currency!=='USD')throw new Error('Price differs from owner authorization.');
  const vs=(d.variations||[]).filter(function(v){return v.id===u.variation_id;});
  if(vs.length!==1)throw new Error('Exact variation identity is missing or ambiguous.');
  const v=vs[0].item_variation_data;
  if(v.item_id!==o.id||Number(v.service_duration)!==target.duration||v.pricing_type!=='FIXED_PRICING'||!v.price_money||v.price_money.currency!=='USD')throw new Error('Variation structure changed.');
  if(!Number.isSafeInteger(u.expected_price_cents)||v.price_money.amount!==u.expected_price_cents)throw new Error('Baseline price changed.');
  if((v.location_overrides||[]).some(function(x){return x.price_money||x.pricing_type;}))throw new Error('Location price override requires review.');
  return true;
}
function mssmRLComparable_(obj){
  const c=mssm166Clone_(obj);
  function walk(o){if(!o||typeof o!=='object')return;['version','updated_at','created_at'].forEach(function(k){delete o[k];});if(Array.isArray(o.channels))o.channels.sort();Object.keys(o).forEach(function(k){walk(o[k]);});}
  walk(c);return mssm166StableStringify_(c);
}
function mssmRLExpected_(p,baseline){
  const o=mssm166Clone_(baseline);
  p.price_updates.forEach(function(u){const v=o.item_data.variations.filter(function(x){return x.id===u.variation_id;});if(v.length!==1)throw new Error('Exact variation missing.');v[0].item_variation_data.price_money={amount:u.price_amount_cents,currency:u.currency};});
  return o;
}
function mssmRLUpdatePrice_(p,c,idem,cfg){
  mssmRLValidatePrice_(p,c);
  const current=mssm166Retrieve_(p.existing_item_id,true,cfg).object;
  if(!current||current.version!==p.expected_item_version||mssmRLComparable_(current)!==mssmRLComparable_(c.existing_snapshot))throw new Error('Target changed after price preview. Re-resolve.');
  const obj=mssmRLExpected_(p,current);
  function clean(o){if(!o||typeof o!=='object')return;['updated_at','created_at','is_deleted'].forEach(function(k){delete o[k];});Object.keys(o).forEach(function(k){clean(o[k]);});}
  clean(obj);
  delete obj.item_data.description_plaintext;delete obj.item_data.channels;
  obj.item_data.variations.forEach(function(v){delete v.item_variation_data.channels;});
  const r=mssm166Api_('POST','/v2/catalog/object',{idempotency_key:idem,object:obj},cfg);
  if(!r.catalog_object||r.catalog_object.id!==p.existing_item_id)throw new Error('Price write response incomplete; inspect before any retry.');
  return {itemId:p.existing_item_id,created:false,paymentListId:null,priceOnly:true};
}
function mssmRLVerifyPrice_(p,c,r){
  const errors=[],o=r.object,expected=mssmRLExpected_(p,c.existing_snapshot);
  if(!o||o.id!==p.existing_item_id)errors.push('Read-back target mismatch.');
  else if(mssmRLComparable_(o)!==mssmRLComparable_(expected))errors.push('Read-back differs from the exact price-only expected object. Inspect before retry.');
  return {ok:!errors.length,errors:errors,summary:{item_id:o&&o.id,version:o&&o.version,mode:'PRICE_ONLY',
    prices:o&&o.item_data?(o.item_data.variations||[]).map(function(v){return {id:v.id,name:v.item_variation_data.name,price:v.item_variation_data.price_money,duration:v.item_variation_data.service_duration};}):[],
    unrelated_fields_preserved:!errors.length,payment_modifiers_preserved:!errors.length}};
}
