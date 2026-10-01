/* Режим менеджера ПК-сайта: грузится только при входе (desk-catalog.html#manager) или если менеджер уже вошёл. */
(()=>{
const MK='tkMgr',SK='tkSel';
let M=null;try{M=JSON.parse(localStorage.getItem(MK)||'null')}catch(_){}
const ld=()=>{let s=null;try{s=JSON.parse(localStorage.getItem(SK)||'null')}catch(_){}return s&&Array.isArray(s.items)?s:{items:[],dk:'pct',dv:0,name:'',tel:'',cm:''}};
let S=ld();const sv=()=>{try{localStorage.setItem(SK,JSON.stringify(S))}catch(_){}bar()};
const q=(s,r=document)=>r.querySelector(s);
const api=async(p,body)=>{const r=await fetch(API0+p,{method:body?'POST':'GET',headers:{'Content-Type':'application/json',Authorization:'Bearer '+(M&&M.t)},body:body?JSON.stringify(body):undefined});
  const j=await r.json().catch(()=>({error:'Сервер не отвечает'}));if(r.status===401){logout();throw new Error('Вход истёк — войдите заново')}if(!r.ok)throw new Error(j.error||'Ошибка '+r.status);return j};
const st=document.createElement('style');st.textContent=`
.mgp{position:fixed;left:16px;bottom:16px;z-index:90;display:flex;align-items:center;gap:2px;background:var(--ink);color:#fff;border-radius:22px;padding:4px;font-size:13px;box-shadow:0 8px 24px rgba(0,0,0,.25)}
.mgp b{padding:0 10px 0 12px;font-weight:600;display:flex;align-items:center;gap:7px}.mgp b:before{content:"";width:7px;height:7px;border-radius:50%;background:#3ccf7a}
.mgp button{height:32px;padding:0 13px;border-radius:16px;color:#fff;font-weight:600;font-size:13px}.mgp button:hover{background:#333}.mgp button.on{background:var(--red)}
.mgp em{font-style:normal;background:#fff;color:var(--ink);border-radius:9px;padding:0 6px;margin-left:6px;font-size:11.5px}
.top .mgp{position:static;background:none;color:var(--mute);box-shadow:none;padding:0;border-radius:0;gap:16px;font-size:12.5px}
.top .mgp b{padding:0;font-weight:500;gap:6px}.top .mgp b:before{width:6px;height:6px;opacity:.8}
.top .mgp button{height:auto;padding:0;border-radius:0;background:none;color:var(--mute);font-weight:500;font-size:12.5px}.top .mgp button:hover,.top .mgp button.on{background:none;color:var(--ink)}
.top .mgp em{background:var(--line);color:var(--ink);margin-left:5px}
.mgb{position:absolute;right:10px;top:10px;z-index:3;width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.9);border:1px solid var(--line);color:var(--mute);font-size:18px;line-height:1;display:grid;place-items:center;opacity:.6;transition:opacity .15s,color .15s}
.pc:hover .mgb,.mgb:hover{opacity:1;color:var(--ink)}.mgb.on{opacity:1;background:var(--ok);border-color:var(--ok);color:#fff;font-size:14px}
.mgw{position:fixed;inset:0;z-index:95;background:rgba(0,0,0,.35);display:none}.mgw.on{display:block}
.mgd{position:fixed;top:0;right:0;bottom:0;width:min(640px,100vw);background:#fff;z-index:96;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .25s;font-size:14px}
.mgd.on{transform:none}
.mgd h3{font-size:19px;padding:18px 22px;border-bottom:1px solid var(--line);display:flex;align-items:center;gap:10px}.mgd h3 span{flex:1}
.mgd .x{width:34px;height:34px;border-radius:50%;border:1px solid var(--line);display:grid;place-items:center}
.mgd .bd{flex:1;overflow:auto;padding:6px 22px 20px}
.mgd .ft{border-top:1px solid var(--line);padding:12px 22px;display:flex;flex-wrap:wrap;gap:8px}
.mgd .ft button,.mgd .ft a{height:40px;padding:0 16px;border-radius:20px;border:1px solid var(--line);font-weight:600;font-size:13.5px;display:inline-flex;align-items:center}
.mgd .ft .r{background:var(--red);border-color:var(--red);color:#fff}.mgd .ft .k{background:var(--ink);border-color:var(--ink);color:#fff}
.mgi{display:grid;grid-template-columns:20px 56px 1fr auto;gap:10px;align-items:start;padding:12px 0;border-bottom:1px solid var(--soft)}
.mgi img{width:56px;height:56px;object-fit:contain;border:1px solid var(--line);border-radius:6px;background:#fff}
.mgi input[type=checkbox]{margin-top:20px;accent-color:var(--red);width:16px;height:16px}
.mgi b{display:block;font-size:14px}.mgi small{display:block;color:var(--mute);font-size:12px}
.mgi .ok{color:var(--ok)}.mgi .no{color:#B26B00}
.mgi .rw{display:flex;gap:6px;align-items:center;margin-top:7px;flex-wrap:wrap}
.mgi .rw input,.mgf input,.mgf select,.mgi select,.mgf textarea{height:32px;border:1px solid var(--line);border-radius:6px;padding:0 8px;font:inherit;font-size:13px;background:#fff}
.mgi .rw input{width:64px}.mgi .sm{text-align:right;white-space:nowrap}.mgi .sm s{color:var(--mute);font-size:12px;display:block}
.mgi .rm{color:var(--mute);font-size:12px;margin-top:6px}
.mgf{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}.mgf label{display:grid;gap:4px;font-size:12px;color:var(--ink2);font-weight:600}
.mgf .w{grid-column:1/-1}.mgf textarea{height:60px;padding:8px;resize:vertical}
.mgt{margin-top:14px;background:var(--soft);border-radius:8px;padding:12px 14px;display:grid;gap:4px}.mgt div{display:flex;justify-content:space-between}.mgt .g{font-size:17px;font-weight:700}
.mgwr{background:#FFF1F1;color:var(--red);border-radius:8px;padding:9px 12px;font-size:13px;font-weight:600;margin-top:10px}
.mgcl{background:#EEF7F1;border-radius:8px;padding:10px 12px;font-size:12.5px;margin-top:8px;grid-column:1/-1}.mgcl b{font-size:13px}
.mgres{margin-top:14px;border:2px solid var(--ok);border-radius:10px;padding:12px 14px;display:grid;gap:8px}.mgres input{width:100%;height:36px;border:1px solid var(--line);border-radius:6px;padding:0 10px;font:inherit;font-size:13px}
.mgres div{display:flex;gap:8px;flex-wrap:wrap}.mgres button,.mgres a{height:34px;padding:0 14px;border-radius:17px;border:1px solid var(--line);font-weight:600;font-size:13px;display:inline-flex;align-items:center}
.mgl{position:fixed;inset:0;z-index:99;background:rgba(0,0,0,.4);display:grid;place-items:center}
.mgl form{background:#fff;border-radius:14px;padding:28px;width:min(340px,92vw);display:grid;gap:12px}.mgl h4{font-size:18px}.mgl input{height:42px;border:1px solid var(--line);border-radius:8px;padding:0 12px;font:inherit}
.mgl button{height:42px;border-radius:21px;background:var(--red);color:#fff;font-weight:600}.mgl .er{color:var(--red);font-size:13px;min-height:18px}.mgl .cn{background:none;color:var(--mute);height:auto}
.mgc{position:fixed;inset:24px;z-index:98;background:#fff;border-radius:12px;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.3)}
.mgc .bd{overflow:auto;padding:0 22px 22px}.mgc table{width:100%;border-collapse:collapse;font-size:13.5px}
.mgc th,.mgc td{padding:8px 10px;border-bottom:1px solid var(--soft);text-align:left;vertical-align:top}
.mgc thead th{position:sticky;top:0;background:#fff;z-index:1;font-size:14px}.mgc thead img{width:120px;height:120px;object-fit:contain;display:block;margin-bottom:6px}
.mgc td:first-child{color:var(--mute);width:22%}.mgc tr.df td:not(:first-child){background:#FFF8E6}.mgc tr.gr td{font-weight:700;color:var(--ink);background:var(--soft);text-transform:uppercase;font-size:12px;letter-spacing:.04em}
.mgok{display:inline-flex;align-items:center;gap:6px;margin-left:8px;color:var(--mute);font-size:12.5px;font-weight:500}.mgok input{accent-color:var(--red)}
.ac:has(#mgAdd){flex-wrap:wrap}#mgAdd{order:9;flex:1 0 100%;height:48px;padding:0 16px;border-radius:26px;border:1px solid var(--ink);font-weight:600;font-size:14px;white-space:nowrap}#mgAdd.on{background:var(--ok);border-color:var(--ok);color:#fff}
@media print{.mgp,.mgb,#mgAdd,.mgd,.mgw{display:none!important}}`;
document.head.appendChild(st);

function logout(){M=null;try{localStorage.removeItem(MK)}catch(_){}document.querySelectorAll('.mgp,.mgb,#mgAdd').forEach(e=>e.remove());close()}
function login(){const w=document.createElement('div');w.className='mgl';
  w.innerHTML=`<form><h4>Вход для менеджера</h4><input name="n" placeholder="Имя" autocomplete="username" required><input name="p" type="password" placeholder="Пароль" autocomplete="current-password" required><button>Войти</button><div class="er"></div><button type="button" class="cn">Отмена</button></form>`;
  document.body.appendChild(w);const f=q('form',w);setTimeout(()=>f.n.focus(),50);
  q('.cn',w).onclick=()=>w.remove();
  f.onsubmit=async e=>{e.preventDefault();q('.er',w).textContent='';
    try{const r=await fetch(API0+'/api/mlogin',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:f.n.value,pass:f.p.value})});const j=await r.json().catch(()=>({}));
      if(!r.ok)throw new Error(j.error||'Не удалось войти');M={t:j.token,n:j.name};localStorage.setItem(MK,JSON.stringify(M));w.remove();start()}
    catch(er){q('.er',w).textContent=er.message}}}

