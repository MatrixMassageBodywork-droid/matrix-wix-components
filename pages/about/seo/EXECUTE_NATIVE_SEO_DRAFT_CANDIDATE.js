async function() {
  // LOCAL CANDIDATE. Do not execute until real native installation evidence exists.
  // Supply native-about-installation-evidence.json as UTF-8 through ExecuteWixAPI.files.
  // Pass siteId cdec8df6-d518-4859-9f1e-f06bf5346d41, hasMutations true and the candidate's Wix documentation URLs.
  const candidate = {
  "status": "LOCAL CANDIDATE ONLY; NOT APPLIED TO WIX",
  "siteId": "cdec8df6-d518-4859-9f1e-f06bf5346d41",
  "pageId": "yzabl",
  "pageUrl": "https://www.matrixmassage.net/about-5",
  "sourceReview": "review-3",
  "expectedNativeBodyEvidence": {
    "siteId": "cdec8df6-d518-4859-9f1e-f06bf5346d41",
    "pageId": "yzabl",
    "revision": "about-review-3-2026-11-12",
    "nativeElementId": "matrixAboutPage",
    "nativeTagName": "matrix-about-page",
    "bodySha256": "e195738430d214d323f65190725e58dff4121656c934bb461613bf227cd6724f",
    "cssSha256": "4a6d599767c9df5f6837ec5d1d69e6ec0641574efcb96db0e29b35526eda92cb",
    "rendererSha256": "83b74e29fb4ce88d946109fdb86edfad148d6df7c31ca3f3955ce80a1b325e20",
    "seoSnippetSha256": "4fe29ea47fd4a9de8b97b43e07778d62758cb6d46db657c8822901184f956e2b",
    "faqSha256": "abfd5afe3ceda52a284b3cdcbae511a4b7360b03a2ab6431cc56b754038fe1b3"
  },
  "baselineCapturedAt": "2026-11-12T15:02:35.184Z",
  "baselineTags": [
    {
      "type": "script",
      "props": {
        "type": "application/ld+json"
      },
      "meta": {
        "schemaType": "Bp05JGMH",
        "displayName": "FAQ Schema Markup"
      },
      "children": "{   \"@context\": \"https://schema.org\",   \"@type\": \"FAQPage\",   \"mainEntity\": [     {       \"@type\": \"Question\",       \"name\": \"Who owns Matrix Massage in Salem, WI?\",       \"acceptedAnswer\": {         \"@type\": \"Answer\",         \"text\": \"Matrix Massage is independently owned by a licensed massage therapist dedicated to personalized, science-based care. The business is rooted in local wellness and client-centered service.\"       }     },     {       \"@type\": \"Question\",       \"name\": \"Is Matrix Massage locally owned?\",       \"acceptedAnswer\": {         \"@type\": \"Answer\",         \"text\": \"Yes, Matrix Massage is a woman-owned, locally operated wellness clinic based in Salem, Wisconsin, offering customized massage and holistic therapy services to the community.\"       }     },     {       \"@type\": \"Question\",       \"name\": \"What makes Matrix Massage different?\",       \"acceptedAnswer\": {         \"@type\": \"Answer\",         \"text\": \"Matrix Massage combines therapeutic bodywork with science-backed wellness technologies like red light therapy, lymphatic drainage, and magnesium protocols in a calming, results-driven environment.\"       }     },     {       \"@type\": \"Question\",       \"name\": \"Do the therapists have advanced training?\",       \"acceptedAnswer\": {         \"@type\": \"Answer\",         \"text\": \"Yes, therapists at Matrix Massage have advanced training in multiple modalities including manual lymphatic drainage, muscle scraping, cupping, and red light therapy applications.\"       }     },     {       \"@type\": \"Question\",       \"name\": \"Where is Matrix Massage located?\",       \"acceptedAnswer\": {         \"@type\": \"Answer\",         \"text\": \"Matrix Massage is located at 24804 75th St, Salem, WI 53168. The clinic is easily accessible from surrounding areas including Kenosha and Pleasant Prairie.\"       }     },     {       \"@type\": \"Question\",       \"name\": \"Do you serve clients from Pleasant Prairie, Kenosha, and Antioch?\",       \"acceptedAnswer\": {         \"@type\": \"Answer\",         \"text\": \"Yes, we regularly welcome clients from Pleasant Prairie, Kenosha, and Antioch, IL seeking therapeutic massage and integrative wellness services.\"       }     },     {       \"@type\": \"Question\",       \"name\": \"How do I book a massage with Matrix Massage in Salem, WI?\",       \"acceptedAnswer\": {         \"@type\": \"Answer\",         \"text\": \"You can book online by visiting www.massagebook.com/me/danelle-borglin or text 262-939-9325 to request an appointment. We offer flexible scheduling for new and returning clients.\"       }     }   ] }",
      "custom": false,
      "disabled": false
    }
  ],
  "protectedResolvedTags": [
    {
      "tag": {
        "type": "link",
        "props": {
          "rel": "canonical",
          "href": "https://www.matrixmassage.net/about-5"
        },
        "children": "",
        "custom": false,
        "disabled": false
      },
      "source": "TAG_SOURCE_DEFAULT_PATTERN"
    },
    {
      "tag": {
        "type": "meta",
        "props": {
          "property": "og:image",
          "content": "https://static.wixstatic.com/media/e4cc43_1f95ca8ef19e4c3bac37ea7c46af4134%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/e4cc43_1f95ca8ef19e4c3bac37ea7c46af4134%7Emv2.jpg"
        },
        "children": "",
        "custom": false,
        "disabled": false
      },
      "source": "TAG_SOURCE_DEFAULT_PATTERN"
    },
    {
      "tag": {
        "type": "meta",
        "props": {
          "property": "og:image:width",
          "content": "2500"
        },
        "children": "",
        "custom": false,
        "disabled": false
      },
      "source": "TAG_SOURCE_DEFAULT_PATTERN"
    },
    {
      "tag": {
        "type": "meta",
        "props": {
          "property": "og:image:height",
          "content": "1330"
        },
        "children": "",
        "custom": false,
        "disabled": false
      },
      "source": "TAG_SOURCE_DEFAULT_PATTERN"
    },
    {
      "tag": {
        "type": "meta",
        "props": {
          "name": "twitter:image",
          "content": "https://static.wixstatic.com/media/e4cc43_1f95ca8ef19e4c3bac37ea7c46af4134%7Emv2.jpg/v1/fit/w_2500,h_1330,al_c/e4cc43_1f95ca8ef19e4c3bac37ea7c46af4134%7Emv2.jpg"
        },
        "children": "",
        "custom": false,
        "disabled": false
      },
      "source": "TAG_SOURCE_DEFAULT_PATTERN"
    }
  ],
  "endpoint": "https://www.wixapis.com/promote/seo/v1/item-seo-tags/STATIC_PAGE/yzabl",
  "method": "PATCH",
  "setRequest": {
    "itemSeoTags": {
      "tags": [
        {
          "type": "script",
          "props": {
            "type": "application/ld+json"
          },
          "meta": {
            "schemaType": "Bp05JGMH",
            "displayName": "FAQ Schema Markup"
          },
          "children": "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"Who owns Matrix Massage & Bodywork?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Matrix Massage & Bodywork is independently owned by DaNelle Borglin, a Wisconsin licensed massage therapist. The studio is located in Salem, Wisconsin.\"}},{\"@type\":\"Question\",\"name\":\"What brought DaNelle into massage therapy?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"After more than 15 years in the corporate world, including a decade running her own headhunting firm, DaNelle began pursuing a different path during the pandemic. Her experience with stress, tension, and burnout led her toward fitness, wellness, and therapeutic bodywork. That experience continues to inform her personal approach to care.\"}},{\"@type\":\"Question\",\"name\":\"What services does the studio offer today?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Matrix offers therapeutic massage and bodywork, custom facials, Japanese Head Spa, lash extensions, face and body waxing, red light therapy, and infrared sauna. Explore the service pages for details and the current booking menu for available appointments.\"}},{\"@type\":\"Question\",\"name\":\"What should I expect at my first visit?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Your visit begins with a conversation about your goals, preferences, and relevant health or skin considerations for the service you chose. Ask questions and let your provider know what feels comfortable. If you are unsure which service to book, text 262-939-9325 for help choosing a starting point.\"}},{\"@type\":\"Question\",\"name\":\"Where is Matrix, and which communities does it serve?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Matrix Massage & Bodywork is at 24804 75th St, Salem, WI 53168. The studio welcomes guests from Salem Lakes, Paddock Lake, Bristol, Pleasant Prairie, Twin Lakes, Trevor, Kenosha, Burlington, Union Grove, Genoa City, and Antioch, Illinois. All appointments are provided at this one Salem location.\"}},{\"@type\":\"Question\",\"name\":\"How do I book an appointment?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Use the online booking menu to choose a service and view current availability, or text 262-939-9325. Online scheduling is handled through Square Appointments.\"}},{\"@type\":\"Question\",\"name\":\"Where can I follow Matrix online?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Find the studio on Facebook as Matrix Massage & Bodywork – Wisconsin and on Instagram as @matrixmassagewi.\"}}]}",
          "custom": false,
          "disabled": false
        },
        {
          "type": "title",
          "children": "About Matrix Massage & Bodywork | Salem, WI"
        },
        {
          "type": "meta",
          "props": {
            "name": "description",
            "content": "Meet DaNelle, licensed massage therapist and owner of Matrix Massage & Bodywork in Salem, WI. Discover our story, care philosophy, and spa services."
          }
        },
        {
          "type": "script",
          "props": {
            "type": "application/ld+json"
          },
          "children": "{\"@context\":\"https://schema.org\",\"@graph\":[{\"@type\":\"AboutPage\",\"@id\":\"https://www.matrixmassage.net/about-5#webpage\",\"url\":\"https://www.matrixmassage.net/about-5\",\"name\":\"About Matrix Massage & Bodywork | Salem, WI\",\"description\":\"Meet DaNelle, licensed massage therapist and owner of Matrix Massage & Bodywork in Salem, WI. Discover our story, care philosophy, and spa services.\",\"inLanguage\":\"en-US\",\"about\":[{\"@id\":\"https://www.matrixmassage.net/#business\"},{\"@id\":\"https://www.matrixmassage.net/about-5#danelle-borglin\"}],\"mainEntity\":{\"@id\":\"https://www.matrixmassage.net/#business\"},\"breadcrumb\":{\"@id\":\"https://www.matrixmassage.net/about-5#breadcrumb\"},\"primaryImageOfPage\":{\"@type\":\"ImageObject\",\"url\":\"https://static.wixstatic.com/media/e4cc43_3cc3a5eeb061404aac3c6714d22cdb8f~mv2.jpg\",\"caption\":\"DaNelle Borglin, owner and licensed massage therapist at Matrix Massage & Bodywork in Salem, Wisconsin\"}},{\"@type\":\"Person\",\"@id\":\"https://www.matrixmassage.net/about-5#danelle-borglin\",\"name\":\"DaNelle Borglin\",\"givenName\":\"DaNelle\",\"familyName\":\"Borglin\",\"jobTitle\":\"Owner and Licensed Massage Therapist\",\"description\":\"DaNelle Borglin is a Wisconsin licensed massage therapist and the owner of Matrix Massage & Bodywork in Salem, Wisconsin.\",\"url\":\"https://www.matrixmassage.net/about-5#ma-meet\",\"image\":\"https://static.wixstatic.com/media/e4cc43_3cc3a5eeb061404aac3c6714d22cdb8f~mv2.jpg\",\"worksFor\":{\"@id\":\"https://www.matrixmassage.net/#business\"},\"subjectOf\":{\"@id\":\"https://www.matrixmassage.net/about-5#webpage\"}},{\"@type\":\"HealthAndBeautyBusiness\",\"@id\":\"https://www.matrixmassage.net/#business\",\"name\":\"Matrix Massage & Bodywork\",\"url\":\"https://www.matrixmassage.net/\",\"description\":\"Independently owned massage, spa, beauty, and wellness studio in Salem, Wisconsin.\",\"telephone\":\"+12629399325\",\"logo\":\"https://static.wixstatic.com/media/e4cc43_c35a32fb07bc4445bb822ed185350e25~mv2.jpg\",\"address\":{\"@type\":\"PostalAddress\",\"streetAddress\":\"24804 75th St\",\"addressLocality\":\"Salem\",\"addressRegion\":\"WI\",\"postalCode\":\"53168\",\"addressCountry\":\"US\"},\"areaServed\":[\"Salem, Wisconsin\",\"Salem Lakes, Wisconsin\",\"Paddock Lake, Wisconsin\",\"Bristol, Wisconsin\",\"Pleasant Prairie, Wisconsin\",\"Twin Lakes, Wisconsin\",\"Trevor, Wisconsin\",\"Kenosha, Wisconsin\",\"Burlington, Wisconsin\",\"Union Grove, Wisconsin\",\"Genoa City, Wisconsin\",\"Antioch, Illinois\"],\"hasMap\":\"https://www.google.com/maps/dir/?api=1&destination=24804+75th+St%2C+Salem%2C+WI+53168\",\"sameAs\":[\"https://www.facebook.com/411300892070855\",\"https://www.instagram.com/matrixmassagewi/\"],\"subjectOf\":{\"@id\":\"https://www.matrixmassage.net/about-5#webpage\"}},{\"@type\":\"BreadcrumbList\",\"@id\":\"https://www.matrixmassage.net/about-5#breadcrumb\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://www.matrixmassage.net/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"About Matrix\",\"item\":\"https://www.matrixmassage.net/about-5\"}]}]}"
        }
      ]
    },
    "fieldMask": "tags",
    "publish": false
  },
  "desiredResolvedSocial": {
    "og:title": "About Matrix Massage & Bodywork | Salem, WI",
    "og:description": "Meet DaNelle, licensed massage therapist and owner of Matrix Massage & Bodywork in Salem, WI. Discover our story, care philosophy, and spa services.",
    "twitter:title": "About Matrix Massage & Bodywork | Salem, WI",
    "twitter:description": "Meet DaNelle, licensed massage therapist and owner of Matrix Massage & Bodywork in Salem, WI. Discover our story, care philosophy, and spa services."
  },
  "socialPolicy": "Keep title/description inheritance. Do not add explicit OG/Twitter overrides or change inherited image.",
  "schemaIdentityPolicy": "Preserve observed FAQ meta.schemaType Bp05JGMH. New graph omits optional meta; no native Wix ID is invented. Proposed JSON-LD @ids are distinct semantic identifiers.",
  "newBusinessIdStatus": "Proposed for this page; no business @id was present in audited public Home, Spa & Beauty, or Red Light schemas.",
  "facebookVerification": "Owner-confirmed business Page ID 411300892070855 in project context; public destination readback still required. No claim that it differs from legacy NPE profile ID.",
  "executionPrerequisite": "Matching native body, source/tag, complete SEO markup and seven FAQ answers must be installed, read back and saved before this draft-only patch.",
  "documentation": [
    "https://dev.wix.com/docs/api-reference/business-management/seo/skills/manage-a-wix-site-s-seo-tags",
    "https://dev.wix.com/docs/api-reference/business-management/seo/item-seo-tags-v1/set-item-seo-tags",
    "https://schema.org/AboutPage",
    "https://schema.org/Person",
    "https://schema.org/HealthAndBeautyBusiness",
    "https://developers.google.com/search/docs/appearance/structured-data/breadcrumb"
  ]
};
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
