// star.js

$(document).ready(function(){
    $("#cover").addClass("loaded");
    createStars(); // 초기 별 배경 생성
    createShootingStar(); // 별똥별 시작
});

// star.js

let starsCreated = false; // 별이 생성되었는지 여부를 나타내는 변수
let isMovingStar = false; // 별 이동 중인지 여부를 나타내는 변수

// 별 생성 함수
function createStars() {
    if (starsCreated) return; // 이미 별이 생성되었다면 종료

    $('#upper, #lower').empty(); // 기존 별을 제거하고 새로 생성

    // 상단 별 생성
    for (let i = 0; i < 1000; i++) {
        const toLeft = Math.round(Math.random() * window.innerWidth);
        const toTop = Math.round(Math.random() * (window.innerHeight / 2));

        $("<div/>")
            .addClass("star star-sm")
            .css({ top: toTop + "px", left: toLeft + "px" })
            .appendTo("#upper");

        if (i % 5 === 0) {
            $("<div/>")
                .addClass("star star-md")
                .css({ top: toTop + "px", left: toLeft + "px" })
                .appendTo("#upper");
        } else if (i % 25 === 0) {
            $("<div/>")
                .addClass("star star-lg")
                .css({ top: toTop + "px", left: toLeft + "px" })
                .appendTo("#upper");
        }
    }

    // 하단 별 생성
    for (let i = 0; i < 500; i++) {
        const toLeft = Math.round(Math.random() * window.innerWidth);
        const toTop = Math.round(Math.random() * (window.innerHeight / 2));

        $("<div/>")
            .addClass("star star-sm")
            .css({ top: toTop + "px", left: toLeft + "px" })
            .appendTo("#lower");

        if (i % 5 === 0) {
            $("<div/>")
                .addClass("star star-md")
                .css({ top: toTop + "px", left: toLeft + "px" })
                .appendTo("#lower");
        } else if (i % 25 === 0) {
            $("<div/>")
                .addClass("star star-lg")
                .css({ top: toTop + "px", left: toLeft + "px" })
                .appendTo("#lower");
        }
    }

    starsCreated = true; // 별 생성 완료 플래그 설정
}

// 랜덤으로 별똥별 효과를 줄 별을 선택해 애니메이션 적용
function createShootingStar() {
    const stars = $(".star");
    const randomStar = stars.eq(Math.floor(Math.random() * stars.length));

    if (randomStar.length) { // 랜덤으로 선택한 별이 존재하는 경우에만
        randomStar.addClass("shooting");

        // 애니메이션 종료 시 해당 요소 제거
        randomStar.on("animationend", function() {
            $(this).remove();
            if ($(".star").length === 1 && !isMovingStar) { // 별이 하나 남았을 때
                isMovingStar = true; // 별 이동 시작
                fadeOutElements(); // 제목과 버튼 서서히 사라지기
                setTimeout(moveStarToCenter, 2000); // 2초 후에 남은 별을 가운데로 이동
            } else if ($(".star").length === 0) {
                starsCreated = false; // 별이 모두 사라지면 다시 생성 가능
            }
        });
    }
}

// 요소 서서히 사라지기
function fadeOutElements() {
    $(".title, .main_screen").fadeOut(2000); // 2초 동안 서서히 사라짐
}

// 남은 별을 가운데로 이동시키고 서서히 커지게 하는 함수
function moveStarToCenter() {
    const remainingStar = $(".star").first(); // 남은 별을 선택
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();

    remainingStar.css({
        position: 'absolute',
        top: (windowHeight / 2) + "px", // 화면 중앙 Y
        left: (windowWidth / 2) + "px", // 화면 중앙 X
        transform: 'translate(-50%, -50%)', // 중앙 정렬을 위해 변환
        animation: 'growAndShake 2s forwards' // 커지고 진동하는 애니메이션
    });
}

// 최초로 별 생성
createStars(); // 페이지 로드 시 최초로 별 생성

// 20초마다 별똥별 생성
setInterval(createShootingStar, 00);

// 윈도우 크기가 바뀔 때마다 별 생성 (필요시)
$(window).on("resize", function() {
    if (!starsCreated) {
        createStars();
    }
});
