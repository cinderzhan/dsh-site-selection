import test from 'node:test'
import assert from 'node:assert/strict'
import vm from 'node:vm'
import {readFile} from 'node:fs/promises'
const source = await readFile(new URL('../lib/client.js', import.meta.url), 'utf8')
function setup({fail=false, wait, oldProject=false}={}) {
 let api, current=oldProject?'old-session':null, draft='existing', saved=null, descriptor, component
 const state={active:'site-selection',sessionBindings:{}}
 const calls=[]
 let hostListener=()=>{}
 const ctx={effect:fn=>fn(), sessions:{list:{getSnapshot:()=>({current}),subscribe:()=>()=>{}},scope:()=>({get:()=>({input:{for:()=>({state:{getSnapshot:()=>({draft})},setDraft:v=>draft=v})}})})},conversation:{},desktopWorkbenches:{subscribe:fn=>{hostListener=fn;return()=>{}},getSnapshot:()=>({state}),register:(d,c)=>{descriptor=d;component=c;return()=>{}},ensureSession:async args=>{calls.push(args);if(wait)await wait;if(fail)throw Error('failed');hostListener();current=args.sessionId||'session-new';state.sessionBindings[current]='site-selection';return current}}}
 const document={head:{appendChild(){}},createElement:()=>({dataset:{}})}
 vm.runInNewContext(source,{window:{__ModuleLoader__:{load:({factory})=>{api=factory(()=>({}))}}},document,localStorage:{getItem:()=>null,setItem(){}},setTimeout,clearTimeout,setInterval,clearInterval,fetch:async(path,options)=>({ok:true,json:async()=>{if(path.endsWith('/projects'))return{projects:oldProject?[{id:'old-project',sessionId:'old-session'}]:[]};if(path.includes('/bootstrap'))return{folder:'/data/project',state:{project:{name:'original',sessionId:saved}}};saved=JSON.parse(options.body).sessionId;return{}}})})
 api.apply(ctx)
 return{api,calls,state,get draft(){return draft},get saved(){return saved},get descriptor(){return descriptor},get component(){return component}}
}
test('original project open creates native workspace/session via host and retains onboarding draft',async()=>{
 const t=setup();await t.api.openProject('project');assert.equal(t.calls[0].folder,'/data/project');assert.equal(t.saved,'session-new');assert.match(t.draft,/existing/);assert.match(t.draft,/先读 CONTEXT.md/);assert.equal(typeof t.component,'function');assert.equal(t.descriptor.id,'site-selection');
 const once=t.draft;await t.api.openProject('project');assert.equal(t.calls[1].sessionId,'session-new');assert.equal(t.draft,once)
})
test('business panel selection is immediate and survives native session failure',async()=>{
 const t=setup({fail:true});const operation=t.api.openProject('project');assert.equal(t.api.getState().project,'project');await assert.rejects(operation,/failed/);assert.equal(t.api.getState().project,'project')
})
test('switching away while creating cannot write into a different workbench',async()=>{
 let finish;const wait=new Promise(r=>finish=r);const t=setup({wait});const operation=t.api.openProject('project');await new Promise(r=>setImmediate(r));t.state.active='other';finish();await operation;assert.equal(t.draft,'existing');assert.equal(t.saved,'session-new')
})
test('original business app assets unchanged and no global shell hooks or workspace sweeping',()=>{
 assert.doesNotMatch(source,/shell\.overlay|sidebar\.footer\.action|workspaces\.delete|paddingLeft/)
})

test('host routes reject missing authentication before serving business data',async()=>{
 const {apply}=await import('../src/index.js');const routes=[]
 apply({effect:fn=>fn(),webServer:{register:r=>routes.push(r)},connection:{requestRejection:()=>401}})
 let status,body;const response={writeHead:s=>{status=s},end:b=>{body=b}}
 await routes[0].handler({},response)
 assert.equal(status,401);assert.match(body,/Authentication required/)
})

test('host publication before opening second project does not restore the old business selection',async()=>{
 const t=setup({oldProject:true});await new Promise(r=>setImmediate(r));
 assert.equal(t.api.getState().project,'old-project');
 await t.api.openProject('second-project');
 assert.equal(t.api.getState().project,'second-project');
 assert.equal(t.saved,'session-new');assert.match(t.draft,/先读 CONTEXT.md/)
})
