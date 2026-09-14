import test from 'node:test'
import assert from 'node:assert/strict'
import vm from 'node:vm'
import { readFile, mkdtemp, symlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { Readable } from 'node:stream'

async function client(storage = new Map()) {
  const posts = []
  let plugin, current = 's1', draft = '已有草稿', pending, occurrences = []
  const effects = [], callbacks = [], frameWindow = {}
  const state = { active: 'site-selection', added: ['site-selection'], sessionBindings: { s1: 'site-selection', s2: 'site-selection', other: 'another' } }
  const ctx = {
    effect: fn => effects.push(fn()),
    sessions: { list: { getSnapshot: () => ({ current }), subscribe: cb => { callbacks.push(cb); return () => {} } }, scope: () => ({ get: () => ({ input: { for: () => ({ state: { getSnapshot: () => ({ draft, occurrences }) }, setDraft: value => { draft = value } }) } }) }) },
    desktopWorkbenches: { state, subscribe: cb => { callbacks.push(cb); return () => {} }, register: () => () => {} },
  }
  const origin = 'http://127.0.0.1:5197'
  vm.runInNewContext(await readFile(new URL('../lib/client.js', import.meta.url), 'utf8'), {
    window: { location: { origin }, __ModuleLoader__: { load: spec => { plugin = spec.factory(() => ({ createElement() {} })) } } },
    document: { createElement: () => ({ dataset: {}, remove() {} }), head: { appendChild() {} } },
    localStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key) },
    fetch: async (path, options) => {
      if (options) { posts.push({ path, body: JSON.parse(options.body) }); if (pending) await pending; return { ok: true, json: async () => ({}) } }
      return { ok: true, json: async () => ({ bindings: { s1: 'project-a', s2: 'project-b' } }) }
    },
  })
  plugin.apply(ctx)
  await new Promise(resolve => setImmediate(resolve))
  return { plugin, state, storage, posts, frame: { contentWindow: frameWindow }, event: { origin, source: frameWindow, data: { project: 'project-a' } }, draft: () => draft, chips: () => { occurrences = [{}] },
    switch: id => { current = id; callbacks.forEach(cb => cb()) }, defer: promise => { pending = promise } }
}

test('iframe bridge accepts only its own frame, origin, active owner and project', async () => {
  const c = await client(), check = e => c.plugin.acceptedMessage(e, c.frame, 's1', 'project-a')
  assert.equal(check(c.event), true)
  assert.equal(check({ ...c.event, source: {} }), false)
  assert.equal(check({ ...c.event, origin: 'https://evil.test' }), false)
  assert.equal(check({ ...c.event, data: { project: 'project-b' } }), false)
  c.state.active = 'another'
  assert.equal(check(c.event), false)
  c.state.active = 'site-selection'
  c.switch('other')
  assert.equal(check(c.event), false)
})

test('draft is appended only to the active workbench-owned session', async () => {
  const c = await client()
  c.plugin.fillDraft('s1', '选址内容')
  assert.equal(c.draft(), '已有草稿\n\n选址内容')
  c.switch('s2')
  assert.throws(() => c.plugin.fillDraft('s1', 'stale'), /切换/)
  assert.equal(c.draft(), '已有草稿\n\n选址内容')
})

test('native reference chips are preserved by refusing replacement', async () => {
  const c = await client()
  c.chips()
  assert.throws(() => c.plugin.fillDraft('s1', '选址内容'), /引用/)
  assert.equal(c.draft(), '已有草稿')
})

test('project selection cannot change the session after an async navigation race', async () => {
  const c = await client()
  let release
  c.defer(new Promise(resolve => { release = resolve }))
  const opened = c.plugin.openProject('project-c')
  c.switch('s2')
  release(); await opened
  const e = { ...c.event, data: { project: 'project-b' } }
  assert.equal(c.plugin.acceptedMessage(e, c.frame, 's2', 'project-b'), true)
  c.switch('s1')
  assert.equal(c.plugin.acceptedMessage({ ...e, data: { project: 'project-c' } }, c.frame, 's1', 'project-c'), true)
  c.switch('other')
  await c.plugin.openProject('project-a')
  assert.equal(c.plugin.businessMessage(c.event, c.frame, null, 'project-a'), true)
  assert.equal(c.plugin.acceptedMessage(c.event, c.frame, null, 'project-a'), false)
})