const IX={};
async function item(f,sku){const L=await cat(f);return L.find(x=>String(x.sku)===String(sku))||null}
const has=(f,sku)=>S.items.some(i=>i.f===f&&String(i.sku)===String(sku));
async function add(f,sku){if(has(f,sku)){toast('Уже в подборке');return}const x=await item(f,sku);if(!x)return;S.items.push({f,sku:String(sku),q:1,dk:'pct',dv:0});sv();mark();toast('Добавлено в подборку')}
function mark(){document.querySelectorAll('.pc[data-sku]').forEach(a=>{let b=q('.mgb',a);if(!b){b=document.createElement('button');b.className='mgb';b.type='button';const ph=q('.ph',a);if(!ph)return;ph.appendChild(b)}
    const on=has(a.dataset.f,a.dataset.sku);b.classList.toggle('on',on);b.textContent=on?'✓':'+';b.title=on?L('În selecție','В подборке'):L('Adaugă în selecție','Добавить в подборку')});
  const ad=q('#add');if(ad&&typeof SKU!=='undefined'&&typeof F!=='undefined'){let b=q('#mgAdd');if(!b){b=document.createElement('button');b.id='mgAdd';b.type='button';ad.after(b)}const on=has(F,SKU);b.classList.toggle('on',on);b.textContent=on?L('✓ În selecție','✓ В подборке'):L('+ Adaugă în selecție','+ В подборку')}}

