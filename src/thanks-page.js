const startingSeconds = 4;
let time = startingSeconds;

const countdownElement = document.getElementById('countdown');

setInterval(updateCountdown, 1000);

function updateCountdown(){

    if( time === 0) window.location.replace("home-page.html")

    countdownElement.innerHTML = `Redirecting to home page ${time}`;
    time--;
}