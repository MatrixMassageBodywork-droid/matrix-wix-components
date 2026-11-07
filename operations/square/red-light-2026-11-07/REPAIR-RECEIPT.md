# Square red-light repair — 2026-11-07

Owner-authorized prices: standalone full body $25.99, face/head $14.99, full-body enhancement $22.99. Owner confirmed $25.99 applies to the existing 20-minute standalone option; retain longer-session prices.

## Installed and verified repair
Live Apps Script source captured from the editor, not replaced from the old archive. Diagnostic established all three Square searches returned cursor="" at the end; the installed strict validator rejected it. Fixed only that terminal-cursor case; retained malformed-response, pagination, repeated-cursor and duplicate-identity guards. Live identity read now succeeds. Added a narrowly allowlisted price-only path for three exact existing variation IDs, preserving every other field, including zero-duration add-on semantics. Existing queue/fingerprint/gates remain in use. Temporary diagnostics removed from final installed source. No credentials, triggers, permissions or unrelated files changed.

17 cursor regression tests and 45 price-only invariant tests passed locally. Full installed source was saved, reloaded and read back byte-equivalent after newline normalization. Source and backup committed to 4a82cc7026cd2bfac15ba57edc2cf01e453c8914.

## Remaining consistency checks
Square has separate copies of enhancement prices in modifier lists. Add Massage Enhancements (GKKPB7JCCQA6S3MIFWHY5Y4W), modifier BYZZXJ63KW3FZXLIPUG27GPW, still showed full-body red light 20 min $25 at inspection; its separate CCF entry was $0.75. Face red light is an existing zero-duration APPOINTMENTS_SERVICE, unavailable for booking online, and is absent from that massage enhancement list. This is separate from updating the three service item prices. Shared-list write gate was FALSE. Do not claim the entire massage booking menu synchronized without verification.

The historical additional item GRFE2B2DWCR5E7U6SWEHOEPZ is another before/after-session add-on, not automatically authorized as a fourth service rewrite. Combined scalp/facial/redlight service untouched. No category edits performed.

## Website
R8 Wix draft remains saved and unpublished. This repair does not authorize website publication or email report delivery.

## FINAL VERIFICATION — supersedes interim status above
All three requests RLFULL8, RLFACE8 and RLENH8 are SAVED_VERIFIED with verification.ok=true. Standalone 20 min is $25.99; existing face enhancement is $14.99; full-body add-on 20 min is $22.99. Longer-session prices remain unchanged. Public Square add-on booking page visibly shows $22.99 / 20 min and $35 / 30 min. No customer booking, hold, charge or message was created.

The third price persisted before its receipt completed. Read-only reconciliation isolated a reordered, identical sales-channel set. Comparison now normalizes channels only, rejecting added/missing IDs. Receipt recovery performed zero Square writes. See finalize-logs.txt and FINAL-SQUARE-RECEIPT.json. 17 cursor tests + 45 price-only invariant tests + 2 channel-set tests passed. Final installed source saved, reloaded and matched after newline normalization: 86,225 characters. Exact source: manager-installed-verified.gs. Temporary diagnostic readers removed; the narrow read-only receipt helper remains and refuses completed requests.

Final gates: SERVICE_MANAGER_ENABLED=FALSE, SERVICE_WRITE_ENABLED=TRUE, WRITE_SHARED_MODIFIER_LISTS_ENABLED=FALSE. No triggers, credentials, permissions or unrelated files changed. Existing durations, provider assignments, booking flags, payment lists and other catalog fields preserved. Face remains zero-duration and unavailable for standalone online booking; current full-body service copy describes a separate before/after session. Price-only completion does not establish the during-massage booking workflow. Shared-menu and fee synchronization remain NOT APPLIED; see SHARED-MENU-PROPOSAL.md. Website R8 remains saved/unpublished and report delivery off.