const L=(ro,ru)=>LANG==='ru'?ru:ro;
function bar(){if(!M)return;let p=q('.mgp');if(!p){p=document.createElement('div');p.className='mgp';const t=q('.top .wrap');t?t.insertBefore(p,q('#lng')||null):document.body.appendChild(p)}
  const n=S.items.reduce((a,i)=>a+i.q,0);p.innerHTML=`<b>${he(M.n)}</b><button data-m="sel" class="${n?'on':''}">${L('Selecție','Подборка')}${n?`<em>${n}</em>`:''}</button><button data-m="out">${L('Ieșire','Выйти')}</button>`}

/* расчёт как на сервере */
const unit=(p,k,v)=>Math.max(0,Math.round(k==='pct'?p*(1-Math.min(v,100)/100):k==='sum'?p-v:p));
async function lines(){const R=[];for(const i of S.items){const x=await item(i.f,i.sku);if(!x)continue;const p=pr(x),u=unit(p,i.dk,+i.dv||0);R.push({i,x,p,o:od(x)>p?od(x):0,u})}return R}
function calc(R){const sub=R.reduce((a,r)=>a+r.u*r.i.q,0),full=R.reduce((a,r)=>a+r.p*r.i.q,0),dv=+S.dv||0;
  const disc=Math.min(sub,S.dk==='pct'?Math.round(sub*Math.min(dv,100)/100):S.dk==='sum'?dv:0);return {sub,full,disc,tot:sub-disc}}
