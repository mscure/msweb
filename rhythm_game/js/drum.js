// Tone.js 드럼 소리 샘플 로드
const drum = new Tone.MembraneSynth().toDestination();

// 드럼 소리 재생 함수
function playDrum() {
    drum.triggerAttack("C1"); // 드럼 소리 재생
}
