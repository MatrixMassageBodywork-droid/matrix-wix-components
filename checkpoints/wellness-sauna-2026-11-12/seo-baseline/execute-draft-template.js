async function() {
  // Draft only. This generated candidate is never a publication request.
  const plan = __PLAN__;
  const installationEvidence = __INSTALLATION_EVIDENCE__;
  const itemBase = "https://www.wixapis.com/promote/seo/v1/item-seo-tags";
  const bulkUrl = "https://www.wixapis.com/promote/seo/v1/bulk/item-seo-tags/set";
  const startedAt = new Date().toISOString();

  function canonical(value) {
    if (Array.isArray(value)) return value.map(canonical);
    if (!value || typeof value !== "object") return value;
    return Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])]));
  }
  function stable(value) {
    return JSON.stringify(canonical(value));
  }
  function normalizedTags(tags) {
    return (tags ?? []).map(tag => {
      if (!tag || typeof tag !== "object") return stable(null);
      const result = {
        ...tag,
        custom: Boolean(tag.custom),
        disabled: Boolean(tag.disabled)
      };
      if (result.type === "script" && result.props?.type === "application/ld+json") {
        result.children = JSON.parse(result.children);
      }
      return stable(result);
    }).sort();
  }
  function sameTags(a, b) {
    return stable(normalizedTags(a)) === stable(normalizedTags(b));
  }
  function protectedHead(resolved) {
    return (resolved ?? []).filter(entry => entry.tag?.type !== "script").map(entry => entry.tag);
  }

  const installationFailures = plan.pages.flatMap(page => {
    const evidence = installationEvidence.pages?.find(row => row.pageId === page.itemId);
    const valid = installationEvidence.status === "NATIVE_BODY_READBACK_VERIFIED"
      && evidence?.readbackVerified === true
      && evidence?.pageUrl === page.pageUrl
      && evidence?.bodySha256 === page.bodySha256
      && typeof evidence?.nativeElementId === "string"
      && evidence.nativeElementId.length > 0
      && /^[a-f0-9]{64}$/.test(evidence?.nativeCodeSha256 ?? "")
      && /^https:\/\/cdn\.jsdelivr\.net\/gh\/MatrixMassageBodywork-droid\/matrix-wix-components@[a-f0-9]{40}\//.test(evidence?.sourceUrl ?? "");
    return valid ? [] : [page.itemId];
  });
  if (installationFailures.length) {
    return {
      status: "NOT_EXECUTED_NATIVE_BODY_EVIDENCE_REQUIRED",
      mutationsAttempted: false,
      startedAt,
      installationFailures,
      installationEvidence
    };
  }

  const reads = await Promise.allSettled(plan.pages.map(async page => {
    const response = await wix.request({
      scope: "site",
      method: "GET",
      url: `${itemBase}/STATIC_PAGE/${page.itemId}`
    });
    return {
      page,
      current: response.data.itemSeoTags,
      capturedAt: new Date().toISOString()
    };
  }));
  const evidence = reads.map((read, index) => read.status === "fulfilled"
    ? read.value
    : { page: plan.pages[index], error: String(read.reason) });
  const failures = [];
  for (const row of evidence) {
    const { page, current } = row;
    if (!current) {
      failures.push({ itemId: page.itemId, reason: "GET_FAILED", error: row.error });
      continue;
    }
    const canonicals = (current.resolvedTags ?? [])
      .filter(entry => entry.tag?.type === "link" && entry.tag.props?.rel === "canonical")
      .map(entry => entry.tag.props.href);
    if (current.itemId !== page.itemId || current.itemType !== "STATIC_PAGE"
      || canonicals.length !== 1 || canonicals[0] !== page.pageUrl) {
      failures.push({ itemId: page.itemId, reason: "IDENTITY_OR_CANONICAL_CHANGED", canonicals });
    }
    if (!sameTags(current.tags, page.expectedBaselineTags)) {
      failures.push({ itemId: page.itemId, reason: "BASELINE_TAGS_CHANGED_REVIEW_REQUIRED" });
    }
    if (!sameTags(protectedHead(current.resolvedTags), page.expectedProtectedHead)) {
      failures.push({ itemId: page.itemId, reason: "PROTECTED_HEAD_CHANGED_REVIEW_REQUIRED" });
    }
    for (const replacement of page.replacements) {
      if (!sameTags([current.tags?.[replacement.index]], [replacement.before])) {
        failures.push({ itemId: page.itemId, reason: "REPLACEMENT_POSITION_CHANGED", index: replacement.index });
      }
    }
  }
  if (failures.length) {
    return {
      status: "NOT_EXECUTED_BASELINE_GUARD_FAILED",
      mutationsAttempted: false,
      startedAt,
      failures,
      evidence
    };
  }

  const entries = evidence.map(({ page, current }) => {
    const tags = JSON.parse(JSON.stringify(current.tags));
    for (const replacement of page.replacements) tags[replacement.index] = replacement.after;
    tags.push(...page.appendTags);
    if (!sameTags(tags, page.candidateTags)) throw new Error(`Candidate mismatch: ${page.itemId}`);
    return {
      itemId: page.itemId,
      itemSeoTags: { tags },
      fieldMask: "tags"
    };
  });
  const setRequest = {
    itemType: "STATIC_PAGE",
    publish: false,
    returnEntity: true,
    entries
  };
  try {
    const response = await wix.request({
      scope: "site",
      method: "POST",
      url: bulkUrl,
      body: setRequest
    });
    const seen = new Set();
    const outcomes = (response.data.results ?? []).map(row => {
      const meta = row.itemMetadata;
      const index = meta?.originalIndex;
      const page = Number.isInteger(index) ? plan.pages[index] : null;
      const duplicateIndex = seen.has(index);
      seen.add(index);
      const validIdentity = Boolean(page)
        && !duplicateIndex
        && (!meta.id || meta.id === page.itemId || meta.id === `STATIC_PAGE:${page.itemId}`)
        && (!row.item || row.item.itemId === page.itemId);
      const accepted = validIdentity && meta?.success === true && !meta?.error;
      const returnedTagsMatch = accepted && row.item?.tags
        ? sameTags(row.item.tags, page.candidateTags)
        : false;
      const protectedHeadUnchanged = accepted && row.item?.resolvedTags
        ? sameTags(protectedHead(row.item.resolvedTags), page.expectedProtectedHead)
        : false;
      return {
        itemId: page?.itemId,
        itemMetadata: meta,
        validIdentity,
        accepted,
        returnedTagsMatch,
        protectedHeadUnchanged
      };
    });
    const fullyConfirmed = outcomes.length === plan.pages.length
      && outcomes.every(row => row.accepted && row.returnedTagsMatch && row.protectedHeadUnchanged);
    return {
      status: fullyConfirmed ? "DRAFT_SEO_SAVED_AND_RESPONSE_VERIFIED" : "DRAFT_SEO_REVIEW_PER_ITEM_OUTCOMES",
      published: false,
      mutationsAttempted: true,
      startedAt,
      completedAt: new Date().toISOString(),
      installationEvidence,
      getEvidence: evidence.map(row => ({
        itemId: row.page.itemId,
        pageUrl: row.page.pageUrl,
        getTags: row.current.tags,
        resolvedTags: row.current.resolvedTags
      })),
      setRequest,
      setResponse: response.data,
      outcomes
    };
  } catch (error) {
    return {
      status: "DRAFT_SEO_WRITE_ERROR_DO_NOT_RETRY_WITHOUT_PERSISTENCE_REVIEW",
      published: false,
      mutationsAttempted: true,
      startedAt,
      completedAt: new Date().toISOString(),
      getEvidence: evidence,
      setRequest,
      setError: {
        message: error?.message ?? String(error),
        responseData: error?.response?.data,
        data: error?.data,
        body: error?.body
      }
    };
  }
}
