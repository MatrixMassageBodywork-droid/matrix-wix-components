# Targeted correction from live test evidence

The first Wix draft automation test delivered all mapped values except submitted_utc, whose DATETIME token (`createdUtc.$date`) arrived blank. Preserve that test row as evidence. Do not pretend a processor timestamp is the submitted timestamp.

Add one TEXT field, receivedUtcIso (display name Received UTC ISO), to MatrixSupplementOrderIntakeV2 using the additive Create Data Collection Field API. Read current schema first; skip if already present with the correct type. Keep every existing field, permission and collection setting. Verify response and a consistent read. Retain createdUtc DATETIME for Wix-native usage.

In backend/supplementStaging.web.js generate one Date and write both createdUtc=that Date and receivedUtcIso=that Date.toISOString(). Save this exact source and read back before testing. In the existing automation mapping change only column B to Received UTC ISO, keeping all other 11 mappings and 3 blank columns. Refresh trigger fields if needed; stop if the new field cannot be selected.

Run a second draft-only automation test with TEST-STAGE2-TRANSPORT-002 and the same $42.00 cart, receivedUtcIso=2026-11-15T00:40:00.000Z, source WIX_DRAFT_AUTOMATION_TEST. Confirm the new row B is that exact ISO value. Run the processor and repeat: one order and two lines for this ID, no duplicate order, no external calls. Preserve original blank-date test evidence; do not change any real record or activate the automation.