const root = await mkdtemp(join(tmpdir(), 'site-workbench-'))
process.env.DSH_SITE_SELECTION_ROOT = root
const host = await import('../src/index.js?workbench-test')
function request(url, method = 'GET', body, extraHeaders = {}) {
  const req = Readable.from(body ? [Buffer.from(JSON.stringify(body))] : [])
  Object.assign(req, { url, method, headers: { host: '127.0.0.1:5197', 'content-type': 'application/json', ...extraHeaders } })
  let status, data
  const res = { writeHead(code) { status = code }, end(bytes) { data = bytes?.toString() } }
  return host.handleApi(req, res).then(() => ({ status, data }))
}

test('many sessions share a business project with atomic persistent selections', async () => {
  await host.ensureProject('a', { name: 'A' }); await host.ensureProject('b', { name: 'B' })
  await Promise.all([host.selectSessionProject('s1', 'a'), host.selectSessionProject('s2', 'a')])
  assert.deepEqual(await host.readSessionProjects(), { s1: 'a', s2: 'a' })
  await host.selectSessionProject('s1', 'b')
  const fresh = await import('../src/index.js?fresh-workbench')
  assert.deepEqual(await fresh.readSessionProjects(), { s1: 'b', s2: 'a' })
  await assert.rejects(host.selectSessionProject('__proto__', 'a'), /Invalid/)
  await assert.rejects(host.selectSessionProject('s1', '../a'), /Invalid/)
})

test('host blocks cross-origin and non-JSON writes and symlink file escape', async () => {
  assert.equal((await request('/api/site-selection/projects', 'POST', { name: 'no' }, { origin: 'https://evil.test' })).status, 403)
  assert.equal((await request('/api/site-selection/projects', 'POST', { name: 'no' }, { 'content-type': 'text/plain' })).status, 415)
  const { folder } = await host.ensureProject('files', { name: 'Files' })
  const outside = join(root, 'outside.txt'); await writeFile(outside, 'private')
  await symlink(outside, join(folder, 'escape.txt'))
  assert.equal((await request('/api/site-selection/file?project=files&path=escape.txt')).status, 403)
})

test('every registered route uses connection authentication, including assets', async () => {
  const routes = []
  host.apply({ effect: fn => fn(), webServer: { register: route => { routes.push(route); return () => {} } }, connection: { requestRejection: () => 401 } })
  assert.ok(routes.some(r => r.path.endsWith('/app')))
  for (const route of routes) {
    let status
    await route.handler({}, { writeHead(code) { status = code }, end() {} })
    assert.equal(status, 401)
  }
})

test('business selection works without a session, survives reload and keeps session mappings', async () => {
  const c = await client(); c.switch(null)
  await c.plugin.openProject('project-free')
  const event = { ...c.event, data: { project: 'project-free' } }
  assert.equal(c.plugin.businessMessage(event, c.frame, null, 'project-free'), true)
  assert.equal(c.posts.length, 0)
  assert.equal(c.plugin.acceptedMessage(event, c.frame, null, 'project-free'), false)
  assert.throws(() => c.plugin.fillDraft(null, 'not allowed'), /切换/)
  c.state.sessionBindings.fresh = 'site-selection'; c.switch('fresh')
  assert.equal(c.plugin.acceptedMessage(event, c.frame, 'fresh', 'project-free'), true)
  assert.deepEqual(c.posts[0].body, { sessionId: 'fresh', project: 'project-free' })
  c.switch('s1')
  assert.equal(c.plugin.acceptedMessage(c.event, c.frame, 's1', 'project-a'), true)
  c.switch(null)
  assert.equal(c.plugin.businessMessage(event, c.frame, null, 'project-free'), true)
  const reloaded = await client(c.storage); reloaded.switch(null)
  assert.equal(reloaded.plugin.businessMessage({ ...reloaded.event, data: { project: 'project-free' } }, reloaded.frame, null, 'project-free'), true)
  reloaded.state.active = 'other'
  assert.equal(reloaded.plugin.businessMessage({ ...reloaded.event, data: { project: 'project-free' } }, reloaded.frame, null, 'project-free'), false)
})
test('business creation and iframe visibility do not require a native session', async () => {
  const source = await readFile(new URL('../lib/client.js', import.meta.url), 'utf8')
  const create = source.slice(source.indexOf('    const submitCreate ='), source.indexOf("    return h('section'"))
  assert.doesNotMatch(create, /ownedSession|sessionId/)
  assert.match(source, /display: key === frameKey \? 'block' : 'none'/)
})