const over=(R,c)=>R.some(r=>r.p&&(r.p-r.u)/r.p>.2)||c.full&&(c.full-c.tot)/c.full>.2;

function open(){q('.mgw').classList.add('on');q('.mgd').classList.add('on');draw()}
function close(){const w=q('.mgw'),d=q('.mgd');if(w)w.classList.remove('on');if(d)d.classList.remove('on')}
const dsel=(k,v,attr)=>`<select ${attr}><option value="pct" ${k!=='sum'?'selected':''}>%</option><option value="sum" ${k==='sum'?'selected':''}>MDL</option></select>`;
let RES=null,CL=null;
async function draw(){const d=q('.mgd');if(!d)return;const R=await lines(),c=calc(R);
  q('.bd',d).innerHTML=(R.length?R.map((r,k)=>`<div class="mgi" data-k="${k}"><input type="checkbox" data-cmp ${r.i.c?'checked':''} title="Сравнить"><img src="${he(pics(r.x)[0]||'')}" alt="" onerror="this.style.visibility='hidden'">
    <div><b>${he(nm(r.x))}</b><small>${he(r.i.sku)} · <span class="${r.x.st?'no':'ok'}">${stk(r.x)}</span></small>
     <div class="rw">Кол-во <input data-q type="number" min="1" max="99" value="${r.i.q}"> Скидка <input data-dv type="number" min="0" value="${+r.i.dv||''}" placeholder="0">${dsel(r.i.dk,0,'data-dk')}</div>
     <button class="rm" data-rm>Убрать</button></div>
    <div class="sm">${r.p?`${r.u<r.p?`<s>${mdl(r.p*r.i.q)}</s>`:''}<b>${mdl(r.u*r.i.q)}</b>${r.i.q>1?`<small>${mdl(r.u)} / шт.</small>`:''}`:'<b>по запросу</b>'}</div></div>`).join(''):'<p style="padding:30px 0;color:var(--mute)">Подборка пуста. Добавляйте товары кнопкой «+ Подборка» на карточках.</p>')+
   `<div class="mgf"><label>Скидка на всю подборку<span style="display:flex;gap:6px"><input data-adv type="number" min="0" value="${+S.dv||''}" placeholder="0" style="flex:1">${dsel(S.dk,0,'data-adk')}</span></label><span></span>
     <label>Имя клиента<input data-s="name" value="${he(S.name)}"></label><label>Телефон клиента<input data-s="tel" value="${he(S.tel)}" placeholder="+373 …" inputmode="tel"></label>
     <div class="mgcl" id="mgcl" hidden></div>
     <label class="w">Комментарий для клиента<textarea data-s="cm">${he(S.cm)}</textarea></label></div>
   <div class="mgt"><div><span>Товары</span><span>${mdl(c.full)}</span></div>${c.full-c.sub?`<div><span>Скидки на позиции</span><span>−${mdl(c.full-c.sub)}</span></div>`:''}${c.disc?`<div><span>Скидка на подборку</span><span>−${mdl(c.disc)}</span></div>`:''}<div class="g"><span>Итого</span><span>${mdl(c.tot)}</span></div></div>
   ${over(R,c)?'<div class="mgwr">Скидка больше 20% — проверьте, что это согласовано.</div>':''}
   ${RES?`<div class="mgres"><b>Ссылка для клиента готова · №${he(RES.id)}</b><input readonly value="${he(RES.url)}"><div><button data-a="copy">Скопировать ссылку</button><a href="${he(RES.wa)}" target="_blank" rel="noopener">WhatsApp</a><a href="${he(RES.vb)}">Viber</a><a href="${he(RES.url)}" target="_blank" rel="noopener">Открыть</a></div></div>`:''}`;
  showCl()}
