#!/usr/bin/env python3
"""Read-only preflight of freshly exported saved values. Does not call Wix or change files."""
import argparse,hashlib,json
from pathlib import Path
p=argparse.ArgumentParser()
p.add_argument('--renderer',required=True,help='UTF-8 fresh saved Wix-hosted renderer file')
p.add_argument('--seomarkup',required=True,help='UTF-8 evaluated full current seoMarkup HTML value, not the whole page-code file')
p.add_argument('--variant',choices=['A02','A02-A05'],required=True)
a=p.parse_args()
here=Path(__file__).resolve().parent
m=json.loads((here/'manifest.json').read_text())
def hashfile(path): return hashlib.sha256(Path(path).read_bytes()).hexdigest()
values={'renderer.js':hashfile(a.renderer),'seoMarkup.html':hashfile(a.seomarkup)}
baseline=m['baseline']['sha256']
candidate=m['variants'][a.variant]['sha256']
if all(values[k]==baseline[k] for k in values):
 result='BASELINE_MATCH: exact candidate may be used only after identity, binding, native code preservation and owner-approval checks.'
 code=0
elif all(values[k]==candidate[k] for k in values):
 result='ALREADY_MATCHES_CANDIDATE: do not reapply; verify saved/public state and remaining authorized QA.'
 code=3
else:
 result='STOP: fresh saved values do not both match the approved baseline or candidate. Preserve/export current files and prepare a targeted rebase; do not overwrite.'
 code=2
print(json.dumps({'result':result,'variant':a.variant,'observed_sha256':values,'expected_baseline':{k:baseline[k] for k in values},'expected_candidate':{k:candidate[k] for k in values}},indent=2))
raise SystemExit(code)

