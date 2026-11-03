// スペイン語 動詞マスターデータベース ＆ 活用生成エンジン
const VERB_DATABASE = [
  // 不規則・最重要動詞
  {
    infinitive: "ser",
    meaning: "〜である（本質・性格・国籍・職業・時間）",
    type: "完全不規則",
    present: ["soy", "eres", "es", "somos", "sois", "son"],
    pret_indef: ["fui", "fuiste", "fue", "fuimos", "fuisteis", "fueron"],
    pret_imperf: ["era", "eras", "era", "éramos", "erais", "eran"],
    futuro: ["seré", "serás", "será", "seremos", "seréis", "serán"],
    participio: "sido",
    gerundio: "siendo"
  },
  {
    infinitive: "estar",
    meaning: "〜にある、〜の状態である（所在・一時的状態・気分）",
    type: "不規則",
    present: ["estoy", "estás", "está", "estamos", "estáis", "están"],
    pret_indef: ["estuve", "estuviste", "estuvo", "estuvimos", "estuvisteis", "estuvieron"],
    pret_imperf: ["estaba", "estabas", "estaba", "estábamos", "estabais", "estaban"],
    futuro: ["estaré", "estarás", "estará", "estaremos", "estaréis", "estarán"],
    participio: "estado",
    gerundio: "estando"
  },
  {
    infinitive: "ir",
    meaning: "行く",
    type: "完全不規則",
    present: ["voy", "vas", "va", "vamos", "vais", "van"],
    pret_indef: ["fui", "fuiste", "fue", "fuimos", "fuisteis", "fueron"],
    pret_imperf: ["iba", "ibas", "iba", "íbamos", "ibais", "iban"],
    futuro: ["iré", "irás", "irá", "iremos", "iréis", "irán"],
    participio: "ido",
    gerundio: "yendo"
  },
  {
    infinitive: "tener",
    meaning: "持っている、〜がある、(年齢)〜歳である",
    type: "不規則（yo+語幹変化）",
    present: ["tengo", "tienes", "tiene", "tenemos", "tenéis", "tienen"],
    pret_indef: ["tuve", "tuviste", "tuvo", "tuvimos", "tuvisteis", "tuvieron"],
    pret_imperf: ["tenía", "tenías", "tenía", "teníamos", "teníais", "tenían"],
    futuro: ["tendré", "tendrás", "tendrá", "tendremos", "tendréis", "tendrán"],
    participio: "tenido",
    gerundio: "teniendo"
  },
  {
    infinitive: "hacer",
    meaning: "する、作る、(天候)〜である",
    type: "不規則（yo+点過去）",
    present: ["hago", "haces", "hace", "hacemos", "hacéis", "hacen"],
    pret_indef: ["hice", "hiciste", "hizo", "hicimos", "hicisteis", "hicieron"],
    pret_imperf: ["hacía", "hacías", "hacía", "hacíamos", "hacíais", "hacían"],
    futuro: ["haré", "harás", "hará", "haremos", "haréis", "harán"],
    participio: "hecho",
    gerundio: "haciendo"
  },
  {
    infinitive: "poder",
    meaning: "〜できる（可能）",
    type: "語幹母音変化(o→ue) / 不規則",
    present: ["puedo", "puedes", "puede", "podemos", "podéis", "pueden"],
    pret_indef: ["pude", "pudiste", "pudo", "pudimos", "pudisteis", "pudieron"],
    pret_imperf: ["podía", "podías", "podía", "podíamos", "podíais", "podían"],
    futuro: ["podré", "podrás", "podrá", "podremos", "podréis", "podrán"],
    participio: "podido",
    gerundio: "pudiendo"
  },
  {
    infinitive: "decir",
    meaning: "言う、伝える",
    type: "不規則（yo+語幹変化+点過去）",
    present: ["digo", "dices", "dice", "decimos", "decís", "dicen"],
    pret_indef: ["dije", "dijiste", "dijo", "dijimos", "dijisteis", "dijeron"],
    pret_imperf: ["decía", "decías", "decía", "decíamos", "decíais", "decían"],
    futuro: ["diré", "dirás", "dirá", "diremos", "diréis", "dirán"],
    participio: "dicho",
    gerundio: "diciendo"
  },
  {
    infinitive: "ver",
    meaning: "見る、会う",
    type: "不規則",
    present: ["veo", "ves", "ve", "vemos", "veis", "ven"],
    pret_indef: ["vi", "viste", "vio", "vimos", "visteis", "vieron"],
    pret_imperf: ["veía", "veías", "veía", "veíamos", "veíais", "veían"],
    futuro: ["veré", "verás", "verá", "veremos", "veréis", "verán"],
    participio: "visto",
    gerundio: "viendo"
  },
  {
    infinitive: "dar",
    meaning: "与える、あげる",
    type: "不規則",
    present: ["doy", "das", "da", "damos", "dais", "dan"],
    pret_indef: ["di", "diste", "dio", "dimos", "disteis", "dieron"],
    pret_imperf: ["daba", "dabas", "daba", "dábamos", "dabais", "daban"],
    futuro: ["daré", "darás", "dará", "daremos", "daréis", "darán"],
    participio: "dado",
    gerundio: "dando"
  },
  {
    infinitive: "saber",
    meaning: "知っている、(技能)〜できる",
    type: "不規則",
    present: ["sé", "sabes", "sabe", "sabemos", "sabéis", "saben"],
    pret_indef: ["supe", "supiste", "supo", "supimos", "supisteis", "supieron"],
    pret_imperf: ["sabía", "sabías", "sabía", "sabíamos", "sabíais", "sabían"],
    futuro: ["sabré", "sabrás", "sabrá", "sabremos", "sabréis", "sabrán"],
    participio: "sabido",
    gerundio: "sabiendo"
  },
  {
    infinitive: "querer",
    meaning: "欲しい、〜したい、愛する",
    type: "語幹母音変化(e→ie) / 不規則",
    present: ["quiero", "quieres", "quiere", "queremos", "queréis", "quieren"],
    pret_indef: ["quise", "quisiste", "quiso", "quisimos", "quisisteis", "quisieron"],
    pret_imperf: ["quería", "querías", "quería", "queríamos", "queríais", "querían"],
    futuro: ["querré", "querrás", "querrá", "querremos", "querréis", "querrán"],
    participio: "querido",
    gerundio: "queriendo"
  },
  {
    infinitive: "venir",
    meaning: "来る",
    type: "不規則（yo+語幹変化）",
    present: ["vengo", "vienes", "viene", "venimos", "venís", "vienen"],
    pret_indef: ["vine", "viniste", "vino", "vinimos", "vinisteis", "vinieron"],
    pret_imperf: ["venía", "venías", "venía", "veníamos", "veníais", "venían"],
    futuro: ["vendré", "vendrás", "vendrá", "vendremos", "vendréis", "vendrán"],
    participio: "venido",
    gerundio: "viniendo"
  },
  {
    infinitive: "poner",
    meaning: "置く、身につける、つける",
    type: "不規則（yo+点過去）",
    present: ["pongo", "pones", "pone", "ponemos", "ponéis", "ponen"],
    pret_indef: ["puse", "pusiste", "puso", "pusimos", "pusisteis", "pusieron"],
    pret_imperf: ["ponía", "ponías", "ponía", "poníamos", "poníais", "ponían"],
    futuro: ["pondré", "pondrás", "pondrá", "pondremos", "pondréis", "pondrán"],
    participio: "puesto",
    gerundio: "poniendo"
  },
  {
    infinitive: "salir",
    meaning: "出る、出発する、出かける",
    type: "不規則（yo+未来）",
    present: ["salgo", "sales", "sale", "salimos", "salís", "salen"],
    pret_indef: ["salí", "saliste", "salió", "salimos", "salisteis", "salieron"],
    pret_imperf: ["salía", "salías", "salía", "salíamos", "salíais", "salían"],
    futuro: ["saldré", "saldrás", "saldrá", "saldremos", "saldréis", "saldrán"],
    participio: "salido",
    gerundio: "saliendo"
  },
  {
    infinitive: "haber",
    meaning: "(完了形の助動詞)、〜がある(hay)",
    type: "不規則（助動詞）",
    present: ["he", "has", "ha", "hemos", "habéis", "han"],
    pret_indef: ["hube", "hubiste", "hubo", "hubimos", "hubisteis", "hubieron"],
    pret_imperf: ["había", "habías", "había", "habíamos", "habíais", "habían"],
    futuro: ["habré", "habrás", "habrá", "habremos", "habréis", "habrán"],
    participio: "habido",
    gerundio: "habiendo"
  },
  // 規則動詞の代表格
  {
    infinitive: "hablar",
    meaning: "話す",
    type: "-ar 規則動詞",
    present: ["hablo", "hablas", "habla", "hablamos", "habláis", "hablan"],
    pret_indef: ["hablé", "hablaste", "habló", "hablamos", "hablasteis", "hablaron"],
    pret_imperf: ["hablaba", "hablabas", "hablaba", "hablábamos", "hablabais", "hablaban"],
    futuro: ["hablaré", "hablarás", "hablará", "hablaremos", "hablaréis", "hablarán"],
    participio: "hablado",
    gerundio: "hablando"
  },
  {
    infinitive: "comer",
    meaning: "食べる",
    type: "-er 規則動詞",
    present: ["como", "comes", "come", "comemos", "coméis", "comen"],
    pret_indef: ["comí", "comiste", "comió", "comimos", "comisteis", "comieron"],
    pret_imperf: ["comía", "comías", "comía", "comíamos", "comíais", "comían"],
    futuro: ["comeré", "comerás", "comerá", "comeremos", "comeréis", "comerán"],
    participio: "comido",
    gerundio: "comiendo"
  },
  {
    infinitive: "vivir",
    meaning: "住む、生きる",
    type: "-ir 規則動詞",
    present: ["vivo", "vives", "vive", "vivimos", "vivís", "viven"],
    pret_indef: ["viví", "viviste", "vivió", "vivimos", "vivisteis", "vivieron"],
    pret_imperf: ["vivía", "vivías", "vivía", "vivíamos", "vivíais", "vivían"],
    futuro: ["viviré", "vivirás", "vivirá", "viviremos", "viviréis", "vivirán"],
    participio: "vivido",
    gerundio: "viviendo"
  },
  {
    infinitive: "trabajar",
    meaning: "働く、仕事をする",
    type: "-ar 規則動詞",
    present: ["trabajo", "trabajas", "trabaja", "trabajamos", "trabajáis", "trabajan"],
    pret_indef: ["trabajé", "trabajaste", "trabajó", "trabajamos", "trabajasteis", "trabajaron"],
    pret_imperf: ["trabajaba", "trabajabas", "trabajaba", "trabajábamos", "trabajabais", "trabajaban"],
    futuro: ["trabajaré", "trabajarás", "trabajará", "trabajaremos", "trabajaréis", "trabajarán"],
    participio: "trabajado",
    gerundio: "trabajando"
  },
  {
    infinitive: "estudiar",
    meaning: "勉強する",
    type: "-ar 規則動詞",
    present: ["estudio", "estudias", "estudia", "estudiamos", "estudiáis", "estudian"],
    pret_indef: ["estudié", "estudiaste", "estudió", "estudiamos", "estudiasteis", "estudiaron"],
    pret_imperf: ["estudiaba", "estudiabas", "estudiaba", "estudiábamos", "estudiabais", "estudiaban"],
    futuro: ["estudiaré", "estudiarás", "estudiará", "estudiaremos", "estudiaréis", "estudiarán"],
    participio: "estudiado",
    gerundio: "estudiando"
  },
  {
    infinitive: "aprender",
    meaning: "学ぶ、習得する",
    type: "-er 規則動詞",
    present: ["aprendo", "aprendes", "aprende", "aprendemos", "aprendéis", "aprenden"],
    pret_indef: ["aprendí", "aprendiste", "aprendió", "aprendimos", "aprendisteis", "aprendieron"],
    pret_imperf: ["aprendía", "aprendías", "aprendía", "aprendíamos", "aprendíais", "aprendían"],
    futuro: ["aprenderé", "aprenderás", "aprenderá", "aprenderemos", "aprenderéis", "aprenderán"],
    participio: "aprendido",
    gerundio: "aprendiendo"
  },
  {
    infinitive: "escribir",
    meaning: "書く",
    type: "-ir 規則（過去分詞不規則）",
    present: ["escribo", "escribes", "escribe", "escribimos", "escribís", "escriben"],
    pret_indef: ["escribí", "escribiste", "escribió", "escribimos", "escribisteis", "escribieron"],
    pret_imperf: ["escribía", "escribías", "escribía", "escribíamos", "escribíais", "escribían"],
    futuro: ["escribiré", "escribirás", "escribirá", "escribiremos", "escribiréis", "escribirán"],
    participio: "escrito",
    gerundio: "escribiendo"
  },
  {
    infinitive: "abrir",
    meaning: "開ける、開く",
    type: "-ir 規則（過去分詞不規則）",
    present: ["abro", "abres", "abre", "abrimos", "abrís", "abren"],
    pret_indef: ["abrí", "abriste", "abrió", "abrimos", "abristeis", "abrieron"],
    pret_imperf: ["abría", "abrías", "abría", "abríamos", "abríais", "abrían"],
    futuro: ["abriré", "abrirás", "abrirá", "abriremos", "abriréis", "abrirán"],
    participio: "abierto",
    gerundio: "abriendo"
  },
  {
    infinitive: "dormir",
    meaning: "眠る",
    type: "語幹母音変化(o→ue)",
    present: ["duermo", "duermes", "duerme", "dormimos", "dormís", "duermen"],
    pret_indef: ["dormí", "dormiste", "durmió", "dormimos", "dormisteis", "durmieron"],
    pret_imperf: ["dormía", "dormías", "dormía", "dormíamos", "dormíais", "dormían"],
    futuro: ["dormiré", "dormirás", "dormirá", "dormiremos", "dormiréis", "dormirán"],
    participio: "dormido",
    gerundio: "durmiendo"
  },
  {
    infinitive: "pensar",
    meaning: "考える、思う",
    type: "語幹母音変化(e→ie)",
    present: ["pienso", "piensas", "piensa", "pensamos", "pensáis", "piensan"],
    pret_indef: ["pensé", "pensaste", "pensó", "pensamos", "pensasteis", "pensaron"],
    pret_imperf: ["pensaba", "pensabas", "pensaba", "pensábamos", "pensabais", "pensaban"],
    futuro: ["pensaré", "pensarás", "pensará", "pensaremos", "pensaréis", "pensarán"],
    participio: "pensado",
    gerundio: "pensando"
  },
  {
    infinitive: "pedir",
    meaning: "頼む、注文する、求める",
    type: "語幹母音変化(e→i)",
    present: ["pido", "pides", "pide", "pedimos", "pedís", "piden"],
    pret_indef: ["pedí", "pediste", "pidió", "pedimos", "pedisteis", "pidieron"],
    pret_imperf: ["pedía", "pedías", "pedía", "pedíamos", "pedíais", "pedían"],
    futuro: ["pediré", "pedirás", "pedirá", "pediremos", "pediréis", "pedirán"],
    participio: "pedido",
    gerundio: "pidiendo"
  },
  {
    infinitive: "conocer",
    meaning: "知っている、(人と)知り合いである、(場所を)訪れたことがある",
    type: "不規則（yo: conozco）",
    present: ["conozco", "conoces", "conoce", "conocemos", "conocéis", "conocen"],
    pret_indef: ["conocí", "conociste", "conoció", "conocimos", "conocisteis", "conocieron"],
    pret_imperf: ["conocía", "conocías", "conocía", "conocíamos", "conocíais", "conocían"],
    futuro: ["conoceré", "conocerás", "conocerá", "conoceremos", "conoceréis", "conocerán"],
    participio: "conocido",
    gerundio: "conociendo"
  },
  {
    infinitive: "traer",
    meaning: "持ってくる、連れてくる",
    type: "不規則（yo: traigo / 点過去: traje）",
    present: ["traigo", "traes", "trae", "traemos", "traéis", "traen"],
    pret_indef: ["traje", "trajiste", "trajo", "trajimos", "trajisteis", "trajeron"],
    pret_imperf: ["traía", "traías", "traía", "traíamos", "traíais", "traían"],
    futuro: ["traeré", "traerás", "traerá", "traeremos", "traeréis", "traerán"],
    participio: "traído",
    gerundio: "trayendo"
  },
  {
    infinitive: "llegar",
    meaning: "着く、到着する",
    type: "-ar 規則（綴り字変化: llegué）",
    present: ["llego", "llegas", "llega", "llegamos", "llegáis", "llegan"],
    pret_indef: ["llegué", "llegaste", "llegó", "llegamos", "llegasteis", "llegaron"],
    pret_imperf: ["llegaba", "llegabas", "llegaba", "llegábamos", "llegabais", "llegaban"],
    futuro: ["llegaré", "llegarás", "llegará", "llegaremos", "llegaréis", "llegarán"],
    participio: "llegado",
    gerundio: "llegando"
  },
  {
    infinitive: "comprar",
    meaning: "買う",
    type: "-ar 規則動詞",
    present: ["compro", "compras", "compra", "compramos", "compráis", "compran"],
    pret_indef: ["compré", "compraste", "compró", "compramos", "comprasteis", "compraron"],
    pret_imperf: ["compraba", "comprabas", "compraba", "comprábamos", "comprabais", "compraban"],
    futuro: ["compraré", "comprarás", "comprará", "compraremos", "compraréis", "comprarán"],
    participio: "comprado",
    gerundio: "comprando"
  }
];

