/* ====== SOZLAMALAR ====== */
const EVENT = new Date(2026, 9, 17, 17, 0, 0); // 17-oktabr 2026, 17:00 (oy 0 dan boshlanadi: 9 = oktabr)

const L = {
  uz:{invite:"Sizga taklifnoma keldi",ayah:"“Va U ularning qalblarini birlashtirdi”",ayahSrc:"Al-Anfol, 63",open:"OCHISH",
    dear:"Qadrli azizlarimiz!",happy:"Sizlarni to'yimizga taklif etishdan juda xursandmiz",date:"Sana",left:"To'ygacha qolgan vaqt",
    d:"Kun",h:"Soat",m:"Daqiqa",s:"Soniya",start:"Boshlanishi 17:00 da",program:"Dastur",
    p1:"Mehmonlar yig'ilishi",p2:"Marosim",p3:"Bayram dasturxoni",p4:"Yakuni",place:"O'tkazilish joyi",hall:"to'yxonasi",
    address:"Toshkent shahri, “Yagona” to'yxonasi (manzilni shu yerga yozing)",openMap:"Xaritada ochish",glad:"Sizni ko'rishdan xursand bo'lamiz!",
    place2:"O'tkazilish joyi",month:"Oktyabr 2026",wd:["Du","Se","Ch","Pa","Ju","Sh","Ya"]},
  ru:{invite:"Вам пришло приглашение",ayah:"«И Он объединил их сердца»",ayahSrc:"Аль-Анфаль, 63",open:"ОТКРЫТЬ",
    dear:"Дорогие наши!",happy:"Мы очень рады пригласить вас на нашу свадьбу",date:"Дата",left:"До свадьбы осталось",
    d:"Дней",h:"Часов",m:"Минут",s:"Секунд",start:"Начало в 17:00",program:"Программа",
    p1:"Сбор гостей",p2:"Церемония",p3:"Праздничный ужин",p4:"Завершение",place:"Место проведения",hall:"банкетный зал",
    address:"г. Ташкент, банкетный зал «Yagona» (впишите адрес)",openMap:"Открыть на карте",glad:"Будем рады видеть вас!",
    place2:"Место проведения",month:"Октябрь 2026",wd:["Пн","Вт","Ср","Чт","Пт","Сб","Вс"]},
  en:{invite:"You are invited",ayah:"“And He united their hearts”",ayahSrc:"Al-Anfal, 63",open:"OPEN",
    dear:"Dear loved ones!",happy:"We are so happy to invite you to our wedding",date:"Date",left:"Time until the wedding",
    d:"Days",h:"Hours",m:"Minutes",s:"Seconds",start:"Starts at 5:00 PM",program:"Program",
    p1:"Guests arrive",p2:"Ceremony",p3:"Wedding dinner",p4:"Finale",place:"Venue",hall:"banquet hall",
    address:"Tashkent, “Yagona” banquet hall (write the address here)",openMap:"Open in maps",glad:"We can't wait to see you!",
    place2:"Venue",month:"October 2026",wd:["Mo","Tu","We","Th","Fr","Sa","Su"]},
  uzc:{invite:"Сизга таклифнома келди",ayah:"“Ва У уларнинг қалбларини бирлаштирди”",ayahSrc:"Ал-Анфол, 63",open:"ОЧИШ",
    dear:"Қадрли азизларимиз!",happy:"Сизларни тўйимизга таклиф этишдан жуда хурсандмиз",date:"Сана",left:"Тўйгача қолган вақт",
    d:"Кун",h:"Соат",m:"Дақиқа",s:"Сония",start:"Бошланиши 17:00 да",program:"Дастур",
    p1:"Меҳмонлар йиғилиши",p2:"Маросим",p3:"Байрам дастурхони",p4:"Якуни",place:"Ўтказилиш жойи",hall:"тўйхонаси",
    address:"Тошкент шаҳри, “Yagona” тўйхонаси (манзилни ёзинг)",openMap:"Харитада очиш",glad:"Сизни кўришдан хурсанд бўламиз!",
    place2:"Ўтказилиш жойи",month:"Октябрь 2026",wd:["Ду","Се","Чо","Па","Жу","Ша","Як"]}
};

let lang = localStorage.getItem("lang") || "uz";
const $ = s => document.querySelector(s);

/* ====== TIL ====== */
function setLang(l){
  lang = l; localStorage.setItem("lang", l);
  document.documentElement.lang = l === "uzc" ? "uz-Cyrl" : l;
  document.querySelectorAll("[data-t]").forEach(el => el.textContent = L[l][el.dataset.t]);
  document.querySelectorAll("[data-lang]").forEach(b => b.classList.toggle("on", b.dataset.lang === l));
  buildCalendar();
}
document.querySelectorAll("[data-lang]").forEach(b => b.onclick = () => setLang(b.dataset.lang));

/* ====== KALENDAR ====== */
function buildCalendar(){
  $("#monthName").textContent = L[lang].month;
  const first = (new Date(EVENT.getFullYear(), EVENT.getMonth(), 1).getDay() + 6) % 7; // dushanba = 0
  const days = new Date(EVENT.getFullYear(), EVENT.getMonth() + 1, 0).getDate();
  let h = L[lang].wd.map(w => `<span class="wd">${w}</span>`).join("") + "<span></span>".repeat(first);
  for(let d = 1; d <= days; d++) h += `<span class="${d === EVENT.getDate() ? "hit" : ""}">${d}</span>`;
  $("#cal").innerHTML = h;
}

/* ====== TEKISLASH SANOG'I ====== */
function tick(){
  let t = Math.max(0, EVENT - Date.now()) / 1000;
  const v = [Math.floor(t/86400), Math.floor(t%86400/3600), Math.floor(t%3600/60), Math.floor(t%60)];
  ["cd","ch","cm","cs"].forEach((id,i) => $("#"+id).textContent = v[i]);
}
setInterval(tick, 1000); tick();

/* ====== MUSIQA ====== */
const music = $("#music"), mBtn = $("#musicBtn");
function playMusic(){ music.volume = .7; music.play().then(() => mBtn.classList.add("play")).catch(() => {}); }
mBtn.onclick = () => {
  if(music.paused) playMusic(); else { music.pause(); mBtn.classList.remove("play"); }
};

/* ====== OCHISH SLIDERI ====== */
const slider = $("#slider"), knob = $("#knob");
let drag = false, startX = 0;
const max = () => slider.clientWidth - knob.clientWidth - 12;
function open(){
  knob.style.left = max() + 6 + "px"; knob.textContent = "🔓";
  document.body.classList.remove("locked");
  $("#cover").classList.add("gone");
  playMusic(); // foydalanuvchi bosgani uchun brauzer musiqaga ruxsat beradi
}
knob.addEventListener("pointerdown", e => { drag = true; startX = e.clientX - (knob.offsetLeft - 6); knob.setPointerCapture(e.pointerId); knob.style.transition = "none"; });
knob.addEventListener("pointermove", e => { if(!drag) return; knob.style.left = Math.min(max(), Math.max(0, e.clientX - startX)) + 6 + "px"; });
knob.addEventListener("pointerup", () => {
  if(!drag) return; drag = false; knob.style.transition = ".35s";
  if(knob.offsetLeft - 6 > max() * .7) open(); else knob.style.left = "6px";
});
slider.addEventListener("click", e => { if(e.target !== knob) open(); }); // bosib ham ochish mumkin

setLang(lang);
