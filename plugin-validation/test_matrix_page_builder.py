from pathlib import Path
import importlib.util,json,re,tempfile,copy,hashlib,yaml
root=Path(__file__).resolve().parents[1]
p=root/'plugins/matrix-page-builder'
skill=p/'skills/matrix-page-workflow'
spec=importlib.util.spec_from_file_location('matrix_builder',skill/'scripts/build_page.py')
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
checks=[]
def check(name,condition):
    assert condition,name
    checks.append({'check':name,'result':'PASS'})
import atexit, shutil
reference_temp = Path(tempfile.mkdtemp(prefix='matrix-reference-test-'))
atexit.register(shutil.rmtree, reference_temp)
reference = reference_temp/'build'
m.build(skill/'assets/approved-mld/reference-config.json',reference)
expected=json.loads((root/'plugin-validation/expected-mld-faq.json').read_text())
check('MLD visible FAQ extraction matches published six answers',json.loads((reference/'faq-schema.json').read_text())==expected)
check('Reference body unchanged', (reference/'body.html').read_bytes()==(skill/'assets/approved-mld/body.html').read_bytes())
check('Reference CSS unchanged', (reference/'style.css').read_bytes()==(skill/'assets/approved-mld/style.css').read_bytes())
with tempfile.TemporaryDirectory(prefix='matrix-plugin-test-') as td:
    td=Path(td)
    body='<div class="matrix-sample"><h1>Example service in Salem, WI</h1><a href="#questions">Questions</a><a href="sms:+12629399325">Text us</a><img src="https://www.matrixmassage.net/example.jpg" alt="Illustrative placeholder used only for local testing"><section id="questions"><details><summary>First question?</summary><p>First paragraph.</p><p>Second paragraph.</p><ul><li>First item.</li><li>Second item.</li></ul></details><details><summary>Second question?</summary><p>Second answer.</p></details></section></div>'
    css='matrix-sample-page{display:block}.matrix-sample{width:100%;color:#123d40}'
    cfg={'serviceName':'Local test fixture','revision':'test','tagName':'matrix-sample-page','elementId':'matrixSamplePage','rootClass':'matrix-sample','pageUrl':'https://www.matrixmassage.net/local-test-fixture','seoTitle':'Fixture title','seoDescription':'Fixture description','bodyFile':'body.html','cssFile':'style.css','expectedFaqCount':2}
    def run(label,b=body,c=cfg,s=css,should_pass=True,out=None):
        (td/'body.html').write_text(b);(td/'style.css').write_text(s);(td/'config.json').write_text(json.dumps(c))
        output=out or td/label
        try: result=m.build(td/'config.json',output)
        except ValueError:
            check(label,not should_pass);return None
        check(label,should_pass);return result
    r=run('different service namespace and two FAQs')
    f=json.loads((Path(r['output'])/'faq-schema.json').read_text())
    check('Multi-paragraph/list FAQ includes entire visible answer',f['mainEntity'][0]['acceptedAnswer']['text']=='First paragraph. Second paragraph. First item. Second item.')
    check('Output metadata does not claim installation or publication',not r['installed'] and not r['published'])
    run('Existing build cannot be overwritten',out=Path(r['output']),should_pass=False)
    run('Duplicate H1 rejected',body.replace('</h1>','</h1><h1>Another</h1>'),should_pass=False)
    run('Duplicate ID rejected',body.replace('<section','<p id="questions">Duplicate</p><section'),should_pass=False)
    run('Broken internal anchor rejected',body.replace('#questions','#missing'),should_pass=False)
    run('Missing image alt rejected',re.sub(r' alt="[^"]*"','',body),should_pass=False)
    run('Inline script rejected',body.replace('</div>','<script>alert(1)</script></div>'),should_pass=False)
    run('Inline handler rejected',body.replace('<h1>','<h1 onclick="alert(1)">'),should_pass=False)
    run('Dangerous link rejected',body.replace('href="#questions"','href="javascript:alert(1)"'),should_pass=False)
    run('Global body selector rejected',s='body{margin:0}'+css,should_pass=False)
    run('Inline base64 CSS rejected',s=css+' .matrix-sample{background:url(data:image/png;base64,abc)}',should_pass=False)
    run('Wrong approved FAQ count rejected',c={**cfg,'expectedFaqCount':6},should_pass=False)
    run('Invalid custom tag rejected',c={**cfg,'tagName':'INVALID'},should_pass=False)
    run('Unbalanced markup rejected',body.replace('</h1>','</h2>'),should_pass=False)
    r=run('Zero FAQ pages supported','<div class="matrix-sample"><h1>Example</h1></div>',{**cfg,'expectedFaqCount':0})
    check('No empty FAQPage schema generated',not (Path(r['output'])/'faq-schema.json').exists())
manifest=json.loads((p/'plugin.json').read_text());apps=json.loads((p/'.app.json').read_text())
check('Portable manifest schema',manifest['$schema']=='https://agent-plugins.org/schemas/1.0.0/plugin.schema.json')
check('Valid SemVer',bool(re.fullmatch(r'\d+\.\d+\.\d+',manifest['version'])))
i=manifest['extensions']['com.openai']['interface']
check('Subtitle length at most 30',len(i['shortDescription'])<=30)
check('Default prompts valid',len(i['defaultPrompt'])<=3 and all(0<len(x)<=128 for x in i['defaultPrompt']))
check('Supported category',i['category']=='Business & Operations')
check('Four verified dependency bindings',set(apps['apps'])=={'github','wix','google-drive','browser'})
check('GitHub actual connector included',apps['apps']['github']['id']=='connector_76869538009648d5b282a4bb21c3d157')
text=(skill/'SKILL.md').read_text();front=yaml.safe_load(text.split('---',2)[1])
check('Skill frontmatter valid',front['name']=='matrix-page-workflow' and bool(front['description']))
check('No placeholder TODOs in instructions','TODO' not in text)
for link in re.findall(r'\]\(([^)]+)\)',text):
    if not link.startswith(('http:','https:')):check('Skill reference exists: '+link,(skill/link).is_file())
check('No symlinks in package',not any(f.is_symlink() for f in p.rglob('*')))
check('No embedded cache or credentials',not any(f.name in {'.env','credentials.json','token.json','node_modules'} for f in p.rglob('*')))
(root/'plugin-validation/matrix-page-builder-tests.json').write_text(json.dumps({'checks':checks,'passed':len(checks),'failed':0,'liveMutations':0},indent=2)+'\n')
print(json.dumps({'passed':len(checks),'failed':0,'liveMutations':0}))
