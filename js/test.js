let lessons = [];
let currentWords = [];
let currentIndex = 0;
let correctAnswers = 0;
let wrongAnswers = [];
let timer = null;
let timeElapsed = 0;
const timeLimit = 10000; // 10초 제한
const answerDelay = 1500; // 1.5초 후 다음 단어로 넘어감

// JSON 파일에서 데이터를 가져옴
fetch('json/words.json')
    .then(response => response.json())
    .then(data => {
        lessons = data.lessons;
        populateLessonSelect();
    })
    .catch(error => console.error('Error fetching the word list:', error));

// 강의 선택 박스에 강의를 채우는 함수
function populateLessonSelect() {
    const lessonSelect = document.getElementById('lesson-select');
    lessons.forEach((lesson, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = lesson.lessonName;
        lessonSelect.appendChild(option);
    });
}

// 테스트를 시작하는 함수
function startTest() {
    const lessonSelect = document.getElementById('lesson-select');
    const lessonIndex = lessonSelect.value;
    const scoreElement = document.getElementById('score');
    
    document.getElementById('result').innerHTML = ''; // 결과 초기화
    scoreElement.innerText = ''; // 점수 초기화
    wrongAnswers = []; // 틀린 단어 초기화
    correctAnswers = 0;
    currentIndex = 0;

    if (lessonIndex === '') {
        document.getElementById('test-word').innerText = '강의를 선택하세요.';
        return;
    }

    if (lessonIndex === 'all') {
        currentWords = lessons.flatMap(lesson => lesson.words);
    } else {
        currentWords = lessons[lessonIndex].words;
    }

    // 문제 순서를 랜덤으로 섞기
    currentWords = shuffleArray(currentWords);

    if (currentWords.length > 0) {
        displayNextWord();
    } else {
        document.getElementById('test-word').innerText = '단어가 없습니다.';
    }

    // 엔터키로 정답 제출 이벤트 추가
    document.getElementById('user-answer').addEventListener('keydown', handleKeydown);
}

// 입력 필드에서 엔터키 입력을 처리하는 함수
function handleKeydown(event) {
    if (event.key === 'Enter') {
        clearTimeout(timer); // 타이머 초기화
        checkAnswer();
    }
}

// 배열을 랜덤하게 섞는 함수
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 다음 단어를 표시하는 함수
function displayNextWord() {
    if (currentIndex < currentWords.length) {
        document.getElementById('test-word').innerText = currentWords[currentIndex].word;
        document.getElementById('user-answer').value = ''; // 입력 필드 초기화
        document.getElementById('result').innerHTML = ''; // 이전 결과 초기화
        timeElapsed = 0; // 시간 초기화

        // 프로그레스 바 초기화
        updateProgressBar(timeElapsed, timeLimit);

        // 타이머 설정 (10초 후 자동으로 오답 처리)
        timer = setInterval(function() {
            timeElapsed += 100; // 0.1초마다 갱신
            updateProgressBar(timeElapsed, timeLimit);
            if (timeElapsed >= timeLimit) {
                clearInterval(timer); // 타이머 종료
                checkAnswer(true); // 시간이 다 되면 오답 처리
            }
        }, 100);
    } else {
        endTest();
    }
}

// 정답을 확인하고, 다음 단어로 넘어가는 함수
function checkAnswer(isTimeUp = false) {
    const userAnswer = document.getElementById('user-answer').value.trim().toLowerCase();
    const meanings = currentWords[currentIndex].meanings.map(meaning => meaning.toLowerCase());
    const resultElement = document.getElementById('result');

    // 정답 여부 판단
    if (!isTimeUp && meanings.includes(userAnswer)) {
        resultElement.innerHTML = `<p>정답입니다!</p>`;
        correctAnswers++;
    } else {
        resultElement.innerHTML = `<p>오답입니다. 정답은: ${meanings.join(', ')}</p>`;
        wrongAnswers.push(currentWords[currentIndex]); // 틀린 단어 기록
    }

    clearInterval(timer); // 타이머 초기화

    // 현재 단어 입력 이벤트 리스너 제거 (결과 화면에서 엔터키 입력 방지)
    document.getElementById('user-answer').removeEventListener('keydown', handleKeydown);

    // 1.5초 후 다음 단어로 넘어감
    setTimeout(function() {
        currentIndex++;
        displayNextWord();
        document.getElementById('user-answer').addEventListener('keydown', handleKeydown);
    }, answerDelay);
}

