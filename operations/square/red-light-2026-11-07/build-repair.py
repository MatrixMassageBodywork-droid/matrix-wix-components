from pathlib import Path
p=Path(__file__).parent
s=p.joinpath('manager-live-before.gs').read_text()
a="(r.cursor!==undefined && (typeof r.cursor!=='string' || !r.cursor.trim()))"
b="(r.cursor!==undefined && (typeof r.cursor!=='string' || (r.cursor!=='' && !r.cursor.trim())))"
assert s.count(a)==1
s=s.replace(a,b)
a="if (r.cursor===undefined) return items;"
b="// Square returns an empty string when this is the final page (live verified 2026-11-07).\n    if (r.cursor===undefined || r.cursor==='') return items;"
assert s.count(a)==1
s=s.replace(a,b)
p.joinpath('manager-repaired.gs').write_text(s+p.joinpath('inspect-targets.js').read_text())
s=s.replace("existing_item: existingItem ? mssm166SummarizeExisting_(existingItem) : null,", "existing_item: existingItem ? mssm166SummarizeExisting_(existingItem) : null,\n    existing_snapshot: existingItem ? mssm166Clone_(existingItem) : null,")
s=s.replace('function mssm166ValidateProposal_(p, context) {', 'function mssm166ValidateProposal_(p, context) {\n  if (mssmRLPriceMode_(p)) return mssmRLValidatePrice_(p,context);')
s=s.replace('function mssm166UpdateService_(proposal, context, liveRef, idem, cfg) {', 'function mssm166UpdateService_(proposal, context, liveRef, idem, cfg) {\n  if (mssmRLPriceMode_(proposal)) return mssmRLUpdatePrice_(proposal,context,idem,cfg);')
s=s.replace('function mssm166VerifySaved_(proposal, context, retrieved, cfg, writeResponse) {', 'function mssm166VerifySaved_(proposal, context, retrieved, cfg, writeResponse) {\n  if (mssmRLPriceMode_(proposal)) return mssmRLVerifyPrice_(proposal,context,retrieved);')
p.joinpath('manager-price-only.gs').write_text(s+p.joinpath('price-only.js').read_text())
