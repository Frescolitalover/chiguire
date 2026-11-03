// 音声再生：高品質ニューラルMP3優先 ＆ Web Speech APIフォールバック
const AVAILABLE_AUDIO_MAP = {};

// 利用可能な事前生成MP3リスト（43単語）
const PRELOADED_VOICES = [
  "hablar", "comer", "vivir", "ser", "estar", "ir", "tener", "hacer", "poder", "decir",
  "ver", "dar", "saber", "querer", "venir", "poner", "salir", "dormir", "pensar", "pedir",
  "soy", "eres", "es", "somos", "sois", "son", "fui", "fuiste", "fue", "fuimos", "fueron",
  "era", "seré", "sido", "estoy", "estás", "está", "estamos", "están", "estuve", "estuvo",
  "iba", "tiene"
];

PRELOADED_VOICES.forEach(w => {
  AVAILABLE_AUDIO_MAP[w.toLowerCase()] = `audio/${encodeURIComponent(w.toLowerCase())}.mp3`;
});

let currentAudioObj = null;

function speakSpanish(text) {
  const clean = text.trim().toLowerCase();

  // 1. 高品質ニューラルMP3が存在する場合は最優先で再生
  if (AVAILABLE_AUDIO_MAP[clean]) {
    if (currentAudioObj) {
      currentAudioObj.pause();
      currentAudioObj.currentTime = 0;
    }
    currentAudioObj = new Audio(AVAILABLE_AUDIO_MAP[clean]);
    currentAudioObj.play().catch(e => {
      console.warn("Audio play failed, falling back to Web Speech:", e);
      fallbackWebSpeech(text);
    });
    return;
  }

  // 2. なければブラウザWeb Speechで再生
  fallbackWebSpeech(text);
}

function fallbackWebSpeech(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES';
  utterance.rate = 0.9;
  window.speechSynthesis.speak(utterance);
}
