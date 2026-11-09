import copy
import importlib.util
import sys
import unittest
from pathlib import Path

SCRIPTS = Path(__file__).resolve().parents[1] / 'matrix-seo-ai-search-manager/skills/matrix-seo-audit-and-optimize/scripts'
sys.path.insert(0, str(SCRIPTS))
from check_approval import check, digest
from inspect_html import inspect
from performance_summary import summarize


class HelperTests(unittest.TestCase):
    def setUp(self):
        self.plan = {'plan_id': 'fixture-plan', 'revision': 1, 'changes': [
            {'id': 'A01', 'url': 'https://www.matrixmassage.net/example', 'before': 'old', 'after': 'new', 'baseline_sha256': 'a'*64},
            {'id': 'A02', 'url': 'https://www.matrixmassage.net/example2', 'before': 'old2', 'after': 'new2', 'baseline_sha256': 'b'*64, 'depends_on':['A01']}]}
        self.approval = {'plan_id':'fixture-plan', 'revision':1, 'plan_sha256':digest(self.plan),
                         'approved_change_ids':['A01'], 'allow_publish':False,
                         'evidence':{'actor':'owner', 'reference':'SYNTHETIC TEST ONLY'}}
        self.baselines = {'A01':'a'*64, 'A02':'b'*64}
        self.report = {'source':'GSC', 'property':'fixture', 'timezone':'source', 'filters':{},
                       'period_current':{'start':'2026-10-10','end':'2026-11-06'},
                       'period_previous':{'start':'2026-09-12','end':'2026-10-09'},
                       'pages':[{'url':'https://www.matrixmassage.net/example',
                                 'current':{'clicks':12,'impressions':400},
                                 'previous':{'clicks':10,'impressions':500}}]}

    def test_partial_draft_approval(self):
        r = check(self.plan,self.approval,self.baselines)
        self.assertEqual(r['eligible_change_ids'], ['A01'])
        self.assertFalse(r['can_publish_after_qa'])

    def test_changed_plan_rejected(self):
        self.plan['changes'][0]['after'] = 'different'
        with self.assertRaises(ValueError): check(self.plan,self.approval,self.baselines)

    def test_missing_owner_evidence(self):
        self.approval['evidence'] = {}
        with self.assertRaises(ValueError): check(self.plan,self.approval,self.baselines)

    def test_unapproved_dependency(self):
        self.approval['approved_change_ids'] = ['A02']
        self.assertIn('A02',check(self.plan,self.approval,self.baselines)['blocked'])

    def test_changed_baseline_blocks_dependent_publication(self):
        self.approval.update(approved_change_ids=['A01','A02'],allow_publish=True)
        self.baselines['A01'] = 'c'*64
        r = check(self.plan,self.approval,self.baselines)
        self.assertEqual(set(r['blocked']), {'A01','A02'})
        self.assertFalse(r['can_publish_after_qa'])

    def test_cyclic_dependency(self):
        self.plan['changes'][0]['depends_on'] = ['A02']
        self.approval.update(plan_sha256=digest(self.plan),approved_change_ids=['A01','A02'])
        self.assertEqual(len(check(self.plan,self.approval,self.baselines)['blocked']),2)

    def test_dependency_order(self):
        self.approval.update(approved_change_ids=['A02','A01'],allow_publish=True)
        r=check(self.plan,self.approval,self.baselines)
        self.assertEqual(r['eligible_change_ids'],['A01','A02'])
        self.assertTrue(r['can_publish_after_qa'])

    def test_ctr_and_change(self):
        m=summarize(self.report)['pages'][0]['metrics']
        self.assertEqual(m['ctr_percent']['percentage_point_change'],1)
        self.assertEqual(m['clicks']['percent_change'],20)

    def test_missing_and_zero(self):
        self.report['pages'][0]['previous']={'clicks':0,'impressions':0}
        self.report['pages'][0]['current']['booking_clicks']=None
        m=summarize(self.report)['pages'][0]['metrics']
        self.assertIsNone(m['clicks']['percent_change'])
        self.assertIsNone(m['ctr_percent']['previous'])
        self.assertIsNone(m['booking_clicks']['current'])

    def test_reject_period_mismatch(self):
        self.report['period_previous']['end']='2026-10-08'
        with self.assertRaises(ValueError): summarize(self.report)

    def test_reject_duplicate_rows(self):
        self.report['pages'].append(copy.deepcopy(self.report['pages'][0]))
        with self.assertRaises(ValueError): summarize(self.report)

    def test_reject_invalid_metrics(self):
        for bad in (-1, True, float('nan')):
            self.report['pages'][0]['current']['clicks']=bad
            with self.assertRaises(ValueError): summarize(self.report)

    def test_html_and_nested_schema(self):
        raw=b'<title>A &amp; B</title><meta name="robots" content="index"><link rel="canonical" href="https://www.matrixmassage.net/x"><h1>Local <span>service</span></h1><a href="/book">Book</a><img src="x" alt=""><img src="y"><script type="application/ld+json">{"@graph":[{"@type":"LocalBusiness"}]}</script>'
        r=inspect(raw,'https://www.matrixmassage.net/x')
        self.assertEqual(r['title'],'A & B')
        self.assertEqual(r['h1s'],['Local service'])
        self.assertEqual(r['images_missing_alt_attribute'],1)
        self.assertTrue(r['jsonld'][0]['valid_json'])
        self.assertEqual(r['links'][0]['resolved'],'https://www.matrixmassage.net/book')

    def test_script_shell_and_invalid_json(self):
        r=inspect(b'<script>const x="<h1>not rendered</h1>";</script><script type="application/ld+json">bad</script>')
        self.assertEqual(r['h1s'],[])
        self.assertFalse(r['jsonld'][0]['valid_json'])


if __name__ == '__main__':
    unittest.main(verbosity=2)
