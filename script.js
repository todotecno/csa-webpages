/* Editá esta lista: [materia, título, descripción, autores, enlace, imagen (opcional)]
   Para la miniatura poné la ruta de la imagen en el último campo, por ejemplo "img/arte.jpg". */
const P=[
["Newspaper","ENERGY INTELLIGENCE NETWORK","A newspaper that talks","Mariano Villares, Juan Ignacio Cernadas, Felipe Varela","./proyects/EIN/index.html","thumbnails/EnergyIntelligenceNetwork.png"],
["Recipes","Del Renacimiento al Barroco","Las obras y los artistas que cambiaron la forma de mirar entre los siglos XV y XVII.","Nombre Apellido, Nombre Apellido","#",""],
["Arte","Arte latinoamericano del siglo XX","Vanguardias, identidad y militancia en la pintura de América Latina.","Nombre Apellido, Nombre Apellido","#",""],
["Arte","Muralismo mexicano","Rivera, Orozco y Siqueiros: el arte que salió a la calle.","Nombre Apellido, Nombre Apellido","#",""],
["Arte","Impresionismo","La luz, el color y el instante, explicados con obras clave.","Nombre Apellido, Nombre Apellido","#",""],
["Geografía","Placas tectónicas","Cómo se mueven los continentes y por qué tiembla la Tierra.","Nombre Apellido, Nombre Apellido","#",""],
["Geografía","Mapa interactivo de la Argentina","Provincias, regiones y capitales para explorar con un clic.","Nombre Apellido, Nombre Apellido","#",""],
["Geografía","Cuencas hídricas","Los grandes ríos de Sudamérica y las comunidades que viven de ellos.","Nombre Apellido, Nombre Apellido","#",""],
["Geografía","Clima de Sudamérica","Zonas climáticas, vientos y corrientes en un solo mapa.","Nombre Apellido, Nombre Apellido","#",""],
["Geografía","Biomas del mundo","Desiertos, selvas y tundras: dónde están y quién los habita.","Nombre Apellido, Nombre Apellido","#",""],
["Salud","Leptospirosis en Sudamérica","Mapas con datos epidemiológicos reales y cómo prevenirla.","Nombre Apellido, Nombre Apellido","#",""],
["Salud","Alimentación saludable","Qué comemos, qué necesitamos y cómo leer una etiqueta.","Nombre Apellido, Nombre Apellido","#",""],
["Salud","Prevención del dengue","Cómo se transmite y qué podemos hacer en casa y en el barrio.","Nombre Apellido, Nombre Apellido","#",""],
["Salud","Salud mental adolescente","Información clara y dónde pedir ayuda.","Nombre Apellido, Nombre Apellido","#",""],
["Salud","Primeros auxilios","Qué hacer en los primeros minutos de una emergencia.","Nombre Apellido, Nombre Apellido","#",""],
["Sociales","La Constitución Nacional","Derechos, garantías y cómo se organiza el Estado.","Nombre Apellido, Nombre Apellido","#",""],
["Sociales","Derechos humanos","Su historia en la Argentina y por qué siguen importando.","Nombre Apellido, Nombre Apellido","#",""],
["Sociales","Migraciones","Por qué las personas se mueven y cómo se formó nuestra sociedad.","Nombre Apellido, Nombre Apellido","#",""],
["Sociales","Psicología: ¿psicólogo o psiquiatra?","Las diferencias entre ambas profesiones, con diálogos y actividades.","Nombre Apellido, Nombre Apellido","#",""],
["Sociales","Encuesta del colegio","Qué piensa la escuela, con tablas y gráficos de los resultados.","Nombre Apellido, Nombre Apellido","#",""],
["Tecnología","Tecno Formación","Educación tecnológica para poblaciones vulnerables.","Nombre Apellido, Nombre Apellido","#",""],
["Tecnología","Programación para principiantes","Primeros pasos para escribir tu primera página web.","Nombre Apellido, Nombre Apellido","#",""],
["Tecnología","Estadística con datos reales","Tablas de frecuencia y gráficos para entender los números.","Nombre Apellido, Nombre Apellido","#",""],
["Tecnología","Un servidor casero","Cómo convertir una notebook vieja en un servidor propio.","Nombre Apellido, Nombre Apellido","#",""],
["Tecnología","Videos en 360°","Cómo se graba y se arma un recorrido que se mira girando.","Nombre Apellido, Nombre Apellido","#",""],
["Tecnología","Robótica educativa","Cómo armar un robot y programarlo para que haga cosas.","Nombre Apellido, Nombre Apellido","#",""]
];
const grid=document.getElementById('grid'),fil=document.getElementById('filters'),cnt=document.getElementById('count');
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
grid.innerHTML=P.map((p,i)=>`<li class="rv" data-a="${p[0]}" style="--d:${(i%5)*70}ms"><a class="tile" id="p-${i}" href="${p[4]}">
<div class="th">${p[5]?`<img src="${esc(p[5])}" alt="Miniatura de ${esc(p[1])}" loading="lazy">`:`<b aria-hidden="true">${esc(p[1][0])}</b>`}<span class="go">Open Webpage</span></div>
<h3 class="d">${esc(p[1])}</h3><p class="de">${esc(p[2])}</p><p class="au">${esc(p[3])}</p></a></li>`).join('');
const areas=['Todas',...new Set(P.map(p=>p[0]))];
fil.innerHTML=areas.map((a,i)=>`<button type="button" data-f="${a}" aria-pressed="${i==0}">${a}</button>`).join('');
fil.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 fil.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));
 let n=0;grid.querySelectorAll('li').forEach(li=>{const ok=b.dataset.f==='Todas'||li.dataset.a===b.dataset.f;li.hidden=!ok;if(ok){n++;li.classList.add('in')}});
 cnt.textContent=n+(n===1?' página':' páginas')+(b.dataset.f==='Todas'?'':' de '+b.dataset.f)});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

