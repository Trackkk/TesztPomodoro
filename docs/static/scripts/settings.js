function openSettings() {
    document.getElementById("settingsModal").style.display = "flex"; // Megnyitja a modal-t
    document.getElementById("settingsModal").scrollTop = 0; // Felfelé görgeti
}

function closeSettings() {
    document.getElementById("settingsModal").style.display = "none";
}

function updateTimeSettings() {
    const pomodoroMinutes = parseInt(document.getElementById("pomodoroTime").value) || 25;
    const shortBreakMinutes = parseInt(document.getElementById("shortBreakTime").value) || 5;
    const longBreakMinutes = parseInt(document.getElementById("longBreakTime").value) || 15;
    longBreakInterval = parseInt(document.getElementById("longBreakInterval").value) || 4; // Update long break interval

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
        longBreakInterval,  // Ensure this is logged for debugging
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
    const longBreakIntervalInput = document.getElementById("longBreakInterval"); // New input for long break interval

    if (pomodoroInput && shortBreakInput && longBreakInput && longBreakIntervalInput) {
        pomodoroInput.addEventListener("input", updateTimeSettings);
        shortBreakInput.addEventListener("input", updateTimeSettings);
        longBreakInput.addEventListener("input", updateTimeSettings);
        longBreakIntervalInput.addEventListener("input", updateTimeSettings); // Listen for changes
    } else {
        console.error("One or more input elements not found");
    }
});
