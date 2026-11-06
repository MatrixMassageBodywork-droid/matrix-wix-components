# GitHub is part of the workflow

Use the attached GitHub app, not a new repository or copied project. Repository: `MatrixMassageBodywork-droid/matrix-wix-components`.

1. Read current default branch/head, target directory, latest checkpoint and any repository instructions. Local scratch may lag the remote; remote source is authoritative. Audit whether proposed commits trigger deployment. The verified Wix setup uses immutable source pins, so saving a new draft does not repoint the live element.
2. Keep each page under `pages/<family>/<service>/`. Reuse an existing folder. Save `body.html`, scoped `style.css`, `renderer.js`, current exact `WIX_PAGE_CODE.js` when installed, candidate snippets separately, `assets/`, `asset-map.json`, provenance, proof, identity/SEO baseline, install manifest and QA evidence. Keep versioned source/proofs; never call a temporary browser URL a durable source backup.
3. Never package credentials, tokens, cookies, private client records or browser profiles. Page source, approved assets and sanitized publication evidence are in scope. Do not overwrite unrelated local changes or roll back newer remote commits.
4. Prepare a diff against the fresh head. For text use GitHub tree entries with content; for binary images use blob upload and the returned SHA. Build on the current base tree to preserve every unrelated file. Use supported connector tools or an authenticated checkout; never fabricate a blob/commit SHA.
5. Commit the complete reviewed source. Update `main` only with an expected-head lease/normal fast-forward. On rejection, read the new head and reconcile; never force-push. Use a draft branch if required by actual repository protections or deployment dependencies.
6. Verify the remote head and read back changed files/hashes. Return a real GitHub commit/source link. If remote saving fails, preserve local work and say GitHub saving is incomplete; do not silently substitute another storage destination.
7. For publication, pin the Wix renderer to the **exact approved source commit** with an observed working CDN URL. Fetch it through supported tools and verify content/hash/size. Do not point a live element at mutable `main`, repoint other pages, or use a guessed/unavailable asset URL.
8. After verified installation/publication, save the actual page code, native source/tag/ID/stretch/dimensions, before/after SEO, screenshots, test results and current receipt in a new commit. A receipt-only commit does not require republishing or changing the runtime source pin.

Keep canonical project documentation/checkpoints in the existing Drive project folder and cross-link the code commit. Do not duplicate the whole repository into ChatGPT Library. GitHub-backed code is saved to GitHub; project control documents remain in their established Drive location.

Source URL pattern after a real commit and successful retrieval:
`https://cdn.jsdelivr.net/gh/MatrixMassageBodywork-droid/matrix-wix-components@<verified-40-character-commit>/pages/<family>/<service>/renderer.js`

Treat this pattern as a construction rule, not evidence that a URL exists. Test the exact resulting URL before installation.
