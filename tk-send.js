/* Окно «Отправить клиенту»: WhatsApp / Telegram / Viber / почта / PDF-файл / печать.
   Документ — страница desk-offer.html (?o=… или ?local=1). PDF собирается внутри скрытого iframe (window.tkPdf). */
(()=>{if(window.tkSend)return;
const st=document.createElement('style');st.textContent=`
.tks-w{position:fixed;inset:0;z-index:2147483000;background:rgba(0,0,0,.4);display:grid;place-items:center;padding:16px;font:14px/1.4 Inter,system-ui,-apple-system,sans-serif;color:#111}
.tks{background:#fff;border-radius:14px;width:min(520px,100%);max-height:calc(100vh - 32px);overflow:auto;box-shadow:0 20px 60px rgba(0,0,0,.3)}
.tks h4{font-size:18px;font-weight:700;padding:18px 20px 4px;display:flex;align-items:center;gap:10px;margin:0}.tks h4 span{flex:1}
.tks .x{width:34px;height:34px;border-radius:50%;border:1px solid #e3e3e3;background:#fff;cursor:pointer;font-size:15px}
.tks .sb{color:#777;font-size:13px;padding:0 20px 12px}
.tks .f{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:0 20px 14px}.tks label{display:grid;gap:4px;font-size:12px;font-weight:600;color:#444}
.tks input{height:38px;border:1px solid #ddd;border-radius:8px;padding:0 10px;font:inherit;font-size:14px;min-width:0}
.tks .g{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:0 20px 14px}
.tks button.b,.tks a.b{height:46px;border-radius:23px;border:1px solid #ddd;background:#fff;font:inherit;font-weight:600;font-size:14px;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;color:#111;text-decoration:none}
.tks .b svg{width:19px;height:19px;flex:none}
.tks .b.wa{background:#25D366;border-color:#25D366;color:#fff}.tks .b.tg{background:#229ED9;border-color:#229ED9;color:#fff}.tks .b.vb{background:#7360F2;border-color:#7360F2;color:#fff}.tks .b.em{background:#111;border-color:#111;color:#fff}
.tks .wa svg,.tks .tg svg,.tks .vb svg{fill:#fff}.tks .em svg{stroke:#fff}
.tks .b.sh{grid-column:1/-1;background:#C8102E;border-color:#C8102E;color:#fff}
.tks .lk{display:flex;gap:8px;padding:0 20px 14px}.tks .lk input{flex:1;color:#555;font-size:13px}
.tks .h{font-size:12.5px;color:#777;padding:0 20px 18px;line-height:1.45}
.tks .ms{min-height:18px;font-size:13px;font-weight:600;color:#1a7f45;padding:0 20px 8px}
.tks-t{position:fixed;left:50%;bottom:28px;transform:translateX(-50%);background:#111;color:#fff;padding:12px 18px;border-radius:22px;font:600 14px system-ui;z-index:2147483001}
@media (max-width:480px){.tks .f{grid-template-columns:1fr}}`;
document.head.appendChild(st);
const I={wa:'<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>',
 tg:'<svg viewBox="0 0 24 24"><path d="M21.9 4.3 18.7 19.5c-.2 1-.9 1.3-1.7.8l-4.8-3.6-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2L6.5 13.2 1.8 11.7c-1-.3-1-1 .2-1.5L20.5 3c.9-.3 1.6.2 1.4 1.3z"/></svg>',
 vb:'<svg viewBox="0 0 24 24"><path d="M12 2.6c5 0 8.1 2.9 8.1 7.7v3.3c0 4.8-3.1 7.7-8.1 7.7-.5 0-.9 0-1.3-.1l-2.9 2.4v-3.1c-2.5-1.3-3.9-3.6-3.9-6.9v-3.3c0-4.8 3.1-7.7 8.1-7.7z"/></svg>',
 em:'<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
 pdf:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14"/></svg>',
 pr:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z"/></svg>',
 sh:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3m0 0L8 7m4-4 4 4M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>'};
const he=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const toast=m=>{const t=document.createElement('div');t.className='tks-t';t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),2600)};
const abs=u=>new URL(u,location.href).href;
const telD=t=>{let d=String(t||'').replace(/\D/g,'');if(d.length===9&&d[0]==='0')d='373'+d.slice(1);else if(d.length===8)d='373'+d;return d};

/* документ в скрытом iframe: PDF-файл и печать без новой вкладки */
let FR=null;
function frame(url){const u=abs(url);if(FR&&FR.u===u)return FR.p;if(FR)FR.el.remove();
  const el=document.createElement('iframe');el.setAttribute('aria-hidden','true');el.style.cssText='position:fixed;left:-3000px;top:0;width:1280px;height:900px;border:0;visibility:hidden';
  const p=new Promise((ok,no)=>{const t0=Date.now();el.onload=()=>{const w=el.contentWindow,chk=()=>{try{if(w.tkPdf&&w.document.querySelector('#ow .ot'))return ok(w)}catch(_){return no(new Error('frame'))}if(Date.now()-t0>20000||Date.now()-t0>3000&&!w.document.getElementById('ow'))return no(new Error('Документ не загрузился'));setTimeout(chk,150)};chk()}});
  el.src=u;document.body.appendChild(el);FR={u,el,p};p.catch(()=>{if(FR&&FR.el===el){el.remove();FR=null}});return p}
async function pdfBlob(url){const w=await frame(url);return {b:await w.tkPdf(),n:w.tkPdfName()}}
function save(b,n){const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=n;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),60000)}
async function pdf(url){toast('Готовим PDF…');try{const {b,n}=await pdfBlob(url);save(b,n);toast('PDF сохранён: '+n);return {b,n}}catch(e){toast('Не удалось создать PDF: '+e.message)}}
async function print(url){try{const w=await frame(url);w.focus();w.print();return true}catch(e){toast('Документ не загрузился: '+e.message);return false}}
const MOB=()=>matchMedia('(pointer:coarse)').matches&&innerWidth<1024;
const canFiles=()=>{if(!MOB())return false;try{return !!(navigator.canShare&&navigator.canShare({files:[new File(['x'],'x.pdf',{type:'application/pdf'})]}))}catch(_){return false}};