// 데이터 압축 및 Base64 인코딩 함수
function compressAndEncode(data) {
    return btoa(LZString.compressToBase64(data));
}

// Base64 디코딩 및 데이터 복원 함수
function decodeAndDecompress(encodedData) {
    return LZString.decompressFromBase64(atob(encodedData));
}

// 테스트가 끝났을 때 틀린 단어만 표시하고 점수 계산 + 공유 기능
function endTest() {
    const scoreElement = document.getElementById('score');
    const totalQuestions = currentWords.length;
    const resultElement = document.getElementById('result');
    
    let wrongWordsList = wrongAnswers.map(word => `${word.word}:${word.meanings.join(',')}`).join(';');

    // 틀린 단어가 있을 경우 틀린 단어를 표시
    if (wrongAnswers.length > 0) {
        resultElement.innerHTML = '<h3>틀린 단어:</h3>';
        wrongAnswers.forEach(word => {
            resultElement.innerHTML += `<p>${word.word}: ${word.meanings.join(', ')}</p>`;
        });
    } else {
        resultElement.innerHTML = '<h3>모든 단어를 맞추셨습니다!</h3>';
    }

    // 점수 계산
    scoreElement.innerText = `테스트 종료! 점수: ${correctAnswers} / ${totalQuestions}`;

    // 압축 및 Base64 인코딩된 결과를 URL에 저장
    const compressedData = compressAndEncode(`${correctAnswers}/${totalQuestions}|${wrongWordsList}`);
    const shareableUrl = `${window.location.origin}${window.location.pathname}?result=${compressedData}`;

    // 공유 링크 표시 및 복사 버튼 추가
    resultElement.innerHTML += `
        <h3>결과를 공유하세요</h3>
        <input type="text" value="${shareableUrl}" id="share-url" readonly />
        <button onclick="copyToClipboard()">링크 복사</button>
    `;
}

// 클립보드에 URL을 복사하는 함수
function copyToClipboard() {
    const copyText = document.getElementById("share-url");
    copyText.select();
    document.execCommand("copy");
    alert("결과 링크가 복사되었습니다!");
}

// 프로그레스 바를 업데이트하는 함수
function updateProgressBar(elapsed, total) {
    const progressBar = document.getElementById('progress-bar');
    const progress = (elapsed / total) * 100;
    progressBar.style.width = progress + '%';
}

// 페이지가 로드될 때 URL 파라미터에서 압축된 결과를 읽어와 표시하는 함수
function displaySharedResults() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedResult = urlParams.get('result');

    if (encodedResult) {
        const decodedData = decodeAndDecompress(encodedResult);
        const [scoreData, wrongWordsData] = decodedData.split('|');
        const [score, total] = scoreData.split('/');

        const resultElement = document.getElementById('result');
        resultElement.innerHTML = `<h3>공유된 결과</h3><p>점수: ${score} / ${total}</p>`;

        if (wrongWordsData) {
            const wrongWordsList = wrongWordsData.split(';').map(word => {
                const [wordText, meanings] = word.split(':');
                return `<p>${wordText}: ${meanings}</p>`;
            }).join('');
            resultElement.innerHTML += `<h3>틀린 단어:</h3>${wrongWordsList}`;
        }
    }
}

// 페이지 로드 시 공유된 결과를 표시
window.onload = function() {
    displaySharedResults();
}
