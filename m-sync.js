/* Мобилка ← данные админки: цены, скрытые, новые товары, акции, метки, статусы, RU-тексты, заказы в журнал */
(function(){
const S=document.currentScript,FILE=S.dataset.f,DIR=S.dataset.img||'assets/ro2/',PROMO_PAGE=FILE==='promo';
const API=/^(localhost|127\.0\.0\.1)$/.test(location.hostname)?'':'https://teka-admin.teka-md.workers.dev';
const CATS=[['ovens','assets/ro/','Cuptoare','Духовки'],['hobs','assets/ro2/','Plite','Варочные панели'],['hoods','assets/ro2/','Hote','Вытяжки'],
 ['microwaves','assets/ro2/','Cuptoare cu microunde','Микроволновки'],['compact','assets/ro2/','Espressoare','Кофемашины'],['fridges','assets/ro2/','Frigidere','Холодильники'],
 ['wine-coolers','assets/ro2/','Răcitoare de vin','Винные шкафы'],['dishwashers','assets/ro2/','Mașini de spălat vase','Посудомойки'],['sinks','assets/ro2/','Chiuvete','Мойки'],
 ['faucets','assets/ro2/','Baterii','Смесители'],['laundry','assets/ro2/','Spălare și uscare','Стирка и сушка'],['accessories','assets/ro2/','Accesorii','Аксессуары']];
const rd=u=>fetch(u,{cache:'no-cache'}).then(r=>r.ok?r.json():null).catch(()=>null);
const today=()=>new Date().toLocaleDateString('sv-SE',{timeZone:'Europe/Chisinau'});
const nm=x=>x.n||x.name||'',pr=x=>+(x.p||x.price||0),od=x=>+(x.o||x.old||0);
const ru=()=>typeof L!=='undefined'&&L==='ru';
const TX={order:['La comandă','Под заказ'],out:['Nu este în stoc','Нет в наличии'],hit:['Hit','Хит'],new:['Nou','Новинка'],ref:['Recondiționat','Восстановленный'],until:['Ofertă până la ','Акция до ']};
const tr=k=>TX[k][ru()?1:0];
let RU={};

// путь к картинке относительно папки, которую подставляет страница (assets/ro/ или assets/ro2/)
function rel(u,dir){u=String(u||'');if(!u||/^https?:/.test(u))return u;if(u.startsWith('assets/'))return dir.split('/').filter(Boolean).slice(1).map(()=>'..').join('/')+'/'+u.slice(7);return u}
function img(f,dir){return f&&dir!==DIR?rel(dir+f,DIR):f}

function applyPromo(x,f,PL){const base=Math.max(x.p,x.o);if(!x.p)return x;let best=null,bp=x.p;
 for(const p of PL){if(!(p.scope==='all'||p.scope==='cat'&&(p.cats||[]).includes(f)||p.scope==='sku'&&(p.skus||[]).map(String).includes(String(x.sku))))continue;
  const np=Math.max(0,Math.round(p.kind==='sum'?base-p.v:base*(1-p.v/100)));if(np<bp){bp=np;best=p}}
 if(best){x._pm=best;x.p=bp;x.o=base}return x}

function merge(x,base,f,dir,PL){
 const m=Object.assign({f:[],fc:{},pdf:[],desc:[],specs:[],img:[]},base||{});
 const set=(k,v)=>{if(v!==undefined&&v!==null)m[k]=v};
 m.sku=String(x.sku||'');set('n',nm(x)||undefined);set('sub',x.sub);m.p=pr(x);m.o=od(x);m.b=x.b||x.brand||m.b||'Teka';
 set('desc',x.desc);set('specs',x.specs);set('pdf',x.pdf);
 if(x.u&&x.u.length)m.img=x.u.map(u=>rel(u,DIR));else if(x.img)m.img=x.img.map(i=>img(i,dir));
 if(x.draw!==undefined)m.draw=img(x.draw,dir);if(x.label!==undefined)m.label=img(x.label,dir);
 ['kind','w','col','st','tag','ord'].forEach(k=>{if(x[k]!==undefined)m[k]=x[k]});
 if(!base){m.fc=Object.assign({brand:m.b},x.kind?{kind:x.kind}:{},x.col?{col:x.col}:{})}
 m._f=f;applyPromo(m,f,PL);
 const d=m.o>m.p&&m.p?Math.round((1-m.p/m.o)*100):0;
 if(d){m.t='sale';m.d=d}else if(m.t==='sale'){m.t='';m.d=0}
 m._ro={sub:m.sub,desc:m.desc,specs:m.specs};
 return m}

const ordv=x=>(x.ord!==''&&x.ord!=null&&!isNaN(x.ord)?+x.ord:1e6)-(x.tag==='hit'?.5:0);

function lang(){P.forEach(p=>{const o=p._ro;if(!o)return;const R=ru();
 p.sub=R&&RU.s&&RU.s[o.sub]||o.sub;
 p.desc=(o.desc||[]).map(d=>R&&RU.d&&RU.d[d]||d);
 p.specs=(o.specs||[]).map(g=>({t:R&&RU.k&&RU.k[g.t]||g.t,r:g.r.map(([a,v])=>[R&&RU.k&&RU.k[a]||a,R&&RU.v&&RU.v[v]||v])}))})}

const CSS=`.pi .tkb{position:absolute;left:10px;bottom:10px;z-index:2;font-size:9px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;padding:4px 8px;border-radius:999px;background:var(--ink,#111);color:#fff}
.pi .tkb.r{background:#2F6F4F}.pi .tks{position:absolute;top:10px;left:10px;z-index:2;font-size:10px;font-weight:700;padding:4px 8px;border-radius:999px;background:var(--red,#E2001A);color:#fff}
.st.tko,.st2.tko{color:#B26A00!important}.st.tkx,.st2.tkx{color:#8A8A8A!important}.tkpm{font-size:12px;color:var(--red,#E2001A);font-weight:600;margin-top:6px}`;

function deco(){
 document.querySelectorAll('.pc[data-i]').forEach(c=>{const p=P[+c.dataset.i];if(!p)return;const pi=c.querySelector('.pi');
  if(pi){pi.querySelectorAll('.tkb,.tks').forEach(e=>e.remove());
   if(TX[p.tag])pi.insertAdjacentHTML('beforeend',`<span class="tkb${p.tag==='ref'?' r':''}">${tr(p.tag)}</span>`);
   if(p.t==='sale'&&p.d&&!pi.querySelector('.tag.s'))pi.insertAdjacentHTML('beforeend',`<span class="tks">−${p.d}%</span>`)}
  const st=c.querySelector('.st');if(st)stock(st,p)})}
function stock(el,p){el.classList.remove('tko','tkx');if(p.st==='order'){el.textContent=tr('order');el.classList.add('tko')}else if(p.st==='out'){el.textContent=tr('out');el.classList.add('tkx')}}

function hook(){
 const b0=window.bindCards;window.bindCards=function(){const r=b0.apply(this,arguments);try{deco()}catch(e){}return r};
 const s0=window.setLang;window.setLang=function(l){if(typeof L!=='undefined')L=l;lang();return s0.apply(this,arguments)};
 const o0=window.openP;window.openP=function(i){const r=o0.apply(this,arguments);try{const p=P[i],b=document.getElementById('pvb');const s2=b&&b.querySelector('.st2');if(s2)stock(s2,p);
   if(p&&p._pm&&p._pm.to&&b&&!b.querySelector('.tkpm')){const pc=b.querySelector('.prc');if(pc)pc.insertAdjacentHTML('afterend',`<div class="tkpm" style="padding:0 20px">${tr('until')}${p._pm.to.split('-').reverse().join('.')}</div>`)}}catch(e){}return r};
}

function counts(){const n=P.length;if(typeof T==='object')['ro','ru'].forEach(l=>{if(T[l]&&T[l].sub)T[l].sub=T[l].sub.replace(/<b>\d+/,'<b>'+n)});
 document.querySelectorAll('[data-t=sub]').forEach(e=>e.innerHTML=t('sub'))}

function cartSync(){const A=window.tkCartAPI;if(!A)return;const c=A.get();let ch=0;
 c.forEach(y=>{const p=P.find(q=>q.sku===String(y.sku));if(p&&p.p&&p.p!==+y.p){y.p=p.p;ch=1}});if(ch){A.save();A.badge()}}

// заказ из корзины → журнал заказов админки (как на ПК)
window.tkOrder=function(cart,ch){try{fetch(API+'/api/order',{method:'POST',keepalive:true,headers:{'Content-Type':'text/plain'},
 body:JSON.stringify({items:cart.slice(0,50).map(y=>{const p=typeof P!=='undefined'&&P.find(q=>q.sku===String(y.sku));return {sku:String(y.sku),n:String(y.n||'').slice(0,200),q:+y.q||1,p:+y.p||0,o:p&&p.o>p.p?p.o:0}}),
 ch:String(ch||'').slice(0,4),lang:ru()?'RU':'RO',page:('m:'+location.href).slice(0,300)})}).catch(()=>{})}catch(_){}};

const he=s=>String(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);
const HCSS=`.tkpb{padding:0 0 10px;display:flex;flex-direction:column;gap:10px}
.tkpb a{position:relative;display:flex;align-items:center;gap:12px;min-height:96px;padding:16px 18px;border-radius:18px;background:#E2001A;color:#fff;text-decoration:none;overflow:hidden}
.tkpb .tx{flex:1;min-width:0;display:flex;flex-direction:column;gap:4px}.tkpb .ey{font-size:10px;letter-spacing:.14em;text-transform:uppercase;opacity:.85;font-weight:600}
.tkpb h3{font-size:19px;line-height:1.2;font-weight:700;margin:0}.tkpb p{font-size:13px;opacity:.9;margin:0}.tkpb em{font-style:normal;font-size:12.5px;font-weight:600;margin-top:4px}
.tkpb img{width:84px;height:84px;object-fit:contain;flex:none}.tkpb .v{flex:none;font-size:26px;font-weight:800;letter-spacing:-.02em}
.tile.tkpt{grid-column:1/-1;flex-direction:row;align-items:center;gap:12px;background:#E2001A;color:#fff}.tile.tkpt b{height:auto;font-size:26px;font-weight:800}.tile.tkpt i{color:#fff}.tile.tkpt u{color:#fff;opacity:.85;margin-left:auto}`;
const PFILE=h=>{const m=/category-([a-z-]+)\.html/.exec(h||'');if(!m)return '';return m[1]==='ovens-light'?'ovens':m[1]==='coffee'?'compact':m[1]};
async function home(PL){
 const st=document.createElement('style');st.textContent=HCSS;document.head.appendChild(st);
 const all=await Promise.all(CATS.map(c=>rd('data/'+c[0]+'.json')));let np=0;const cnt={};
 CATS.forEach((c,i)=>{const L0=(all[i]||[]).filter(x=>x&&!x.hid);cnt[c[0]]=L0.length;L0.forEach(x=>{if(merge(x,null,c[0],c[1],PL)._pm)np++})});
 if(typeof NAV!=='undefined')NAV.forEach(c=>{const f=PFILE(c.h);if(f&&cnt[f])c.n=cnt[f]});
 const dt=s=>s?s.slice(8,10)+'.'+s.slice(5,7):'';
 function ban(){let w=document.getElementById('tkpb');if(!np){if(w)w.remove();return}
  if(!w){w=document.createElement('section');w.id='tkpb';w.className='tkpb';const g=document.getElementById('grid');g.parentNode.insertBefore(w,g)}
  const R=ru();w.innerHTML=PL.slice(0,3).map(p=>`<a href="category-promo.html"><div class="tx"><span class="ey">${R?'Акция':'Ofertă'}${p.to?(R?' до ':' până la ')+dt(p.to):''}</span><h3>${he((R?p.ru:p.ro)||p.ro)}</h3>${p.bt&&(p.bt.ro||p.bt.ru)?`<p>${he((R?p.bt.ru:p.bt.ro)||p.bt.ro)}</p>`:''}<em>${R?'Смотреть товары →':'Vezi produsele →'}</em></div>${p.img?`<img src="${he(p.img)}" alt="" loading="lazy">`:''}<span class="v">−${p.kind==='sum'?p.v+' MDL':p.v+'%'}</span></a>`).join('')}
 function tile(){const g=document.getElementById('grid');if(!g||!np||g.querySelector('.tkpt'))return;
  g.insertAdjacentHTML('afterbegin',`<a class="tile tkpt" href="category-promo.html"><b>%</b><i>${ru()?'Акции':'Oferte'}</i><u>${np} ${ru()?'товаров':'produse'}</u></a>`)}
 if(typeof drawGrid==='function'){const d0=window.drawGrid;window.drawGrid=function(){const r=d0.apply(this,arguments);tile();ban();return r};drawGrid()}else{tile();ban()}
}

async function run(){
 const st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
 const [PL,R]=await Promise.all([rd('data/promo.json').then(j=>{const t=today();return ((j&&j.promos)||[]).filter(p=>p&&p.on&&+p.v>0&&(!p.from||p.from<=t)&&(!p.to||t<=p.to))}),rd('data/ru.json')]);
 if(R)RU=R;
 if(FILE==='home')return home(PL);
 let out=[];
 if(PROMO_PAGE){
  const all=await Promise.all(CATS.map(c=>rd('data/'+c[0]+'.json')));
  CATS.forEach((c,i)=>(all[i]||[]).filter(x=>x&&!x.hid).forEach(x=>{const m=merge(x,null,c[0],c[1],PL);if(m._pm){m.fc={cat:c[0],brand:m.b};out.push(m)}}));
  document.querySelectorAll('.chip[data-k=cat]').forEach(b=>b.hidden=!out.some(p=>p.fc.cat===b.dataset.v));
  const e=document.getElementById('tkpe');if(e)e.hidden=!!out.length;
 }else{
  const D=await rd('data/'+FILE+'.json');if(!Array.isArray(D))return;
  const by={};P.forEach(p=>{by[String(p.sku)+'|'+p.n]=p;if(p.sku)by[String(p.sku)]=by[String(p.sku)]||p});
  const dir=(CATS.find(c=>c[0]===FILE)||[0,DIR])[1];
  out=D.filter(x=>x&&!x.hid).map(x=>merge(x,by[String(x.sku||'')+'|'+nm(x)]||(x.sku?by[String(x.sku)]:null),FILE,dir,PL));
 }
 out=out.map((p,i)=>[p,i]).sort((a,b)=>ordv(a[0])-ordv(b[0])||a[1]-b[1]).map(a=>a[0]);
 P.length=0;out.forEach(p=>P.push(p));
 hook();lang();counts();cartSync();
 if(typeof render==='function')render(false);
 const dl=/^#p=(.+)$/.exec(location.hash);if(dl){const i=P.findIndex(p=>p.sku===decodeURIComponent(dl[1]));if(i>=0)setTimeout(()=>{try{openP(i,document.querySelector('.pc[data-i="'+i+'"] .pi'))}catch(e){}},900)}
}
run();
})();