/* o: {url (страница документа), link (ссылка для клиента, если есть), title, no, tot, name, tel, email, lang:'ru'|'ro', kind:'offer'|'order'} */
function open(o){const ru=(o.lang||'ru').toLowerCase()!=='ro',L=(r,m)=>ru?m:r;
  const kindT=o.kind==='order'?L('comanda','заказ'):L('oferta comercială','коммерческое предложение');
  const msg=(nl)=>{const nm=W.querySelector('[name=n]').value.trim();return [L('Bună ziua','Здравствуйте')+(nm?', '+nm:'')+'!',
    (o.kind==='order'?L('Comanda dvs. Teka','Ваш заказ Teka'):L('Oferta comercială Teka pentru dvs.','Коммерческое предложение Teka для вас'))+(o.no?' №'+o.no:'')+(o.tot!=null?' — '+L('total','итого')+' '+(+o.tot).toLocaleString('ru-RU').replace(/,/g,' ')+' MDL':'')+'.',
    o.link&&!nl?L('Vizualizați și descărcați PDF: ','Посмотреть и скачать PDF: ')+o.link:'','',L('Teka Moldova · +373 68 27 27 02 · teka.md','Teka Moldova · +373 68 27 27 02 · teka.md')].filter((x,i)=>x||i===3).join('\n')};
  const W=document.createElement('div');W.className='tks-w';
  W.innerHTML=`<div class="tks" role="dialog" aria-modal="true"><h4><span>${L('Trimite clientului','Отправить клиенту')}</span><button class="x" data-a="x" aria-label="Закрыть">✕</button></h4>
   <div class="sb">${he(o.title||kindT.charAt(0).toUpperCase()+kindT.slice(1))}${o.no?' №'+he(o.no):''}</div>
   <div class="f"><label>${L('Nume client','Имя клиента')}<input name="n" value="${he(o.name||'')}"></label><label>${L('Telefon','Телефон')}<input name="t" value="${he(o.tel||'')}" inputmode="tel" placeholder="+373 …"></label>
    <label style="grid-column:1/-1">E-mail<input name="e" type="email" value="${he(o.email||'')}" placeholder="client@mail.com"></label></div>
   <div class="g">${canFiles()?`<button class="b sh" data-a="sh">${I.sh}${L('Partajează fișierul PDF','Поделиться PDF-файлом')}</button>`:''}
    <button class="b wa" data-a="wa">${I.wa}WhatsApp</button><button class="b tg" data-a="tg">${I.tg}Telegram</button>
    <button class="b vb" data-a="vb">${I.vb}Viber</button><button class="b em" data-a="em">${I.em}${L('E-mail','Почта')}</button>
    <button class="b" data-a="pdf">${I.pdf}${L('Descarcă PDF','Скачать PDF')}</button><button class="b" data-a="pr">${I.pr}${L('Tipărire','Печать')}</button></div>
   ${o.link?`<div class="lk"><input readonly value="${he(o.link)}"><button class="b" data-a="cp" style="height:38px;padding:0 14px">${L('Copiază','Копировать')}</button></div>`:''}
   <div class="ms"></div>
   <div class="h">${o.link?L('Mesajul conține linkul către document — clientul îl deschide și descarcă PDF.','В сообщении — ссылка на документ: клиент откроет его и скачает PDF.'):''} ${canFiles()?'':L('Pentru a atașa fișierul: «Descarcă PDF» și trageți-l în chat/e-mail.','Чтобы приложить сам файл: «Скачать PDF» и перетащите его в чат или письмо.')}</div></div>`;
  document.body.appendChild(W);const ms=t=>W.querySelector('.ms').textContent=t;
  const close=()=>{W.remove();document.removeEventListener('keydown',esc)},esc=e=>{if(e.key==='Escape')close()};document.addEventListener('keydown',esc);
  W.addEventListener('click',async e=>{if(e.target===W)return close();const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,tx=msg(),tel=telD(W.querySelector('[name=t]').value);
    if(a==='x')return close();
    if(a==='wa'){if(MOB())location.href='https://wa.me/'+(tel||'')+'?text='+encodeURIComponent(tx);else window.open('https://web.whatsapp.com/send?'+(tel?'phone='+tel+'&':'')+'text='+encodeURIComponent(tx),'tkwa');ms(tel?L('Deschis WhatsApp — apăsați «Trimite»','Открыт WhatsApp — нажмите «Отправить» в чате'):L('Număr de telefon incorect — alegeți chatul în WhatsApp','Номер не распознан — выберите чат в WhatsApp'))}
    if(a==='tg'){try{navigator.clipboard.writeText(tx)}catch(_){}const ok=tel.length>=11;
      window.open(ok?'https://t.me/+'+tel:'https://t.me/share/url?url='+encodeURIComponent(o.link||'https://teka.md')+'&text='+encodeURIComponent(msg(1)),'_blank','noopener');
      ms(ok?L('Textul cu link e copiat — în chatul clientului apăsați Cmd+V (Ctrl+V) și «Trimite»','Текст со ссылкой скопирован — в чате клиента нажмите Cmd+V (Ctrl+V) и «Отправить»'):L('Număr necunoscut — alegeți chatul; textul cu link e copiat (Cmd+V)','Номер не распознан — выберите чат; текст со ссылкой скопирован (Cmd+V)'))}
    if(a==='vb'){try{navigator.clipboard.writeText(tx)}catch(_){}location.href='viber://forward?text='+encodeURIComponent(tx);ms(L('Deschis Viber (textul e și copiat)','Открыт Viber (текст также скопирован)'))}
    if(a==='em'){const em=W.querySelector('[name=e]').value.trim(),su='Teka — '+kindT+(o.no?' №'+o.no:'');
      if(MOB())location.href='mailto:'+encodeURIComponent(em).replace('%40','@')+'?subject='+encodeURIComponent(su)+'&body='+encodeURIComponent(tx);
      else window.open('https://mail.google.com/mail/?view=cm&fs=1&to='+encodeURIComponent(em)+'&su='+encodeURIComponent(su)+'&body='+encodeURIComponent(tx),'tkmail');
      ms(L('Deschis Gmail — atașați PDF dacă e nevoie și apăsați «Trimite»','Открыт Gmail — при желании приложите PDF и нажмите «Отправить»'))}
    if(a==='pdf'){b.disabled=true;ms(L('Se pregătește PDF…','Готовим PDF…'));const r=await pdf(o.url);ms(r?L('PDF salvat: ','PDF скачан: ')+r.n:L('Nu s-a putut crea PDF','Не удалось создать PDF — сообщите менеджеру сайта'));b.disabled=false}
    if(a==='pr'){ms(L('Se deschide tipărirea…','Открываем печать…'));print(o.url).then(ok=>ms(ok?'':L('Documentul nu s-a încărcat','Документ не загрузился')))}
    if(a==='cp'){try{await navigator.clipboard.writeText(o.link);ms(L('Link copiat','Ссылка скопирована'))}catch(_){W.querySelector('.lk input').select()}}
    if(a==='sh'){if(!PB){ms(L('PDF se pregătește — apăsați peste câteva secunde','PDF ещё готовится — нажмите через пару секунд'));return}
      try{await navigator.share({files:[new File([PB.b],PB.n,{type:'application/pdf'})],title:'Teka — '+kindT,text:tx});ms(L('Trimis','Отправлено'))}catch(er){ms(er&&er.name==='AbortError'?'':L('Nu s-a reușit: ','Не получилось: ')+(er&&er.message||er))}}});
  let PB=null;if(canFiles())pdfBlob(o.url).then(r=>{PB=r}).catch(()=>{});else frame(o.url).catch(()=>{});return W}
window.tkSend={open,pdf,print};
})();
