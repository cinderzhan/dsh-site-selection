window.__ModuleLoader__.load({ id: 'dsh-site-selection', factory: (require) => {
  const module = { exports: {} }
  const React = require('react')
  const h = React.createElement

  const css = `
  .ss-panel{position:relative;display:flex;flex-direction:column;width:100%;height:100%;min-height:0;min-width:0;
    background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-primary,#17191c);
    font-family:-apple-system,BlinkMacSystemFont,"PingFang SC",sans-serif}
  .ss-head{background-color:#fafaf8}
  @media (prefers-color-scheme:dark){ .ss-head{background-color:#25292b} }
  .ss-head{height:48px;flex:none;display:flex;align-items:center;gap:7px;padding:0 10px;
    border-bottom:1px solid var(--dsw-alias-border-l1,#dfe1e4)}
  .ss-head strong{font-size:12px;font-weight:600;padding:6px 2px}
  .ss-spacer{margin-left:auto;align-self:stretch}

  .ss-picker{position:relative;min-width:0;flex:1 1 auto;max-width:320px}
  .ss-picker-btn{width:100%;height:34px;display:flex;align-items:center;gap:7px;padding:0 9px;
    border:1px solid var(--dsw-alias-border-l1,#dfe1e4);border-radius:9px;
    background:var(--dsw-alias-bg-base,#fff);cursor:pointer;text-align:left}
  .ss-picker-btn:hover{border-color:var(--dsw-alias-label-secondary,#8a8e91)}
  .ss-picker-btn[data-open="true"]{border-color:#3f7d6f;box-shadow:0 0 0 3px rgba(63,125,111,.13)}
  .ss-picker-btn b{min-width:0;flex:1;font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .ss-picker-btn small{flex:none;color:var(--dsw-alias-label-secondary,#8a8e91);font-size:10px}
    /* The caret was 10px of text and read as decoration rather than as the
     control it is. Give it a real box so the whole affordance is visible. */
  .ss-picker-btn i{flex:none;font-style:normal;width:20px;height:20px;margin-right:-2px;
    display:flex;align-items:center;justify-content:center;border-radius:5px;
    color:var(--dsw-alias-label-secondary,#8a8e91);font-size:13px;line-height:1}
  .ss-picker-btn:hover i{background:var(--dsw-alias-interactive-bg-hover,#eef1f0);
    color:var(--dsw-alias-label-primary,#17191c)}
  .ss-menu{position:absolute;z-index:9;left:0;top:38px;width:max(300px,100%);max-height:60vh;overflow:auto;
    padding:5px;border:1px solid var(--dsw-alias-border-l1,#dfe1e4);border-radius:11px;
    background-color:#fff;box-shadow:0 10px 34px rgba(20,24,28,.2)}
  @media (prefers-color-scheme:dark){ .ss-menu{background-color:#1d2022} }
  .ss-menu-item{width:100%;min-height:46px;display:flex;align-items:center;gap:9px;padding:7px 9px;
    border:0;border-radius:8px;background:transparent;color:inherit;cursor:pointer;text-align:left}
  .ss-menu-item:hover{background:var(--dsw-alias-interactive-bg-hover,#f1f2f3)}
  .ss-menu-item[data-current="true"]{background:rgba(63,125,111,.11)}
  .ss-menu-item .col{min-width:0;flex:1}
  .ss-menu-item b{display:block;font-size:12px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .ss-menu-item small{display:block;margin-top:2px;color:var(--dsw-alias-label-secondary,#8a8e91);font-size:10px}
  .ss-menu-item .tick{flex:none;color:#3f7d6f;font-size:13px}
  .ss-row-acts{flex:none;display:flex;gap:2px;opacity:0}
  .ss-menu-item:hover .ss-row-acts,.ss-menu-item:focus-within .ss-row-acts{opacity:1}
  .ss-row-acts span{width:26px;height:26px;display:grid;place-items:center;border-radius:6px;
    color:var(--dsw-alias-label-secondary,#8a8e91);font-size:12px;cursor:pointer}
  .ss-row-acts span:hover{background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-primary,#17191c)}
  .ss-row-acts span[data-danger="true"]:hover{background:rgba(168,69,60,.12);color:#a8453c}
  .ss-menu-sep{margin:5px 4px;border-top:1px solid var(--dsw-alias-border-l1,#dfe1e4)}
  .ss-menu-empty{padding:14px 10px;color:var(--dsw-alias-label-secondary,#8a8e91);font-size:11px;text-align:center;line-height:1.7}

  .ss-icon{width:32px;height:32px;flex:none;border:1px solid transparent;border-radius:8px;background:transparent;
    color:var(--dsw-alias-label-secondary,#6f7578);font-size:14px;line-height:1;cursor:pointer}
  .ss-icon:hover{border-color:var(--dsw-alias-border-l1,#dfe1e4);background:var(--dsw-alias-bg-base,#fff)}
  .ss-frame{flex:1;width:100%;min-height:0;border:0;background:var(--dsw-alias-bg-base,#fff)}
  .ss-empty{flex:1;display:grid;place-items:center;padding:24px;text-align:center;
    color:var(--dsw-alias-label-secondary,#6f7578);font-size:12px;line-height:1.8}
  .ss-ask{position:absolute;inset:0;z-index:8;display:grid;place-items:center;background:rgba(0,0,0,.45);padding:24px}
  .ss-ask-card{width:min(420px,100%);padding:16px;border:1px solid var(--dsw-alias-border-l1,#dfe1e4);border-radius:11px;
    background-color:#fff}
  @media (prefers-color-scheme:dark){ .ss-ask-card{background-color:#1d2022} }
  .ss-ask-card h3{margin:0 0 5px;font-size:13px}
  .ss-ask-card p{margin:0 0 10px;color:var(--dsw-alias-label-secondary,#6f7578);font-size:11px;line-height:1.6}
  .ss-ask-card input{width:100%;height:32px;padding:0 9px;border:1px solid var(--dsw-alias-border-l1,#dfe1e4);
    border-radius:7px;background:transparent;font-size:12px;outline:0}
  .ss-ask-card input:focus{border-color:var(--dsw-alias-accent,#3f7d6f)}
  .ss-ask-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:9px}
  .ss-ask-grid label{display:block;min-width:0}
  .ss-ask-grid span{display:block;margin-bottom:3px;color:var(--dsw-alias-label-secondary,#6f7578);font-size:10px}
  .ss-ask-grid select,.ss-ask-grid input{width:100%;height:30px;padding:0 8px;
    border:1px solid var(--dsw-alias-border-l1,#dfe1e4);border-radius:7px;background:transparent;font-size:11px}
  .ss-ask-grid input::placeholder{color:var(--dsw-alias-label-tertiary,#9aa0a3)}
  /* The brand field takes free text, so it needs the full width for a hint that
     actually explains what to type. */
  .ss-ask-grid label.ss-ask-wide{grid-column:1 / -1}
  .ss-ask-actions{display:flex;justify-content:flex-end;gap:6px;margin-top:11px}
  .ss-ask-actions button{height:28px;padding:0 12px;border:1px solid var(--dsw-alias-border-l1,#dfe1e4);border-radius:7px;
    background:transparent;font-size:11px;cursor:pointer}
  .ss-ask-actions button[data-primary="true"]{border-color:#3f7d6f;background:#3f7d6f;color:#fff;font-weight:600}
  .ss-toast{position:absolute;z-index:60;left:50%;bottom:22px;transform:translate(-50%,10px);max-width:70vw;
    padding:9px 14px;border:1px solid var(--dsw-alias-border-l1,#dfe1e4);border-radius:8px;
    background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-primary,#17191c);font-size:12px;
    box-shadow:0 6px 24px rgba(20,24,28,.16);opacity:0;pointer-events:none;transition:.18s}
  .ss-toast[data-show="true"]{opacity:1;transform:translate(-50%,0)}`

  let bridge = null
  const listeners = new Set()
  let openState = { project: null, sessionId: null, message: '' }
  let projectIndex = []
  let sessionProjects = {}
  const emit = () => listeners.forEach(fn => fn())
  const subscribe = fn => { listeners.add(fn); return () => listeners.delete(fn) }
  function setOpen(next) { openState = { ...openState, ...next }; emit() }
  function toast(message) { setOpen({ message }) }
  const currentSession = () => bridge?.sessions.list.getSnapshot().current || null
  function ownedSession() {
    const id = currentSession()
    const state = bridge?.desktopWorkbenches.state
    return state?.active === 'site-selection' && state.added.includes('site-selection') &&
      state.sessionBindings[id] === 'site-selection' ? id : null
  }
  function followSession() {
    const id = ownedSession()
    if (!id && bridge?.desktopWorkbenches.state.active !== 'site-selection') return
    setOpen({ sessionId: id, project: id ? sessionProjects[id] || null : null, message: '' })
  }
  function acceptedMessage(event, frame, sessionId, project) {
    return event.origin === window.location.origin && event.source === frame?.contentWindow &&
      !!sessionId && ownedSession() === sessionId && openState.project === project &&
      event.data?.project === project
  }
  async function request(path, options) {
    const response = await fetch(path, options)
    const result = await response.json()
    if (!response.ok) throw new Error(result.error || `HTTP ${response.status}`)
    return result
  }
  const projectUrl = (path, slug) => `${path}?project=${encodeURIComponent(slug)}`
  const bootstrap = slug => request(projectUrl('/api/site-selection/bootstrap', slug))

  function fillDraft(sessionId, prompt) {
    if (ownedSession() !== sessionId) throw new Error('会话已切换，请在当前工作台重新操作')
    const actx = bridge.sessions.scope?.(sessionId)
    const conversation = actx?.get?.('conversation')
    if (!conversation) throw new Error('对话输入不可用')
    const input = conversation.input.for(actx)
    const snapshot = input.state.getSnapshot()
    if (snapshot.occurrences?.length || (snapshot.phase && snapshot.phase !== 'plain')) throw new Error('当前草稿含引用或特殊输入，请先在原生会话中处理后再添加选址内容')
    const current = snapshot.draft || ''
    input.setDraft(current.trim() ? `${current}\n\n${prompt}` : prompt)
  }

  async function openProject(slug) {
    const sessionId = ownedSession()
    if (!sessionId) throw new Error('请先使用 Desktop 上方入口选择工作区并新建会话')
    await request('/api/site-selection/session-projects', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ sessionId, project: slug }),
    })
    sessionProjects[sessionId] = slug
    if (ownedSession() === sessionId) setOpen({ project: slug, sessionId, message: '' })
  }

  /** Assemble what the conversation needs to act on the current selection. */
  function askPrompt(detail, result) {
    const state = result.state
    const site = detail?.site
    const asks = {
      parse: '下面是中介/房东发来的铺源信息。请解析成结构化的候选点位，按 CONTEXT.md 的字段要求追加到 project.json 的 sites 数组里。'
        + '能确定的字段才填，不确定的填 null——尤其是坐标和排烟条件，不要猜。解析完在 activity 里说明你加了几个、哪些字段缺失需要我补。',
      brief: '为当前选中的点位生成一页上会材料初稿：区位结论、数据依据、风险提示、待确认事项。先写在对话里给我看，我确认后再落到 exports/。',
      compare: '对比工作台当前勾选的这几个点位，指出它们的关键差异和各自的主要风险。只给判断，不要改文件。',
      research: '查一下这个点位所在位置的公开信息：周边在建项目、地铁规划、临近的大型客流源（写字楼/学校/医院/景点）、以及餐饮相关的地方性限制。工作台只有 OpenStreetMap 的静态数据，看不到这些——这正是需要你补的部分。把你能确认的写进对话，不确定的标明。',
      free: '结合当前选中的点位回答我下面的问题。',
      find: '我要找点位。把我的要求翻译成 query-sites.mjs 的 --where 表达式去查，**不要靠网页搜索猜坐标**。'
        + '先跑 `--fields` 看清楚有哪些字段、以及哪些东西数据里根本没有；'
        + '如果我的要求里有数据查不到的（比如实测人流量、商场档次、租金），直接告诉我数据里没有，'
        + '用代理指标时要说明是代理——不要拿一段分析糊过去。'
        + '查完先把结果念给我听，我认可之后再加 --write 写进 project.json。'
        + '一条都查不到就放宽条件再试，并说明你放宽了哪一条。',
    }
    // The prompt opens with where we are. This array was referenced but never
    // declared, so every 交给 DSH button failed with "lines is not defined".
    const p = state.project || {}
    const lines = [
      `项目：${p.name || ''}${p.city ? `（${p.city}）` : ''}${p.referenceBrand ? `　参照品牌：${p.referenceBrand}` : ''}`,
      `项目文件夹：${result.folder || ''}`,
    ]
    // Without a selection there is still plenty worth sending: the baseline, the
    // saved sites and their scores. "Find me 80+ spots" must be answerable with
    // nothing selected — requiring a click first was the whole complaint.
    if (!site) {
      const saved = state.sites || []
      lines.push('', `已保存点位：${saved.length} 个`)
      for (const row of saved.slice(0, 25)) {
        lines.push(`  - ${row.name}（${row.id}）${Number.isFinite(row.lng) ? ` ${row.lng}, ${row.lat}` : ' ⚠ 缺坐标'}　状态 ${row.status}`)
      }
      if (!saved.length) lines.push('  （还没有保存任何点位）')
    }
    if (site) {
      const sc = detail.score || {}
      const f = sc.features || {}
      lines.push('', `当前选中：${site.name}（${site.id}）　${site.address || ''}`,
        `坐标 ${site.lng ?? '—'}, ${site.lat ?? '—'}`,
        `面积 ${site.area ?? '—'} ㎡　月租 ${site.rent ?? '—'} 元　临街面宽 ${site.frontage ?? '—'} m　楼层 ${site.floor ?? '—'}`,
        `商圈类型 ${f.districtType ?? '—'}　综合评分 ${sc.score ?? '—'}`)
      lines.push(`周边：最近地铁 ${f.metroDist ?? '—'}m　500m 建筑面积 ${Number.isFinite(f.floorArea500) ? `${(f.floorArea500 / 1e4).toFixed(1)} 万㎡` : '无数据'}　500m 餐饮 ${f.food500 ?? '—'} 家　500m 咖啡 ${f.cafe500 ?? '—'} 家　最近商场 ${f.mallDist ?? '—'}m`)
      if (sc.metrics?.length) {
        lines.push('各项百分位（对比参照品牌现有门店）：')
        for (const m of sc.metrics) lines.push(`  - ${m.label}：${m.value} ${m.unit} → 第 ${m.percentile} 百分位`)
      }
      if (sc.flags?.length) lines.push(`风险提示：${sc.flags.map(x => x.text).join('；')}`)
      if (sc.exclusions?.length) lines.push(`硬性排除：${sc.exclusions.map(e => e.text).join('；')}`)
      if (sc.conflicts?.length) lines.push(`矛盾信号：${sc.conflicts.map(c => c.text).join('；')}`)
      if (sc.rentFlag) lines.push(`租金提示：${sc.rentFlag.text}`)
      if (site.fieldNotes?.length) {
        lines.push('我的踩点记录：')
        for (const n of site.fieldNotes) lines.push(`  - 高峰 ${n.peakFlow ?? '—'} 人/时，平峰 ${n.offpeakFlow ?? '—'} 人/时。${n.observation}`)
      }
    }
    if (detail?.payload) lines.push('', '--- 待处理内容 ---', String(detail.payload).slice(0, 6000), '--- 内容结束 ---')
    return [...lines, '', asks[detail?.mode] || asks.free, detail?.request ? `我的要求：${detail.request}` : ''].filter(Boolean).join('\n')
  }

  // ── components ───────────────────────────────────────────
  function Panel() {
    const [state, setState] = React.useState(openState)
    const [projects, setProjects] = React.useState([])
    const frames = React.useRef(new Map())
    const frameKey = `${state.sessionId}:${state.project}`
    if (state.project && !frames.current.has(frameKey)) frames.current.set(frameKey, { project: state.project, node: null })
    // window.prompt() is not implemented in Electron — it returns without showing
    // anything, which silently dead-ended both create buttons. Ask in-panel instead.
    const [ask, setAsk] = React.useState(null)
    const [menuOpen, setMenuOpen] = React.useState(false)
    const [rename, setRename] = React.useState(null)
    const [confirmDel, setConfirmDel] = React.useState(null)
    const [catalog, setCatalog] = React.useState([])
    const [samples, setSamples] = React.useState([])
    const [formats, setFormats] = React.useState([])
    React.useEffect(() => {
      request('/api/site-selection/datasets')
        .then(r => { setCatalog(r.datasets); setSamples(r.samples || []); setFormats(r.formats || []) })
        .catch(() => {})
    }, [])

    React.useEffect(() => subscribe(() => setState({ ...openState })), [])

    const reload = React.useCallback(() => {
      request('/api/site-selection/projects')
        .then(r => {
          setProjects(r.projects)
          projectIndex = r.projects
          if (openState.project && !r.projects.some(row => row.id === openState.project)) setOpen({ project: null })
        })
        .catch(e => toast(e.message))
    }, [])
    React.useEffect(() => { reload() }, [state.sessionId, reload])

    // Any click outside the menu closes it, including inside the workbench iframe.
    React.useEffect(() => {
      if (!menuOpen) return undefined
      const close = () => setMenuOpen(false)
      document.addEventListener('click', close)
      window.addEventListener('blur', close)
      return () => { document.removeEventListener('click', close); window.removeEventListener('blur', close) }
    }, [menuOpen])

    const current = projects.find(row => row.id === state.project) || null

    React.useEffect(() => {
      const onMessage = async event => {
        const sessionId = state.sessionId, project = state.project
        if (!acceptedMessage(event, frames.current.get(`${sessionId}:${project}`)?.node, sessionId, project)) return
        const data = event.data
        if (data?.type === 'dsh-site-selection:ask') {
          try {
            const result = await bootstrap(project)
            // The async load must not deliver a previous project's prompt after navigation.
            if (!acceptedMessage(event, frames.current.get(`${sessionId}:${project}`)?.node, sessionId, project)) return
            fillDraft(sessionId, askPrompt(data, result))
            event.source.postMessage({ type: 'dsh-site-selection:ask-result', ok: true }, event.origin)
          } catch (error) {
            if (!acceptedMessage(event, frames.current.get(`${sessionId}:${project}`)?.node, sessionId, project)) return
            event.source.postMessage({ type: 'dsh-site-selection:ask-result', ok: false, error: error.message }, event.origin)
            toast(error.message)
          }
        }
        if (data?.type === 'dsh-site-selection:projects-changed') reload()
        if (data?.type === 'dsh-site-selection:whoami') event.source.postMessage({
          type: 'dsh-site-selection:bound', ok: true,
          detail: `当前会话 ${sessionId.slice(0, 8)}… · 选址项目独立于 DSH 工作区；交给 DSH 会追加到草稿，确认后发送。`,
        }, event.origin)
      }
      window.addEventListener('message', onMessage)
      return () => window.removeEventListener('message', onMessage)
    }, [reload, state.sessionId, state.project])

    const submitCreate = async () => {
      if (!ownedSession()) { toast('请先通过 Desktop 新建会话'); return }
      const name = String(ask.value || '').trim()
      if (!name) return
      const { sample, dataset, format, referenceBrand } = ask
      setAsk(null)
      try {
        const result = await request('/api/site-selection/projects', {
          method: 'POST', headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ name, sample: sample || false, dataset, format, referenceBrand }),
        })
        reload()
        await openProject(result.project.id)
        toast(sample ? '示例项目已创建（含真实 POI + 合成门店数据）' : '项目已创建')
      } catch (error) { toast(`创建失败：${error.message}`) }
    }

    return h('section', { className: 'ss-panel' },
      h('header', { className: 'ss-head' },
        h('strong', null, '选址工作台'),
        // A real dropdown rather than a 26px native <select>: the row is the hit
        // target, and creating a project lives in the same menu instead of
        // behind two more small icons.
        h('div', { className: 'ss-picker' },
          h('button', {
            className: 'ss-picker-btn', type: 'button', 'data-open': String(menuOpen),
            title: '切换项目',
            onClick: e => { e.stopPropagation(); setMenuOpen(!menuOpen); if (!menuOpen) reload() },
          },
            h('b', null, current ? current.name : (projects.length ? '选择项目…' : '还没有项目')),
            current ? h('small', null, `${current.sites} 个点位`) : null,
            h('i', null, menuOpen ? '▴' : '▾')),
          menuOpen ? h('div', { className: 'ss-menu', onClick: e => e.stopPropagation() },
            projects.length
              ? projects.map(row => h('button', {
                  key: row.id, className: 'ss-menu-item', type: 'button',
                  'data-current': String(row.id === state.project),
                  onClick: () => {
                    setMenuOpen(false)
                    openProject(row.id).catch(err => toast(err.message))
                  },
                },
                  h('span', { className: 'col' },
                    h('b', null, row.name),
                    h('small', null, `${row.city || '未设城市'} · ${row.statusLabel}${row.referenceBrand ? ` · 参照 ${row.referenceBrand}` : ''}`)),
                  h('span', { className: 'ss-row-acts' },
                    h('span', {
                      title: '重命名', role: 'button',
                      onClick: e => { e.stopPropagation(); setMenuOpen(false); setRename({ id: row.id, value: row.name }) },
                    }, '✎'),
                    h('span', {
                      title: '删除项目', role: 'button', 'data-danger': 'true',
                      onClick: e => { e.stopPropagation(); setMenuOpen(false); setConfirmDel(row) },
                    }, '🗑')),
                  row.id === state.project ? h('span', { className: 'tick' }, '✓') : null))
              : h('div', { className: 'ss-menu-empty' }, '还没有项目。', h('br'), '用下面两项新建一个。'),
            h('div', { className: 'ss-menu-sep' }),
            h('button', {
              className: 'ss-menu-item', type: 'button',
              onClick: () => { setMenuOpen(false); setAsk({ sample: false, value: '',
                dataset: catalog[0]?.id || '', format: 'restaurant', referenceBrand: '' }) },
            }, h('span', { className: 'col' }, h('b', null, '＋ 新建项目'),
                h('small', null, '选城市数据集，参照品牌可留空'))),
            ...samples.map(sp => h('button', {
              key: sp.id, className: 'ss-menu-item', type: 'button',
              onClick: () => { setMenuOpen(false); setAsk({ sample: sp.id, value: sp.label }) },
            }, h('span', { className: 'col' }, h('b', null, `◇ 示例：${sp.label}`),
                h('small', null, sp.blurb))))) : null),
        h('button', { className: 'ss-icon', type: 'button', title: '刷新项目列表', onClick: reload }, '↻'),
        h('span', { className: 'ss-spacer' })),
      ...[...frames.current.entries()].map(([key, item]) => h('iframe', {
        ref: node => { item.node = node }, key, className: 'ss-frame', title: '选址工作台',
        style: { display: key === frameKey && state.sessionId ? 'block' : 'none' },
        src: projectUrl('/api/site-selection/app', item.project),
      })),
      !state.project && h('div', { className: 'ss-empty' }, state.sessionId
        ? '从上方项目菜单新建或选择一个选址项目。'
        : '请先通过 Desktop 上方入口选择工作区并新建会话，再选择选址项目。'),
      rename && h('div', { className: 'ss-ask', onMouseDown: e => { if (e.target === e.currentTarget) setRename(null) } },
        h('form', {
          className: 'ss-ask-card',
          onSubmit: async e => {
            e.preventDefault()
            const name = String(rename.value || '').trim()
            const id = rename.id
            setRename(null)
            if (!name) return
            try {
              await request('/api/site-selection/action', {
                method: 'POST', headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ project: id, type: 'rename-project', name }),
              })
              reload()
              toast('已重命名')
            } catch (error) { toast(`重命名失败：${error.message}`) }
          },
        },
          h('h3', null, '重命名项目'),
          h('p', null, '只改显示名称，项目文件夹和会话的工作区都不动。'),
          h('input', {
            autoFocus: true, value: rename.value, placeholder: '项目名称',
            onChange: e => setRename(prev => ({ ...prev, value: e.target.value })),
            onKeyDown: e => { if (e.key === 'Escape') { e.preventDefault(); setRename(null) } },
          }),
          h('div', { className: 'ss-ask-actions' },
            h('button', { type: 'button', onClick: () => setRename(null) }, '取消'),
            h('button', { type: 'submit', 'data-primary': 'true' }, '保存')))),

      confirmDel && h('div', { className: 'ss-ask', onMouseDown: e => { if (e.target === e.currentTarget) setConfirmDel(null) } },
        h('form', {
          className: 'ss-ask-card',
          onSubmit: async e => {
            e.preventDefault()
            const row = confirmDel
            setConfirmDel(null)
            try {
              await request('/api/site-selection/projects/delete', {
                method: 'POST', headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ project: row.id }),
              })
              if (state.project === row.id) setOpen({ project: null })
              reload()
              toast('项目已移入回收站')
            } catch (error) { toast(`删除失败：${error.message}`) }
          },
        },
          h('h3', null, `删除「${confirmDel.name}」？`),
          h('p', null, `这个项目有 ${confirmDel.sites} 个点位。不会真的删掉文件——`,
            '整个文件夹会移到数据目录下的 .trash/ 里，需要时可以手动找回。'),
          h('div', { className: 'ss-ask-actions' },
            h('button', { type: 'button', onClick: () => setConfirmDel(null) }, '取消'),
            h('button', { type: 'submit', 'data-primary': 'true', style: { background: '#a8453c', borderColor: '#a8453c' } }, '删除')))),

      ask && h('div', { className: 'ss-ask', onMouseDown: e => { if (e.target === e.currentTarget) setAsk(null) } },
        h('form', {
          className: 'ss-ask-card',
          onSubmit: e => { e.preventDefault(); submitCreate() },
        },
          h('h3', null, ask.sample ? '新建示例项目' : '新建选址项目'),
          h('p', null, ask.sample
            ? '会载入该城市的真实 POI、路网与三维建筑，以及一组用工作台自己的模型从真实商业地址里挑出来的候选点位。面积租金留空——那些要谈过才知道。'
            : '选城市和业态就能开始。业态决定「同类竞争」按什么算——开药店就跟药店比，不会拿咖啡店当竞品。'
              + '参照品牌留空即可，默认拿全区所有已有商业位置当基线。'),
          h('input', {
            autoFocus: true, value: ask.value, placeholder: '项目名称，例如「朝阳区开店」',
            onChange: e => setAsk(prev => ({ ...prev, value: e.target.value })),
            onKeyDown: e => { if (e.key === 'Escape') { e.preventDefault(); setAsk(null) } },
          }),
          !ask.sample && catalog.length ? h('div', { className: 'ss-ask-grid' },
            h('label', null, h('span', null, '城市数据集'),
              h('select', {
                value: ask.dataset,
                onChange: e => {
                  const next = catalog.find(c => c.id === e.target.value)
                  setAsk(prev => ({ ...prev, dataset: e.target.value }))
                },
              }, ...catalog.map(c => h('option', { key: c.id, value: c.id },
                `${c.label}${c.simulated ? '（模拟数据）' : ''}`)))),
            h('label', null, h('span', null, '业态'),
              h('select', {
                value: ask.format,
                onChange: e => setAsk(prev => ({ ...prev, format: e.target.value })),
              }, ...formats.map(f => h('option', { key: f.id, value: f.id }, f.label)))),
            // Free text, not a list: the useful reference is usually a specific
            // chain the operator has in mind, and no fixed list will contain it.
            h('label', { className: 'ss-ask-wide' }, h('span', null, '参照品牌（可选）'),
              h('input', {
                type: 'text', value: ask.referenceBrand, list: 'ss-brand-hints',
                placeholder: '留空＝用全区基线；也可填「星巴克」「屈臣氏」等具体品牌',
                onChange: e => setAsk(prev => ({ ...prev, referenceBrand: e.target.value })),
              }),
              h('datalist', { id: 'ss-brand-hints' },
                ...(catalog.find(c => c.id === ask.dataset)?.brands || [])
                  .map(b => h('option', { key: b, value: b }))))) : null,
          h('div', { className: 'ss-ask-actions' },
            h('button', { type: 'button', onClick: () => setAsk(null) }, '取消'),
            h('button', { type: 'submit', 'data-primary': 'true' }, '创建')))),
      state.message && h('div', { className: 'ss-toast', 'data-show': 'true', role: 'status' }, state.message))
  }

  const inject = ['desktopWorkbenches', 'sessions', 'conversation']
  function apply(ctx) {
    bridge = ctx
    ctx.effect(() => {
      let live = true
      request('/api/site-selection/session-projects').then(r => {
        if (!live) return
        sessionProjects = r.bindings
        followSession()
      }).catch(error => { if (live) toast(error.message) })
      const sessionDispose = ctx.sessions.list.subscribe(followSession)
      const workbenchDispose = ctx.desktopWorkbenches.subscribe(followSession)
      return () => { live = false; sessionDispose(); workbenchDispose() }
    })
    ctx.effect(() => {
      const style = document.createElement('style')
      style.dataset.dshPlugin = 'dsh-site-selection'
      style.textContent = css
      document.head.appendChild(style)
      return () => style.remove()
    })
    ctx.effect(() => ctx.desktopWorkbenches.register({
      id: 'site-selection', title: '门店选址', icon: '◎', panelTitle: '选址项目与地图',
      description: '三维城市地图、点位评分、铺源比较与踩点记录。',
      audience: '门店拓展与选址团队', requirements: '使用原生会话模型及工具；地图数据随包提供。',
      initialization: 'empty', embedded: true, version: '1.1.0', author: 'DataElement', layout: { businessSide: 'left', businessWidth: 0.65 },
    }, Panel))
  }

  module.exports = { inject, apply, acceptedMessage, fillDraft, openProject, followSession }
  return module.exports
} })
