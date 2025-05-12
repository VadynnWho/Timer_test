// Встановлення дати, до якої буде відліковуватися час
const targetDate = new Date('2025-07-03T12:00:00');

// Лічильник перезапусків сторінки
let reloadCount = localStorage.getItem("reloadCount") || 0;
reloadCount++;
localStorage.setItem("reloadCount", reloadCount);

// Максимальна допустима кількість перезапусків
const MAX_RELOADS = 15; // Ліміт перезапусків сторінки

// Логування перезапуску сторінки
console.log(`🔁 Сторінка перезавантажена ${reloadCount} разів`);

if (reloadCount > MAX_RELOADS) {
    console.warn("🚨 Надто багато перезапусків! Це може бути аномальна активність.");
    alert("⚠️ Ви перезавантажували сторінку занадто багато разів!");
}

// Очищення лічильника кожні 5 хвилин (300 000 мс)
setInterval(() => {
    localStorage.removeItem("reloadCount");
    console.log("♻️ Лічильник перезапусків скинуто.");
}, 5000); // 5 хвилин

// Збереження посилань на елементи таймера
const timerElements = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
};

// Оновлення таймера
function updateCountdown() {
    const currentTime = new Date();
    const difference = targetDate - currentTime;

    if (difference < 0) {
        clearInterval(interval);
        document.getElementById("timer").innerText = "The event has started!";
        document.body.style.backgroundColor = "#ffcc00";
        document.getElementById("countdown").classList.add("animate-end");
        console.log("⏳ Таймер закінчився! Подія настала.");
        return;
    }

    const time = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
    };

    Object.keys(time).forEach(unit => {
        timerElements[unit].innerText = time[unit];
    });
}

// Запуск таймера
updateCountdown();
const interval = setInterval(updateCountdown, 1000);
