/* Сравнение моделей для покупателей (ПК и мобилка). Список в localStorage tkCmp: {f, items:[sku]} — одна категория, до 4 моделей. */
(function(){
if(window.__tcmp)return;window.__tcmp=1;
const MAX=4,SK='tkCmp';
const MOB=()=>typeof openP==='function'&&typeof P!=='undefined';
const lang=()=>{try{if(typeof LANG!=='undefined'&&LANG)return LANG}catch(_){}try{if(typeof L!=='undefined'&&L)return L}catch(_){}try{return localStorage.getItem('tk-lang')||'ro'}catch(_){return 'ro'}};
const W={cmp:['Compară','Сравнить'],inCmp:['În comparație','В сравнении'],addCmp:['Adaugă la comparație','Добавить к сравнению'],bar:['Comparație','Сравнение'],
 more:['Adăugați încă un model','Добавьте ещё модель'],open:['Compară','Сравнить'],title:['Comparația modelelor','Сравнение моделей'],diff:['Doar diferențele','Только различия'],
 price:['Preț','Цена'],stock:['Disponibilitate','Наличие'],brand:['Brand','Бренд'],cart:['În coș','В корзину'],added:['În coș ✓','В корзине ✓'],rm:['Elimină','Убрать'],
 req:['Preț la cerere','Цена по запросу'],ok:['În stoc','В наличии'],order:['La comandă','Под заказ'],out:['Nu este în stoc','Нет в наличии'],
 max:['Se pot compara până la 4 modele','Можно сравнить до 4 моделей'],newcat:['Comparăm modele dintr-o singură categorie — am început o comparație nouă','Сравнивать можно модели одной категории — начато новое сравнение'],
 clear:['Golește','Очистить'],code:['Cod','Код'],toCart:['Produsul e în coș','Товар добавлен в корзину'],close:['Închide','Закрыть'],load:['Se încarcă…','Загрузка…']};
const t=k=>W[k][lang()==='ru'?1:0];
const he=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const mdl=v=>String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g,' ')+' MDL';
let S={f:'',items:[]};try{const o=JSON.parse(localStorage.getItem(SK)||'null');if(o&&Array.isArray(o.items))S={f:String(o.f||''),items:o.items.map(String).slice(0,MAX)}}catch(_){}
const save=()=>{try{localStorage.setItem(SK,JSON.stringify(S))}catch(_){}};
const has=sku=>S.items.includes(String(sku));
const CK='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
const IC='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v13M7 17l-3-3M7 17l3-3M17 20V7M17 7l-3 3M17 7l3 3"/></svg>';

const css=`.tcmp-b{display:inline-flex;align-items:center;gap:6px;margin-top:12px;height:32px;padding:0 14px 0 11px;border-radius:16px;border:1px solid rgba(0,0,0,.16);background:#fff;color:#111;font:inherit;font-size:13px;font-weight:600;line-height:1;cursor:pointer;white-space:nowrap;max-width:100%;transition:background .2s,color .2s,border-color .2s;position:relative;z-index:2}
.tcmp-b:hover{border-color:#111}.tcmp-b span{overflow:hidden;text-overflow:ellipsis}.tcmp-b svg,.tcmp-p svg,.tcmp-bar svg{width:16px;height:16px;flex:none;fill:none;stroke:currentColor;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}
.tcmp-b.on{background:#111;color:#fff;border-color:#111}
.tcmp-p{display:inline-flex;align-items:center;gap:8px;margin-top:12px;height:40px;padding:0 16px;border-radius:20px;border:1px solid rgba(0,0,0,.15);background:#fff;color:#111;font:inherit;font-size:14px;font-weight:600;cursor:pointer}
.tcmp-p.on{background:#111;color:#fff;border-color:#111}
.tcmp-bar{position:fixed;left:50%;bottom:calc(18px + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:60;display:flex;align-items:center;gap:10px;padding:8px 8px 8px 18px;border-radius:30px;background:#111;color:#fff;font-size:14px;font-weight:600;box-shadow:0 8px 30px rgba(0,0,0,.25);max-width:calc(100vw - 110px);white-space:nowrap}
.tcmp-bar[hidden]{display:none}.tcmp-bar span{overflow:hidden;text-overflow:ellipsis}.tcmp-bar button{border:0;cursor:pointer;font:inherit;font-weight:600}
.tcmp-bar .go{height:38px;padding:0 18px;border-radius:19px;background:#E2001A;color:#fff}.tcmp-bar .go[disabled]{background:#444;color:#aaa;cursor:default}
.tcmp-bar .x{width:34px;height:34px;border-radius:50%;background:#2a2a2a;color:#fff;font-size:15px;flex:none}
.tcmp-w{position:fixed;inset:0;z-index:200;overscroll-behavior:contain;touch-action:pan-x pan-y;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center}
.tcmp-m{background:#fff;color:#111;width:min(1240px,94vw);height:min(90vh,980px);border-radius:16px;display:flex;flex-direction:column;overflow:hidden;font-size:14px}
.tcmp-h{display:flex;align-items:center;gap:14px;padding:16px 20px;border-bottom:1px solid #eee}.tcmp-h h3{flex:1;margin:0;font-size:20px;font-weight:700}
.tcmp-h label{display:flex;align-items:center;gap:6px;font-size:14px;cursor:pointer;white-space:nowrap}.tcmp-h .x{width:36px;height:36px;border-radius:50%;border:1px solid #ddd;background:#fff;font-size:16px;cursor:pointer;flex:none}
.tcmp-s{flex:1;overflow:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch}
.tcmp-t{border-collapse:separate;border-spacing:0;min-width:100%}
.tcmp-t th,.tcmp-t td{padding:10px 14px;border-bottom:1px solid #f0f0f0;text-align:left;vertical-align:top;min-width:200px;max-width:280px}
.tcmp-t td:first-child,.tcmp-t th:first-child{position:sticky;left:0;z-index:1;background:#fafafa;min-width:170px;max-width:220px;color:#666;font-weight:500}
.tcmp-t thead th{position:sticky;top:0;z-index:2;background:#fff;border-bottom:1px solid #e5e5e5}.tcmp-t thead th:first-child{z-index:3;background:#fafafa}
.tcmp-t thead img{display:block;width:100%;max-width:170px;aspect-ratio:1;object-fit:contain;margin:0 auto 10px}
.tcmp-t thead a{color:#111;text-decoration:none;font-weight:700;font-size:15px;display:block}.tcmp-t thead small{display:block;color:#888;font-weight:500;margin-top:2px}
.tcmp-t .tpr b{font-size:17px}.tcmp-t .tpr s{white-space:nowrap;display:inline-block;color:#999;font-weight:500;margin-left:6px;font-size:13px}
.tcmp-t .tact{display:flex;gap:6px;margin-top:10px;flex-wrap:wrap}.tcmp-t .tact button{height:34px;padding:0 14px;border-radius:17px;border:1px solid #ddd;background:#fff;font:inherit;font-size:13px;font-weight:600;cursor:pointer}
.tcmp-t .tact .tcc{background:#E2001A;border-color:#E2001A;color:#fff}.tcmp-t .tact .tcc.ok{background:#1f8a4c;border-color:#1f8a4c}
.tcmp-t tr.tcg td{background:#f3f3f3;color:#111;font-weight:700;font-size:12px;letter-spacing:.08em;text-transform:uppercase}
.tcmp-t tr.tcg td:first-child{background:#f3f3f3}
.tcmp-t tr.tcd td:not(:first-child){background:#fff8e6}.tcmp-m.only tr.tcs{display:none}
.tcmp-ld{padding:40px;text-align:center;color:#888}
.tcmp-toast{position:fixed;left:50%;bottom:calc(84px + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:210;background:#111;color:#fff;padding:12px 18px;border-radius:12px;font-size:14px;max-width:90vw;text-align:center;opacity:0;pointer-events:none;transition:opacity .25s}
.tcmp-toast.on{opacity:1}
@media(max-width:760px){.tcmp-m{width:100vw;height:100%;border-radius:0}.tcmp-w{align-items:stretch}.tcmp-t th,.tcmp-t td{min-width:150px;padding:9px 10px;font-size:13px}
 .tcmp-t td:first-child,.tcmp-t th:first-child{min-width:110px;max-width:130px}.tcmp-h{padding:12px 14px;padding-top:calc(12px + env(safe-area-inset-top))}.tcmp-h h3{font-size:17px}
 .tcmp-bar{left:12px;transform:none;max-width:calc(100vw - 96px);font-size:13px;padding-left:14px}.tcmp-bar .k{display:none}.tcmp-bar .go[disabled]{display:none}.tcmp-b{height:30px;margin-top:8px;padding:0 11px 0 9px;font-size:12px;gap:5px}.tcmp-b svg{width:14px;height:14px}}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

let tt=0;function toast(m){let e=document.querySelector('.tcmp-toast');if(!e){e=document.createElement('div');e.className='tcmp-toast';document.body.appendChild(e)}e.textContent=m;e.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>e.classList.remove('on'),2600)}

const MPG={ovens:'category-ovens-light.html',compact:'category-coffee.html'};
const plink=(f,sku)=>MOB()?(MPG[f]||'category-'+f+'.html')+'#p='+encodeURIComponent(sku):'desk-product.html?f='+f+'&sku='+encodeURIComponent(sku);
const mfile=()=>{const s=document.querySelector('script[src*="m-sync.js"]');return s&&s.dataset.f||''};

function toggle(f,sku){sku=String(sku);if(!f||!sku)return;
 if(has(sku)){S.items=S.items.filter(x=>x!==sku)}
 else{if(S.f&&S.f!==f&&S.items.length){S={f,items:[]};toast(t('newcat'))}
  if(S.items.length>=MAX){toast(t('max'));return}S.f=f;S.items.push(sku)}
 if(!S.items.length)S.f='';save();refresh()}

function cardKey(c){if(c.dataset.sku&&c.dataset.f)return[c.dataset.f,c.dataset.sku];
 if(c.dataset.i!=null&&typeof P!=='undefined'){const p=P[+c.dataset.i];if(p)return[p._f||mfile(),String(p.sku)]}return null}
function deco(){
 document.querySelectorAll('.pc:not(.sk)').forEach(c=>{const k=cardKey(c);if(!k)return;const box=c.querySelector('.inf,.pb');if(!box)return;
  let b=box.querySelector('.tcmp-b');if(!b){b=document.createElement('button');b.type='button';b.className='tcmp-b';const ln=box.querySelector(':scope>.ln');ln?box.insertBefore(b,ln):box.appendChild(b)}
  b.dataset.f=k[0];b.dataset.s=k[1];const on=has(k[1]);b.classList.toggle('on',on);const h=on?CK+'<span>'+t('inCmp')+'</span>':IC+'<span>'+t('cmp')+'</span>';if(b.innerHTML!==h)b.innerHTML=h});
 // ПК: страница товара
 try{if(typeof SKU!=='undefined'&&typeof F!=='undefined'&&SKU){const ac=document.querySelector('#add')&&document.querySelector('#add').closest('.ac');
  if(ac){let b=ac.parentElement.querySelector('.tcmp-p');if(!b){b=document.createElement('button');b.type='button';b.className='tcmp-p';ac.insertAdjacentElement('afterend',b)}pbtn(b,F,SKU)}}}catch(_){}
 // мобилка: карточка товара в шторке
 try{if(typeof curP!=='undefined'&&curP&&document.getElementById('pvb')){const pv=document.getElementById('pvb');let b=pv.querySelector('.tcmp-p');
  if(!b){b=document.createElement('button');b.type='button';b.className='tcmp-p';const pr=pv.querySelector('.prc');if(pr)pr.insertAdjacentElement('afterend',b);else pv.prepend(b)}pbtn(b,curP._f||mfile(),curP.sku)}}catch(_){}}
function pbtn(b,f,sku){const on=has(sku);b.dataset.f=f;b.dataset.s=String(sku);b.classList.toggle('on',on);const h=on?CK+t('inCmp'):IC+t('addCmp');if(b.innerHTML!==h)b.innerHTML=h}

function bar(){let b=document.querySelector('.tcmp-bar');
 if(!b){b=document.createElement('div');b.className='tcmp-bar';b.hidden=true;document.body.appendChild(b)}
 const n=S.items.length;b.hidden=!n||!!document.querySelector('.tcmp-w,#pv.on');if(!n)return;
 const h=`${IC}<span class="${n<2?'m':'k'}">${n<2?t('more'):t('bar')}</span><button class="go" data-tcmp-open ${n<2?'disabled':''}>${t('open')} (${n})</button><button class="x" data-tcmp-clear aria-label="${t('clear')}">✕</button>`;
 if(b.innerHTML!==h)b.innerHTML=h}
function refresh(){deco();bar()}

const rd=u=>fetch(u,{cache:'no-cache'}).then(r=>r.ok?r.json():null).catch(()=>null);
let RU=null;
async function rows(){const f=S.f;const [L,pj,ru]=await Promise.all([rd('/data/'+f+'.json'),rd('/data/promo.json'),RU?RU:rd('/data/ru.json')]);RU=ru||{};
 const day=new Date().toLocaleDateString('sv-SE',{timeZone:'Europe/Chisinau'});
 const PL=((pj&&pj.promos)||[]).filter(p=>p&&p.on&&+p.v>0&&(!p.from||p.from<=day)&&(!p.to||day<=p.to));
 return S.items.map(sku=>(L||[]).find(x=>String(x.sku)===sku&&!x.hid)).filter(Boolean).map(x=>{const sku=String(x.sku);
  let p=+(x.p||x.price||0),o=+(x.o||x.old||0);const base=Math.max(p,o);
  if(p)for(const q of PL){if(!(q.scope==='all'||q.scope==='cat'&&(q.cats||[]).includes(f)||q.scope==='sku'&&(q.skus||[]).map(String).includes(sku)))continue;
   const np=Math.max(0,Math.round(q.kind==='sum'?base-q.v:base*(1-q.v/100)));if(np<p){p=np;o=base}}
  const im=x.u&&x.u.length?x.u[0]:x.img&&x.img.length?(f==='ovens'?'assets/ro/':'assets/ro2/')+x.img[0]:'';
  return{x,sku,n:x.n||x.name||'',p,o:o>p?o:0,img:im?(/^https?:/.test(im)?im:'/'+im):'',b:x.b||x.brand||'Teka'}})}
const tr=(s,k)=>lang()==='ru'&&RU&&RU[s]&&RU[s][k]||k;

async function open(){if(S.items.length<2)return;
 const w=document.createElement('div');w.className='tcmp-w';w.innerHTML=`<div class="tcmp-m"><div class="tcmp-h"><h3>${t('title')}</h3><label><input type="checkbox" data-tcmp-diff>${t('diff')}</label><button class="x" data-tcmp-close aria-label="${t('close')}">✕</button></div><div class="tcmp-s"><div class="tcmp-ld">${t('load')}</div></div></div>`;
 document.body.appendChild(w);if(!MOB())document.documentElement.style.overflow='hidden';bar();
 w.addEventListener('click',e=>{if(e.target===w)close()});
 await draw()}
async function draw(){const w=document.querySelector('.tcmp-w');if(!w)return;const R=await rows();
 if(R.length<1){close();return}
 const G=[],V=R.map(()=>({}));
 R.forEach((r,j)=>(r.x.specs||[]).forEach(g=>(g.r||[]).forEach(([k,v])=>{const kk=g.t+'|'+k;if(!G.some(z=>z[0]===kk))G.push([kk,g.t,k]);V[j][kk]=v})));
 const cell=v=>`<td>${he(v)}</td>`;const row=(lab,vs,raw)=>{const d=new Set(vs.map(String)).size>1;return `<tr class="${d?'tcd':'tcs'}"><td>${he(lab)}</td>${raw?vs.join(''):vs.map(cell).join('')}</tr>`};
 const stk=x=>!x.st?t('ok'):x.st==='out'?t('out'):t('order');
 const inC=sku=>{try{return(JSON.parse(localStorage.getItem('tkCart')||'[]')||[]).some(y=>String(y.sku)===sku)}catch(_){return false}};
 let h=`<table class="tcmp-t"><thead><tr><th></th>${R.map(r=>`<th><a href="${plink(S.f,r.sku)}" data-tcmp-go="${he(r.sku)}">${r.img?`<img src="${he(r.img)}" alt="" onerror="if(!this.dataset.r&&/\/assets\/ro2?\//.test(this.src)){this.dataset.r=1;this.src=this.src.replace(/\/assets\/(ro2?)\//,(m,d)=>'/assets/'+(d==='ro'?'ro2':'ro')+'/')}else this.style.visibility='hidden'">`:''}${he(r.n)}</a><small>${t('code')}: ${he(r.sku)}</small>
  <div class="tact"><button class="tcc${inC(r.sku)?' ok':''}" data-tcmp-cart="${he(r.sku)}">${inC(r.sku)?t('added'):t('cart')}</button><button data-tcmp-rm="${he(r.sku)}">${t('rm')}</button></div></th>`).join('')}</tr></thead><tbody>`;
 const pd=new Set(R.map(r=>r.p)).size>1;
 h+=`<tr class="${pd?'tcd':'tcs'}"><td>${t('price')}</td>${R.map(r=>`<td class="tpr"><b>${r.p?mdl(r.p):t('req')}</b>${r.o?`<s>${mdl(r.o)}</s>`:''}</td>`).join('')}</tr>`;
 h+=row(t('stock'),R.map(r=>stk(r.x)));
 h+=row(t('brand'),R.map(r=>r.b));
 let last=null;for(const [kk,g,k] of G){if(g!==last){h+=`<tr class="tcg"><td colspan="${R.length+1}">${he(tr('k',g))}</td></tr>`;last=g}h+=row(tr('k',k),V.map(o=>o[kk]!=null?tr('v',o[kk]):'—'))}
 h+='</tbody></table>';
 w.querySelector('.tcmp-s').innerHTML=h;w.querySelector('.tcmp-m').classList.toggle('only',!!w.querySelector('[data-tcmp-diff]').checked)}
function close(){const w=document.querySelector('.tcmp-w');if(w)w.remove();document.documentElement.style.overflow='';refresh()}

async function toCart(sku){const R=await rows();const r=R.find(z=>z.sku===sku);if(!r)return;
 const it={sku:r.x.sku,n:r.n,p:r.p,q:1,img:r.img.replace(/^\//,'')};
 if(window.tkCartAPI){const c=tkCartAPI.get();const y=c.find(z=>String(z.sku)===sku);if(y)y.q++;else c.push(it);tkCartAPI.save();try{tkCartAPI.badge(true)}catch(_){}}
 else{let c;try{if(typeof cart!=='undefined'&&Array.isArray(cart))c=cart}catch(_){}if(!c){try{c=JSON.parse(localStorage.getItem('tkCart')||'[]')}catch(_){c=[]}}
  const y=c.find(z=>String(z.sku)===sku);if(y)y.q++;else c.push(it);try{localStorage.setItem('tkCart',JSON.stringify(c))}catch(_){}try{if(typeof badge==='function')badge(true)}catch(_){}}
 toast(t('toCart'));draw()}

document.addEventListener('click',e=>{const g=e.target;
 const b=g.closest('.tcmp-b,.tcmp-p');if(b){e.preventDefault();e.stopPropagation();toggle(b.dataset.f,b.dataset.s);return}
 if(g.closest('[data-tcmp-open]')){open();return}
 if(g.closest('[data-tcmp-clear]')){S={f:'',items:[]};save();refresh();return}
 if(g.closest('[data-tcmp-close]')){close();return}
 const c=g.closest('[data-tcmp-cart]');if(c){toCart(c.dataset.tcmpCart);return}
 const r=g.closest('[data-tcmp-rm]');if(r){S.items=S.items.filter(x=>x!==r.dataset.tcmpRm);if(!S.items.length)S.f='';save();if(S.items.length<1)close();else draw();return}
 const go=g.closest('[data-tcmp-go]');if(go&&MOB()){const i=P.findIndex(p=>String(p.sku)===go.dataset.tcmpGo&&(p._f||mfile())===S.f);if(i>=0){e.preventDefault();close();const pi=document.querySelector('.pc[data-i="'+i+'"] .pi');openP(i,pi||undefined)}return}
 setTimeout(refresh,60)},true);
document.addEventListener('change',e=>{if(e.target.matches('[data-tcmp-diff]')){const m=e.target.closest('.tcmp-m');m&&m.classList.toggle('only',e.target.checked)}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.querySelector('.tcmp-w'))close()});
addEventListener('storage',e=>{if(e.key===SK){try{const o=JSON.parse(e.newValue||'null');S=o&&Array.isArray(o.items)?o:{f:'',items:[]}}catch(_){}refresh()}});
let q=0;new MutationObserver(()=>{if(q)return;q=setTimeout(()=>{q=0;deco()},40)}).observe(document.body,{childList:true,subtree:true});
setInterval(bar,700);refresh();
})();
