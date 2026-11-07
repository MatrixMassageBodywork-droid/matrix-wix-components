# Current Square red-light status — 2026-11-07

SAVED / VERIFIED / PUBLIC MENU TESTED. This supersedes earlier shared-menu pending statuses in SHARED-MENU-PROPOSAL.md and REPAIR-RECEIPT.md; those documents are historical.

| Offering | Base price | Existing 3% CCF option |
|---|---:|---:|
| Full body, 20-minute standalone | $25.99 | $0.78 |
| Face/head massage enhancement | $14.99 | $0.45 |
| Full body, 20-minute enhancement | $22.99 | $0.69 |

Owner explicitly approved the shared massage enhancement menu and fee synchronization. SSM-20261107-RLSHARED1 and SSM-20261107-RLFEEVIS1 are SAVED_VERIFIED with verification.ok=true. The three prior base-price requests remain verified; no repeat base-price writes.

The public Custom Therapeutic Massage booking page shows both enhancement prices. Face/head was selected and cleared successfully. No appointment was created; payment choices are hidden from public booking.

Four modifier lists were updated atomically. The canonical massage item received the new face choice visibility override. Square normalized modifier ordinals without changing display order, and auto-created a visible fee override; a separate targeted correction hid only the new face fee. Final read-only reconciliation checked 11 associated service items and preserved unrelated settings, prices, durations, providers and assignments. No repeat price write was used to recover the receipt.

Exact current installed source: manager-sync-corrected.gs, 109717 characters after newline normalization, saved/reloaded/read-back match. manager-sync-final.gs and manager-installed-verified.gs are historical intermediate versions. Tests: 26 shared-update tests and 11 correction tests passed.

Final gates: SERVICE_MANAGER_ENABLED=FALSE; standing SERVICE_WRITE_ENABLED=TRUE; WRITE_SHARED_MODIFIER_LISTS_ENABLED=FALSE. No permissions, credentials, triggers, customers, bookings, categories or unrelated catalog objects changed. Longer durations, historical facial enhancement lists and duplicate/combination services were outside this approved write scope and remain untouched.

Evidence: FINAL-SHARED-MENU-RECEIPT.json, sync-approved-context.json (pre-write), sync-approved-proposal.json, sync-final-logs.txt, square-massage-redlight-menu.txt and square-massage-redlight-menu.png. sync-after.json, if consulted locally, is an intermediate snapshot BEFORE the fee visibility correction and is not the final state.

Website R8 remains SAVED/VERIFIED DRAFT and UNPUBLISHED. Original quiz unchanged. Main service price/schema consistency and website release remain separate work; report/email delivery stays off.
