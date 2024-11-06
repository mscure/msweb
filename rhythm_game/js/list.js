const musicList = [
    { name: "PLum - R", file: "music/plum-r.mp3", timingFile: "json/plum-r.json" },
    { name: "", file: "music/", timingFile: "json/.json" },
    { name: "", file: "music/", timingFile: "json/.json" }
];

// 음악 목록 표시
const musicListElement = document.getElementById("music-list");
musicList.forEach((music, index) => {
    const li = document.createElement("li");
    li.textContent = music.name;
    li.addEventListener("click", () => {
        // 쿠키에 선택한 음악 인덱스 저장
        setCookie("selectedMusic", index, 1);
        // 게임 페이지로 이동
        window.location.href = "game.html";
    });
    musicListElement.appendChild(li);
});

// 쿠키에 음악 저장
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
