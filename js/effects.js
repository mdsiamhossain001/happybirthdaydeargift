/* Lightweight canvas stars, Matrix rain, fireworks and floating hearts. */
(function () {
  const stars = document.getElementById("starsCanvas");
  const matrix = document.getElementById("matrixCanvas");
  const fireworks = document.getElementById("fireworksCanvas");
  const sctx = stars.getContext("2d"), mctx = matrix.getContext("2d"), fctx = fireworks.getContext("2d");
  let w = 0, h = 0, starList = [], drops = [], rockets = [], matrixOn = false, raf = 0;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    [stars,matrix,fireworks].forEach(c => { c.width = Math.floor(w*dpr); c.height = Math.floor(h*dpr); c.style.width=w+"px"; c.style.height=h+"px"; });
    [sctx,mctx,fctx].forEach(ctx => ctx.setTransform(dpr,0,0,dpr,0,0));
    starList = Array.from({length:Math.min(150,Math.floor(w*h/6500))},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.4+.25,a:Math.random(),v:Math.random()*.012+.002}));
    drops = Array.from({length:Math.ceil(w/17)},()=>Math.random()*-60);
  }
  function drawStars() {
    sctx.clearRect(0,0,w,h);
    starList.forEach(s=>{s.a+=s.v;if(s.a>1||s.a<0)s.v*=-1;sctx.globalAlpha=Math.max(.15,Math.min(1,s.a));sctx.fillStyle="#f6eaff";sctx.beginPath();sctx.arc(s.x,s.y,s.r,0,Math.PI*2);sctx.fill();});
    sctx.globalAlpha=1;
    requestAnimationFrame(drawStars);
  }
  function drawMatrix() {
    if(!matrixOn) return;
    mctx.fillStyle="rgba(8,5,18,.12)";mctx.fillRect(0,0,w,h);mctx.fillStyle="#c7a2ff";mctx.font="12px monospace";
    drops.forEach((y,i)=>{const char=String.fromCharCode(0x30A0+Math.random()*96);mctx.fillText(char,i*17,y*17);if(y*17>h&&Math.random()>.97)drops[i]=0;drops[i]++;});
    requestAnimationFrame(drawMatrix);
  }
  function particleBurst(x,y) {
    const colors=["#f9c6e7","#d3b3ff","#fff1ad","#b8e7ff"];
    for(let i=0;i<55;i++){const a=Math.random()*Math.PI*2, speed=Math.random()*3.8+1;rockets.push({x,y,vx:Math.cos(a)*speed,vy:Math.sin(a)*speed,life:50+Math.random()*25,color:colors[Math.floor(Math.random()*colors.length)],r:Math.random()*2+1});}
  }
  function drawFireworks() {
    fctx.clearRect(0,0,w,h);
    for(let i=rockets.length-1;i>=0;i--){const p=rockets[i];p.x+=p.vx;p.y+=p.vy;p.vy+=.035;p.vx*=.99;p.life--;fctx.globalAlpha=Math.max(0,p.life/65);fctx.fillStyle=p.color;fctx.beginPath();fctx.arc(p.x,p.y,p.r,0,Math.PI*2);fctx.fill();if(p.life<=0)rockets.splice(i,1);}
    fctx.globalAlpha=1;requestAnimationFrame(drawFireworks);
  }
  function hearts(count=12) {
    const layer=document.getElementById("heartsLayer");
    for(let i=0;i<count;i++){const el=document.createElement("span");el.className="floating-heart";el.textContent=["♥","♡","✦"][Math.floor(Math.random()*3)];el.style.left=Math.random()*100+"%";el.style.setProperty("--dur",(4+Math.random()*4)+"s");el.style.fontSize=(12+Math.random()*18)+"px";layer.appendChild(el);setTimeout(()=>el.remove(),8500);}
  }
  function startMatrix(on){matrixOn=on;matrix.style.opacity=on?".34":"0";if(on)drawMatrix();else mctx.clearRect(0,0,w,h);}
  function fireworksShow(){for(let i=0;i<5;i++)setTimeout(()=>particleBurst(Math.random()*w,w?Math.random()*h*.55+30:100),i*220);hearts(16);}
  window.BirthdayEffects={hearts,fireworks:fireworksShow,matrix:startMatrix};
  window.addEventListener("resize",resize,{passive:true});resize();drawStars();drawFireworks();
})();
