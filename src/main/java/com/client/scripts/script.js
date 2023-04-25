const loader = document.querySelector("#loader");
const date = document.querySelector('.date');
const time = document.querySelector('.time');

function updateTime() {
    const now = new Date();
    const currentMonth = now.toLocaleString('default', { month: 'long' });
    const currentDate = now.getDate();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();

    date.innerHTML = `${currentDate} ${currentMonth}`;
    time.innerHTML = `${currentHour}:${currentMinute}:${currentSecond}`;
}

updateTime();
setInterval(updateTime, 1000);

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000);
    }, 1000);
});