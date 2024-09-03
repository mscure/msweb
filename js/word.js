let lessons = [];

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

// 선택된 강의에 따라 영단어 목록을 표시하는 함수
function displayWords() {
    const lessonSelect = document.getElementById('lesson-select');
    const lessonIndex = lessonSelect.value;
    const wordListElement = document.getElementById('word-list');
    wordListElement.innerHTML = '';

    if (lessonIndex === '') return;

    let currentWords = [];

    if (lessonIndex === 'all') {
        currentWords = lessons.flatMap(lesson => lesson.words);
    } else {
        currentWords = lessons[lessonIndex].words;
    }

    currentWords.forEach(wordObj => {
        const wordCard = document.createElement('div');
        wordCard.className = 'word-card';
        
        // 모든 뜻을 줄바꿈을 포함하여 표시
        const meaningsHtml = wordObj.meanings.map(meaning => `<li>${meaning}</li>`).join('');
        
        wordCard.innerHTML = `<strong>${wordObj.word}</strong><ul>${meaningsHtml}</ul>`;
        wordListElement.appendChild(wordCard);
    });
}
