import test from 'node:test'
import assert from 'node:assert/strict'
import vm from 'node:vm'
import { readFile } from 'node:fs/promises'

const source = await readFile(new URL('../public/app.js', import.meta.url), 'utf8')
function layout(compact, stored = {}) {
  const media = { matches: compact }, storage = new Map(Object.entries(stored))
  const classes = new Map(), buttons = new Map()
  const context = { window: { matchMedia: () => media }, localStorage: { getItem: key => storage.get(key), setItem: (key, value) => storage.set(key, value) },
    document: { querySelector: () => ({ classList: { toggle: (key, value) => classes.set(key, value) } }) },
    $: key => { if (!buttons.has(key)) buttons.set(key, { setAttribute() {} }); return buttons.get(key) },
    map: { resize() {} }, drawMap() {},
  }
  const prefs = source.slice(source.indexOf('const compactLayout ='), source.indexOf('const state ='))
  const controls = source.slice(source.indexOf('function setInspector('), source.indexOf('// ── map interaction'))
  vm.runInNewContext(`${prefs}\nconst state = { inspectorOpen:panelPreference('inspector'), railOpen:panelPreference('rail'), view:'map' };\n${controls}\nglobalThis.api={state,setInspector,setRail,panelPreference}`, context)
  return { ...context.api, media, storage, classes }
}

test('compact iframe starts with full map while wide layout keeps original defaults', () => {
  assert.equal(layout(true).state.inspectorOpen, false)
  assert.equal(layout(true).state.railOpen, false)
  assert.equal(layout(false).state.inspectorOpen, true)
  assert.equal(layout(false).state.railOpen, true)
})

test('compact drawers are mutually exclusive without overwriting wide preferences', () => {
  const l = layout(true, { 'ss.inspector': 'open', 'ss.rail': 'closed' })
  l.setRail(true)
  l.setInspector(true)
  assert.equal(l.state.railOpen, false)
  assert.equal(l.state.inspectorOpen, true)
  assert.equal(l.storage.get('ss.inspector'), 'open')
  assert.equal(l.storage.get('ss.rail'), 'closed')
  l.media.matches = false
  assert.equal(l.panelPreference('inspector'), true)
  assert.equal(l.panelPreference('rail'), false)
})
