// Встановлення дати, до якої буде відліковуватися час
const targetDate = new Date('2024-11-03T02:54:59');

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
