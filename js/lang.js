/* Language strings for the birthday gift. Add translations here. */
(function () {
  const dictionaries = {
    en: {
      brand:"A Little Magic",eyebrow:"A special surprise, made just for you",happy:"Happy Birthday",intro:"Some people make the world brighter just by being in it. Today, this little universe is all yours.",openGift:"Open your gift",surprise:"Surprise me ✨",hint:"A tiny story is waiting inside",pageKicker:"TODAY IS YOUR DAY",coverSmall:"A LITTLE BOOK OF",coverTitle:"Birthday<br>Wishes",coverFor:"especially for",bookHelp:"Tap the book or use the arrows to turn the pages",wishLabel:"A wish from the heart",countdownLabel:"COUNTING THE LITTLE MOMENTS",countdownTitle:"Your special day",days:"days",hours:"hrs",minutes:"min",seconds:"sec",footer:"A little magic, made with love",personalize:"MAKE IT YOURS",settingsTitle:"Gift settings",recipientName:"Birthday person's name",birthdayDate:"Birthday date",customWish:"Your personal message",gifUrl:"GIF or image URL (optional)",themeColor:"Choose your theme",musicFile:"Choose background music",reset:"Reset",saveSettings:"Save changes"
    },
    bn: {
      brand:"একটু জাদু",eyebrow:"শুধু তোমার জন্য একটি বিশেষ চমক",happy:"শুভ জন্মদিন",intro:"কিছু মানুষ শুধু পাশে থাকলেই পৃথিবীটা সুন্দর হয়ে ওঠে। আজকের এই ছোট্ট জগৎটা শুধুই তোমার।",openGift:"উপহার খুলে দেখো",surprise:"চমকে দাও ✨",hint:"ভেতরে তোমার জন্য ছোট্ট গল্প অপেক্ষায়",pageKicker:"আজকের দিনটি তোমার",coverSmall:"একটি ছোট্ট বই",coverTitle:"জন্মদিনের<br>শুভেচ্ছা",coverFor:"বিশেষভাবে",bookHelp:"বইয়ে ট্যাপ করো অথবা তীর চিহ্ন দিয়ে পৃষ্ঠা ওল্টাও",wishLabel:"হৃদয় থেকে শুভকামনা",countdownLabel:"ছোট ছোট মুহূর্ত গোনা",countdownTitle:"তোমার বিশেষ দিন",days:"দিন",hours:"ঘণ্টা",minutes:"মিনিট",seconds:"সেকেন্ড",footer:"ভালোবাসায় তৈরি ছোট্ট জাদু",personalize:"নিজের মতো সাজাও",settingsTitle:"উপহারের সেটিংস",recipientName:"জন্মদিন যার, তার নাম",birthdayDate:"জন্মদিনের তারিখ",customWish:"তোমার ব্যক্তিগত শুভেচ্ছা",gifUrl:"GIF বা ছবির URL (ঐচ্ছিক)",themeColor:"থিম বেছে নাও",musicFile:"ব্যাকগ্রাউন্ড মিউজিক বেছে নাও",reset:"রিসেট",saveSettings:"পরিবর্তন সেভ করো"
    }
  };
  window.BirthdayLang = {
    current: "en",
    toggle() {
      this.current = this.current === "en" ? "bn" : "en";
      document.documentElement.lang = this.current;
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        const value = dictionaries[this.current][key];
        if (value) el.innerHTML = value;
      });
      const button = document.getElementById("languageBtn");
      if (button) button.textContent = this.current === "en" ? "EN" : "বাং";
      try { localStorage.setItem("birthday-language", this.current); } catch (_) {}
    },
    init() {
      let saved = "en";
      try { saved = localStorage.getItem("birthday-language") || "en"; } catch (_) {}
      if (saved !== this.current) this.toggle();
    }
  };
})();
