/* Чат сайта → Telegram (мобильные страницы). Подключается _src/chat/inject.py. История общая с ПК-виджетом (tkSid, tkChat). */
(()=>{if(window.tkChatOn)return;window.tkChatOn=1;
const API='https://teka-chat.teka-md.workers.dev';
const ls={g:k=>{try{return localStorage.getItem(k)}catch(_){return null}},s:(k,v)=>{try{localStorage.setItem(k,v)}catch(_){}}};
let sid=ls.g('tkSid');if(!sid){sid=Math.random().toString(36).slice(2)+Date.now().toString(36);ls.s('tkSid',sid)}
let L=[];try{L=JSON.parse(ls.g('tkChat')||'[]')}catch(_){}
const sv=()=>ls.s('tkChat',JSON.stringify(L.slice(-100)));
const ru=()=>(ls.g('tk-lang')||'ro')==='ru',W=(r,o)=>ru()?r:o;
const isOpen=()=>{const d=new Date(new Date().toLocaleString('en-US',{timeZone:'Europe/Chisinau'})),w=d.getDay(),h=d.getHours()+d.getMinutes()/60;return w>=1&&w<=5?h>=10&&h<18:w===6?h>=10&&h<15:false};
const hello=()=>isOpen()?W('Здравствуйте! 👋 Я менеджер Teka Moldova. Напишите вопрос — отвечу в течение пары минут.','Bună ziua! 👋 Sunt managerul Teka Moldova. Scrieți întrebarea — vă răspund în câteva minute.'):W('Здравствуйте! Сейчас магазин закрыт. Оставьте вопрос и номер телефона — ответим с 10:00.','Bună ziua! Acum magazinul e închis. Lăsați întrebarea și numărul de telefon — vă răspundem de la 10:00.');
const Q=()=>ru()?['Есть в наличии?','Доставка','Помогите выбрать','Перезвоните мне']:['Este în stoc?','Livrare','Ajutați-mă să aleg','Sunați-mă'];
const lk=u=>String(u||'').replace(/^https:\/\/(www\.)?teka\.md\//,'');
const esc=t=>String(t).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
let unread=0,last=L.reduce((a,m)=>Math.max(a,m.t||0),0),tm=null;
const css=`#tkc{--r:#D8232A;--k:#100E0C;font-family:"Montserrat",system-ui,sans-serif;-webkit-tap-highlight-color:transparent}
#tkc *{box-sizing:border-box;margin:0}#tkc button{border:0;background:none;cursor:pointer;font:inherit;color:inherit;padding:0}
#tkc svg{fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.tkc-b{position:fixed;right:14px;bottom:calc(16px + env(safe-area-inset-bottom));z-index:35;width:56px;height:56px;border-radius:50%;background:var(--r)!important;color:#fff!important;display:grid;place-items:center;box-shadow:0 10px 26px -8px rgba(216,35,42,.6);transition:transform .2s}
.tkc-b:active{transform:scale(.92)}.tkc-b svg{width:26px;height:26px}
.tkc-b i{position:absolute;top:-2px;right:-2px;min-width:20px;height:20px;border-radius:10px;background:var(--k);color:#fff;font:700 11px/20px "Montserrat",sans-serif;font-style:normal;padding:0 5px;display:none;text-align:center}.tkc-b i.on{display:block}
.tkc-p{position:fixed;inset:0;z-index:130;height:100dvh;background:#fff;color:var(--k);display:flex;flex-direction:column;opacity:0;visibility:hidden;transform:translateY(24px);transition:opacity .25s,transform .25s,visibility .25s}
#tkc.on .tkc-p{opacity:1;visibility:visible;transform:none}
.tkc-h{background:var(--k);color:#fff;padding:calc(12px + env(safe-area-inset-top)) 14px 12px 16px;display:flex;gap:12px;align-items:center}
.tkc-h .av{width:40px;height:40px;border-radius:50%;background:var(--r);display:grid;place-items:center;font-weight:800;font-size:11px;letter-spacing:.04em;flex:none}
.tkc-h b{display:block;font-size:15px}.tkc-h small{font-size:12.5px;color:#cfcfcf;display:flex;align-items:center;gap:6px}.tkc-h small:before{content:"";width:8px;height:8px;border-radius:50%;background:#3ddc84}.tkc-h small.off:before{background:#999}
#tkc .tkc-x{margin-left:auto;width:40px;height:40px;display:grid;place-items:center;color:#fff!important}.tkc-h button svg{width:24px;height:24px}
.tkc-l{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;padding:16px 14px;display:flex;flex-direction:column;gap:8px;background:#F4F3F1}
.tkc-l div{max-width:84%;padding:10px 13px;border-radius:16px;font-size:15px;line-height:1.4;white-space:pre-wrap;overflow-wrap:anywhere}
.tkc-l .m{background:#fff;align-self:flex-start;border-bottom-left-radius:4px}.tkc-l .c{background:var(--r);color:#fff;align-self:flex-end;border-bottom-right-radius:4px}
.tkc-l .pc{display:block;color:inherit;text-decoration:none}.tkc-l .pc img{display:block;width:100%;height:160px;object-fit:contain;background:#fff;border-radius:10px;margin:4px 0 8px}.tkc-l .pc b{display:block;margin-top:8px;color:var(--r);font-weight:700}
.tkc-l .m small{display:block;font-size:11.5px;color:#6B6B6B;margin-bottom:2px;font-weight:600}
.tkc-q{display:flex;gap:6px;overflow-x:auto;padding:0 14px 10px;background:#F4F3F1;scrollbar-width:none}.tkc-q::-webkit-scrollbar{display:none}
.tkc-q button{flex:none;border:1px solid #E2E0DC!important;background:#fff!important;border-radius:18px;padding:8px 13px!important;font-size:13.5px;font-weight:600;white-space:nowrap}
.tkc-f{display:flex;gap:8px;padding:10px 12px calc(10px + env(safe-area-inset-bottom));border-top:1px solid #E6E6E6;background:#fff}
.tkc-f textarea{flex:1;resize:none;border:1px solid #E2E0DC;border-radius:22px;padding:11px 15px;font:500 16px "Montserrat",sans-serif;height:46px;max-height:120px;outline:none;color:var(--k);background:#fff}.tkc-f textarea:focus{border-color:var(--k)}
.tkc-f button{width:46px;height:46px;border-radius:50%;background:var(--r)!important;color:#fff!important;display:grid;place-items:center;flex:none}.tkc-f button svg{width:20px;height:20px}
html.tkc-lock,html.tkc-lock body{overflow:hidden}`;
const root=document.createElement('div');root.id='tkc';
root.innerHTML=`<style>${css}</style><div class="tkc-p" data-lenis-prevent><div class="tkc-h"><div class="av">TEKA</div><div><b>Teka Moldova</b><small></small></div><button class="tkc-x" aria-label="close"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div><div class="tkc-l"></div><div class="tkc-q"></div><div class="tkc-f"><textarea rows="1"></textarea><button class="tkc-g" aria-label="send"><svg viewBox="0 0 24 24"><path d="M4 12l16-8-6 16-2.5-6.5z"/></svg></button></div></div><button class="tkc-b" aria-label="chat"><svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12z"/></svg><i></i></button>`;
const $=s=>root.querySelector(s),on=()=>root.classList.contains('on');
function draw(){const o=isOpen(),st=$('.tkc-h small');st.textContent=o?W('Менеджер онлайн','Manager online'):W('Ответим с 10:00','Răspundem de la 10:00');st.className=o?'':'off';
  const l=$('.tkc-l');l.innerHTML=`<div class="m"><small>Teka</small>${esc(hello())}</div>`+L.map(m=>`<div class="${m.f==='c'?'c':'m'}">${m.f==='m'&&m.n?`<small>${esc(m.n)}</small>`:''}${m.p?`<a class="pc" href="${lk(m.p.u)}">${m.p.i?`<img src="${lk(m.p.i)}" alt="">`:''}<span>${esc(m.x)}</span><b>${W('Открыть товар','Vezi produsul')}</b></a>`:esc(m.x)}</div>`).join('');
  $('.tkc-q').innerHTML=L.some(m=>m.f==='c')?'':Q().map(q=>`<button>${esc(q)}</button>`).join('');
  $('textarea').placeholder=W('Напишите сообщение…','Scrieți un mesaj…');l.scrollTop=1e6;
  const n=$('.tkc-b i');n.textContent=unread;n.classList.toggle('on',unread>0)}
async function poll(){if(document.hidden||!L.some(m=>m.f==='c'))return;try{const r=await (await fetch(`${API}/poll?sid=${sid}&after=${last}`)).json();const nw=(r.m||[]).filter(m=>!L.some(z=>z.t===m.t));if(nw.length){nw.forEach(m=>{L.push(m);last=Math.max(last,m.t);if(m.f==='m'&&!on())unread++});sv();draw()}}catch(_){}}
function loop(){clearTimeout(tm);poll();tm=setTimeout(loop,on()?2500:12000)}
async function send(tx,k){tx=tx.trim();if(!tx)return;const m={f:'c',x:tx,t:Date.now()};L.push(m);sv();draw();
  let r={};try{r=await (await fetch(API+'/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sid,text:tx,q:k,page:location.href,lang:ru()?'RU':'RO'})})).json()}catch(_){}
  if(r.m){m.t=r.m.t;last=Math.max(last,r.m.t);sv()}else{L.push({f:'m',x:r.err==='limit'?W('Слишком много сообщений подряд — подождите минуту.','Prea multe mesaje — așteptați un minut.'):W('Сообщение не доставлено. Напишите нам в WhatsApp: +373 68 27 27 02','Mesajul nu a fost trimis. Scrieți-ne în WhatsApp: +373 68 27 27 02'),t:Date.now(),n:'Teka'});sv();draw()}
  loop()}
function show(v){root.classList.toggle('on',v);document.documentElement.classList.toggle('tkc-lock',v);if(v){unread=0;draw();loop()}}
root.addEventListener('click',e=>{const g=e.target;
  if(g.closest('.tkc-b'))return show(true);
  if(g.closest('.tkc-x'))return show(false);
  if(g.closest('.tkc-g')){const t=$('textarea');send(t.value);t.value='';t.focus();return}
  const q=g.closest('.tkc-q button');if(q)send(q.textContent,['stock','delivery','choose','call'][[...q.parentNode.children].indexOf(q)])});
root.addEventListener('keydown',e=>{if(e.target.tagName==='TEXTAREA'&&e.key==='Enter'&&!e.shiftKey){e.preventDefault();send(e.target.value);e.target.value=''}});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)loop()});
addEventListener('storage',e=>{if(e.key==='tkChat'){try{L=JSON.parse(e.newValue||'[]')}catch(_){}draw()}});
const mount=()=>{document.body.appendChild(root);draw();loop()};
document.body?mount():addEventListener('DOMContentLoaded',mount);
})();