/* Escena de scroll: el escudo se arma con caracteres de código sobre toda la pantalla.
   El progreso del scroll sigue un resorte críticamente amortiguado, así el movimiento nunca es brusco. */
const LOGO={w:76,h:72,d:"000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000011110000000000111100000000000000000000000000000000000000000000000000000012222100000000000000122221100000000000000000000000000000000000000000000001222210000000000000000000012222100000000000000000000000000000000000000000012322100000000000000000000000001232100000000000000000000000000000000000000123320000000000000000000000000000001232100000000000000000000000000000000001233210000000000000000000000000000000012332100000000000000000000000000000001233200000000000000000000000000000000000012332000000000000000000000000000002332100000000000000000001210000000000000000123321000000000000000000000000002332100000000000000000001210000000000000000001233210000000000000000000000002332100000000000000000000220000000000000000000002332100000000000000000000002332100000000000000000000022001000000000000000000023321000000000000000000002332100000000000000000000001200121000000000000000001233210000000000000000002333100000000000000000000000022002200000000000000000012332000000000000000001333200000000000000000000000000110121000000000000000000133320000000000000001333200000000000000000000000000000012100000000000000000002333100000000000000233310000000000000000000000000001102200000000000000000000023321000000000000133320000000000000000000000000002211210000000000000000000001333200000000000123320000000000000000000000000001210100000000122100000000000023331000000000023331000000000000000001233321000220000122211333330000000000001333200000000013332000000000000000002333211121022001222233333323200000000000023331000000002333200000000000000001332000000001200000013333200000000000000001333200000000233310000000000000000233000000000022000023322330000000000000000023321000000133320000000000000000033200000000000110013310133100000000000000002333100000023331000000000000000013310000000000000003300003320000000000000000133320000002333100000000000000001331000000000000002300000332000000000000000002332100001333200000000000000000133100000000000000300000033200000000000000000233310000233320000000000000000003320000000000000210000003320000000000000000013332000023331000000000000000000333000000000000110000002331000000000000000001333200002333100000000000000000023320000000000000000000333000000000000000000023320000233310000000000000000000333000000000000000000233100000000000000000002333100133320000000000000000000013330000000000000000133200000000000000000000233310013332000000000000000000000233200000000000000133300000000000000000000023331001333200000000000000000000002332000000000000133310000000000000000000002333100133320000000000000000000000023320000000000133310000000000000000000000233310013332000000000000000000000000233200000000033310000000000000000000000023331001333200000000000000000000000001332000000033200000000000000000000000002333100133320000000000000000000000000002320000033100000111000000000000000000233310013332000000000000000122333332100002100021000123333333210000000000000023331001333310000000000000023333333333200000000001333333333332000000000000002333100023331000000000000002321111112333100000002332110000123200000000000000333310002333100000000000000210000000000232000012210000000000120000000000000133320000233320000000000000000000000000000120012100000000000000000000000000013332000013332000000000000000000000000000000101000000000000000000000000000002333200001333310000000000000000000000000002000002000000000000000000000000000233310000023331000000000000000000000000000220003200000000000000000000000000133320000002333200000000000000000000000000003333200000000000000000000000000023332000000133331000000000000000000000000000012100000000000000000000000000002333100000002333200000000000000000000000000000000000000000000000000000000001333200000000133320000000000000000000000000000000000000000000000000000000000233320000000002333100000000000000000000000000000000000000000000000000000000133321000000000133320000000000000000002201210101210220101210000000000000000023332000000000002333100000000000000002111212120221211111212100000000000000013332000000000000133321000000000000000200110022022120121210020000000000000002333100000000000002333200000000000000022112121212212122212121000000000000002333200000000000000023331000000000000000120121011111021010121000000000000001333210000000000000001233310000000000000000000000000000000000001100000000001233310000000000000000013332100000002201102001001101221111122122111010000000233310000000000000000000133321000000210220221200220201121122202111312000000233320000000000000000000001333210000012122221220122220132012021111212300000233320000000000000000000000013332100002221022012011121221122122111111020000233320000000000000000000000000123321000000000000000000011000000000000000001233320000000000000000000000000001233310000000000000000000000000000000000001233210000000000000000000000000000012333210000000000000000000000000000000002333210000000000000000000000000000000012332100000000000000000000000000000012332100000000000000000000000000000000000012332100000000000000000000000000123322100000000000000000000000000000000000000012332210000000000000000000011233211000000000000000000000000000000000000000000012222221100000000000001122322100000000000000000000000000000000000000000000000001122222111000011122222110000000000000000000000000000000000000000000000000000000000111100001111000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"};
(()=>{
const sc=document.getElementById('escena'),cv=document.getElementById('cv'),ttl=document.getElementById('escena-t');
if(!sc||!cv||!ttl)return;
const stick=cv.parentElement,ctx=cv.getContext('2d'),W=LOGO.w,H=LOGO.h,D=LOGO.d,NL=W*H;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const G='01{}</>;=+*#$%&'.split('');
let seed=7;const rnd=()=>(seed=seed*16807%2147483647)/2147483647;
const lv=new Uint8Array(NL),th=new Float32Array(NL),gl=new Uint8Array(NL);
for(let i=0;i<NL;i++){lv[i]=+D[i];th[i]=(i%W)/W*.68+rnd()*.26;gl[i]=rnd()*G.length|0}
const AL=[.1,.2,.3,.4,.55,.7,.85,1],LV=[0,3,5,7];
let COLS=1,ROWS=1,ox=0,oy=0,cc=10,cs=10,col=[],kx0=0,kx1=0,ky0=0,ky1=0;
let pt=0,p=0,v=0,mx=-99,my=-99,last=performance.now(),run=false,visible=false;
const ko=(c,y)=>c>kx0&&c<kx1&&y>ky0&&y<ky1;
function size(){
 const r=stick.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);
 cc=Math.max(3.5,Math.min(r.height*.9/H,r.width*.96/W));
 COLS=Math.ceil(r.width/cc);ROWS=Math.ceil(r.height/cc);
 cv.width=Math.round(r.width*d);cv.height=Math.round(r.height*d);cs=cc*d;
 ctx.font='600 '+cs*1.05+'px Archivo, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
 ox=((COLS-W)/2)|0;oy=((ROWS-H)/2)|0;
 seed=11;col=[];for(let c=0;c<COLS;c++)col.push({s:.5+rnd()*1.3,o:rnd()*(ROWS+16),l:6+(rnd()*10|0)});
 const t=ttl.getBoundingClientRect();
 kx0=(t.left-r.left-cc)/cc;kx1=(t.right-r.left+cc)/cc;ky0=(t.top-r.top-cc*.6)/cc;ky1=(t.bottom-r.top+cc*.6)/cc;
 draw(performance.now())}
function target(){const r=sc.getBoundingClientRect();pt=Math.max(0,Math.min(1,-r.top/(r.height-innerHeight)))}
function draw(t){
 ctx.clearRect(0,0,cv.width,cv.height);
 const B=[[],[],[],[],[],[],[],[],[]],tk=t/110|0,pk=p*1.06;
 const rk=reduce?0:1-Math.min(1,Math.max(0,(p-.75)/.25))*.92;
 if(rk>.03)for(let c=0;c<COLS;c++){const k=col[c],head=(t*k.s*.012+k.o)%(ROWS+k.l+8);
  for(let j=0;j<k.l;j++){const y=(head-j)|0;if(y<0||y>=ROWS||ko(c,y))continue;
   const lx=c-ox,ly=y-oy;
   if(lx>=0&&lx<W&&ly>=0&&ly<H){const i=ly*W+lx;if(lv[i]&&pk>th[i])continue}
   B[Math.min(7,((1-j/k.l)*rk*(j?.55:1)*8)|0)].push(c,y,(c*7+y*13+tk+j)%G.length)}}
 for(let ly=0;ly<H;ly++)for(let lx=0;lx<W;lx++){const i=ly*W+lx;if(!lv[i])continue;const s=pk-th[i];if(s<=0)continue;
  const c=lx+ox,y=ly+oy;if(ko(c,y))continue;
  const dx=c-mx,dy=y-my,near=dx*dx+dy*dy<20;
  if(s<.05)B[8].push(c,y,(gl[i]+(t/40|0))%G.length);
  else B[near?7:LV[lv[i]]].push(c,y,near?(gl[i]+(t/60|0))%G.length:gl[i])}
 for(let b=0;b<9;b++){const a=B[b];if(!a.length)continue;
  ctx.fillStyle=b==8?'#EEF3E2':'#D6FF1F';ctx.globalAlpha=b==8?1:AL[b];
  for(let q=0;q<a.length;q+=3)ctx.fillText(G[a[q+2]],(a[q]+.5)*cs,(a[q+1]+.5)*cs)}
 ctx.globalAlpha=1}
function frame(now){const dt=Math.min(.033,(now-last)/1000);last=now;
 const w=15.7;v+=((pt-p)*w*w-2*w*v)*dt;p+=v*dt;draw(now);if(run)requestAnimationFrame(frame)}
function go(){if(reduce){p=1;draw(0);return}if(!run){run=true;last=performance.now();requestAnimationFrame(frame)}}
addEventListener('scroll',()=>{target();if(!reduce&&!run&&visible)go()},{passive:true});
new IntersectionObserver(e=>{visible=e[0].isIntersecting;if(visible){target();go()}else run=false},{rootMargin:'100px'}).observe(sc);
cv.addEventListener('pointermove',e=>{const r=stick.getBoundingClientRect();mx=(e.clientX-r.left)/cc;my=(e.clientY-r.top)/cc});
cv.addEventListener('pointerleave',()=>{mx=my=-99});
addEventListener('resize',size);
document.fonts&&document.fonts.ready.then(size);
if(reduce)p=1;
size();target();
})();

