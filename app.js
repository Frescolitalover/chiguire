// Chigüire 活用チェッカー アプリケーションロジック

const PRONOUNS = ["yo", "tú", "él / ella / ud.", "nosotros/as", "vosotros/as", "ellos / ellas / uds."];
const HABER_FORMS = ["he", "has", "ha", "hemos", "habéis", "han"];

let currentVerb = VERB_DATABASE[15]; // default: hablar
let currentTense = "present";

// クイズ用状態
let quizStreak = 0;
let quizTotal = 0;
let currentQuizQuestion = null;

// 初期化
document.addEventListener("DOMContentLoaded", () => {
  renderVerb(currentVerb);
  initSearch();
  initQuiz();
});

// タブ切り替え（検索 ⇄ クイズ）
function switchTab(tab) {
  const searchView = document.getElementById("view-search");
  const quizView = document.getElementById("view-quiz");
  const btnSearch = document.getElementById("tab-btn-search");
  const btnQuiz = document.getElementById("tab-btn-quiz");

  if (tab === "search") {
    searchView.style.display = "block";
    quizView.style.display = "none";
    btnSearch.classList.add("active");
    btnQuiz.classList.remove("active");
  } else {
    searchView.style.display = "none";
    quizView.style.display = "block";
    btnSearch.classList.remove("active");
    btnQuiz.classList.add("active");
    loadNewQuiz();
  }
}

// 検索ボックスの処理
function initSearch() {
  const input = document.getElementById("verb-search-input");
  input.addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) return;

    // データベースから完全一致または前方一致を探す
    let found = VERB_DATABASE.find(v => v.infinitive === q);
    if (!found) {
      // 日本語意味の部分一致
      found = VERB_DATABASE.find(v => v.meaning.includes(q));
    }
    if (!found) {
      // 活用形からの逆引き検索
      for (const v of VERB_DATABASE) {
        if (v.present.includes(q) || v.pret_indef.includes(q) || v.pret_imperf.includes(q) || v.futuro.includes(q)) {
          found = v;
          break;
        }
      }
    }
    if (!found && (q.endsWith("ar") || q.endsWith("er") || q.endsWith("ir"))) {
      // 辞書にない動詞でも規則動詞として自動計算
      found = generateRegularConjugation(q);
    }

    if (found) {
      currentVerb = found;
      renderVerb(found);
    }
  });
}

function selectVerb(inf) {
  const v = VERB_DATABASE.find(item => item.infinitive === inf);
  if (v) {
    currentVerb = v;
    renderVerb(v);
    document.getElementById("verb-search-input").value = inf;
  }
}

// 時制タブ切り替え
function switchTense(tenseKey) {
  currentTense = tenseKey;
  document.querySelectorAll(".tense-btn").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("onclick").includes(tenseKey));
  });
  renderConjugations(currentVerb);
}

// 動詞カードの描画
function renderVerb(v) {
  document.getElementById("res-infinitive").textContent = v.infinitive;
  document.getElementById("res-type").textContent = v.type;
  document.getElementById("res-meaning").textContent = v.meaning;
  document.getElementById("res-participio").textContent = v.participio;
  document.getElementById("res-gerundio").textContent = v.gerundio;

  renderConjugations(v);
}

function renderConjugations(v) {
  const container = document.getElementById("conj-cells-container");
  container.innerHTML = "";

  let forms = [];
  if (currentTense === "pret_perf") {
    forms = HABER_FORMS.map(h => `${h} ${v.participio}`);
  } else {
    forms = v[currentTense];
  }

  PRONOUNS.forEach((pronoun, idx) => {
    const cell = document.createElement("div");
    cell.className = "conj-cell";
    cell.innerHTML = `
      <span class="conj-pronoun">${pronoun}</span>
      <span class="conj-word">${forms[idx]}</span>
    `;
    container.appendChild(cell);
  });
}

// ==================== クイズロジック ====================

const TENSE_CONFIGS = [
  { key: "present", name: "直説法現在" },
  { key: "pret_indef", name: "点過去 (完了過去)" },
  { key: "pret_imperf", name: "線過去 (不完了過去)" },
  { key: "futuro", name: "未来形" },
  { key: "pret_perf", name: "現在完了" }
];

