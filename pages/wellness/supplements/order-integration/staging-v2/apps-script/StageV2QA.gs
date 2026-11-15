/** Direct Google Sheets persistence QA. This is NOT Wix transport evidence. */
function matrixStageV2SheetQA() {
  var id = 'TEST-STAGE2-SHEETQA-001';
  matrixStageV2Lock_(function () {
    var rows = matrixStageV2Rows_('Cart Intake V2', 1, 15);
    var exists = rows.some(function (r) { return r[0] === id; });
    if (!exists) {
      var sheet = matrixStageV2Sheet_('Cart Intake V2');
      sheet.getRange(Math.max(2, sheet.getLastRow() + 1), 1, 1, 15).setValues([[id, new Date().toISOString(), 'Matrix synthetic test', 'matrix.stage2@example.invalid', '', 'TEST_PICKUP', JSON.stringify([{ itemId: 'TEST-PRODUCT-A', quantity: 2 }, { itemId: 'TEST-BUNDLE-AB', quantity: 1 }]), 'TEST-CYCLE-V2', false, true, 'DIRECT_SHEET_QA_NOT_WIX_TRANSPORT', 'NEW_TEST', '', '', '']]);
      SpreadsheetApp.flush();
    }
  });
  matrixStageV2ProcessIntake();
  var first = matrixStageV2States_()[id];
  if (!first || first.quote.totalCents !== 4200 || first.quote.lines.length !== 2) throw new Error('QA_QUOTE_FAILED');
  matrixStageV2ProcessIntake();
  var orders = matrixStageV2Rows_('Orders V2', 5, 24).filter(function (r) { return r[0] === first.orderId; });
  var lines = matrixStageV2Rows_('Order Lines V2', 5, 16).filter(function (r) { return r[0] === first.orderId; });
  var queue = matrixStageV2Rows_('Invoice Queue V2', 5, 13).filter(function (r) { return r[0] === first.orderId; });
  if (orders.length !== 1 || lines.length !== 2 || queue.length !== 1 || orders[0][23] !== 'NOT_APPROVED' || queue[0][2] !== 'OFF' || queue[0][3] !== 'OFF') throw new Error('QA_REPLAY_OR_GATE_FAILED');
  var evidence = { source: 'DIRECT_GOOGLE_SHEET_QA', transportTested: false, submissionId: id, ordersAfterReplay: orders.length, linesAfterReplay: lines.length, invoiceQueueRows: queue.length, totalCents: first.quote.totalCents, externalCalls: 0, emailsSent: 0, productionEnabled: false };
  console.log('MATRIX_STAGE_V2_SHEET_QA ' + JSON.stringify(evidence));
  matrixStageV2Verify();
  return evidence;
}
