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
 
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>집에 가고 싶어!</title>
    <style>
        body {
            margin: 0;
            font-family: 'Arial', sans-serif;
            background: url('https://example.com/home-background.jpg') no-repeat center center fixed;
            background-size: cover;
            color: white;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .content {
            background: rgba(0, 0, 0, 0.7);
            padding: 20px;
            border-radius: 10px;
        }
        h1 {
            font-size: 4em;
            margin: 0;
        }
        p {
            font-size: 1.5em;
            margin: 10px 0;
        }
        .countdown {
            font-size: 2em;
            margin: 20px 0;
        }
        .home-button {
            padding: 10px 20px;
            font-size: 1.5em;
            color: white;
            background-color: #ff6347;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .home-button:hover {
            background-color: #ff4500;
        }
    </style>
</head>
<body>
    <div class="content">
        <h1>집에 가고 싶어!</h1>
        <p>집에서 기다리는 소파가 그리워...</p>
        <p>따뜻한 집밥이 생각나...</p>
        <p class="countdown">집에 가기까지: <span id="timer">00:00:00</span></p>
        <button class="home-button" onclick="alert('나를 집에 보내줘!')">집에 보내줘!</button>
    </div>
    <script>
        // 타이머 설정
        function startTimer(duration, display) {
            let timer = duration, hours, minutes, seconds;
            setInterval(function () {
                hours = parseInt(timer / 3600, 10);
                minutes = parseInt((timer % 3600) / 60, 10);
                seconds = parseInt(timer % 60, 10);

                hours = hours < 10 ? "0" + hours : hours;
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = hours + ":" + minutes + ":" + seconds;

                if (--timer < 0) {
                    timer = duration;
                }
            }, 1000);
        }

        window.onload = function () {
            let duration = 60 * 60 * 24; // 24시간 타이머
            let display = document.querySelector('#timer');
            startTimer(duration, display);
        };
    </script>
</body>
</html>
```