function showCl(){const e=q('#mgcl');if(!e)return;if(!CL||!CL.client){e.hidden=true;return}const k=CL.client,os={new:'новый',work:'в работе',done:'выдан',cancel:'отменён'};
  e.hidden=false;e.innerHTML=`<b>Клиент уже есть: ${he(k.name||'без имени')}</b> · ${he(k.tel)}${k.mg?' · ведёт '+he(k.mg):''}${k.tags&&k.tags.length?' · '+k.tags.map(he).join(', '):''}<br>Заказы: ${k.orders.length}, на ${mdl(k.tot||0)} · подборки: ${k.offers.length}${k.last?' · последний контакт '+new Date(k.last).toLocaleDateString('ru-RU'):''}
   ${k.orders.slice(0,3).map(o=>`<br>— заказ ${new Date(o.t).toLocaleDateString('ru-RU')}: ${mdl(o.tot)} (${os[o.st]||o.st})${o.mg?', '+he(o.mg):''}`).join('')}${k.offers.slice(0,3).map(o=>`<br>— подборка №${he(o.id)} ${new Date(o.t).toLocaleDateString('ru-RU')}: ${mdl(o.tot)}${o.mg?', '+he(o.mg):''}`).join('')}${k.notes?`<br><i>${he(k.notes).slice(0,300)}</i>`:''}`}
let ct=0;async function findCl(){const t=S.tel.replace(/\D/g,'');if(t.length<8){CL=null;showCl();return}try{CL=await api('/api/client-find?tel='+encodeURIComponent(S.tel))}catch(_){CL=null}showCl()}

async function payload(){const R=await lines();return {items:R.map(r=>({sku:r.i.sku,f:r.i.f,n:nm(r.x),sub:String(tx('s',r.x.sub)||'').slice(0,200),img:pics(r.x)[0]||'',st:r.x.st||'',q:r.i.q,p:r.p,...(r.o?{o:r.o}:{}),dk:r.i.dk,dv:+r.i.dv||0})),dk:S.dk,dv:+S.dv||0,name:S.name.trim(),tel:S.tel.trim(),cm:S.cm.trim(),lang:LANG.toUpperCase()}}
const base=()=>location.href.replace(/[^/]*$/,'');
async function send(){if(!S.items.length)return toast('Подборка пуста');const R=await lines(),c=calc(R);
  if(over(R,c)&&!confirm('Скидка больше 20%. Отправить клиенту?'))return;
  try{const j=await api('/api/offer',await payload());const url=base()+'desk-offer.html?o='+j.id;
    const txt=(LANG==='ru'?'Здравствуйте! Подборка техники Teka для вас: ':'Bună ziua! Selecția de tehnică Teka pentru dvs.: ')+url;
    const tel=S.tel.replace(/\D/g,'');RES={id:j.id,url,wa:tel?`https://wa.me/${tel.length===8?'373'+tel:tel.replace(/^0/,'373')}?text=${encodeURIComponent(txt)}`:'https://wa.me/?text='+encodeURIComponent(txt),vb:'viber://forward?text='+encodeURIComponent(txt)};
    draw();toast('Подборка сохранена')}catch(e){toast(e.message)}}
