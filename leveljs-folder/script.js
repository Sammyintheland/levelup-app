

// ================= GLOBAL VARIABLES =================
let xp = Number(localStorage.getItem("xp")) || 0;
let streak = Number(localStorage.getItem("streak")) || 0;
let lastTipIndex = -1;
let timeRemaining = 60;

const tips = [
    "Break large tasks into 25-minute focused sessions.",
    "Start with the hardest task first — it builds momentum.",
    "Drink water before studying. Your brain needs it.",
    "Do 5 minutes. If you still don’t want to continue, stop.",
    "Small progress daily beats cramming once a week.",
    "Review your goals every Sunday.",
    "Silence notifications during focus time.",
    "Track one habit consistently before adding another.",
    "Doubt kills more dreams than failure ever will.",
    "Use the 2-minute rule: if it takes <2 min, do it now.",
     "Keep a gratitude note to stay positive.",
    "Limit decisions to avoid decision fatigue.",
    "End the day listing tomorrow’s 3 key tasks.",
    "Start small to overcome procrastination.",
    "Focus on progress, not perfection.",
    "Celebrate tiny wins to boost motivation.",
    "Use sticky notes for important reminders.",
    "Take walks when you feel stuck.",
    "Schedule high-energy tasks when alert.",
    "Set boundaries for uninterrupted focus time.",
    "Learn to embrace ‘good enough’.",
    "Review weekly accomplishments every Sunday.",
    "Ask yourself: will this matter in a week?",
    "Write down your thoughts to untangle tasks.",
    "Remove unnecessary apps from your phone.",
    "Set micro-deadlines to maintain momentum.",
    "Visual reminders help you stay consistent.",
    "Do a mini review every 2 hours.",
    "Break the cycle: if blocked, switch tasks temporarily.",
    "Sleep well: focus depends on rest.",
    "Plan one fun activity daily to recharge.",
    "Use timers to gamify focus sessions.",
    "Keep a list of ideas for when inspiration strikes.",
    "Track your streaks for motivation.",
    "Delegate tasks that aren’t your strengths.",
    "Meditate for 5 minutes to reset your mind.",
    "Start meetings or study sessions on time.",
    "Write one insight learned each day.",
    "Reflect on what worked and what didn’t weekly.",
    "Visualize your ideal day to plan effectively.",
    "Use morning momentum for your hardest tasks.",
    "Break a big project into sub-projects.",
    "Focus on one task fully, then move to the next."
];

const tipElement = document.getElementById("daily-tip");
const timerElement = document.getElementById("tip-timer");

// ================= GAMIFICATION =================

window.increaseStreak = function() {
    streak += 1;
    localStorage.setItem("streak", streak);
    updateGamification();
};

window.resetStreak = function() {
    streak = 0;
    localStorage.setItem("streak", streak);
    updateGamification();
};

function getLevel() {
    if (xp >= 1000) return 5;
    if (xp >= 600) return 4;
    if (xp >= 300) return 3;
    if (xp >= 100) return 2;
    return 1;
}

function getXPForNextLevel() {
    const level = getLevel();
    if (level === 1) return 100;
    if (level === 2) return 300;
    if (level === 3) return 600;
    if (level === 4) return 1000;
    return 0; // max level
}

function updateGamification() {
    const level = getLevel();
    document.getElementById("user-xp").textContent = xp;
    document.getElementById("user-level").textContent = level;
    document.getElementById("streak-count").textContent = streak;

    const nextLevelXP = getXPForNextLevel();
    const progressPercent = nextLevelXP ? Math.min((xp / nextLevelXP) * 100, 100) : 100;
    const xpBar = document.getElementById("xp-bar");
    if (xpBar) xpBar.style.width = progressPercent + "%";
}

function getXP() {
    return Number(localStorage.getItem("xp")) || 0;
}

function setXP(value) {
    xp = Number(value);
    localStorage.setItem("xp", xp);
}

// ================= DAILY TIP =================
function changeTip() {
    if (!tipElement) return;

    tipElement.style.opacity = 0;

    setTimeout(() => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * tips.length);
        } while (randomIndex === lastTipIndex);

        lastTipIndex = randomIndex;
        tipElement.textContent = `"${tips[randomIndex]}"`;
        tipElement.style.opacity = 1;
        timeRemaining = 60;
    }, 400);
}

