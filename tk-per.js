/* Выбор периода: кнопка .tkpb (data-v, data-a, data-b, data-l) → окно с быстрыми кнопками, месяцами и календарём «с — по».
   Значения как у старого фильтра: '' | d | w | m | pm | y | py | ГГГГ-ММ | c (+ a, b = ГГГГ-ММ-ДД).
   После выбора на кнопке срабатывает событие 'tkper' {id,v,a,b}. */
(function(){
if(window.tkPer)return;
const RU={all:'Всё время',d:'Сегодня',w:'Последние 7 дней',m:'Этот месяц',pm:'Прошлый месяц',y:'Этот год',py:'Прошлый год',ok:'Готово',reset:'Сбросить',pick:'Выберите начало и конец периода',from:'с',to:'по',year:'Весь {0} год',mon:'Месяцы',days:['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],loc:'ru-RU'};
const RO={all:'Toată perioada',d:'Azi',w:'Ultimele 7 zile',m:'Luna aceasta',pm:'Luna trecută',y:'Anul acesta',py:'Anul trecut',ok:'Gata',reset:'Resetează',pick:'Alegeți începutul și sfârșitul perioadei',from:'de la',to:'până la',year:'Tot anul {0}',mon:'Lunile',days:['Lu','Ma','Mi','Jo','Vi','Sâ','Du'],loc:'ro-RO'};
const P=['d','w','m','pm','y','py'];
const Z=n=>String(n).padStart(2,'0'),I=d=>d.getFullYear()+'-'+Z(d.getMonth()+1)+'-'+Z(d.getDate());
const D=s=>{const[y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d||1)};
const F=s=>s?s.slice(8,10)+'.'+s.slice(5,7)+'.'+s.slice(0,4):'';
const T=l=>l==='ro'?RO:RU;
const MN=(l,y,m,f)=>{const s=new Date(y,m,15).toLocaleString(T(l).loc,f||{month:'long'});return s};
function range(v,a,b){if(!v)return null;const t=new Date(),Y=t.getFullYear(),M=t.getMonth(),td=I(t);
  if(v==='d')return[td,td];if(v==='w')return[I(new Date(Y,M,t.getDate()-6)),td];if(v==='m')return[I(new Date(Y,M,1)),td];
  if(v==='pm')return[I(new Date(Y,M-1,1)),I(new Date(Y,M,0))];if(v==='y')return[Y+'-01-01',td];if(v==='py')return[(Y-1)+'-01-01',(Y-1)+'-12-31'];
  if(v==='c')return[a||'',b||'9999'];if(/^\d{4}$/.test(v))return[v+'-01-01',v+'-12-31'];return[v+'-01',v+'-31']}
function label(v,a,b,l){const t=T(l);if(!v)return t.all;if(t[v]&&P.includes(v))return t[v];
  if(/^\d{4}$/.test(v))return v;
  if(/^\d{4}-\d\d$/.test(v)){const s=MN(l,+v.slice(0,4),+v.slice(5)-1,{month:'long',year:'numeric'}).replace(/\s*г\.?$/,'');return s[0].toUpperCase()+s.slice(1)}
  if(v==='c'){if(a&&b&&a===b)return F(a);if(a&&b)return(a.slice(0,4)===b.slice(0,4)?F(a).slice(0,5):F(a))+' — '+F(b);if(a)return t.from+' '+F(a);if(b)return t.to+' '+F(b)}
  return t.all}
const IC='<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>';
function button(id,v,a,b,l,cls){const e=s=>String(s||'').replace(/"/g,'&quot;');
  return `<button type="button" class="tkpb${v?' on':''}${cls?' '+cls:''}" id="${e(id)}" data-v="${e(v)}" data-a="${e(a)}" data-b="${e(b)}" data-l="${e(l||'ru')}">${IC}<span>${label(v,a,b,l)}</span><i>▾</i></button>`}

const css=`.tkpb{display:inline-flex;align-items:center;gap:8px;height:40px;padding:0 12px;border:1px solid #d9d6d2;border-radius:10px;background:#fff;color:#100E0C;font:inherit;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap;max-width:100%}
.tkpb span{overflow:hidden;text-overflow:ellipsis}.tkpb i{font-style:normal;font-size:11px;opacity:.5}.tkpb.on{border-color:#C8102E;color:#C8102E}.tkpb svg{flex:none}
.tkpw{position:fixed;inset:0;z-index:2147483100}
.tkp{position:fixed;background:#fff;color:#100E0C;border-radius:14px;box-shadow:0 18px 50px rgba(0,0,0,.22);width:330px;padding:14px;font:14px/1.3 Inter,system-ui,-apple-system,sans-serif;user-select:none;-webkit-user-select:none}
.tkp *{box-sizing:border-box}
.tkp .ch{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}
.tkp .ch button{border:1px solid #e3e0dc;background:#f6f5f3;border-radius:16px;height:32px;padding:0 11px;font:inherit;font-size:13px;color:inherit;cursor:pointer}
.tkp .ch button.on{background:#C8102E;border-color:#C8102E;color:#fff}
.tkp .hd{display:flex;align-items:center;justify-content:space-between;margin:2px 0 8px}
.tkp .hd b{font-size:15px;cursor:pointer;padding:6px 10px;border-radius:8px}.tkp .hd b:hover{background:#f3f1ee}
.tkp .hd b:after{content:' ▾';font-size:11px;opacity:.5}
.tkp .ar{width:36px;height:36px;border-radius:50%;border:0;background:none;font-size:20px;cursor:pointer;color:inherit}.tkp .ar:hover{background:#f3f1ee}
.tkp .g{display:grid;grid-template-columns:repeat(7,1fr);row-gap:2px}
.tkp .g .w{font-size:11px;color:#8a857f;text-align:center;padding:4px 0}
.tkp .g button{height:38px;border:0;background:none;font:inherit;font-size:14px;color:inherit;cursor:pointer;position:relative;border-radius:0}
.tkp .g button.o{color:#c5c0ba}
.tkp .g button.in{background:#fbe7ea}
.tkp .g button.s,.tkp .g button.e{background:#C8102E;color:#fff;font-weight:700}
.tkp .g button.s{border-radius:19px 0 0 19px}.tkp .g button.e{border-radius:0 19px 19px 0}.tkp .g button.s.e{border-radius:19px}
.tkp .g button.t:not(.s):not(.e){box-shadow:inset 0 0 0 1.5px #100E0C;border-radius:19px}
.tkp .ms{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.tkp .ms button{height:44px;border:1px solid #e3e0dc;background:#fff;border-radius:10px;font:inherit;font-size:14px;color:inherit;cursor:pointer;text-transform:capitalize}
.tkp .ms button.on{background:#C8102E;border-color:#C8102E;color:#fff}.tkp .ms button.t{border-color:#100E0C}
.tkp .yr{width:100%;margin-top:8px;height:40px;border:1px solid #e3e0dc;background:#f6f5f3;border-radius:10px;font:inherit;font-weight:600;color:inherit;cursor:pointer}
.tkp .ft{display:flex;align-items:center;gap:8px;margin-top:12px;padding-top:12px;border-top:1px solid #eee}
.tkp .ft span{flex:1;font-size:13px;color:#5c5853}.tkp .ft span b{color:#100E0C}
.tkp .ft button{height:38px;padding:0 14px;border-radius:19px;font:inherit;font-weight:600;cursor:pointer;border:1px solid #d9d6d2;background:#fff;color:inherit}
.tkp .ft button.ok{background:#100E0C;border-color:#100E0C;color:#fff}.tkp .ft button.ok:disabled{opacity:.35;cursor:default}
@media (max-width:600px){.tkpw{background:rgba(0,0,0,.35)}.tkp{left:0!important;right:0;top:auto!important;bottom:0;width:100%;border-radius:18px 18px 0 0;padding:16px 16px calc(16px + env(safe-area-inset-bottom))}.tkp .g button{height:44px}.tkp .g button.s{border-radius:22px 0 0 22px}.tkp .g button.e{border-radius:0 22px 22px 0}.tkp .g button.s.e,.tkp .g button.t:not(.s):not(.e){border-radius:22px}}`;
let st=null;const addCss=()=>{if(st)return;st=document.createElement('style');st.textContent=css;document.head.appendChild(st)};

function open(btn){addCss();const l=btn.dataset.l||'ru',t=T(l),v0=btn.dataset.v||'';
  const r0=v0?range(v0,btn.dataset.a,btn.dataset.b):null,td=I(new Date());
  let s=r0&&r0[0]?r0[0]:'',e=r0&&r0[1]&&r0[1]!=='9999'?(r0[1]>td&&v0!=='c'&&!/^\d{4}(-\d\d)?$/.test(v0)?td:r0[1]):'';
  if(/^\d{4}-\d\d$/.test(v0)&&e)e=I(new Date(+v0.slice(0,4),+v0.slice(5),0));
  let cur=D(s||td);cur=new Date(cur.getFullYear(),cur.getMonth(),1);let mode='d',yv=cur.getFullYear();
  const W=document.createElement('div');W.className='tkpw';const B=document.createElement('div');B.className='tkp';W.appendChild(B);
  const close=()=>{W.remove();document.removeEventListener('keydown',key)},key=ev=>{if(ev.key==='Escape')close()};
  const fire=(v,a,b)=>{btn.dataset.v=v;btn.dataset.a=a||'';btn.dataset.b=b||'';btn.querySelector('span').textContent=label(v,a,b,l);btn.classList.toggle('on',!!v);close();
    btn.dispatchEvent(new CustomEvent('tkper',{bubbles:true,detail:{id:btn.id,v,a:a||'',b:b||''}}))};
  function draw(){
    const ch=`<div class="ch"><button data-p=""${!v0?' class="on"':''}>${t.all}</button>${P.map(k=>`<button data-p="${k}"${v0===k?' class="on"':''}>${t[k]}</button>`).join('')}</div>`;
    let body;
    if(mode==='m'){const ty=new Date().getFullYear(),tm=new Date().getMonth();
      body=`<div class="hd"><button class="ar" data-y="-1">‹</button><b data-mode>${yv}</b><button class="ar" data-y="1">›</button></div><div class="ms">${Array.from({length:12},(_,m)=>{const k=yv+'-'+Z(m+1);return`<button data-m="${k}" class="${v0===k?'on':''}${yv===ty&&m===tm?' t':''}">${MN(l,yv,m,{month:'short'}).replace('.','')}</button>`}).join('')}</div><button class="yr" data-yr="${yv}">${t.year.replace('{0}',yv)}</button>`}
    else{const y=cur.getFullYear(),m=cur.getMonth(),f=(new Date(y,m,1).getDay()+6)%7,cells=[];
      for(let i=0;i<42;i++){const d=new Date(y,m,1-f+i);cells.push(d)}
      const rows=cells.slice(35).every(d=>d.getMonth()!==m)?35:42;
      const mt=MN(l,y,m,{month:'long'});
      body=`<div class="hd"><button class="ar" data-mm="-1">‹</button><b data-mode>${mt[0].toUpperCase()+mt.slice(1)} ${y}</b><button class="ar" data-mm="1">›</button></div><div class="g">${t.days.map(x=>`<span class="w">${x}</span>`).join('')}${cells.slice(0,rows).map(d=>{const k=I(d),c=[];if(d.getMonth()!==m)c.push('o');if(k===td)c.push('t');
        if(s&&k===s)c.push('s');if(e&&k===e)c.push('e');if(s&&e&&k>s&&k<e)c.push('in');return`<button data-d="${k}" class="${c.join(' ')}">${d.getDate()}</button>`}).join('')}</div>`}
    const info=s?`<b>${F(s)}</b>${e&&e!==s?' — <b>'+F(e)+'</b>':e?'':' — …'}`:t.pick;
    B.innerHTML=ch+body+`<div class="ft"><span>${info}</span>${v0?`<button data-r>${t.reset}</button>`:''}<button class="ok" data-ok${s?'':' disabled'}>${t.ok}</button></div>`}
  B.addEventListener('click',ev=>{const x=ev.target.closest('button,b');if(!x)return;ev.stopPropagation();const q=x.dataset;
    if('p' in q)return fire(q.p);
    if('r' in q)return fire('');
    if('ok' in q){if(!s)return;return fire('c',s,e||s)}
    if('mode' in q){mode=mode==='d'?'m':'d';yv=cur.getFullYear();return draw()}
    if(q.mm){cur=new Date(cur.getFullYear(),cur.getMonth()+ +q.mm,1);return draw()}
    if(q.y){yv+= +q.y;return draw()}
    if(q.m)return fire(q.m);
    if(q.yr)return fire(q.yr);
    if(q.d){const k=q.d;if(!s||e){s=k;e=''}else if(k<s){e=s;s=k}else e=k;
      const d=D(k);if(d.getMonth()!==cur.getMonth())cur=new Date(d.getFullYear(),d.getMonth(),1);return draw()}});
  W.addEventListener('click',ev=>{if(ev.target===W)close()});document.addEventListener('keydown',key);
  draw();document.body.appendChild(W);
  if(innerWidth>600){const r=btn.getBoundingClientRect(),w=B.offsetWidth,h=B.offsetHeight;
    let x=Math.min(r.left,innerWidth-w-10),y=r.bottom+6;if(y+h>innerHeight-10)y=Math.max(10,r.top-h-6);B.style.left=Math.max(10,x)+'px';B.style.top=y+'px'}}
document.addEventListener('click',ev=>{const b=ev.target.closest&&ev.target.closest('.tkpb');if(b){ev.preventDefault();open(b)}});
if(document.head)addCss();else document.addEventListener('DOMContentLoaded',addCss);
window.tkPer={button,label,range,open};
})();
