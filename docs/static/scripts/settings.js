function openSettings() {
    document.getElementById("settingsModal").style.display = "flex";
    document.getElementById("settingsModal").scrollTop = 0;
}

function closeSettings() {
    document.getElementById("settingsModal").style.display = "none";
}

function updateTimeSettings() {
    const pomodoroMinutes = parseInt(document.getElementById("pomodoroTime").value) || 25;
    const shortBreakMinutes = parseInt(document.getElementById("shortBreakTime").value) || 5;
    const longBreakMinutes = parseInt(document.getElementById("longBreakTime").value) || 15;
    longBreakInterval = parseInt(document.getElementById("longBreakInterval").value) || 4;

    timeSettings.pomodoro = pomodoroMinutes * 60;
    timeSettings['short-break'] = shortBreakMinutes * 60;
    timeSettings['long-break'] = longBreakMinutes * 60;

    if (mode === 'pomodoro') {
        timeLeft = timeSettings.pomodoro;
    } else if (mode === 'short-break') {
        timeLeft = timeSettings['short-break'];
    } else if (mode === 'long-break') {
        timeLeft = timeSettings['long-break'];
    }

    updateDisplay();
}

function applySettings() {
    const autoStartBreaks = document.getElementById("autoStartBreaks").checked;
    const autoStartPomodoros = document.getElementById("autoStartPomodoros").checked;
    const autoCheckTasks = document.getElementById("autoCheckTasks").checked;
    const autoSwitchTasks = document.getElementById("autoSwitchTasks").checked;
    const alarmSound = document.getElementById("alarmSound").value;
    const volume = document.getElementById("volumeControl").value;
    const repeatCount = parseInt(document.getElementById("repeatCount").value) || 1;

    console.log({
        autoStartBreaks,
        autoStartPomodoros,
        longBreakInterval,
        autoCheckTasks,
        autoSwitchTasks,
        alarmSound,
        volume,
        repeatCount
    });

    closeSettings();
}

window.onclick = function(event) {
    const modal = document.getElementById("settingsModal");
    if (event.target === modal) {
        closeSettings();
    }
};

document.addEventListener("DOMContentLoaded", function() {
    const pomodoroInput = document.getElementById("pomodoroTime");
    const shortBreakInput = document.getElementById("shortBreakTime");
    const longBreakInput = document.getElementById("longBreakTime");
    const longBreakIntervalInput = document.getElementById("longBreakInterval");

    if (pomodoroInput && shortBreakInput && longBreakInput && longBreakIntervalInput) {
        pomodoroInput.addEventListener("input", updateTimeSettings);
        shortBreakInput.addEventListener("input", updateTimeSettings);
        longBreakInput.addEventListener("input", updateTimeSettings);
        longBreakIntervalInput.addEventListener("input", updateTimeSettings);
    } else {
        console.error("One or more input elements not found");
    }
});

function toggleDropdown() {
    const dropdown = document.getElementById("dropdownMenu");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

document.addEventListener('click', function(event) {
    const dropdown = document.getElementById("dropdownMenu");
    const button = document.getElementById("menuButton");
    if (!dropdown.contains(event.target) && !button.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

const alertSounds = {
    bell: 'static/sounds/Bell.m4a',
    digital: 'static/sounds/Digital.m4a',
    kitchen: 'static/sounds/Kitchen.m4a'
};

function playAlertSound() {
    const selectedSound = document.getElementById("alarmSound").value;
    const volume = document.getElementById("volumeControl").value / 100;

    const audio = new Audio(alertSounds[selectedSound]);
    audio.volume = volume;
    audio.play();
}