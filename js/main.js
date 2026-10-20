/* Main interactions: book pages, settings, music, countdown and sharing. */
(function () {
  const pages=[
    {icon:"🎂",kicker:"TODAY IS YOUR DAY",title:"A wish for you",text:"May your days be full of little joys, unexpected magic, and people who love you exactly as you are."},
    {icon:"🌷",kicker:"A LITTLE REMINDER",title:"You are special",text:"Never forget how much light you bring into the lives around you. The world is kinder and brighter with you in it."},
    {icon:"✨",kicker:"A NEW CHAPTER",title:"Dream without limits",text:"May this year bring brave dreams, beautiful surprises, new adventures, and the courage to follow your heart."},
    {icon:"💗",kicker:"WITH LOTS OF LOVE",title:"Your wish is yours",text:"Close your eyes, make a wish, and trust that wonderful things can find their way to you. Happy birthday!"}
  ];
  let pageIndex=0,toastTimer=null,musicObjectUrl=null;
  const $=id=>document.getElementById(id);
  function renderPage(){
    const p=pages[pageIndex];$("pageContent").innerHTML=`<div class="page-icon">${p.icon}</div><p class="page-kicker">${p.kicker}</p><h2>${p.title}</h2><p>${p.text}</p>`;
    $("pageNumber").textContent=String(pageIndex+1).padStart(2,"0")+" / "+String(pages.length).padStart(2,"0");
    document.querySelectorAll("#pageDots i").forEach((d,i)=>d.classList.toggle("active",i===pageIndex));
    $("prevPageBtn").disabled=pageIndex===0;$("nextPageBtn").disabled=pageIndex===pages.length-1;
  }
  function nextPage(){if(pageIndex<pages.length-1){pageIndex++;renderPage();$("book").classList.add("is-open");window.BirthdayEffects?.hearts(4);}else{toast("You've reached the end of your little story 💗");}}
  function prevPage(){if(pageIndex>0){pageIndex--;renderPage();$("book").classList.add("is-open");}}
  function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2600);}
  function updateCountdown(dateValue){
    const target=dateValue?new Date(dateValue+"T00:00:00"):null;
    if(!target||Number.isNaN(target.getTime())){$("days").textContent="--";$("hours").textContent="--";$("minutes").textContent="--";$("seconds").textContent="--";return;}
    const now=new Date();let next=new Date(now.getFullYear(),target.getMonth(),target.getDate());
    if(next<new Date(now.getFullYear(),now.getMonth(),now.getDate()))next.setFullYear(now.getFullYear()+1);
    const diff=Math.max(0,next-now);$("days").textContent=String(Math.floor(diff/86400000)).padStart(2,"0");$("hours").textContent=String(Math.floor(diff%86400000/3600000)).padStart(2,"0");$("minutes").textContent=String(Math.floor(diff%3600000/60000)).padStart(2,"0");$("seconds").textContent=String(Math.floor(diff%60000/1000)).padStart(2,"0");
  }
  function toggleMusic(){
    const audio=$("backgroundMusic");
    if(!audio.src){toast("Choose a music file in Settings first 🎵");window.BirthdaySettings.open();return;}
    if(audio.paused){audio.play().then(()=>{$("musicBtn").textContent="♫";toast("Music is playing 🎶");}).catch(()=>toast("Tap the music button again to allow playback."));}
    else{audio.pause();$("musicBtn").textContent="♪";toast("Music paused");}
  }
  $("openGiftBtn").addEventListener("click",()=>{$("book").classList.add("is-open");window.BirthdayEffects?.fireworks();$("giftStage").scrollIntoView({behavior:"smooth",block:"center"});toast("A little surprise, just for you ✨");});
  $("bookCover").addEventListener("click",()=>{if(!$("book").classList.contains("is-open")){$("book").classList.add("is-open");window.BirthdayEffects?.fireworks();}else nextPage();});
  $("nextPageBtn").addEventListener("click",nextPage);$("prevPageBtn").addEventListener("click",prevPage);
  $("surpriseBtn").addEventListener("click",()=>{window.BirthdayEffects?.fireworks();window.BirthdayEffects?.hearts(24);$("book").classList.add("is-open");toast("Sending a sky full of wishes ✨");});
  $("settingsBtn").addEventListener("click",()=>window.BirthdaySettings.open());$("musicBtn").addEventListener("click",toggleMusic);$("languageBtn").addEventListener("click",()=>window.BirthdayLang.toggle());
  $("shareBtn").addEventListener("click",async()=>{const title="Happy Birthday, "+(window.BirthdaySettings.current.name||"Dear You")+"!";try{if(navigator.share)await navigator.share({title,text:"A little birthday gift made with love.",url:location.href});else if(navigator.clipboard){await navigator.clipboard.writeText(location.href);toast("Gift link copied!");}else{prompt("Copy this birthday gift link:",location.href);}}catch(e){if(e.name!=="AbortError")toast("Unable to share from this browser.");}});
  $("musicFileInput").addEventListener("change",e=>{const file=e.target.files&&e.target.files[0];if(!file)return;if(musicObjectUrl)URL.revokeObjectURL(musicObjectUrl);musicObjectUrl=URL.createObjectURL(file);$("backgroundMusic").src=musicObjectUrl;$("backgroundMusic").load();toast("Music selected. Tap ♫ to play.");});
  document.addEventListener("visibilitychange",()=>{if(document.hidden&&!$("backgroundMusic").paused)$("backgroundMusic").pause();});
  // Fullscreen: double-tap the brand to avoid adding another crowded control.
  document.querySelector(".brand").addEventListener("dblclick",()=>{if(!document.fullscreenElement)document.documentElement.requestFullscreen?.().catch(()=>{});else document.exitFullscreen?.();});
  window.BirthdayApp={toast,updateCountdown};
  renderPage();window.BirthdayLang?.init();updateCountdown(window.BirthdaySettings.current.date);setInterval(()=>updateCountdown(window.BirthdaySettings.current.date),1000);
})();