async function orderNow(){if(!S.items.length)return toast('Подборка пуста');const R=await lines(),c=calc(R);
  if(!S.tel.trim()&&!confirm('Телефон клиента не указан — заказ не попадёт в базу клиентов. Оформить?'))return;
  if(!confirm(`Оформить заказ на ${mdl(c.tot)}?`))return;
  try{await api('/api/order',{items:R.map(r=>({sku:r.i.sku,n:nm(r.x),q:r.i.q,p:r.u,...(r.p>r.u?{o:r.p}:{})})),tot:c.tot,name:S.name.trim(),tel:S.tel.trim(),cm:S.cm.trim(),ch:'mgr',lang:LANG.toUpperCase(),page:location.href.slice(0,300),...(RES?{of:RES.id}:{})});
    toast('Заказ записан в журнал');if(confirm('Заказ записан. Очистить подборку?')){S={items:[],dk:'pct',dv:0,name:'',tel:'',cm:''};RES=null;CL=null;sv();mark();draw()}}catch(e){toast(e.message)}}

async function compare(){const R=await lines();let L=R.filter(r=>r.i.c);if(L.length<2)L=R.slice(0,3);L=L.slice(0,3);if(L.length<2)return toast('Отметьте 2–3 товара для сравнения');
  const G=[];const key=(g,k)=>tx('k',g)+'|'+tx('k',k);const V=L.map(()=>({}));
  L.forEach((r,j)=>(r.x.specs||[]).forEach(g=>(g.r||[]).forEach(([k,v])=>{const kk=key(g.t,k);if(!G.some(z=>z[0]===kk))G.push([kk,tx('k',g.t),tx('k',k)]);V[j][kk]=tx('v',v)})));
  let h='',last='';for(const [kk,g,k] of G){if(g!==last){h+=`<tr class="gr"><td colspan="${L.length+1}">${he(g)}</td></tr>`;last=g}const vs=V.map(o=>o[kk]||'—');h+=`<tr class="${new Set(vs).size>1?'df':''}"><td>${he(k)}</td>${vs.map(v=>`<td>${he(v)}</td>`).join('')}</tr>`}
  const w=document.createElement('div');w.className='mgw on';w.style.zIndex=97;const m=document.createElement('div');m.className='mgc';
  m.innerHTML=`<h3 style="font-size:19px;padding:18px 22px;display:flex;align-items:center"><span style="flex:1">Сравнение</span><span class="mgok"><input type="checkbox" id="mgdf"> только различия</span><button class="x" style="margin-left:14px;width:34px;height:34px;border-radius:50%;border:1px solid var(--line)">✕</button></h3><div class="bd"><table><thead><tr><th></th>${L.map(r=>`<th><img src="${he(pics(r.x)[0]||'')}" alt="">${he(nm(r.x))}<br><small style="color:var(--mute);font-weight:500">${he(r.i.sku)}</small></th>`).join('')}</tr></thead><tbody>
   <tr class="${new Set(L.map(r=>r.u)).size>1?'df':''}"><td>Цена</td>${L.map(r=>`<td><b>${r.p?mdl(r.u):'по запросу'}</b>${r.u<r.p?` <s style="color:var(--mute)">${mdl(r.p)}</s>`:''}</td>`).join('')}</tr>
   <tr><td>Наличие</td>${L.map(r=>`<td>${stk(r.x)}</td>`).join('')}</tr><tr><td>Бренд</td>${L.map(r=>`<td>${he(bnd(r.x))}</td>`).join('')}</tr>${h}</tbody></table></div>`;
  const rm=()=>{w.remove();m.remove()};w.onclick=rm;q('.x',m).onclick=rm;q('#mgdf',m).onchange=e=>m.querySelectorAll('tbody tr:not(.df):not(.gr)').forEach(t=>t.hidden=e.target.checked);
  document.body.append(w,m)}

