const colors = [
    { name: "Red", value: "#ff0000" },
    { name: "Blue", value: "#0000ff" },
    { name: "Green", value: "#00ff00" },
    { name: "Purple", value: "#800080" },
    { name: "Yellow", value: "#ffff00" }
];

const textColors = [
    { name: "White", value: "#ffffff" },
    { name: "Black", value: "#000000" },
    { name: "Gray", value: "#808080" },
    { name: "Pink", value: "#ffc0cb" },
    { name: "Orange", value: "#ff7f00" }
];

// 기본 색상 인덱스
let currentInnerColorIndexF = 0;
let currentOuterColorIndexF = 1;
let currentTextColorIndexF = 0;
let currentInnerColorIndexJ = 2;
let currentOuterColorIndexJ = 3;
let currentTextColorIndexJ = 1;
var currentvolume = document.getElementById("volume").value;
const gameArea = document.getElementsByClassName("tile-preview");

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

//rgb to hex
function rgbStringToHex(rgb) {
    // 문자열에서 숫자 부분만 추출
    const rgbValues = rgb.match(/\d+/g).map(Number);
  
    // RGB 배열을 HEX로 변환
    return (
      "#" +
      ((1 << 24) | (rgbValues[0] << 16) | (rgbValues[1] << 8) | rgbValues[2])
        .toString(16)
        .slice(1)
        .toUpperCase()
    );
}  

// 색상 프리뷰 업데이트 함수 
function updateTilePreview() {
    // F키 미리보기
    const tilePreviewF = document.getElementById("tile-preview-f");
    const tilefillf = document.getElementsByClassName("fill-f");
    const tiletextf = document.getElementsByClassName("innertext-f");
    const innerColorNamef = document.getElementById("f-inner-color-name");
    const outerColorNamef = document.getElementById("f-outer-color-name");
    const textColorNamef = document.getElementById("f-text-color-name");
    
    //outer
    tilePreviewF.style.border = "4px solid "+ colors[currentOuterColorIndexF].value;
    outerColorNamef.style.backgroundColor = colors[currentOuterColorIndexF].value;

    //inner
    if (tilefillf.length > 0) {
        const currentfillcolorf = rgbStringToHex(tilefillf[0].style.backgroundColor);
        tilefillf[0].style.backgroundColor = colors[currentInnerColorIndexF].value;
        innerColorNamef.style.backgroundColor = colors[currentInnerColorIndexF].value;
        if (currentfillcolorf != colors[currentInnerColorIndexF].value.toUpperCase()) {
            tilefillf[0].classList.remove("fill");
            setTimeout(function() {
                tilefillf[0].classList.add("fill");
            }, 20);
        }
    }

    //text
    if (tiletextf.length > 0) {
        tiletextf[0].style.color = textColors[currentTextColorIndexF].value;
        textColorNamef.style.backgroundColor = textColors[currentTextColorIndexF].value;
    }

    // J키 미리보기
    const tilePreviewJ = document.getElementById("tile-preview-j");
    const tilefillj = document.getElementsByClassName("fill-j");
    const tiletextj = document.getElementsByClassName("innertext-j");
    const innerColorNamej = document.getElementById("j-inner-color-name");
    const outerColorNamej = document.getElementById("j-outer-color-name");
    const textColorNamej = document.getElementById("j-text-color-name");

    //outer
    tilePreviewJ.style.border = "4px solid "+ colors[currentOuterColorIndexJ].value;
    outerColorNamej.style.backgroundColor = colors[currentOuterColorIndexJ].value;

    //inner
    if (tilefillj.length > 0) {
        const currentfillcolorj = rgbStringToHex(tilefillj[0].style.backgroundColor);
        tilefillj[0].style.backgroundColor = colors[currentInnerColorIndexJ].value;
        innerColorNamej.style.backgroundColor = colors[currentInnerColorIndexJ].value;
        
        if (currentfillcolorj != colors[currentInnerColorIndexJ].value.toUpperCase()) {
            tilefillj[0].classList.remove("fill");
            setTimeout(function() {
                tilefillj[0].classList.add("fill");
            }, 20);
        }
    }

    //text
    if (tiletextj.length > 0) {
        tiletextj[0].style.color = textColors[currentTextColorIndexJ].value;
        textColorNamej.style.backgroundColor = textColors[currentTextColorIndexJ].value;
    }
}

function changeVolume() {
    currentvolume = document.getElementById("volume").value;
}

