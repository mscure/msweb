let lessons = [];
let currentWords = [];
let currentIndex = 0;
let correctAnswers = 0;

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
    const resultElement = document.getElementById('result');
    const scoreElement = document.getElementById('score');
    
    resultElement.innerText = ''; // 이전 결과 초기화
    scoreElement.innerText = '';  // 이전 점수 초기화
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

    if (currentWords.length > 0) {
        document.getElementById('test-word').innerText = currentWords[currentIndex].word;
    } else {
        document.getElementById('test-word').innerText = '단어가 없습니다.';
    }
}

// 다음 단어로 이동하고 정답 여부를 확인하는 함수
function nextWord() {
    const userAnswer = document.getElementById('user-answer').value.trim().toLowerCase();
    const resultElement = document.getElementById('result');
    
    // 현재 단어의 여러 의미 중 하나라도 사용자 입력과 일치하는지 확인
    const meanings = currentWords[currentIndex].meanings.map(meaning => meaning.toLowerCase());
    if (meanings.includes(userAnswer)) {
        correctAnswers++;
    }

    currentIndex++;
    
    if (currentIndex < currentWords.length) {
        document.getElementById('test-word').innerText = currentWords[currentIndex].word;
        document.getElementById('user-answer').value = ''; // 입력 필드 초기화
    } else {
        endTest();
    }
}

// 테스트가 끝났을 때 점수를 표시하는 함수
function endTest() {
    const scoreElement = document.getElementById('score');
    const totalQuestions = currentWords.length;
    scoreElement.innerText = `완료!: ${correctAnswers} / ${totalQuestions}`;
    document.getElementById('test-word').innerText = '테스트가 완료되었습니다.';
}