function ui(){if(q('.mgd'))return;const w=document.createElement('div');w.className='mgw';const d=document.createElement('aside');d.className='mgd';
  d.innerHTML=`<h3><span>Подборка для клиента</span><button class="x" data-a="close" aria-label="Закрыть">✕</button></h3><div class="bd"></div>
   <div class="ft"><button data-a="cmp">Сравнить</button><button data-a="pdf">PDF / Печать</button><button data-a="clr">Очистить</button><span style="flex:1"></span><button class="k" data-a="order">Оформить заказ сейчас</button><button class="r" data-a="send">Отправить клиенту</button></div>`;
  document.body.append(w,d);w.onclick=close;
  d.addEventListener('click',async e=>{const a=e.target.closest('[data-a]'),it=e.target.closest('.mgi');
    if(it&&e.target.closest('[data-rm]')){S.items.splice(+it.dataset.k,1);RES=null;sv();mark();draw();return}
    if(!a)return;const k=a.dataset.a;
    if(k==='close')close();if(k==='send')send();if(k==='order')orderNow();if(k==='cmp')compare();
    if(k==='pdf'){if(!S.items.length)return toast('Подборка пуста');window.open(RES?RES.url+'&print=1':'desk-offer.html?local=1&print=1','_blank')}
    if(k==='clr'&&confirm('Очистить подборку?')){S={items:[],dk:'pct',dv:0,name:'',tel:'',cm:''};RES=null;CL=null;sv();mark();draw()}
    if(k==='copy'){try{await navigator.clipboard.writeText(RES.url);toast('Ссылка скопирована')}catch(_){q('.mgres input',d).select()}}});
  d.addEventListener('change',e=>{const t=e.target,it=t.closest('.mgi');
    if(it){const i=S.items[+it.dataset.k];if(t.matches('[data-q]'))i.q=Math.max(1,Math.min(99,+t.value||1));if(t.matches('[data-dv]'))i.dv=Math.max(0,+t.value||0);if(t.matches('[data-dk]'))i.dk=t.value;if(t.matches('[data-cmp]')){i.c=t.checked;sv();return}RES=null;sv();draw();return}
    if(t.matches('[data-adv]'))S.dv=Math.max(0,+t.value||0);if(t.matches('[data-adk]'))S.dk=t.value;if(t.matches('[data-adv],[data-adk]')){RES=null;sv();draw()}});
  d.addEventListener('input',e=>{const t=e.target;if(t.dataset.s){S[t.dataset.s]=t.value;RES=null;const r=q('.mgres',d);if(r)r.remove();sv();if(t.dataset.s==='tel'){clearTimeout(ct);ct=setTimeout(findCl,500)}}})}

function start(){bar();ui();mark();new MutationObserver(()=>{clearTimeout(start.t);start.t=setTimeout(mark,50)}).observe(document.body,{childList:true,subtree:true});
  api('/api/me').catch(e=>toast(e.message));if(S.tel)findCl()}
document.addEventListener('click',e=>{if(!M)return;const b=e.target.closest('.mgb');if(b){e.preventDefault();e.stopPropagation();const a=b.closest('.pc');add(a.dataset.f,a.dataset.sku);return}
  if(e.target.closest('#mgAdd')){add(F,SKU);return}
  const m=e.target.closest('.mgp [data-m]');if(m){if(m.dataset.m==='sel')open();if(m.dataset.m==='out'&&confirm('Выйти из режима менеджера?'))logout()}},true);
document.addEventListener('click',e=>{if(e.target.closest('#lng'))setTimeout(()=>{bar();mark()},0)});
addEventListener('storage',e=>{if(e.key===SK){S=ld();bar();mark()}});
if(M)start();else if(window.MGR_LOGIN)login();
})();
