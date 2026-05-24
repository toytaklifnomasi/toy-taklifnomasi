/* ================================================================
   TO'Y TAKLIFNOMASI — SKRIPT.JS
   🌸 BARCHA MA'LUMOTLARNI SHU YERDA O'ZGARTIRING 🌸
   ================================================================ */

const TOY_MALUMOTLARI = {

  // ── ISMLAR ─────────────────────────────────────────────────────
  KUYOV_ISM:  "Akrom",
  KELIN_ISM:  "Sevinch",
  KUYOV_BOSH: "A",          // Muqovada chiqadigan bosh harf
  KELIN_BOSH: "S",          // Muqovada chiqadigan bosh harf

  // ── TO'Y SANASI ────────────────────────────────────────────────
  // new Date( YIL, OY-1, KUN, SOAT, DAQIQA )
  // Oy: 0=Yanvar 1=Fevral 2=Mart 3=Aprel 4=May 5=Iyun
  //     6=Iyul  7=Avgust 8=Sentabr 9=Oktabr 10=Noyabr 11=Dekabr
  TOY_SANASI:      new Date(2026, 5, 15, 14, 0, 0),
  TOY_VAQTI:       "19:00",
  TOY_SANASI_MATN: "15 Iyun, 2026",

  // ── JOY ────────────────────────────────────────────────────────
  TOY_JOYI:    '"O\'zbegim" to\'yxonasi',
  TOY_MANZILI: "Guzar, Qashqadaryo viloyati",

  // ================================================================
  // 🗺️ XARITA LINKI — Google Maps linkini shu yerga kiriting
  // Misol: "https://maps.app.goo.gl/BmuNHZypNFXay5Sr7"
  // yoki:  "https://www.google.com/maps?q=J7F2+WJJ"
  // ================================================================
  XARITA_LINK: "J7F2+WJJ, Unnamed Road, Guzar, Qashqadaryo Region, Oʻzbekiston",

  // ================================================================
  // 🎵 MUSIQA FAYLI — shu qatorni o'zgartiring
  // Faylni "toy_taklifnoma" papkasiga qo'ying va nomini yozing
  // Misol: "mening_kuyim.mp3"  yoki  "wedding_song.mp3"
  // ================================================================
  MUSIQA_FAYL: "5464725924.mp3",

  // ================================================================
  // 🎬 VIDEO FAYLI — shu qatorni o'zgartiring
  // Faylni "toy_taklifnoma" papkasiga qo'ying va nomini yozing
  // Misol: "fon_video.mp4"  yoki  "background.mp4"
  // ================================================================
  VIDEO_FAYL: "toy.mp4",

  // ── MATNLAR ────────────────────────────────────────────────────
  TABRIQ: "Hayotimizning eng baxtli kunini siz azizlar bilan birga nishonlashni istardik. Sizni to'yimizga taklif etishdan cheksiz xursandmiz!",

  KIMDAN: "Oilalar nomidan"
};

/* ================================================================
   SAHIFA BURISH (1-sahifadan 2-sahifaga o'tish)
   ================================================================ */
function sahifaOchish() {
  // 1-sahifa yashirinadi, 2-sahifa paydo bo'ladi (opacity/scale usuli)
  document.getElementById('sahifa1').classList.add('ochilgan');
  document.getElementById('sahifa2').classList.add('ochilgan');
}

/* ================================================================
   MA'LUMOTLARNI SAHIFAGA YUKLASH
   ================================================================ */
window.addEventListener('DOMContentLoaded', function () {
  const d = TOY_MALUMOTLARI;

  // Muqova
  document.getElementById('kuyov-bosh').textContent = d.KUYOV_BOSH;
  document.getElementById('kelin-bosh').textContent = d.KELIN_BOSH;

  // 2-sahifa matni
  document.getElementById('kuyov-ism-matn').textContent = d.KUYOV_ISM;
  document.getElementById('kelin-ism-matn').textContent = d.KELIN_ISM;
  document.getElementById('tabriq-matn-el').textContent = d.TABRIQ;
  document.getElementById('toy-sanasi-el').textContent  = d.TOY_SANASI_MATN;
  document.getElementById('toy-vaqti-el').textContent   = 'Soat ' + d.TOY_VAQTI;
  document.getElementById('toy-joyi-el').textContent    = d.TOY_JOYI;
  document.getElementById('toy-manzili-el').textContent = d.TOY_MANZILI;
  document.getElementById('kimdan-el').textContent      = d.KIMDAN;

  // Musiqa fayli
  document.getElementById('musiqa-audio').src = d.MUSIQA_FAYL;

  // Video fayllar (muqova va 2-sahifa uchun)
  document.getElementById('muqova-video').src = d.VIDEO_FAYL;
  document.getElementById('ichki-video').src  = d.VIDEO_FAYL;

  taymerniBoshlash();
});

/* ================================================================
   MUSIQA BOSHQARUVI
   ================================================================ */
let musiqaIjro = false;

function musiqaToggle() {
  const audio = document.getElementById('musiqa-audio');
  const icon  = document.getElementById('play-icon');
  const label = document.getElementById('musiqa-label');

  if (musiqaIjro) {
    audio.pause();
    icon.innerHTML    = '&#9654;';
    label.textContent = 'Musiqa';
    musiqaIjro = false;
  } else {
    audio.play()
      .then(() => {
        icon.innerHTML    = '&#9646;&#9646;';
        label.textContent = 'Pauza';
        musiqaIjro = true;
      })
      .catch(() => {
        icon.innerHTML = '&#9654;';
      });
  }
}

/* ================================================================
   XARITA OCHISH (Google Maps)
   ================================================================ */
function xaritaOchish() {
  // To'g'ridan-to'g'ri Google Maps linkini ochadi
  window.open(TOY_MALUMOTLARI.XARITA_LINK, '_blank');
}

/* ================================================================
   TAYMER — To'yga qadar qolgan vaqt
   ================================================================ */
function taymerniBoshlash() {
  function yangilash() {
    const farq = TOY_MALUMOTLARI.TOY_SANASI.getTime() - Date.now();
    if (farq <= 0) {
      ['kun','soat','daqiqa','sekund'].forEach(id =>
        document.getElementById(id).textContent = '00'
      );
      return;
    }
    const fmt = n => String(n).padStart(2, '0');
    document.getElementById('kun').textContent    = fmt(Math.floor(farq / 86400000));
    document.getElementById('soat').textContent   = fmt(Math.floor((farq % 86400000) / 3600000));
    document.getElementById('daqiqa').textContent = fmt(Math.floor((farq % 3600000)  / 60000));
    document.getElementById('sekund').textContent = fmt(Math.floor((farq % 60000)    / 1000));
  }
  yangilash();
  setInterval(yangilash, 1000);
}
