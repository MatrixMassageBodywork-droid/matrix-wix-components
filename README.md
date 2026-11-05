# Matrix Website Source Archive

Canonical portable source archive for the Matrix Massage & Bodywork website.

## Source-of-truth rule

- **GitHub is the canonical code archive.**
- **Wix Velo is the current deployment runtime.**
- Every custom page/component should be committed here before or alongside Wix installation.
- Keep working code framework-light and portable where practical so a future WordPress migration does not require rebuilding from scratch.
- Preserve history through Git commits; do not overwrite or delete uncertain prior versions just for organization.
- Never store passwords, API keys, access tokens, or other credentials in this repository.

## Deployment sequence

1. Prepare/update the page source in GitHub.
2. Copy the exact approved renderer into the matching Wix Velo custom-element file.
3. Preserve the existing Wix page URL, SEO, header/footer, and page identity.
4. Test on a 0% Wix Test Site.
5. Verify desktop and mobile.
6. Publish only after approval.
7. Verify production, including a hard refresh if Wix serves a stale cached asset.

## Repository structure

```text
pages/
  massage/
    main/
    deep-tissue/
    swedish/
    manual-lymphatic-drainage/
    prenatal/
    facial-head-massage/
  spa-beauty/
  wellness/
  regional/
```

The older root-level Massage files are intentionally retained as historical implementation artifacts. The organized `pages/` tree is the forward-looking canonical structure.