/* Fondo del inicio: una malla de puntos que ondula sola y se enciende cerca del cursor. */
(()=>{
const cv=document.getElementById('wave');if(!cv)return;
const hero=cv.parentElement,ctx=cv.getContext('2d'),reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let d=1,gap=40,mx=-999,my=-999,run=false;
function size(){const r=hero.getBoundingClientRect();d=Math.min(devicePixelRatio||1,2);
 cv.width=Math.round(r.width*d);cv.height=Math.round(r.height*d);gap=Math.max(28,r.width/46)*d;draw(performance.now())}
function draw(t){
 ctx.clearRect(0,0,cv.width,cv.height);
 const cols=Math.ceil(cv.width/gap)+1,rows=Math.ceil(cv.height/gap)+1,R=240*d;
 const X=mx>-900?mx:cv.width*(.5+.4*Math.sin(t*.0004)),Y=my>-900?my:cv.height*(.5+.34*Math.sin(t*.00057+1));
 for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){
  const px=x*gap,py=y*gap;
  const n=(Math.sin(x*.34+t*.0009)+Math.sin(y*.29-t*.0007)+Math.sin((x+y)*.17+t*.0005)+3)/6;
  const dx=px-X,dy=py-Y,q=Math.max(0,1-Math.hypot(dx,dy)/R);
  ctx.fillStyle=q>0.02?'#D6FF1F':'#174A31';
  ctx.beginPath();ctx.arc(px,py,gap*(.06+.34*n*n+.24*q),0,6.2832);ctx.fill()}}
function frame(t){draw(t);if(run)requestAnimationFrame(frame)}
new IntersectionObserver(e=>{if(reduce)return;const on=e[0].isIntersecting;if(on&&!run){run=true;requestAnimationFrame(frame)}else if(!on)run=false}).observe(hero);
hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();mx=(e.clientX-r.left)*d;my=(e.clientY-r.top)*d});
hero.addEventListener('pointerleave',()=>{mx=my=-999});
addEventListener('resize',size);
size();
})();