function updateTimer() {
    if (!timerElement) return;

    timeRemaining--;
    if (timeRemaining <= 0) changeTip();

    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// ================= CENTRAL XP SYSTEM (UPDATED) =================
function addXP(baseAmount, reason = "XP Earned", showPopup = true) {
    // Use global xp variable
    xp = getXP();
    const data = JSON.parse(localStorage.getItem("profileData")) || {};

    let bonus = 0;
    // 🔥 Adaptive bonuses
    if (data.motivation === "low") bonus += 5;
    if (data.challenge === "procrastination") bonus += 10;
    if (data.energyLevel === "high") bonus += 3;

    let total = baseAmount + bonus;
    xp += total;

    // ✅ Update global xp and localStorage
    setXP(xp);

    // ✅ Update UI
    updateGamification();
    updateXPBar();
    checkLevelUp();
    checkXPBasedAchievements();
    renderBadges();

    // ✅ Optional popup
    if (showPopup) {
        Swal.fire({
            title: `+${total} XP`,
            text: reason,
            icon: "success",
            timer: 1200,
            showConfirmButton: false
        });
    }

    console.log(`XP +${total} (${reason})`);
}
//DAILY STREAK SYSTEM
document.addEventListener("DOMContentLoaded", function () {
    const streakElement = document.getElementById("streak-count");

    let lastVisit = localStorage.getItem("lastVisit");

    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize to midnight

    let showIncrease = false;
    let showWarning = false;
    const warningShown = localStorage.getItem("warningShown");

    if (!lastVisit) {
        streak = 1;
        showIncrease = true;
        addXP(10, "🔥 First Visit");
    } else {
        const lastDate = new Date(lastVisit);
        lastDate.setHours(0, 0, 0, 0);

        const diffTime = today - lastDate;
        const diffDays = Math.round((new Date(today) - new Date(lastVisit)) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            streak += 1;
            showIncrease = true;
            localStorage.removeItem("warningShown");
            addXP(10, "🔥 Daily Streak");
        } 
        else if (diffDays > 1) {
            streak = 1;
            localStorage.removeItem("warningShown");
            Swal.fire({
                title: "💔 Streak Lost",
                text: "You missed a day. Start again!",
                icon: "error"
            });
            addXP(5, "🔄 Restarting Streak");
        } 
        else if (diffDays === 0 && !warningShown) {
            showWarning = true;
            localStorage.setItem("warningShown", "true");
        }
    }

    localStorage.setItem("streak", streak);
    localStorage.setItem("lastVisit", today.toISOString()); // store ISO string

    if (streakElement) streakElement.textContent = streak;

    if (showIncrease) {
        Swal.fire({
            title: "🔥 +1 Streak!",
            text: "You're on fire! Keep it going!",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
        });
    }

    if (showWarning) {
        Swal.fire({
            title: "⚠️ Don't lose your streak!",
            text: "Come back tomorrow to keep it alive.",
            icon: "warning",
            timer: 2500,
            showConfirmButton: false
        });
    }

    checkStreakAchievements(streak);
    updateXPBar();
    checkLevelUp();
});

function checkStreakAchievements(currentStreak) {
    const unlocked = JSON.parse(localStorage.getItem("achievements")) || [];

    const streakAchievements = [
        { streak: 3, name: "3-Day Streak 🔥" },
        { streak: 7, name: "1-Week Streak 🏆" },
        { streak: 14, name: "2-Week Streak 🚀" },
        { streak: 30, name: "1-Month Streak 🌟" }
    ];

    let updatedUnlocked = [...unlocked];
    let newAchievements = [];

    streakAchievements.forEach(a => {
        if (currentStreak >= a.streak && !unlocked.includes(a.name)) {
            updatedUnlocked.push(a.name);
            newAchievements.push(a.name);
        }
    });

    if (newAchievements.length > 0) {
        localStorage.setItem("achievements", JSON.stringify(updatedUnlocked));
        renderBadges(); // update badge display

        let delay = 0;
        newAchievements.forEach(name => {
            setTimeout(() => {
                Swal.fire({
                    title: "🏆 Achievement Unlocked!",
                    text: name,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
            }, delay);
            delay += 2200;
        });
    }
}

function resetAchievements() {
    localStorage.removeItem("achievements");

    Swal.fire({
        title: "🔄 Achievements Reset",
        text: "You can earn them again now!",
        icon: "info",
        timer: 1500,
        showConfirmButton: false
    });

    renderBadges();
}


// ================= STREAK ACHIEVEMENTS =================
function checkXPBasedAchievements() {
    const unlocked = JSON.parse(localStorage.getItem("achievements")) || [];
    const xp = getXP();

    const xpAchievements = [
        { xp: 50, name: "Getting Started 🟢" },
        { xp: 100, name: "Consistent 🔥" },
        { xp: 200, name: "Focused 🎯" },
        { xp: 500, name: "Unstoppable 🚀" },
        { xp: 750, name: "Productivity Pro 💪" },
        { xp: 1000, name: "Master Planner 🗓️" },
        { xp: 1500, name: "Goal Crusher 🏹" },
        { xp: 2000, name: "Time Wizard ⏳" },
        { xp: 3000, name: "Task Slayer ⚔️" },
        { xp: 4000, name: "Efficiency Guru 🧠" },
        { xp: 5000, name: "Legendary Focus 🏆" },
        { xp: 10000, name: "Ultimate LevelUp 🌟" }
    ];

    const updatedUnlocked = [...unlocked];
    const newAchievements = [];

    xpAchievements.forEach(a => {
        if (xp >= a.xp && !unlocked.includes(a.name)) {
            updatedUnlocked.push(a.name);
            newAchievements.push(a.name); // only new ones
        }
    });

    // Update localStorage once
    localStorage.setItem("achievements", JSON.stringify(updatedUnlocked));

    // Render all badges
    renderBadges();

    // Only show popups for new achievements
    newAchievements.forEach((name, i) => {
        setTimeout(() => {
            Swal.fire({
                title: "🏆 Achievement Unlocked!",
                text: name,
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
        }, i * 2200);
    });
}

// ================= LEVEL SYSTEM =================
function checkLevelUp() {
    let xp = getXP();
    let oldLevel = Number(localStorage.getItem("level")) || 1;

    let newLevel = Math.floor(xp / 100) + 1;

    if (newLevel > oldLevel) {
        Swal.fire({
            title: "⭐ Level Up!",
            text: `You reached Level ${newLevel}!`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false
        });

       
    }

    const levelElement = document.getElementById("user-level");
    if (levelElement) levelElement.textContent = newLevel;

    localStorage.setItem("level", newLevel);
}
// ================= UPDATING XP BAR =================
function updateXPBar(){
    const xp = getXP();
    const level = getLevel();           // your existing function
    const nextLevelXP = getXPForNextLevel(); // XP threshold for next level
    const prevLevelXP = getXPForPreviousLevel(level); // XP threshold for current level start

    // XP earned towards current level
    const currentLevelXP = xp - prevLevelXP;

    // Progress % for bar
    const percent = nextLevelXP ? (currentLevelXP / (nextLevelXP - prevLevelXP)) * 100 : 100;

    const bar = document.getElementById("xp-bar");
    if(bar){
        bar.style.width = percent + "%";

        // 🔥 Reset colors
        bar.classList.remove(
            "bg-teal-500",
            "bg-blue-500",
            "bg-purple-500",
            "bg-yellow-400",
            "bg-red-500"
        );

        // 🎮 Level-based colors
        if(level < 5){
            bar.classList.add("bg-teal-500"); // beginner
        }
        else if(level < 10){
            bar.classList.add("bg-blue-500");
        }
        else if(level < 20){
            bar.classList.add("bg-purple-500");
        }
        else if(level < 30){
            bar.classList.add("bg-yellow-400");
        }
        else{
            bar.classList.add("bg-red-500"); // elite 🔥
        }
    }

    // Update XP text
    const xpText = document.getElementById("user-xp");
    if(xpText) xpText.textContent = xp;

    const levelText = document.getElementById("user-level");
    if(levelText) levelText.textContent = level;

    const nextText = document.getElementById("xp-next");
    if(nextText) nextText.textContent = nextLevelXP - xp; // XP left to next level
}

// Helper: XP threshold of previous level
function getXPForPreviousLevel(level){
    switch(level){
        case 2: return 100;
        case 3: return 300;
        case 4: return 600;
        case 5: return 1000;
        default: return 0;
    }
}

function renderBadges(){
    const container = document.getElementById("badges-container");
    if(!container) return;

    const unlocked = JSON.parse(localStorage.getItem("achievements")) || [];

const allBadges = [
    { name: "Getting Started 🟢", icon: "🟢" },
    { name: "Consistent 🔥", icon: "🔥" },
    { name: "Focused 🎯", icon: "🎯" },
    { name: "Unstoppable 🚀", icon: "🚀" },
    { name: "Productivity Pro 💪", icon: "💪" },
    { name: "Master Planner 🗓️", icon: "🗓️" },
    { name: "Goal Crusher 🏹", icon: "🏹" },
    { name: "Time Wizard ⏳", icon: "⏳" },
    { name: "Task Slayer ⚔️", icon: "⚔️" },
    { name: "Efficiency Guru 🧠", icon: "🧠" },
    { name: "Legendary Focus 🏆", icon: "🏆" },
    { name: "Ultimate LevelUp 🌟", icon: "🌟" }
];

    container.innerHTML = "";

    allBadges.forEach(badge => {
        const unlockedBadge = unlocked.includes(badge.name);

        const el = document.createElement("div");
        el.className = `
            p-4 rounded-xl text-center w-24
            ${unlockedBadge 
                ? "bg-green-100 dark:bg-green-900" 
                : "bg-gray-200 dark:bg-gray-700 opacity-50"}
        `;

        el.innerHTML = `
            <div class="text-2xl">${badge.icon}</div>
            <div class="text-xs mt-1 dark:text-white">${badge.name}</div>
        `;

        container.appendChild(el);
    });
}

// ================= DARK MODE =================
function toggleDarkMode() {
    const html = document.documentElement;
    html.classList.toggle("dark");
    localStorage.setItem("levelup_theme", html.classList.contains("dark") ? "dark" : "light");

    const flip = document.getElementById("dark-mode-flip");

    // Flip 180deg
    flip.style.transform = "rotateY(180deg)";

    // After half the flip, swap icon
    setTimeout(() => {
        flip.textContent = html.classList.contains("dark") ? "🌞" : "🌙";
        flip.style.transform = "rotateY(0deg)";
    }, 250); // 250ms = half of duration-500
}

function applySavedTheme() {
    const html = document.documentElement;
    const flip = document.getElementById("dark-mode-flip");
    const savedTheme = localStorage.getItem("levelup_theme");

    if (savedTheme === "dark") {
        html.classList.add("dark");
        flip.textContent = "🌞";
    } else {
        html.classList.remove("dark");
        flip.textContent = "🌙";
    }
}

document.addEventListener("DOMContentLoaded", applySavedTheme);

// ================= AUTH =================
function getCurrentUser() {
    return JSON.parse(localStorage.getItem("levelup_user"));
}


// ================= LOGOUT =================
window.openlogout = function() {
    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to log out? All your progress will be cleared!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, log out",
        cancelButtonText: "Cancel",
        reverseButtons: true
    }).then(result => {
        if (result.isConfirmed) {

            // ================= CLEAR STORAGE =================
            localStorage.removeItem("levelup_user");
            localStorage.removeItem("warningShown");
            localStorage.removeItem("xp");
            localStorage.removeItem("level");
            localStorage.removeItem("achievements");
            // ================= RESET VARIABLES =================
            xp = 0;

            // ================= GO HOME (ENSURE ELEMENTS EXIST) =================
            goHome();

            // ================= RESET UI SAFELY =================
            setTimeout(() => {

                const streakElement = document.getElementById("streak-count");
                const xpElement = document.getElementById("user-xp");
                const levelElement = document.getElementById("user-level");
                const xpBar = document.getElementById("xp-bar");
                const xpNext = document.getElementById("xp-next");

                if (streakElement) streakElement.textContent = "0";
                if (xpElement) xpElement.textContent = "0";
                if (levelElement) levelElement.textContent = "1";

                // ✅ XP BAR RESET
                if (xpBar) xpBar.style.width = "0%";

                // ✅ NEXT LEVEL RESET
                if (xpNext) xpNext.textContent = "100";

                // ================= FORCE FULL UI SYNC =================
                updateGamification();
                updateXPBar();

            }, 100);

            // ================= UPDATE AUTH =================
            window.updateAuthUI();

            // ================= SUCCESS POPUP =================
            Swal.fire({
                icon: "success",
                title: "Logged out!",
                text: "All your progress has been cleared.",
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
};
 //LOGIN
window.openLogin = function() {
    Swal.fire({
        title: "Login",
        input: "text",
        inputLabel: "Enter your name",
        inputPlaceholder: "Your name...",
        showCancelButton: true,
        confirmButtonText: "Login",
        inputValidator: (value) => !value && "Please enter your name!"
    }).then(result => {
        if (result.isConfirmed) {
            const name = result.value.trim();
            localStorage.setItem("levelup_user", JSON.stringify({ name }));

            // Update the UI immediately
            window.updateAuthUI();
            const googleButton = document.getElementById("googlenewbutton");
          if (googleButton) {
                          googleButton.style.display = "none";
                       }
            Swal.fire({
                icon: "success",
                title: `Welcome back, ${name}!`,
                timer: 3000,
                showConfirmButton: false
            });
        }
    });
};
// SIGN UP
window.openSignup = function() {
    Swal.fire({
        title: "Create Your Account",
        html: `
            <input id="swal-name" class="swal2-input" placeholder="Enter your name">
            <input id="swal-password" type="password" class="swal2-input" placeholder="Create a password">
            <select id="swal-avatar" class="swal2-input">
                <option value="">Choose your vibe</option>
                <option value="🧠">🧠 Focused</option>
                <option value="📚">📚 Academic</option>
                <option value="💡">💡 Creative</option>
                <option value="⚡">⚡ Driven</option>
                <option value="🎧">🎧 Chill</option>
                <option value="🏀">🏀 Athletic</option>
                <option value="🎨">🎨 Artistic</option>
                <option value="💻">💻 Tech</option>
                <option value="🌌">🌌 Dreamer</option>
                <option value="🔥">🔥 Motivated</option>
            </select>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Sign Up",
        preConfirm: () => {
            const name = document.getElementById("swal-name").value.trim();
            const password = document.getElementById("swal-password").value.trim();
            const avatar = document.getElementById("swal-avatar").value;

            if (!name || !password || !avatar) {
                Swal.showValidationMessage("Please fill out all fields!");
                return false;
            }

            return { name, password, avatar };
        }
    }).then(result => {
        if (result.isConfirmed) {
            localStorage.setItem("levelup_user", JSON.stringify(result.value));
            showWelcomeScreen(result.value);
        }
    });
};

// WELCOME SCREEN (NO RELOAD)
window.showWelcomeScreen = function(user) {
    Swal.fire({
        background: "#111827",
        color: "white",
        html: `
            <div style="font-size:60px; animation: pop 0.6s ease;">${user.avatar}</div>
            <h2 style="margin-top:15px;">Welcome to Level Up, ${user.name}!</h2>
            <p>Ready to level up today? 🚀</p>
        `,
        showConfirmButton: false,
        timer: 2000,
        didOpen: () => Swal.getPopup().style.borderRadius = "20px"
    }).then(() => {
        // ✅ Update UI instead of reload
        window.updateAuthUI();
        const googleButton = document.getElementById("googlenewbutton");
          if (googleButton) {
                          googleButton.style.display = "none";
                       }
    });
};
//GOOGLE
// Parse JWT token from Google
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join('')));
}

// Google login callback
window.handleGoogleLogin = function(response) {
    const data = parseJwt(response.credential);

    const user = {
        name: data.name,
        avatar: data.picture
    };

    // Save user to localStorage
    localStorage.setItem("levelup_user", JSON.stringify(user));

    // Update the nav UI with name and avatar
    window.updateAuthUI();

    // SweetAlert welcome popup
   Swal.fire({
    background: "#1F2937", // slightly lighter dark for depth
    color: "#F9FAFB",       // softer white for contrast
    html: `
        <div style="display:flex; flex-direction:column; align-items:center; gap:10px;">
            <img src="${user.avatar}" class="rounded-full w-24 h-24 border-4 border-white shadow-lg" style="animation: pop 0.6s ease;">
            <h2 style="margin:0; font-size:1.8rem; font-weight:600;">Welcome, ${user.name}!</h2>
            <p style="margin:0; font-size:1rem; color:#D1D5DB;">Ready to level up today? 🚀 and all features are unlocked 😀🔓</p>
        </div>
    `,
    showConfirmButton: false,
    timer: 4000,
    backdrop: `
        rgba(0,0,0,0.6)
        center top
        no-repeat
    `,
    didOpen: () => {
        const popup = Swal.getPopup();
        popup.style.borderRadius = "20px";
        popup.style.boxShadow = "0 8px 25px rgba(0,0,0,0.5)";
        popup.style.padding = "25px";
    }
});
   // Hide Google button container
const googleButton = document.getElementById("googlenewbutton");
if (googleButton) {
    googleButton.style.display = "none";
}
    window.updateAuthUI();
};

// ================= MODULE NAVIGATION =================
window.openModule = function(moduleName) {
    const dashboard = document.getElementById("dashboard");
    const sections = {
        "Smart Planner": "planner-section",
        "Career Explorer": "career-section",
        "Wellness Hub": "wellness-section",
        "Budget Tracker": "budget-section",
        "Transition Helper": "transition-section",
        "Profile":"profile-section",
    };
    const sectionId = sections[moduleName];
    if (!sectionId) return;
    dashboard.classList.add("hidden");
    document.getElementById(sectionId).classList.remove("hidden");
};

window.goHome = function() {
    const dashboard = document.getElementById("dashboard");
    dashboard.classList.remove("hidden");
    document.querySelectorAll(
        "#planner-section, #career-section, #wellness-section, #budget-section, #transition-section, #profile-section"
    ).forEach(section => section.classList.add("hidden"));
};

// ================= UPDATE AUTH UI + CONTENT GATE =================
window.updateAuthUI = function() {
    const user = JSON.parse(localStorage.getItem("levelup_user"));
    const guestButtons = document.getElementById("guest-buttons");
    const googleButton = document.getElementById("googlenewbutton");
    const userMenu = document.getElementById("user-menu");
    const navUsername = document.getElementById("nav-username");
    const navAvatar = document.getElementById("nav-avatar"); // make sure this exists in HTML
    const welcome = document.getElementById("welcome-message");

    if (!welcome) return;

    if (user) {
        // Hide guest login/signup buttons
        guestButtons?.classList.add("hidden");
        googleButton?.classList.add("hidden");

        // Show user menu
        userMenu?.classList.remove("hidden");
        userMenu?.classList.add("flex");

        const firstName = user.name.split(" ")[0];
        if (navUsername) navUsername.textContent = firstName;
        if (navAvatar && user.avatar) navAvatar.innerHTML = `<img src="${user.avatar}" class="rounded-full w-8 h-8"/>`;

        welcome.textContent = `Welcome back, ${firstName}! 👋`;
    } else {
        // Show guest login/signup buttons
        guestButtons?.classList.remove("hidden");
        if (googleButton) googleButton.style.display = "flex";

        // Hide user menu
        userMenu?.classList.add("hidden");

        if (navAvatar) navAvatar.innerHTML = "";
        welcome.textContent = "Welcome 👋";
    }
};

// ================= CONTENT GATE HELPER =================
window.requireLogin = function(callback) {
    const user = JSON.parse(localStorage.getItem("levelup_user"));
    if (!user) {
        Swal.fire({
            icon: "warning",
            title: "🚫 Access Denied",
            text: "Please log in or sign up to access this feature!",
            confirmButtonText: "OK"
        });
        return false;
    } else {
        // User is logged in, execute the callback (original click action)
        if (typeof callback === "function") callback();
        return true;
    }
};

// ================= INITIALIZATION =================
document.addEventListener("DOMContentLoaded", function() {
    xp = Number(localStorage.getItem("xp")) || 0;
    streak = Number(localStorage.getItem("streak")) || 0;

    updateGamification();
    applySavedTheme();
    changeTip();
    setInterval(updateTimer, 1000);
    updateAuthUI();

    setTimeout(() => {
    checkXPBasedAchievements();
}, 500);

});