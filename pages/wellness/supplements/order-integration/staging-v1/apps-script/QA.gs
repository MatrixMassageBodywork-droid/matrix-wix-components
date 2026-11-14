/**
 * Read-only evidence runner for the installed staging functions.
 * Refuses to process if any public/send/quote gate is on. No writes, triggers,
 * external requests, or customer details are added to the execution log.
 */
function matrixStagingEvidenceCheck() {
  const health = matrixStagingHealthCheck();
  if (health.mode !== 'STAGING' || health.quoteGate !== false ||
      health.invoiceSendGate !== false || health.publicOfferGate !== false ||
      health.productionPaymentCallsInThisVersion !== false) {
    throw new Error('STAGING_GATES_MUST_REMAIN_OFF');
  }
  console.log('MATRIX_STAGING_HEALTH ' + JSON.stringify(health));
  const dry = matrixProcessIntakeDryRun();
  const safeDry = {
    state: dry.state,
    reason: dry.reason,
    processed: dry.processed,
    externalCalls: dry.externalCalls
  };
  console.log('MATRIX_STAGING_DRY_RUN ' + JSON.stringify(safeDry));
  if (dry.state !== 'SAFE_HOLD' || dry.reason !== 'QUOTE_GATE_OFF' ||
      dry.processed !== 0 || dry.externalCalls !== 0) {
    throw new Error('UNEXPECTED_STAGING_DRY_RUN_RESULT');
  }
  return { health: health, dryRun: safeDry, verified: true };
}
