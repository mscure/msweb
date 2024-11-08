// game.js

const musicList = [
    { name: "PLum - R", file: "music/plum-r.mp3", timingFile: "json/plum-r.json" },
    { name: "Song 2", file: "music/song2.mp3", timingFile: "json/song2.json" },
    { name: "Song 3", file: "music/song3.mp3", timingFile: "json/song3.json" }
];

let score = 0;
let health = 100;
let selectedMusic;
let timingData = [];
const scoreDisplay = document.getElementById("score");
const healthBar = document.getElementById("health-bar");
const gameArea = document.getElementById("game-area");
const audioPlayer = document.getElementById("audio-player");
const gamePage = document.getElementById("game-page");

// 쿠키에서 음악 불러오기
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// 쿠키에서 설정값을 가져오는 함수
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
}

// 게임 시작
async function startGame() {
    const musicIndex = getCookie("selectedMusic");
    if (musicIndex !== null) {
        selectedMusic = musicList[musicIndex];
        audioPlayer.src = selectedMusic.file;

        // 게임 화면 전환 및 초기화
        gamePage.style.display = "block";
        resetGame();

        let timeLeft = 2; // 3초 카운트다운
        const timerDisplay = document.getElementById('countdown');

        const countdown = setInterval(function() {
            timerDisplay.textContent = timeLeft--;

            if (timeLeft < 0) {
                clearInterval(countdown);
                timerDisplay.textContent = 'Start!';
            }
        }, 1000);

        // 타이밍 데이터 불러오기
        try {
            const response = await fetch(selectedMusic.timingFile);
            timingData = await response.json(); // 해당 음악 파일의 타이밍 데이터 로드
        } catch (error) {
            console.error("타이밍 데이터를 불러오는 데 실패했습니다:", error);
        }

        // 3.764초 후 음악 재생 및 타이밍 데이터에 맞춰 타일 생성 시작
        setTimeout(() => {
            audioPlayer.play();
            startTiming();
            setTimeout(() => {audioPlayer.play()},2000);
            timerDisplay.style.display = "none";
        }, 3764);
    }
}

// 타이밍에 맞춰 타일 생성
function startTiming() {
    timingData.forEach(note => {
        const { time, key } = note;
        setTimeout(() => {
            createNoteTile(key);
        }, time * 1000);
    });
}

function getRandomPosition() {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);
    return { x, y };
}

// 타일 생성 함수
function createNoteTile(key) {
    // 쿠키에서 타일 색상 정보 불러오기
    const tileInnerColorF = getCookie("tileInnerColorF");
    const tileOuterColorF = getCookie("tileOuterColorF");
    const textColorF = getCookie("textColorF");
    const tileInnerColorJ = getCookie("tileInnerColorJ");
    const tileOuterColorJ = getCookie("tileOuterColorJ");
    const textColorJ = getCookie("textColorJ");

    const note = document.createElement("div");
    note.classList.add("note");
    note.classList.add("note-" + key);

    const position = getRandomPosition();
    note.style.left = `${position.x}px`;
    note.style.top = `${position.y}px`;
    note.dataset.key = key;

    if (key === "f") {
        // F 키에 대한 타일 스타일 적용
        note.style.borderColor = tileOuterColorF;

        const textF = document.createElement("div");
        textF.classList.add("note-f-text");
        textF.textContent = "F";
        textF.style.color = textColorF;
        note.appendChild(textF);

        const fillF = document.createElement("div");
        fillF.classList.add("fill", "fill-f");
        fillF.style.backgroundColor = tileInnerColorF;
        note.appendChild(fillF);

    } else if (key === "j") {
        // J 키에 대한 타일 스타일 적용
        note.style.borderColor = tileOuterColorJ;

        const textJ = document.createElement("div");
        textJ.classList.add("note-j-text");
        textJ.textContent = "J";
        textJ.style.color = textColorJ;
        note.appendChild(textJ);

        const fillJ = document.createElement("div");
        fillJ.classList.add("fill", "fill-j");
        fillJ.style.backgroundColor = tileInnerColorJ;
        note.appendChild(fillJ);
    }

    gameArea.appendChild(note);

    // 일정 시간 후 타일 제거
    setTimeout(() => {
        if (gameArea.contains(note)) {
            note.remove();
            decreaseHealth(10); // 타이밍 미스 시 체력 감소
        }
    }, 2000); // 2초 동안 타일 유지
}


// 체력 감소 함수
function decreaseHealth(amount) {
    health -= amount;
    if (health < 0) health = 0;
    healthBar.style.width = health + "%";
    if (health === 0) {
        alert("게임 오버!");
        resetGame();
    }
}

// 키 입력 이벤트 리스너 - 타이밍 맞추기
document.addEventListener("keydown", (event) => {
    const notes = document.getElementsByClassName("note");
    if (notes.length > 0) {
        const note = notes[0];
        const noteKey = note.dataset.key;

        if (event.key === noteKey) {
            note.remove();
            score += 100;
            scoreDisplay.textContent = "Score: " + score;
        } else {
            decreaseHealth(5); // 틀린 키 입력 시 체력 감소
        }
    } else {
        decreaseHealth(5); // 타이밍 맞지 않을 때 입력 시 체력 감소
    }
});

// 설정 적용 함수
function applySettings() {
    const audio = document.getElementById("audio-player");
    const volume = parseFloat(getCookie("volume") || "0.5");
    audio.volume = volume;
}

// 게임 초기화 함수
function resetGame() {
    score = 0;
    health = 100;
    scoreDisplay.textContent = "Score: 0";
    healthBar.style.width = health + "%";
}

// 설정값 적용
applySettings();

// 게임 시작
startGame();
