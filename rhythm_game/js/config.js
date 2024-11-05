const colors = [
    { name: "Red", value: "#ff0000" },
    { name: "Blue", value: "#0000ff" },
    { name: "Green", value: "#00ff00" },
    { name: "Purple", value: "#800080" },
    { name: "Yellow", value: "#ffff00" }
];

const textColors = [
    { name: "Cyan", value: "#00ffff" },   
    { name: "Orange", value: "#ff7f00" },   
    { name: "Magenta", value: "#ff00ff" },   
    { name: "Yellow-Green", value: "#7fff00" },
    { name: "Blue", value: "#0000ff" }        
];

let currentColorIndex = 0;
let previewInterval;
const gameArea = document.getElementById("tile-preview");

// 쿠키에서 설정값 가져오는 함수
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// 쿠키에서 설정 불러오기
function loadSettings() {
    const tileColor = getCookie("tileColor") || colors[0].value;
    const textColor = getCookie("textColor") || textColors[0].value;

    // 현재 선택된 색상과 보색에 따라 인덱스 설정
    currentColorIndex = colors.findIndex(color => color.value === tileColor);

    // 설정 페이지 초기화
    document.getElementById("color-name").style.backgroundColor = tileColor;
    document.getElementById("volume").value = getCookie("volume") || "0.5";
    updateTilePreview();
}

// 초기 설정 적용
function updateTilePreview() {
    const colorName = document.getElementById("color-name");
    colorName.textContent = colors[currentColorIndex].name;
    colorName.style.backgroundColor = colors[currentColorIndex].value;
}

// 색상 변경 함수
function changeColor(direction) {
    currentColorIndex += direction;
    if (currentColorIndex < 0) {
        currentColorIndex = colors.length - 1;
    } else if (currentColorIndex >= colors.length) {
        currentColorIndex = 0;
    }
    updateTilePreview();
}

// 설정 저장 함수
function saveSettings() {
    const volume = document.getElementById("volume").value;
    const tileColor = colors[currentColorIndex].value;
    const textColor = textColors[currentColorIndex].value; // 선택된 타일 색의 보색

    // 쿠키에 설정 값 저장
    document.cookie = `tileColor=${tileColor}; path=/`;
    document.cookie = `textColor=${textColor}; path=/`;
    document.cookie = `volume=${volume}; path=/`;

    alert("Settings saved!");
}

// 저장된 쿠키에서 설정값 불러오기
function loadSettings() {
    const savedTileColor = getCookie("tileColor");
    const savedVolume = getCookie("volume");

    // 색상 불러오기
    if (savedTileColor) {
        const colorIndex = colors.findIndex(color => color.value === savedTileColor);
        if (colorIndex !== -1) {
            currentColorIndex = colorIndex;
        }
    }

    // 볼륨 불러오기
    if (savedVolume) {
        document.getElementById("volume").value = savedVolume;
    }

    updateTilePreview();
}

// 미리보기 모드에서 타일을 무한히 생성
function startPreview() {
    previewInterval = setInterval(() => {
        const randomKey = ""; // 미리보기에서는 임의 키 설정
        createNoteTile(randomKey);
    }, 2000); // 2초마다 타일 생성
}

// 타일 생성 함수
function createNoteTile(key) {
    const note = document.createElement("div");
    note.classList.add("note");
    note.dataset.key = key;
    note.textContent = key.toUpperCase();
    gameArea.appendChild(note);

    const fill = document.createElement("div");
    fill.classList.add("fill");
    fill.style.backgroundColor = colors[currentColorIndex].value; // 타일 색상 적용
    note.appendChild(fill);

    setTimeout(() => {
        if (gameArea.contains(note)) {
            note.remove();
        }
    }, 2000); // 2초 동안 타일 유지
}

// 페이지 로드 시 초기 설정과 색상 미리보기 적용
loadSettings();
startPreview();
updateTilePreview();
