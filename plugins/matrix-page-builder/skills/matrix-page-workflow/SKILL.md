---
name: matrix-page-workflow
description: "Design, preview, save, install, and verify Matrix Massage & Bodywork Wix service pages using the approved full-width clinical luxury style. Use for new Matrix pages, the next service subpage, image revisions, width fixes, or an explicitly approved publication. Includes GitHub source saving, Google Drive project checkpoints, page-specific imagery, SEO preservation, and precise Wix execution."
---

# Matrix page workflow

## Start with continuity

1. Read [current project references](references/project-sources.md), then the latest relevant GitHub and Drive checkpoint. Read current source before editing it. Treat bundled examples as a design reference, never as current deployment state.
2. Resolve the requested service and mode: design/proof, targeted revision, save/install draft, or publish an approved revision. For “next page,” consult the current master plan and page inventory; do not guess a new URL. Preserve existing work.
3. Use the attached GitHub, Wix, Google Drive and Browser connections for their supported functions. Discover current tools and read their instructions. Use connected tools before browser actions. Use cloud browser when explicitly requested. If a capability is unavailable, complete independent design/source work and report only the remaining dependency.
4. Keep the task moving with available information. Ask only for an essential unresolved choice; do not ask for information already in the project sources. Creating this plugin is not authorization to change a future page or publish it.

## Design the complete page

Read [design and image rules](references/design-system.md). Design the body between the existing Wix header and footer. Preserve genuine native reviews. Deliver the whole page, not a collage or isolated hero image.

Use the approved cream/deep-teal visual system, full-width section backgrounds. Use a large centered logo in a white, black-bordered panel for main pages, visually larger than the H1; subpages may use a smaller logo and split hero. Keep a comfortable text measure inside full-width sections. Choose distinct, service-appropriate imagery with a dark teal water treatment where it supports the composition. Preserve the exact approved logo. Use generated imagery only as illustrative imagery, never as a claim to show actual Matrix clients or facilities.

Read the page-specific approved copy and current offerings. Do not invent prices, credentials, treatment promises, reviews or links. Research uncertain clinical claims using primary authoritative sources. Avoid copying another service's medical guidance into a new service. For image-only or width-only revisions, preserve all unrelated copy, markup, URLs and style.

Capture the page's current identity, metadata, canonical/indexing, schema, page code, source/tag, and native sections before installation. Keep baseline evidence separate from proposed changes. Read [SEO and QA requirements](references/seo-and-qa.md).

## Prepare reproducible source and proof

Read [GitHub workflow](references/github-workflow.md). Save all original source, images, image provenance, asset mappings, proofs, installation files and receipts in the existing Matrix repository. Keep source committed even when Wix installation is unavailable. Do not call work saved to GitHub until remote readback succeeds.

For a static custom-element page, author `body.html`, scoped `style.css` and `page-config.json`. Use the approved MLD HTML/CSS in `assets/approved-mld/` as a reference; adapt the service copy, namespace, image choices and links deliberately. Never publish those reference files to a different page unchanged.

Run `python scripts/build_page.py --config /absolute/path/page-config.json --out /absolute/path/new-build-directory` from this skill. Read [build contract](references/build-contract.md) first. The builder creates a noindex full-page proof, renderer, complete visible-body SEO snippet, FAQ JSON and manifest. It performs no network request or live installation. A new output directory is required so it cannot overwrite an installed checkpoint. Its static checks do not replace visual/live QA.

Render the complete proof in a browser, inspect desktop and mobile sizes, fix failures and show the user a working preview plus a representative screenshot. Clearly identify it as a proof until Wix publication is verified. Preserve the review revision/hash and approval scope. A new unapproved design does not inherit an earlier page's approval.

## Install and publish only within the current authorization

Read [Wix execution](references/wix-execution.md) and prepare page-specific deterministic instructions before live edits. Do all research, design, code merging, asset preparation and QA planning outside the browser. Browser execution handles only current editor state, supported native layout operations, saving, preview and approved publication.

Respect approval already given for the exact current work; do not ask again. If the user requested a proof, finish it before requesting publication. Bind publishing approval to the reviewed revision and scope. Installing a draft is not publication, and committing source is not publication.

Use the existing page and freshly verified native section map. Keep native full-width stretch and zero side margins. Never copy another page's section IDs or fixed heights. Preserve unknown page code and diagnose it outside the live editor before applying a precise merge. Do not restore history, duplicate pages, or reinstall merely because state is uncertain.

Save small checkpoints, reopen and read back. If a save/publish call times out, inspect persisted state before retrying. Dismiss benign tours/overlays and continue. Stop only the affected mutation when identity, concurrent changes, source, SEO or preservation boundaries cannot be verified; finish independent work.

Before a site-wide Publish, identify any unrelated pending draft changes and ensure the approval covers what will be released. Publish only the authorized reviewed work using the supported Wix path. Record the native confirmation, then inspect the permanent public URL for the actual new revision and preserved SEO.

## Finish with evidence

Use [receipt format](references/receipt-template.md). Distinguish DESIGNED, SAVED, VERIFIED, TESTED, PUBLISHED, NOT TESTED and BLOCKED. Store the latest publication/status receipt in GitHub and the canonical Drive project folder; retain historical reviews without letting their old pending status override the current receipt.

Report the practical outcome first, with the preview or live link, GitHub link, and brief material limitation if present. Never guarantee search rankings. Never claim installation, publication or mobile testing based only on a local proof.