// 規則動詞の自動活用生成ヘルパー（辞書にない規則動詞用）
function generateRegularConjugation(inf, meaning = "規則動詞") {
  const ending = inf.slice(-2);
  const stem = inf.slice(0, -2);
  
  if (ending === "ar") {
    return {
      infinitive: inf,
      meaning: meaning,
      type: "-ar 規則動詞（自動計算）",
      present: [stem + "o", stem + "as", stem + "a", stem + "amos", stem + "áis", stem + "an"],
      pret_indef: [stem + "é", stem + "aste", stem + "ó", stem + "amos", stem + "asteis", stem + "aron"],
      pret_imperf: [stem + "aba", stem + "abas", stem + "aba", stem + "ábamos", stem + "abais", stem + "aban"],
      futuro: [inf + "é", inf + "ás", inf + "á", inf + "emos", inf + "éis", inf + "án"],
      participio: stem + "ado",
      gerundio: stem + "ando"
    };
  } else if (ending === "er" || ending === "ir") {
    const isEr = ending === "er";
    return {
      infinitive: inf,
      meaning: meaning,
      type: `-${ending} 規則動詞（自動計算）`,
      present: isEr
        ? [stem + "o", stem + "es", stem + "e", stem + "emos", stem + "éis", stem + "en"]
        : [stem + "o", stem + "es", stem + "e", stem + "imos", stem + "ís", stem + "en"],
      pret_indef: [stem + "í", stem + "iste", stem + "ió", stem + "imos", stem + "isteis", stem + "ieron"],
      pret_imperf: [stem + "ía", stem + "ías", stem + "ía", stem + "íamos", stem + "íais", stem + "ían"],
      futuro: [inf + "é", inf + "ás", inf + "á", inf + "emos", inf + "éis", inf + "án"],
      participio: stem + "ido",
      gerundio: stem + "iendo"
    };
  }
  return null;
}
