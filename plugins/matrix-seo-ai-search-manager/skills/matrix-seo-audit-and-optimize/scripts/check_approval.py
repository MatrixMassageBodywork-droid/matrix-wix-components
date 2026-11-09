#!/usr/bin/env python3
"""Read-only plan/approval consistency check. Cannot authenticate owner consent."""
import argparse
import hashlib
import json
import re
from pathlib import Path


def digest(plan):
    return hashlib.sha256(json.dumps(plan, sort_keys=True, separators=(',', ':'),
                                     ensure_ascii=False, allow_nan=False).encode()).hexdigest()


def check(plan, approval, baselines):
    if not plan.get('plan_id') or type(plan.get('revision')) is not int:
        raise ValueError('Plan requires ID and integer revision')
    if approval.get('plan_id') != plan['plan_id'] or approval.get('revision') != plan['revision']:
        raise ValueError('Approval belongs to a different plan/revision')
    if approval.get('plan_sha256') != digest(plan):
        raise ValueError('Approved plan digest does not match')
    evidence = approval.get('evidence', {})
    if evidence.get('actor') != 'owner' or not isinstance(evidence.get('reference'), str) or not evidence['reference'].strip():
        raise ValueError('Actual owner approval evidence is required')
    if type(approval.get('allow_publish')) is not bool:
        raise ValueError('Explicit boolean allow_publish is required')
    changes = {}
    for c in plan['changes']:
        if not c.get('id') or c['id'] in changes:
            raise ValueError('Change IDs must be unique and nonempty')
        if any(k not in c for k in ('url', 'before', 'after', 'baseline_sha256')):
            raise ValueError('Change lacks exact scope/baseline')
        if not re.fullmatch(r'[0-9a-f]{64}', c['baseline_sha256']):
            raise ValueError('Baseline must be a SHA-256 digest')
        changes[c['id']] = c
    approved = approval.get('approved_change_ids')
    if not isinstance(approved, list) or not approved or len(set(approved)) != len(approved):
        raise ValueError('Explicit unique approved change IDs are required')
    if not set(approved) <= changes.keys():
        raise ValueError('Unknown approved change ID')
    blocked = {i: 'baseline changed or not checked' for i in approved
               if baselines.get(i) != changes[i]['baseline_sha256']}
    for i in approved:
        if not set(changes[i].get('depends_on', [])) <= set(approved):
            blocked[i] = 'dependency not approved'
    while True:
        added = {i: 'dependency blocked' for i in approved if i not in blocked
                 and any(d in blocked for d in changes[i].get('depends_on', []))}
        if not added:
            break
        blocked.update(added)
    # Detect unresolved/cyclic dependencies before claiming a safe order.
    ordered, waiting = [], [i for i in approved if i not in blocked]
    while waiting:
        ready = [i for i in waiting if set(changes[i].get('depends_on', [])) <= set(ordered)]
        if not ready:
            blocked.update({i: 'cyclic or unresolved dependency' for i in waiting})
            break
        ordered.extend(ready)
        waiting = [i for i in waiting if i not in ready]
    return {'eligible_change_ids': ordered, 'blocked': blocked,
            'publication_approved': approval['allow_publish'],
            'can_publish_after_qa': approval['allow_publish'] and not blocked,
            'limitations': ['Verify actual owner message separately', 'No application writes performed',
                           'Publication still requires saved/live QA and no unrelated Wix drafts']}


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('mode', choices=['digest', 'check'])
    ap.add_argument('plan', type=Path)
    ap.add_argument('approval', type=Path, nargs='?')
    ap.add_argument('baselines', type=Path, nargs='?')
    args = ap.parse_args()
    try:
        plan = json.loads(args.plan.read_text())
        if args.mode == 'digest':
            print(digest(plan))
        else:
            if not args.approval or not args.baselines:
                raise ValueError('check requires approval and current-baselines files')
            result = check(plan, json.loads(args.approval.read_text()), json.loads(args.baselines.read_text()))
            print(json.dumps(result, indent=2))
            if result['blocked']:
                raise SystemExit(2)
    except (ValueError, KeyError, TypeError) as exc:
        ap.exit(2, str(exc) + '\n')
