/* Personalization settings and local-only persistence. */
(function () {
  const themes = ["violet","rose","ocean","gold"];
  const defaults = {name:"Dear You",date:"",wish:"May this new chapter bring you more reasons to smile.",gif:"",theme:"violet"};
  function safeRead(){try{return JSON.parse(localStorage.getItem("birthday-settings")||"null")||{};}catch(_){return {};}}
  function getSettings(){return {...defaults,...safeRead()};}
  function applyTheme(theme){
    themes.forEach(t=>document.body.classList.remove("theme-"+t));
    if(theme!=="violet"&&themes.includes(theme))document.body.classList.add("theme-"+theme);
    document.querySelectorAll(".theme-swatch").forEach(b=>b.classList.toggle("selected",b.dataset.theme===theme));
  }
  function applySettings(s){
    document.getElementById("heroName").textContent=s.name||defaults.name;
    document.getElementById("coverName").textContent=s.name||"you";
    document.getElementById("bottomWish").textContent=s.wish||defaults.wish;
    const gif=document.getElementById("gifPreview");
    if(gif)gif.remove();
    if(s.gif){const page=document.getElementById("pageContent");const img=document.createElement("img");img.id="gifPreview";img.src=s.gif;img.alt="Birthday image";img.className="custom-gif";img.onerror=()=>img.remove();page.prepend(img);}
    applyTheme(s.theme||"violet");
    window.BirthdaySettings.current=s;
  }
  window.BirthdaySettings={
    current:getSettings(),
    open(){const modal=document.getElementById("settingsModal");const s=getSettings();document.getElementById("nameInput").value=s.name==="Dear You"?"":s.name;document.getElementById("dateInput").value=s.date||"";document.getElementById("wishInput").value=s.wish===defaults.wish?"":s.wish;document.getElementById("gifInput").value=s.gif||"";applyTheme(s.theme||"violet");modal.hidden=false;},
    close(){document.getElementById("settingsModal").hidden=true;},
    save(){
      const old=getSettings();const s={name:document.getElementById("nameInput").value.trim()||defaults.name,date:document.getElementById("dateInput").value,wish:document.getElementById("wishInput").value.trim()||defaults.wish,gif:document.getElementById("gifInput").value.trim(),theme:document.querySelector(".theme-swatch.selected")?.dataset.theme||old.theme};
      try{localStorage.setItem("birthday-settings",JSON.stringify(s));}catch(_){}
      applySettings(s);return s;
    },
    reset(){try{localStorage.removeItem("birthday-settings");}catch(_){}applySettings(defaults);document.getElementById("settingsForm").reset();applyTheme("violet");}
  };
  document.querySelectorAll(".theme-swatch").forEach(b=>b.addEventListener("click",()=>applyTheme(b.dataset.theme)));
  document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>document.getElementById(b.dataset.close).hidden=true));
  document.getElementById("settingsModal").addEventListener("click",e=>{if(e.target.id==="settingsModal")window.BirthdaySettings.close();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")window.BirthdaySettings.close();});
  document.getElementById("settingsForm").addEventListener("submit",e=>{e.preventDefault();const s=window.BirthdaySettings.save();window.BirthdaySettings.close();window.BirthdayApp?.toast("Your gift has been personalized ✨");window.BirthdayApp?.updateCountdown(s.date);});
  document.getElementById("resetSettingsBtn").addEventListener("click",()=>{window.BirthdaySettings.reset();window.BirthdayApp?.toast("Settings reset");});
  const style=document.createElement("style");style.textContent=".custom-gif{max-width:110px;max-height:70px;object-fit:contain;border-radius:8px;margin:0 auto 7px;box-shadow:0 4px 14px #b78ac055}";document.head.appendChild(style);
  applySettings(getSettings());
})();