// 색상 변경 함수
function changeColor(key, direction, type) {
    if (key === 'f') {
        if (type === 'text') {
            currentTextColorIndexF = (currentTextColorIndexF + direction + textColors.length) % textColors.length;
        } else if (type === 'inner') {
            currentInnerColorIndexF = (currentInnerColorIndexF + direction + colors.length) % colors.length;
        } else if (type === 'outer') {
            currentOuterColorIndexF = (currentOuterColorIndexF + direction + colors.length) % colors.length;
        }
    } else if (key === 'j') {
        if (type === 'text') {
            currentTextColorIndexJ = (currentTextColorIndexJ + direction + textColors.length) % textColors.length;
        } else if (type === 'inner') {
            currentInnerColorIndexJ = (currentInnerColorIndexJ + direction + colors.length) % colors.length;
        } else if (type === 'outer') {
            currentOuterColorIndexJ = (currentOuterColorIndexJ + direction + colors.length) % colors.length;
        }
    }
    updateTilePreview();
}

// 설정 저장 함수
function saveSettings() {
    document.cookie = `tileInnerColorF=${colors[currentInnerColorIndexF].value}; path=/`;
    document.cookie = `tileOuterColorF=${colors[currentOuterColorIndexF].value}; path=/`;
    document.cookie = `textColorF=${textColors[currentTextColorIndexF].value}; path=/`;
    document.cookie = `tileInnerColorJ=${colors[currentInnerColorIndexJ].value}; path=/`;
    document.cookie = `tileOuterColorJ=${colors[currentOuterColorIndexJ].value}; path=/`;
    document.cookie = `textColorJ=${textColors[currentTextColorIndexJ].value}; path=/`;
    document.cookie = `volume=${currentvolume}; path=/`;
    alert("Settings saved!");
}

// 설정 불러오기
function loadSettings() {
    const tileInnerColorF = getCookie("tileInnerColorF") || colors[0].value;
    const tileOuterColorF = getCookie("tileOuterColorF") || colors[1].value;
    const textColorF = getCookie("textColorF") || textColors[0].value;
    const tileInnerColorJ = getCookie("tileInnerColorJ") || colors[2].value;
    const tileOuterColorJ = getCookie("tileOuterColorJ") || colors[3].value;
    const textColorJ = getCookie("textColorJ") || textColors[1].value;
    const volume = parseFloat(getCookie("volume") || "0.5");
    const tilefillf = document.getElementsByClassName("fill-f");
    const tilefillj = document.getElementsByClassName("fill-j");

    currentInnerColorIndexF = colors.findIndex(color => color.value === tileInnerColorF);
    currentOuterColorIndexF = colors.findIndex(color => color.value === tileOuterColorF);
    currentTextColorIndexF = textColors.findIndex(color => color.value === textColorF);
    currentInnerColorIndexJ = colors.findIndex(color => color.value === tileInnerColorJ);
    currentOuterColorIndexJ = colors.findIndex(color => color.value === tileOuterColorJ);
    currentTextColorIndexJ = textColors.findIndex(color => color.value === textColorJ);
    document.getElementById("volume").value = volume;

    tilefillf[0].style.backgroundColor = colors[currentInnerColorIndexF].value;
    tilefillj[0].style.backgroundColor = colors[currentInnerColorIndexJ].value;
    updateTilePreview();
}

// 타일 생성 함수
function createNoteTile(key) {
    const note = document.createElement("div");
    note.classList.add("note");
    note.dataset.key = key;
    note.textContent = key.toUpperCase();

    const fill = document.createElement("div");
    fill.classList.add("fill");

    if (key === 'f') {
        fill.style.backgroundColor = colors[currentInnerColorIndexF].value;
        note.style.backgroundColor = colors[currentOuterColorIndexF].value;
        note.style.color = textColors[currentTextColorIndexF].value;
    } else if (key === 'j') {
        fill.style.backgroundColor = colors[currentInnerColorIndexJ].value;
        note.style.backgroundColor = colors[currentOuterColorIndexJ].value;
        note.style.color = textColors[currentTextColorIndexJ].value;
    }

    note.appendChild(fill);
    gameArea.appendChild(note);

    setTimeout(() => {
        if (gameArea.contains(note)) {
            note.remove();
        }
    }, 2000); // 2초 동안 타일 유지
}

// 페이지 로드 시 설정 불러오기
loadSettings();
//updateTilePreview();
