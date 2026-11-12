async function() {
  // LOCAL CANDIDATE. Do not execute until real native installation evidence exists.
  // Supply native-about-installation-evidence.json as UTF-8 through ExecuteWixAPI.files.
  // Pass siteId cdec8df6-d518-4859-9f1e-f06bf5346d41, hasMutations true and the candidate's Wix documentation URLs.
  const candidate = __CANDIDATE_JSON__;
  const evidenceFiles = files.filter(file => file.path === "native-about-installation-evidence.json" && file.encoding !== "base64");
  if (evidenceFiles.length !== 1) {
    return { status: "STOP_NO_NATIVE_INSTALLATION_EVIDENCE", mutationAttempted: false };
  }
  let installed;
  try {
    installed = JSON.parse(evidenceFiles[0].content);
  } catch (error) {
    return { status: "STOP_INVALID_INSTALLATION_EVIDENCE", error: String(error), mutationAttempted: false };
  }
  const expected = candidate.expectedNativeBodyEvidence;
  const wrongFields = Object.keys(expected).filter(key => installed[key] !== expected[key]);
  const requiredChecks = ["nativeDraftSaved", "nativeBodyReadbackVerified", "nativeSeoMarkupReadbackVerified", "nativeFaqReadbackVerified", "nativeSourceTagReadbackVerified"];
  const missingChecks = requiredChecks.filter(key => installed[key] !== true);
  const sourcePattern = /^https:\/\/cdn\.jsdelivr\.net\/gh\/MatrixMassageBodywork-droid\/matrix-wix-components@([a-f0-9]{40})\/.+\/renderer\.js$/;
  const sourceMatch = sourcePattern.exec(installed.immutableSourceUrl || "");
  if (wrongFields.length || missingChecks.length || !installed.verifiedAt || !installed.evidenceReceipt || !sourceMatch || sourceMatch[1] !== installed.sourceCommit) {
    return {
      status: "STOP_INSTALLATION_EVIDENCE_MISMATCH",
      wrongFields,
      missingChecks,
      immutableSourceMatches: Boolean(sourceMatch && sourceMatch[1] === installed.sourceCommit),
      mutationAttempted: false
    };
  }
  function normalize(value) {
    if (Array.isArray(value)) return value.map(normalize);
    if (value && typeof value === "object") {
      return Object.fromEntries(Object.keys(value).sort().map(key => [key, normalize(value[key])]));
    }
    return value;
  }
  const equal = (a, b) => JSON.stringify(normalize(a)) === JSON.stringify(normalize(b));
  const get = await wix.request({
    scope: "site",
    method: "GET",
    url: candidate.endpoint
  });
  const item = get.data.itemSeoTags;
  const beforeTags = item?.tags || [];
  const currentCanonicals = (item?.resolvedTags || []).filter(entry => entry.tag?.type === "link" && entry.tag?.props?.rel === "canonical").map(entry => entry.tag.props.href);
  if (item?.itemId !== candidate.pageId || item?.itemType !== "STATIC_PAGE" || !equal(currentCanonicals, [candidate.pageUrl]) || !equal(beforeTags, candidate.baselineTags)) {
    return {
      status: "STOP_BASELINE_OR_PAGE_CHANGED",
      target: candidate.pageId,
      getResponse: get.data,
      expectedBaselineTags: candidate.baselineTags,
      mutationAttempted: false
    };
  }
  const protectedTypes = entry => (entry.tag?.type === "link" && entry.tag?.props?.rel === "canonical") || entry.tag?.props?.name === "robots" || ["og:image", "og:image:width", "og:image:height"].includes(entry.tag?.props?.property) || entry.tag?.props?.name === "twitter:image";
  const currentProtected = (item.resolvedTags || []).filter(protectedTypes);
  if (!equal(currentProtected, candidate.protectedResolvedTags)) {
    return { status: "STOP_INHERITED_SEO_CHANGED", getResponse: get.data, mutationAttempted: false };
  }
  // Baseline equality establishes that the precomputed full array preserves every unrelated tag.
  const setRequest = candidate.setRequest;
  if (setRequest.publish !== false || setRequest.fieldMask !== "tags") {
    return { status: "STOP_INVALID_DRAFT_REQUEST", mutationAttempted: false };
  }
  try {
    const set = await wix.request({
      scope: "site",
      method: "PATCH",
      url: candidate.endpoint,
      body: setRequest
    });
    const saved = set.data.itemSeoTags;
    const actualTags = saved?.tags || [];
    const requestedTags = setRequest.itemSeoTags.tags;
    function sameCore(actual, wanted) {
      if (actual.type !== wanted.type) return false;
      if (!equal(actual.props || {}, wanted.props || {})) return false;
      if (Boolean(actual.disabled) !== Boolean(wanted.disabled)) return false;
      if (Boolean(actual.custom) !== Boolean(wanted.custom)) return false;
      if (wanted.meta && !equal(actual.meta, wanted.meta)) return false;
      if (wanted.type === "script") {
        try { return equal(JSON.parse(actual.children), JSON.parse(wanted.children)); } catch (_) { return false; }
      }
      return (actual.children || "") === (wanted.children || "");
    }
    const matched = requestedTags.every(wanted => actualTags.some(actual => sameCore(actual, wanted)));
    const acceptedPayloadMatches = saved?.itemId === candidate.pageId && actualTags.length === requestedTags.length && matched;
    const resolved = saved?.resolvedTags;
    const socialCheck = Object.fromEntries(Object.entries(candidate.desiredResolvedSocial).map(([key, expectedValue]) => {
      const entry = (resolved || []).find(value => value.tag?.props?.property === key || value.tag?.props?.name === key);
      return [key, { expected: expectedValue, actual: entry?.tag?.props?.content ?? null, matches: entry ? entry.tag.props.content === expectedValue : null }];
    }));
    const protectedCheck = resolved ? equal(resolved.filter(protectedTypes), currentProtected) : null;
    return {
      status: acceptedPayloadMatches ? "DRAFT_SAVED_ACCEPTED_PAYLOAD_VERIFIED" : "STOP_SAVED_RESPONSE_MISMATCH",
      published: false,
      mutationAttempted: true,
      installationEvidence: installed,
      before: get.data,
      setRequest,
      after: set.data,
      verification: { acceptedPayloadMatches, protectedResolvedTagsUnchanged: protectedCheck, socialCheck },
      note: "Verification uses the Set response, not a second Get. This is a saved-draft result, not a live-page or native-editor proof. Stop on any mismatch; do not retry automatically."
    };
  } catch (error) {
    return {
      status: "STOP_SEO_WRITE_ERROR_NO_RETRY",
      published: false,
      mutationAttempted: true,
      before: get.data,
      setRequest,
      rawErrorMessage: error?.message || String(error),
      rawErrorBody: error?.response?.data ?? null
    };
  }
}
