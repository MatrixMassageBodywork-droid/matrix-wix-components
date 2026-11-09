# Concrete approval and controlled execution

## Prepare before asking

1. Read current authoritative architecture and latest checkpoint. Capture current relevant source and saved Wix values; identify which version is live. Record exact source commit, page ID, custom-element ID/tag/source URL, page code and SEO settings where applicable.
2. Produce a dependency map: affected pages/fields/assets, inbound links that need edits, shared files or code, SEO markup, schemas, event tracking and publish scope. Read all dependencies before proposing a patch. Shared changes need explicit separate scope.
3. Create the candidate and complete local tests. Include exact copy/metadata/JSON-LD, verified destination links, code diff and mobile implications. Preview substantial visual changes. A vague “improve SEO” row is not approval-ready.
4. Freeze a numbered proposal with change IDs and a content digest. Include scope, baseline digest, before/after, reason/evidence, validation, risk and publication choice. Store the complete plan privately in the project folder and a sanitized technical package in GitHub if appropriate.
5. Ask for a concrete approval only when execution is ready. Record the owner's response verbatim or by reliable conversation reference. A requested edit to the proposal changes that proposal; apply the requested revision and do not treat it as approval of unrelated rows. Do not ask the owner to reconfirm an unchanged already-approved action.

## Plan and approval helper format

Create a plan JSON with `plan_id`, integer `revision`, and `changes`. Each change contains `id`, canonical `url`, exact `before`, exact `after`, and `baseline_sha256`, computed from the relevant saved source/fields with documented canonicalization. Include dependencies and exact execution instructions in the plan or its attachments. `scripts/check_approval.py digest plan.json` prints the digest of the whole parsed plan, serialized with sorted keys and compact separators. All fields are included; do not put that derived digest inside the plan itself.

After actual owner approval, record `plan_id`, `revision`, `plan_sha256`, selected `approved_change_ids`, `allow_publish` (true only if expressly approved), and `evidence` with `actor:"owner"` and `reference` locating the actual message. The program cannot authenticate this record; the executing assistant must inspect the actual owner response. Never generate a fictional reference.

Create `current-baselines.json` as a map of change ID to fresh relevant source digest immediately before applying the candidate. Then run:
```
python scripts/check_approval.py check plan.json approval.json current-baselines.json
```
The output lists approved changes, baseline conflicts and whether publication was approved. It performs no application writes. Recheck source before each live edit if intervening changes occurred. The digest protects consistency, not authorization by itself.

If one change is stale, preserve that newer state and rebase/review the affected change, including dependent changes. Keep unaffected, independent approved changes progressing. Do not apply partial changes that rely on a blocked prerequisite. Any material new scope or changed candidate needs a revised approval; a routine implementation detail already within the approved exact behavior does not.

## Wix execution contract

Use only documented tools for the capability they actually support. Wix business-data APIs do not automatically provide a Classic editor page-layout write operation. Read current Wix docs/schema before calling APIs. If live editor interaction is required, first prepare deterministic instructions containing:

- Correct account/site and exact observed editor navigation.
- Existing page name, page ID, permanent URL, element IDs/tags and current source binding.
- Each field/file change with exact candidate bytes/value, in dependency order.
- Protected shared header/footer, About, genuine testimonials, URLs, working tracking/booking and unrelated pending edits.
- Small saves with exact read-back comparisons; stop on mismatch or unexpected state.
- Desktop and mobile QA, evidence destinations, publish permission and known sitewide publication implications.

For custom elements, preserve the current architecture. Inspect its source file, element properties and page-code bindings. If updating visible body HTML, update the corresponding supported `seoMarkup` only as needed so both contain the same meaningful content/links. Do not replace the existing full markup with a shortened summary. Follow the current Page Builder build contract for the current Wix page; don't install a second element or overwrite a shared renderer blindly.

Use immutable source commit URLs for deployed assets when that is the existing pattern. Verify hosted asset bytes before binding them. Keep previous versions and their exact source URLs. Do not hard-code a new height by guess; test the existing resize/layout strategy with all expandable content open on both breakpoints. Avoid unnecessary rebuilds for metadata-only changes.

Save the smallest coherent batch, then read the saved values back independently. An editor success toast is evidence of an action, not proof the bytes match. If an API/browser request times out, inspect persistence before retrying. A new unrelated saved state is a stop condition for overwriting it, not an invitation to restore an old checkpoint.

## Publication and verification

Publication approval is separate from draft approval unless the owner's actual instruction includes both. Wix Classic publication may release all saved site changes. Inspect Site History/current pending work before publishing. If unrelated drafts would be released, do not publish them under this page's approval. Complete safe draft work and explain the exact remaining scope issue.

After publication, re-fetch the permanent public URL, live source binding and metadata/schema. Verify canonical/indexing directives, visible content and crawler markup, link and image destinations, mobile width, FAQ expansion, no footer overlap, and working booking navigation. Test the changed flow without booking, purchasing or submitting personal data. The public URL must show the approved revision; a test-site/preview URL alone is not publication evidence.

Do not equate a successful fetch or Rich Results Test with Google indexing. A browser impersonating Googlebot/OAI-SearchBot is a diagnostic only. Report URL Inspection's actual available status separately, and label tests unavailable when blocked. Record report dates for future comparison rather than promising an immediate ranking lift.

Write a final receipt containing plan/revision/approval evidence, scope, source commits, before/after hashes, saved and live read-back, screenshots where meaningful, tests/results, unchanged protected boundaries and unresolved items. Mark statuses precisely. A rollback candidate is documentation; using it requires applicable approval and current dependency verification.
