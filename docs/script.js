let timeSettings = {
    pomodoro: 1500,
    'short-break': 300,
    'long-break': 900
};
let timeLeft = timeSettings.pomodoro;
let timer;
let mode = 'pomodoro';
let isTimerRunning = false;
let pomodoroCount = 0;

document.addEventListener("DOMContentLoaded", function () {
    selectMode('pomodoro');
    updateDisplay();
    updateSkipButtonVisibility();
});

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timeDisplay").textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    updateTitle();
}

function selectMode(selectedMode) {
    mode = selectedMode;
    timeLeft = timeSettings[mode];
    updateDisplay();

    document.body.classList.remove('pomodoro-mode', 'short-break-mode', 'long-break-mode');

    if (mode === 'pomodoro') {
        document.body.classList.add('pomodoro-mode');
        document.getElementById("modeTitle").textContent = "Pomodoro";
        document.querySelector('.navbar').classList.add('pomodoro-navbar');
        document.querySelector('.navbar').classList.remove('short-break-navbar', 'long-break-navbar');
    } else if (mode === 'short-break') {
        document.body.classList.add('short-break-mode');
        document.getElementById("modeTitle").textContent = "Rövid Szünet";
        document.querySelector('.navbar').classList.add('short-break-navbar');
        document.querySelector('.navbar').classList.remove('pomodoro-navbar', 'long-break-navbar');
    } else if (mode === 'long-break') {
        document.body.classList.add('long-break-mode');
        document.getElementById("modeTitle").textContent = "Hosszú Szünet";
        document.querySelector('.navbar').classList.add('long-break-navbar');
        document.querySelector('.navbar').classList.remove('pomodoro-navbar', 'short-break-navbar');
    }

    document.querySelectorAll("nav a").forEach(a => a.classList.remove("active"));
    document.getElementById(`${mode}Link`).classList.add("active");

    updateTitle();
    updateSkipButtonVisibility();
}

function updateTitle() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (mode === 'pomodoro') {
        document.title = `${timeString} - Ideje fókuszálni`;
    } else {
        document.title = `${timeString} - Ideje pihenni`;
    }
}

function toggleTimer() {
    if (isTimerRunning) {
        stopTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    clearInterval(timer);
    isTimerRunning = true;
    document.getElementById("toggleButton").textContent = "ÁLLJ";
    document.getElementById("skipButton").style.display = "inline-block";

    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
    }

    timer = setInterval(() => {
        if (timeLeft < 5 && timeLeft > 1) {
            playTickingSound();
        }

        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            handleSessionEnd();
        }
    }, 1000);
}

function playTickingSound() {
    const tickingSound = document.getElementById("tickingSound");
    tickingSound.play();
}


function stopTimer() {
    clearInterval(timer);
    isTimerRunning = false;
    document.getElementById("toggleButton").textContent = "START";
    document.getElementById("skipButton").style.display = "none"; // Gomb elrejtése
}

function handleSessionEnd() {
    if (mode === 'pomodoro') {
        pomodoroCount++;
        if (pomodoroCount === 4) {
            mode = 'long-break';
            timeLeft = timeSettings[mode];
            pomodoroCount = 0;
        } else {
            mode = 'short-break';
            timeLeft = timeSettings[mode];
        }
    } else {
        mode = 'pomodoro';
        timeLeft = timeSettings[mode];
    }
    selectMode(mode);
    startTimer();
}

function skipSession() {
    stopTimer();
    handleSessionEnd();
}

function addTask() {
    const taskName = prompt("Enter task name:");
    if (taskName) {
        const taskContainer = document.createElement("div");
        taskContainer.className = "task";
        taskContainer.innerHTML = `
            <span contenteditable="true" onblur="updateTask(this, '${taskName}')">${taskName}</span>
            <button onclick="deleteTask(this)">🗑️</button>
        `;
        document.getElementById("tasksContainer").insertBefore(taskContainer, document.getElementById("tasksContainer").lastElementChild);
    }
}

function updateTask(taskElement, oldTaskName) {
    const newTaskName = taskElement.textContent.trim();
    const tasks = document.querySelectorAll(".task span");
    tasks.forEach(task => {
        if (task.textContent === oldTaskName) {
            task.textContent = newTaskName;
        }
    });
}

function deleteTask(deleteButton) {
    const task = deleteButton.parentElement;
    task.remove();
}

function playSound() {
    const sound = document.getElementById("soundEffect");
    sound.play();
}

function updateSkipButtonVisibility() {
    const skipButton = document.getElementById("skipButton");
    if (isTimerRunning) {
        skipButton.style.display = "inline-block"; // Megjelenítés
    } else {
        skipButton.style.display = "none"; // Elrejtés
    }
}
