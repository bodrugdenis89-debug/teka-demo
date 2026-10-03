(function(){
  var Q=new URLSearchParams(location.search);
  function mgr(){try{return !!localStorage.getItem('tkMgr')}catch(_){return false}}
  if(window.tekaScreensaver||!mgr()||!matchMedia('(pointer: fine)').matches||screen.width<1024)return;
  var CFG={idle:(+Q.get('idle')||60)*1000,clock:Q.get('clock')!=='0',dust:Q.get('dust')!=='0',base:'assets/screensaver/'};
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var small=Math.max(screen.width,screen.height)<1100||(navigator.connection&&navigator.connection.saveData);

  var ss=document.createElement('div');ss.id='ss';ss.setAttribute('aria-hidden','true');
  if(CFG.clock)ss.classList.add('clock');
  ss.innerHTML='<div class="ssv"><img class="ssp" alt="" src="'+CFG.base+'intro-poster.jpg"><video muted playsinline loop preload="none"></video><div class="ssm"><img class="ssd" alt="" src="'+CFG.base+'disp-plate.png"><svg class="sst" viewBox="0 0 32 13"></svg></div></div>'+
    '<canvas class="ssz"></canvas><img class="ssl" alt="TEKA" src="assets/teka-logo-sq.svg"><div class="ssc"><b></b><i></i></div>';
  document.body.appendChild(ss);
  var vid=ss.querySelector('video'),clk=ss.querySelector('.ssc'),ssm=ss.querySelector('.ssm'),sst=ss.querySelector('.sst');
  var SEG={a:[.8,.6,4.7,.6],b:[5.1,1,5.1,5.1],c:[5.1,5.9,5.1,10],d:[.8,10.4,4.7,10.4],e:[.4,5.9,.4,10],f:[.4,1,.4,5.1],g:[.8,5.5,4.7,5.5]};
  var DIG=['abcdef','bc','abged','abgcd','fgbc','afgcd','afgedc','abc','abcdefg','abcdfg'];
  function drawDisp(){
    var d=kd(),h=d.getHours(),m=d.getMinutes(),ds=[h>9?Math.floor(h/10):-1,h%10,Math.floor(m/10),m%10],x=[0,7,17,24],o='';
    ds.forEach(function(n,i){if(n<0)return;DIG[n].split('').forEach(function(s){var p=SEG[s];o+='<line x1="'+(p[0]+x[i]+1)+'" y1="'+(p[1]+1)+'" x2="'+(p[2]+x[i]+1)+'" y2="'+(p[3]+1)+'"/>'})});
    o+='<g class="col"'+(d.getSeconds()%2?' opacity=".15"':'')+'><circle cx="15.2" cy="4.4" r=".7"/><circle cx="15.2" cy="8.6" r=".7"/></g>';
    sst.innerHTML=o;
  }
  var cv=ss.querySelector('.ssz'),cx=cv.getContext('2d'),P=[],mxp=-9999,myp=-9999,mvx=0,mvy=0,dr=0,dpr=1;
  function dustSize(){dpr=Math.min(2,devicePixelRatio||1);cv.width=innerWidth*dpr;cv.height=innerHeight*dpr}
  function mk(x,y,spark){return{x:x,y:y,vx:0,vy:0,r:.5+Math.pow(Math.random(),3)*2.4,a:.3+Math.random()*.6,ph:Math.random()*6.28,sp:.15+Math.random()*.35,life:spark?1:-1,dec:spark?.015+Math.random()*.015:0}}
  function dustSeed(){P=[];var n=Math.round(innerWidth*innerHeight/5500);for(var i=0;i<n;i++)P.push(mk(Math.random()*innerWidth,Math.random()*innerHeight))}
  function burst(sp){var k=Math.random()<sp*.25?1:0;for(var i=0;i<k&&P.length<1800;i++){var p=mk(mxp,myp,1),an=Math.atan2(mvy,mvx)+(Math.random()-.5)*2.2,v=1+Math.random()*sp*1.2;p.vx=Math.cos(an)*v;p.vy=Math.sin(an)*v;p.r=.5+Math.random()*1.1;p.a=.6;P.push(p)}}
  function dustLoop(t){
    if(!on){cx.clearRect(0,0,cv.width,cv.height);dr=0;return}
    var W=innerWidth,H=innerHeight,R=200,sp=Math.min(4,Math.hypot(mvx,mvy)/10);
    if(sp>1.2&&mxp>-999)burst(sp);
    mvx*=.82;mvy*=.82;
    cx.setTransform(dpr,0,0,dpr,0,0);cx.clearRect(0,0,W,H);cx.globalCompositeOperation='lighter';cx.lineCap='round';
    for(var i=P.length-1;i>=0;i--){var p=P[i];
      if(p.life>=0){p.life-=p.dec;if(p.life<=0){P.splice(i,1);continue}p.vy+=.025}
      else{p.vx+=Math.sin(t/2400+p.ph)*.004*p.sp;p.vy+=(-.006+Math.cos(t/3100+p.ph)*.004)*p.sp}
      var dx=p.x-mxp,dy=p.y-myp,d=Math.hypot(dx,dy);
      if(d<R&&d>.1){var q=1-d/R,f=q*q*(1.4+sp*2.4);p.vx+=dx/d*f+mvx*.035*q;p.vy+=dy/d*f+mvy*.035*q}
      var dm=p.life>=0?.975:.945;p.vx*=dm;p.vy*=dm;p.x+=p.vx;p.y+=p.vy;
      if(p.life<0){if(p.x<-10)p.x=W+10;if(p.x>W+10)p.x=-10;if(p.y<-10)p.y=H+10;if(p.y>H+10)p.y=-10}
      var vv=Math.hypot(p.vx,p.vy),v=Math.min(1,vv/5),al=(p.life>=0?p.a*p.life:p.a*(.55+.45*Math.sin(t/900+p.ph*3))+v*.6);if(al>1)al=1;
      if(vv>3.5){cx.strokeStyle='rgba(255,205,140,'+al*.35+')';cx.lineWidth=p.r;cx.beginPath();cx.moveTo(p.x-p.vx*1.2,p.y-p.vy*1.2);cx.lineTo(p.x,p.y);cx.stroke()}
      var rr=p.r*(1+v*.9),g=cx.createRadialGradient(p.x,p.y,0,p.x,p.y,rr*3.4);g.addColorStop(0,'rgba(255,232,185,'+al+')');g.addColorStop(.35,'rgba(255,170,80,'+al*.5+')');g.addColorStop(1,'rgba(255,140,50,0)');
      cx.fillStyle=g;cx.beginPath();cx.arc(p.x,p.y,rr*3.4,0,6.283);cx.fill()}
    if(mxp>-999){var gl=cx.createRadialGradient(mxp,myp,0,mxp,myp,110);gl.addColorStop(0,'rgba(255,190,110,'+(.08+sp*.04)+')');gl.addColorStop(1,'rgba(255,150,60,0)');cx.fillStyle=gl;cx.beginPath();cx.arc(mxp,myp,110,0,6.283);cx.fill()}
    dr=requestAnimationFrame(dustLoop)}
  function dustStart(){if(!CFG.dust||reduce)return;dustSize();if(!P.length)dustSeed();mxp=myp=-9999;if(!dr)dr=requestAnimationFrame(dustLoop)}
  function fitDisp(){var W=innerWidth,H=innerHeight,s=Math.max(W/1920,H/1080);ssm.style.transform='translate('+((W-1920*s)/2)+'px,'+((H-1080*s)/2)+'px) scale('+s+')'}

  var b=null,put=null,hl=document.querySelector('header .hl'),cb=document.getElementById('cb');
  if(hl||cb){
    b=document.createElement('button');b.className='ssb';b.type='button';b.title='Screensaver';b.setAttribute('aria-label','Screensaver');
    b.innerHTML='<svg viewBox="0 0 24 24"><rect x="3" y="4.5" width="18" height="12" rx="1.5"/><path d="M8.5 20h7M12 16.5V20"/><path d="M9.5 11.5c1-1.6 4-1.6 5 0"/></svg>';
    b.addEventListener('click',function(e){e.stopPropagation();var d=document.documentElement;if(d.requestFullscreen&&!document.fullscreenElement){fsUs=true;d.requestFullscreen().catch(function(){fsUs=false})}open()});
    put=function(){if(cb&&!hl){b.classList.add('ssb-c');cb.parentNode.insertBefore(b,cb)}else hl.appendChild(b)};put();
  }

  var off=false,fsUs=false,wl=null,on=false,since=0,timer=0,mx=null,my=null,tick=0;
  var RO=['ianuarie','februarie','martie','aprilie','mai','iunie','iulie','august','septembrie','octombrie','noiembrie','decembrie'];
  var RU=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
  function kd(){try{return new Date(new Date().toLocaleString('en-US',{timeZone:'Europe/Chisinau'}))}catch(_){return new Date()}}
  function drawClock(){
    var d=kd(),ru=(document.documentElement.lang||'').indexOf('ru')===0||localStorage.getItem('lang')==='ru';
    clk.querySelector('b').textContent=String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');
    clk.querySelector('i').textContent=d.getDate()+' '+(ru?RU:RO)[d.getMonth()];
  }
  function busy(){
    var a=document.activeElement;
    return !!(a&&(a.tagName==='INPUT'||a.tagName==='TEXTAREA'||a.tagName==='SELECT'||a.isContentEditable))||!!document.querySelector('#kd.on,#lbx.show,#fz.on,#chw.on,#sr.on,[data-ss-block].on,[data-ss-block].open');
  }
  function open(){
    if(on||!mgr())return;on=true;since=performance.now();mx=my=null;
    clearTimeout(xt);ss.className=ss.className.replace(/\b(out|lit|static|x-\S+)\b/g,'').trim();document.body.className=document.body.className.replace(/\bss-back\S*/g,'').trim();
    if(reduce){ss.classList.add('static')}
    else{
      if(!vid.src){vid.src=CFG.base+(small?'intro-720.mp4':'intro-1080.mp4');vid.preload='auto'}
      vid.currentTime=0;
      var go=function(){ss.classList.add('lit');vid.play().catch(function(){ss.classList.add('static')})};
      if(vid.readyState>=3)setTimeout(go,500);else{vid.addEventListener('canplay',function f(){vid.removeEventListener('canplay',f);setTimeout(go,300)});vid.load()}
      setTimeout(function(){if(on&&!ss.classList.contains('lit'))ss.classList.add('static')},5000);
    }
    fitDisp();drawDisp();tick=setInterval(function(){drawDisp();if(CFG.clock)drawClock()},1000);if(CFG.clock)drawClock();
    lock();dustStart();
    void ss.offsetWidth;ss.classList.add('in');document.body.classList.add('ss-on');
  }
  var xt=0;
  function close(){
    if(!on)return;on=false;clearInterval(tick);
    if(wl){wl.release().catch(function(){});wl=null}
    if(fsUs&&document.fullscreenElement)document.exitFullscreen().catch(function(){});fsUs=false;
    if(location.hash==='#zastavka')history.replaceState(null,'',location.pathname+location.search);
    var m=reduce?'fade':'off',d=reduce?700:1500;
    ss.className=ss.className.replace(/\bx-\S+/g,'');
    ss.classList.add('out','x-'+m);ss.classList.remove('in');
    document.body.classList.remove('ss-on');document.body.classList.add('ss-back','ss-back-'+m);
    clearTimeout(xt);xt=setTimeout(function(){
      document.body.classList.remove('ss-back','ss-back-'+m);
      if(!on){ss.className=ss.className.replace(/\b(out|lit|static|x-\S+)\b/g,'').trim();vid.pause()}
    },d+80);
    arm();
  }
  function arm(){clearTimeout(timer);if(off)return;timer=setTimeout(function(){busy()?arm():open()},CFG.idle)}
  function wake(e){
    if(on){
      if(e.type==='scroll')return;
      if(performance.now()-since<900)return;
      if(e.type==='mousemove'&&CFG.dust){mvx+=e.movementX||0;mvy+=e.movementY||0;mxp=e.clientX;myp=e.clientY;
        return}
      if(e.type==='mousemove'){
        if(mx===null){mx=e.clientX;my=e.clientY;return}
        if(Math.abs(e.clientX-mx)+Math.abs(e.clientY-my)<12)return;
      }
      if(e.type==='pointerdown'||e.type==='click'){e.preventDefault();e.stopPropagation()}
      close();return;
    }
    arm();
  }
  addEventListener('mouseout',function(e){if(!e.relatedTarget){mxp=myp=-9999}});
  ['mousemove','pointerdown','keydown','wheel','scroll'].forEach(function(t){addEventListener(t,wake,{capture:true,passive:t!=='pointerdown'})});
  ss.addEventListener('click',function(e){e.preventDefault();e.stopPropagation()},true);
  addEventListener('keydown',function(e){
    if(on||busy()||e.metaKey||e.ctrlKey||e.altKey)return;
    if(e.key==='s'||e.key==='S'||e.key==='ы'||e.key==='Ы'){e.preventDefault();open()}
  });
  function lock(){if(navigator.wakeLock&&!wl)navigator.wakeLock.request('screen').then(function(l){wl=l;l.addEventListener('release',function(){if(wl===l)wl=null})}).catch(function(){})}
  document.addEventListener('visibilitychange',function(){if(document.hidden)vid.pause();else if(on){lock();if(ss.classList.contains('lit'))vid.play().catch(function(){})}});
  document.addEventListener('fullscreenchange',function(){if(!document.fullscreenElement&&fsUs){fsUs=false;close()}});
  function preload(){if(vid.src||reduce||(navigator.connection&&navigator.connection.saveData))return;vid.src=CFG.base+(small?'intro-720.mp4':'intro-1080.mp4');vid.preload='auto';vid.load()}
  addEventListener('load',function(){setTimeout(function(){(window.requestIdleCallback||setTimeout)(preload)},4000)});
  if(location.hash==='#zastavka')setTimeout(open,400);
  addEventListener('resize',function(){fitDisp();if(dr){dustSize();dustSeed()}});
  window.tekaScreensaver={open:open,close:close,off:function(){close();off=true;clearTimeout(timer);if(b)b.remove()},on:function(){off=false;if(b&&!b.isConnected&&put)put();arm()}};
  arm();
})();
