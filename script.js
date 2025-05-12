// Встановлення дати, до якої буде відліковуватися час
const targetDate = new Date('2025-07-03T12:00:00');

// Лічильник запитів
let requestCount = 0;
const MAX_REQUESTS = 20; // Ліміт запитів перед сповіщенням
const CHECK_INTERVAL = 60 * 1000; // Період перевірки (60 секунд)

// Збереження посилань на елементи таймера для зручності
const timerElements = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
};

// Оновлення таймера
function updateCountdown() {
    const currentTime = new Date(); // Поточний час
    const difference = targetDate - currentTime; // Різниця між цільовою датою і поточним часом

    // Логування кожного оновлення таймера
    requestCount++;
    console.log(`🔄 Запит №${requestCount}`);

    if (requestCount > MAX_REQUESTS) {
        console.warn("🚨 Занадто багато запитів! Це може бути аномальна активність.");
        alert("⚠️ Ви робите надто багато запитів!");
    }
    if (difference < 0) {
        // Якщо різниця менше нуля, значить подія настала
        clearInterval(interval); // Зупинка таймера
        document.getElementById("timer").innerText = "The event has started!"; // Оновлення тексту
        document.body.style.backgroundColor = "#ffcc00"; // Зміна кольору фону
        document.getElementById("countdown").classList.add("animate-end"); // Додання анімації
        return; // Завершення виконання функції
    }

    // Розрахунок днів, годин, хвилин і секунд
    const time = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
    };

    // Оновлення тексту в елементах таймера
    Object.keys(time).forEach(unit => {
        timerElements[unit].innerText = time[unit];
    });
}

updateCountdown(); // Початковий виклик функції
const interval = setInterval(updateCountdown, 1000); // Оновлення таймера кожну секунду

// Скидання лічильника запитів кожну хвилину
setInterval(() => {
    console.log("♻️ Скидання лічильника запитів.");
    requestCount = 0;
}, CHECK_INTERVAL);
