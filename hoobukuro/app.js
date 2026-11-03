// ほおぶくろ銀行 家計バランス診断エンジン
document.addEventListener("DOMContentLoaded", () => {
  initSim();
});

const PROFILES = {
  single: {
    name: "一人暮らし",
    housing: 0.25,
    living: 0.30,
    leisure: 0.20,
    savings: 0.25,
    desc: "自由度が高い分、固定費と交際費の肥大化に注意するバランスです。"
  },
  couple: {
    name: "二人暮らし",
    housing: 0.25,
    living: 0.35,
    leisure: 0.15,
    savings: 0.25,
    desc: "生活コストをシェアできる強みを活かし、手堅く貯金を増やす黄金比率です。"
  },
  family: {
    name: "ファミリー",
    housing: 0.25,
    living: 0.45,
    leisure: 0.10,
    savings: 0.20,
    desc: "教育費や食費のゆとりを確保しつつ、20%の着実な貯蓄を維持する構成です。"
  }
};

let currentProfile = "single";
let currentIncome = 250000;

function initSim() {
  const slider = document.getElementById("income-slider");
  const numberInput = document.getElementById("income-number");
  const segBtns = document.querySelectorAll(".seg-btn");

  slider.addEventListener("input", (e) => {
    currentIncome = parseInt(e.target.value, 10);
    numberInput.value = currentIncome;
    calculateAndRender();
  });

  numberInput.addEventListener("input", (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) val = 150000;
    if (val < 100000) val = 100000;
    if (val > 1500000) val = 1500000;
    currentIncome = val;
    slider.value = Math.min(Math.max(val, 100000), 1000000);
    calculateAndRender();
  });

  segBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      segBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentProfile = btn.getAttribute("data-profile");
      calculateAndRender();
    });
  });

  calculateAndRender();
}

function formatYen(num) {
  return "¥" + Math.round(num).toLocaleString();
}

function calculateAndRender() {
  const p = PROFILES[currentProfile];
  const housingYen = currentIncome * p.housing;
  const livingYen = currentIncome * p.living;
  const leisureYen = currentIncome * p.leisure;
  const savingsYen = currentIncome * p.savings;
  const annualSavingsYen = savingsYen * 12;

  // 表示更新
  document.getElementById("income-display-val").textContent = formatYen(currentIncome);
  document.getElementById("val-housing").textContent = formatYen(housingYen);
  document.getElementById("val-living").textContent = formatYen(livingYen);
  document.getElementById("val-leisure").textContent = formatYen(leisureYen);
  document.getElementById("val-savings").textContent = formatYen(savingsYen);
  document.getElementById("val-annual-savings").textContent = formatYen(annualSavingsYen);

  // パーセンテージ表示
  document.getElementById("pct-housing").textContent = `${Math.round(p.housing * 100)}%`;
  document.getElementById("pct-living").textContent = `${Math.round(p.living * 100)}%`;
  document.getElementById("pct-leisure").textContent = `${Math.round(p.leisure * 100)}%`;
  document.getElementById("pct-savings").textContent = `${Math.round(p.savings * 100)}%`;

  // ハム頭取のコメントと表情の決定
  renderPresident(savingsYen, annualSavingsYen, p.name);
}

function renderPresident(savingsMonthly, savingsAnnual, profileName) {
  const imgEl = document.getElementById("president-img");
  const speechEl = document.getElementById("president-speech-text");

  let expr = "happy";
  let text = "";

  if (savingsMonthly >= 100000) {
    expr = "doya";
    text = `うむ！月々【${formatYen(savingsMonthly)}】も貯蓄に回せるとは、実に頼もしいほお袋の膨らみ具合じゃ！このペースを続ければ年間【${formatYen(savingsAnnual)}】の金貨が貯まるぞ。油断せずしっかり管理するのじゃ！`;
  } else if (savingsMonthly >= 50000) {
    expr = "happy";
    text = `【${profileName}】の無理のない黄金比率じゃな。月【${formatYen(savingsMonthly)}】（年間【${formatYen(savingsAnnual)}】）を淡々と積み立てるのが、最も挫折しない秘訣じゃ。ほおぶくろ家計簿で記録を始めるのじゃ！`;
  } else if (savingsMonthly >= 30000) {
    expr = "happy";
    text = `月【${formatYen(savingsMonthly)}】の貯金は立派な第一歩じゃ。まずは「先取り貯金」でほお袋に金貨を確保し、残りの予算内で生活する習慣を身につけるのじゃぞ。`;
  } else {
    expr = "sweat";
    text = `むむっ！貯蓄余力が少々タイトじゃな。住居費や通信費・保険などの「固定費」を少し見直すだけで、ほお袋にグッと金貨が残るようになるぞ。まずは現状の支出を正確に把握するのじゃ！`;
  }

  imgEl.src = `assets/hamster_${expr}.png`;
  speechEl.textContent = text;
}
