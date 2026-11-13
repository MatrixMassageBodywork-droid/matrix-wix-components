# Initial postpublication fetch — parser diagnostic

This folder preserves the first fetched public HTML after native publication. Both target pages identify public revision 1131, and their crawler responses contain the reviewed semantic page bodies and new schema.

The initial local validator stopped before completing its report because Wix's crawler serializer emitted contact anchors with valueless `href` attributes for `sms:` actions. Python cannot sort `None` together with strings. This was a local validator issue, not a publication or page-load failure.

The validator was corrected to compare crawlable web/fragment destinations separately from device-specific contact actions, while retaining the exact complete `seoMarkup` comparison and logging the stripped crawler contact actions. A new evidence folder is used for the completed validation; these raw first-fetch files remain unchanged.

Do not treat this diagnostic folder as the final publication verification report. No Wix mutation occurred during this diagnostic.
