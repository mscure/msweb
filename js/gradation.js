// 카운트다운 타이머를 시작하고 남은 시간을 HTML 요소에 업데이트하는 함수
function startTimer(endTime, elementId) {
    // 타이머를 업데이트하는 내부 함수
    function updateTimer() {
        const now = new Date(); // 현재 날짜와 시간을 가져옴
        const timeLeft = endTime - now; // 남은 시간을 밀리초 단위로 계산

        // 남은 일, 시간, 분, 초를 계산
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // HTML 요소의 텍스트 내용을 남은 시간으로 업데이트
        document.getElementById(elementId).textContent = 
            (days >= 0 ? days + '' : '') + "d " +
            (hours < 10 ? '0' : '') + hours + "h " + 
            (minutes < 10 ? '0' : '') + minutes + "m " + 
            (seconds < 10 ? '0' : '') + seconds + "s";

        // 시간이 다 되면 타이머를 멈추고 00:00:00으로 설정
        if (timeLeft < 0) {
            clearInterval(intervalId);
            document.getElementById(elementId).textContent = "00:00:00";
        }
    }

    updateTimer(); // 타이머를 즉시 업데이트
    const intervalId = setInterval(updateTimer, 1000); // 매 초마다 타이머를 업데이트
}

// 다음 10시를 계산하는 함수
function getNextTenOClock() {
    const now = new Date(); // 현재 날짜와 시간을 가져옴
    let nextTen = new Date(); // 다음 10시를 위한 새로운 날짜 객체 생성
    nextTen.setHours(22, 0, 0, 0); // 22시 00분으로 설정

    // 만약 현재 시간이 이미 22시 00분 이후라면, 다음 날로 설정
    if (now >= nextTen) {
        nextTen.setDate(nextTen.getDate() + 1);
    }

    return nextTen; // 다음 10시 반환
}

// 다음 금요일 10시를 계산하는 함수
function getNextFridayTenOClock() {
    const now = new Date(); // 현재 날짜와 시간을 가져옴
    const nextFriday = new Date(); // 다음 금요일을 위한 새로운 날짜 객체 생성

    const day = now.getDay(); // 현재 요일을 가져옴 (0 = 일요일, 1 = 월요일, ...)
    const diffToFriday = (day <= 5) ? 5 - day : 12 - day; // 다음 금요일까지 남은 일 수 계산

    nextFriday.setDate(now.getDate() + diffToFriday); // 다음 금요일 날짜 설정
    nextFriday.setHours(22, 0, 0, 0); // 22시 00분으로 설정

    return nextFriday; // 다음 금요일 10시 반환
}

// 페이지가 로드될 때 실행되는 함수
window.onload = function () {
    const nextTenEndTime = getNextTenOClock(); // 다음 10시를 계산
    const nextFridayEndTime = getNextFridayTenOClock(); // 다음 금요일 10시를 계산

    startTimer(nextTenEndTime, 'timer'); // 'timer' 요소에 대해 타이머 시작
    startTimer(nextFridayEndTime, 'friday-timer'); // 'friday-timer' 요소에 대해 타이머 시작
}

const repeatPhrase = "집에 가고 싶다 ";
const repeatCount = 787;
const repeatedText = repeatPhrase.repeat(repeatCount);
document.getElementById("repeatText").textContent = repeatedText;