License:

Bootstrap
http://getbootstrap.com/

jQuery
http://jquery.com/

jQuery Easing
http://gsgd.co.uk/sandbox/jquery/easing/

Modernizr
http://modernizr.com/

Google Fonts
https://www.google.com/fonts/

Icomoon
https://icomoon.io/app/

Respond JS
https://github.com/scottjehl/Respond/blob/master/LICENSE-MIT

animate.css
http://daneden.me/animate

jQuery Waypoint
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt

Superfish Menu
http://users.tpg.com.au/j_birch/plugins/superfish/examples/

hoverIntent
https://github.com/briancherne/jquery-hoverIntent

Stellar Parallax
http://markdalgleish.com/projects/stellar.js/



<body>
    <div class="content">
        <h1>집에 가고 싶어!</h1>
        <p>집에서 기다리는 소파가 그리워...</p>
        <p>따뜻한 집밥이 생각나...</p>
        <p class="countdown">다음 10시까지: <span id="timer">00:00:00</span></p>
        <button class="home-button" onclick="alert('나를 집에 보내줘!')">집에 보내줘!</button>
    </div>
    <div class="content">
        <h1>집에 가고 싶어!</h1>
        <p>집에서 기다리는 소파가 그리워...</p>
        <p>따뜻한 집밥이 생각나...</p>
        <p class="countdown">다음 금요일 10시까지: <span id="friday-timer">00:00:00</span></p>
    </div>
    <script>
        function startTimer(endTime, elementId) {
            function updateTimer() {
                const now = new Date();
                const timeLeft = endTime - now;

                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                document.getElementById(elementId).textContent = 
                    (days > 0 ? days + '일 ' : '') +
                    (hours < 10 ? '0' : '') + hours + ":" + 
                    (minutes < 10 ? '0' : '') + minutes + ":" + 
                    (seconds < 10 ? '0' : '') + seconds;

                if (timeLeft < 0) {
                    clearInterval(intervalId);
                    document.getElementById(elementId).textContent = "00:00:00";
                }
            }

            updateTimer();
            const intervalId = setInterval(updateTimer, 1000);
        }

        function getNextTenOClock() {
            const now = new Date();
            let nextTen = new Date();
            nextTen.setHours(10, 0, 0, 0);

            if (now >= nextTen) {
                nextTen.setDate(nextTen.getDate() + 1);
            }

            return nextTen;
        }

        function getNextFridayTenOClock() {
            const now = new Date();
            const nextFriday = new Date();

            const day = now.getDay();
            const diffToFriday = (day <= 5) ? 5 - day : 12 - day;

            nextFriday.setDate(now.getDate() + diffToFriday);
            nextFriday.setHours(10, 0, 0, 0);

            return nextFriday;
        }

        window.onload = function () {
            const nextTenEndTime = getNextTenOClock();
            const nextFridayEndTime = getNextFridayTenOClock();

            startTimer(nextTenEndTime, 'timer');
            startTimer(nextFridayEndTime, 'friday-timer');
        };
    </script>
</body>

 