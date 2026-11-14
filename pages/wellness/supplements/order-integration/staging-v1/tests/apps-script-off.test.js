// Offline-only fake SpreadsheetApp; NEVER accesses a real Google Sheet.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const launches = [
  ['Approved offer catalog', 'NOT_READY', 'OFF'],
  ['Backend quote validation', 'NOT_CONNECTED', 'OFF'],
  ['Production invoice sending', 'NOT_READY', 'OFF'],
  ['Public offers', 'NOT_READY', 'OFF']
];
const fakeRanges = {
  'Launch Gate V2': Array.from({ length: 4 }, (_, i) => [launches[i][0], 'test-only', launches[i][1], launches[i][2], '']),
  'Orderable Items V2': [],
  'Cart Intake V2': []
};
const requests = [];
const vmContext = {
  SpreadsheetApp: {
    openById(id) {
      requests.push({ type: 'open', id });
      return { getSheetByName(name) {
        if (!(name in fakeRanges)) throw new Error('UNKNOWN_SHEET: ' + name);
        return {
          getLastRow: () => (name === 'Cart Intake V2' ? 1 : 5) + fakeRanges[name].length,
          getRange(row, col, n, width) {
            assert.equal(col, 1);
            return { getValues: () => fakeRanges[name].slice(0, n).map(line => [...line, ...Array(Math.max(0, width - line.length)).fill('')]) };
          }
        };
      } };
    }
  }
};
vm.createContext(vmContext);
vm.runInContext(fs.readFileSync(path.join(root, 'apps-script/Core.gs'), 'utf8'), vmContext);
vm.runInContext(fs.readFileSync(path.join(root, 'apps-script/Code.gs'), 'utf8'), vmContext);
const health = vm.runInContext('matrixStagingHealthCheck()', vmContext);
assert.equal(health.mode, 'STAGING');
assert.equal(health.catalogRows, 0);
assert.equal(health.quoteGate, false);
assert.equal(health.invoiceSendGate, false);
assert.equal(health.publicOfferGate, false);
assert.equal(health.productionPaymentCallsInThisVersion, false);
console.log('PASS Apps Script safe health check: gates off, no data');
const dry = vm.runInContext('matrixProcessIntakeDryRun()', vmContext);
assert.equal(dry.state, 'SAFE_HOLD');
assert.equal(dry.processed, 0);
assert.equal(dry.externalCalls, 0);
console.log('PASS Apps Script dry run cannot create orders or send');
const payload = vm.runInContext('matrixPreviewPublicCatalogPayload()', vmContext);
assert.equal(payload.state, 'SAFE_HOLD');
assert.equal(payload.records.length, 0);
console.log('PASS Apps Script public catalog sync held');
const prices = vm.runInContext('[matrixUsdToCents_(19.95),matrixUsdToCents_("0"),matrixUsdToCents_(19.999)]', vmContext);
assert.equal(prices[0], 1995);
assert.ok(Number.isNaN(prices[1]));
assert.ok(Number.isNaN(prices[2]));
console.log('PASS owner-entered USD converted to safe integer cents');
assert.ok(requests.every(r => r.type === 'open'));
console.log('SUCCESS 4 Apps Script local tests');
