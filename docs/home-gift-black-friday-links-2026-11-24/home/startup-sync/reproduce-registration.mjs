import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const home = path.dirname(dir);
const read = f => fs.readFileSync(path.join(dir, f), 'utf8');
const part0 = read('startup-part-0.unchanged.html');
const before1 = read('startup-part-1.before.html');
const after1 = read('startup-part-1.candidate.html');
const baselineBody = read('combined-body.before.html');
const candidateBody = read('combined-body.candidate.html');
const renderer = fs.readFileSync(path.join(home, 'candidate', 'renderer.js'), 'utf8');
const css = JSON.parse(renderer.match(/const css = ("(?:\\.|[^"\\])*");/)[1]);
const strip = s => s.replace(/^\s*<script>\s*/, '').replace(/\s*<\/script>\s*$/, '');
const label = 'View Black Friday spa offers';

function environment() {
  const registry = new Map();
  class HTMLElement {
    constructor() { this.dataset = {}; this.style = {}; this.value = ''; this.writes = 0; this.events = []; }
    set innerHTML(v) { this.value = v; this.writes += 1; }
    get innerHTML() { return this.value; }
    dispatchEvent(e) { this.events.push(e); return true; }
  }
  class CustomEvent {
    constructor(type, options) { this.type = type; this.detail = options.detail; }
  }
  const context = vm.createContext({
    window: {}, HTMLElement, CustomEvent,
    customElements: {
      get: tag => registry.get(tag),
      define: (tag, ctor) => { assert(!registry.has(tag)); registry.set(tag, ctor); },
    },
  });
  return { registry, run: s => vm.runInContext(strip(s), context) };
}

function run(name, snippets, expectedBody, expectedVersion, expectStyle) {
  const env = environment();
  for (const snippet of snippets) env.run(snippet);
  const Constructor = env.registry.get('matrix-home-page');
  assert(Constructor);
  const element = new Constructor();
  element.connectedCallback();
  assert.equal(element.innerHTML, (expectStyle ? '<style>' + css + '</style>' : '') + expectedBody);
  assert.equal(element.dataset.matrixMounted, 'true');
  assert.equal(element.style.display, 'block');
  assert.equal(element.style.height, 'auto');
  assert.equal(element.events.length, 1);
  assert.equal(element.events[0].type, 'matrix-ready');
  assert.equal(element.events[0].detail.version, expectedVersion);
  element.connectedCallback();
  assert.equal(element.writes, 1);
  assert.equal(element.events.length, 1);
  return {
    name, passed: true, bfLabelCount: element.innerHTML.split(label).length - 1,
    containsStyleChild: expectStyle, readyVersion: expectedVersion,
    connectedWritesIncludingReconnect: element.writes,
    linkCount: (expectedBody.match(/<a\b/g) || []).length,
    exactExpectedBody: true,
  };
}

const hypotheticalGuardOnly = renderer.replace(
  "if (this.dataset.matrixMounted === 'true') return;",
  "if (this.dataset.matrixMounted === 'true' && this.dataset.matrixRenderVersion === 'new-bf-version') return;",
);
assert.notEqual(hypotheticalGuardOnly, renderer);
const results = [
  run('Existing startup first reproduces old DIV-only body despite new external renderer', [part0, before1, renderer], baselineBody, 'home-startup-2026-11-09', false),
  run('A guard-only external-renderer change cannot replace the class already registered by startup', [part0, before1, hypotheticalGuardOnly], baselineBody, 'home-startup-2026-11-09', false),
  run('Updated part1, normal startup order, existing external renderer unchanged', [part0, after1, renderer], candidateBody, 'home-startup-2026-11-09', false),
  run('Updated part1, reversed startup-part arrival order', [after1, part0, renderer], candidateBody, 'home-startup-2026-11-09', false),
  run('External renderer arrives first; updated startup does not replace it', [renderer, part0, after1], candidateBody, 'home-performance-complete-2026-11-09', true),
];
const report = {
  status: 'ALL FIVE OFFLINE REGISTRATION-ORDER CHECKS PASSED',
  scope: 'Isolated Node JavaScript VM with minimal HTMLElement/customElements stubs; no browser, network or remote mutation',
  results,
  limitations: ['Does not test Wix script scheduling, CSS rendering, browser geometry or live save/publication'],
};
fs.writeFileSync(path.join(dir, 'runtime-reproduction.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
