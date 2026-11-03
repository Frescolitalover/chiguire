// Chigüire ネイティブ音声再生エンジン（全942単語・時制・活用形対応）
let currentAudioObj = null;

function speakSpanish(text) {
  if (!text) return;
  const clean = text.trim().toLowerCase();

  // 1. 全942音源のネイティブMP3マップから検索
  if (typeof AUDIO_MANIFEST !== "undefined" && AUDIO_MANIFEST[clean]) {
    playNativeAudio(AUDIO_MANIFEST[clean], text);
    return;
  }

  // 2. マップにない場合（予備・万が一の動的生成動詞など）はWeb Speech API
  console.log(`[AudioEngine] No MP3 in manifest for "${clean}", using Web Speech API fallback.`);
  fallbackWebSpeech(text);
}

function playNativeAudio(src, originalText) {
  try {
    if (currentAudioObj) {
      currentAudioObj.pause();
      currentAudioObj.currentTime = 0;
      currentAudioObj = null;
    }
    
    currentAudioObj = new Audio(src);
    
    const playPromise = currentAudioObj.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn(`[AudioEngine] Native playback failed for "${src}":`, err);
        fallbackWebSpeech(originalText);
      });
    }
  } catch (e) {
    console.error("[AudioEngine] Error playing audio:", e);
    fallbackWebSpeech(originalText);
  }
}

function fallbackWebSpeech(text) {
  if (!('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.error("[AudioEngine] Web Speech API failed:", e);
  }
}