function initQuiz() {
  // 初回ロード
}

function loadNewQuiz() {
  // ランダムに動詞、時制、人称を選択
  const v = VERB_DATABASE[Math.floor(Math.random() * VERB_DATABASE.length)];
  const t = TENSE_CONFIGS[Math.floor(Math.random() * TENSE_CONFIGS.length)];
  const pIdx = Math.floor(Math.random() * 6);
  const pronoun = PRONOUNS[pIdx];

  let correctAns = "";
  if (t.key === "pret_perf") {
    correctAns = `${HABER_FORMS[pIdx]} ${v.participio}`;
  } else {
    correctAns = v[t.key][pIdx];
  }

  // 誤答のダミー選択肢を3つ作成
  const wrongOptions = new Set();
  
  // 1. 同じ動詞の別の人称
  formsOfSameVerb = (t.key === "pret_perf") 
    ? HABER_FORMS.map(h => `${h} ${v.participio}`)
    : v[t.key];
  formsOfSameVerb.forEach(f => {
    if (f !== correctAns) wrongOptions.add(f);
  });

  // 2. 別の動詞の同じ時制・人称
  while (wrongOptions.size < 3) {
    const randOther = VERB_DATABASE[Math.floor(Math.random() * VERB_DATABASE.length)];
    const otherF = (t.key === "pret_perf")
      ? `${HABER_FORMS[pIdx]} ${randOther.participio}`
      : randOther[t.key][pIdx];
    if (otherF !== correctAns) {
      wrongOptions.add(otherF);
    }
  }

  const options = Array.from(wrongOptions).slice(0, 3);
  options.push(correctAns);
  // シャッフル
  options.sort(() => Math.random() - 0.5);

  currentQuizQuestion = {
    verb: v,
    tense: t,
    pronoun: pronoun,
    answer: correctAns,
    options: options
  };

  // UI描画
  document.getElementById("quiz-tense-label").textContent = `${t.name} ✕ ${pronoun}`;
  document.getElementById("quiz-prompt").textContent = `${v.infinitive}（${v.meaning.split("（")[0]}）`;

  const optsContainer = document.getElementById("quiz-options");
  optsContainer.innerHTML = "";

  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "quiz-opt-btn";
    btn.textContent = opt;
    btn.onclick = () => handleAnswer(opt, btn);
    optsContainer.appendChild(btn);
  });

  setCapyState("calm", "「焦るなよ。活用ルールを思い出せば解けるぞ。」");
}

function handleAnswer(selected, targetBtn) {
  const isCorrect = selected === currentQuizQuestion.answer;
  const allBtns = document.querySelectorAll(".quiz-opt-btn");
  allBtns.forEach(b => b.disabled = true);

  quizTotal++;
  document.getElementById("quiz-total").textContent = quizTotal;

  if (isCorrect) {
    targetBtn.classList.add("correct");
    quizStreak++;
    document.getElementById("quiz-streak").textContent = quizStreak;
    setCapyState("muybien", "「¡Muy bien! 正解だ！その調子、最高（Chévere）だぜ！」");
  } else {
    targetBtn.classList.add("wrong");
    quizStreak = 0;
    document.getElementById("quiz-streak").textContent = 0;

    // 正解のボタンをハイライト
    allBtns.forEach(b => {
      if (b.textContent === currentQuizQuestion.answer) {
        b.classList.add("correct");
      }
    });
    setCapyState("que", `「¿Qué? 惜しい！ 正解は【${currentQuizQuestion.answer}】だ。Tranquilo!」`);
  }

  // 1.4秒後に次の問題へ
  setTimeout(() => {
    loadNewQuiz();
  }, 1400);
}

function setCapyState(stateName, msg) {
  const imgMap = {
    calm: "assets/crop_calm.png",
    muybien: "assets/crop_muybien.png",
    que: "assets/crop_que.png",
    onsen: "assets/crop_onsen.png"
  };
  const imgEl = document.getElementById("quiz-capy-img");
  const bubbleEl = document.getElementById("quiz-bubble-msg");

  if (imgMap[stateName]) {
    imgEl.src = imgMap[stateName];
  }
  bubbleEl.textContent = msg;
}
