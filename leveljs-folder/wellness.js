// WELLNESS HUB JS 

// Get Logged In User
function getCurrentUser() {
    return JSON.parse(localStorage.getItem("levelup_user"));
}


// MOOD LOGGER
window.logMood = function(score) {
    const user = getCurrentUser();

    if (!user) {
        Swal.fire({
            icon: "warning",
            title: "Not Logged In"
        });
        return;
    }

    const statsKey = "userStats_" + user.name;
    const moodHistoryKey = "moodHistory_" + user.name;

    let stats = JSON.parse(localStorage.getItem(statsKey)) || {
        assignmentsDue: 0,
        budgetStatus: "Good",
        wellnessScore: 50,
        transitionProgress: 0
    };

    let moodHistory = JSON.parse(localStorage.getItem(moodHistoryKey)) || [];

    
    stats.wellnessScore = score;

    
    moodHistory.unshift({
        score: score,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(statsKey, JSON.stringify(stats));
    localStorage.setItem(moodHistoryKey, JSON.stringify(moodHistory));

    
    let insightMessage = "";

    if (score === 100) {
        insightMessage = "You're feeling amazing today! Keep that positive energy going 🚀";
    } else if (score === 80) {
        insightMessage = "You're doing pretty well. Keep building momentum 👍";
    } else if (score === 60) {
        insightMessage = "You're feeling neutral. Maybe take a small break or reset😐.";
    } else if (score === 40) {
        insightMessage = "Rough day? Try the breathing exercise or write a reflection.";
    } else if (score === 20) {
        insightMessage = "Today feels tough. Be kind to yourself. Small steps matter.";
    }
Swal.fire({
    icon: "success",
    title: "Mood Logged!",
    html: `
        <p><strong>Score:</strong> ${score}</p>
        <p style="margin-top:10px;">${insightMessage}</p>
        <p style="margin-top:10px;"> 20 XP was Added!</p>
    `,
    timer: 3000,
    showConfirmButton: false,
});

addXP(20,"Mood Logged");

    if (typeof updateDashboardStats === "function") {
        updateDashboardStats();
    }
    displayRecentMoods();
};




// BREATHING EXERCISE
window.startBreathing = function() {

    Swal.fire({
        title: "Breathe In...",
        html: "<h2 style='font-size: 28px;'>Inhale slowly for 4 seconds</h2>",
        timer: 4000,
        timerProgressBar: true,
        showConfirmButton: false,
        willClose: () => {

            // After inhale finishes → show exhale
            Swal.fire({
                title: "Breathe Out...",
                html: "<h2 style='font-size: 28px;'>Exhale slowly for 4 seconds</h2>",
                timer: 4000,
                timerProgressBar: true,
                showConfirmButton: false,
                willClose: () => {

                    // After exhale finishes → success message
                    Swal.fire({
                        icon: "success",
                        title: "Nice Work!",
                        text: "You completed a breathing cycle and 20 XP was added!",
                        timer: 1500,
                        showConfirmButton: false
                    });

                    addXP(20,"Finished Breathing Exercise");

                }
            });

        }
    });

};



// Save Reflection
window.saveReflection = function() {
    const user = getCurrentUser();
    if (!user) {
        Swal.fire({
            icon: "warning",
            title: "Not Logged In"
        });
        return;
    }

    const input = document.getElementById("reflection-input");
    const text = input.value.trim();

    if (!text) {
        Swal.fire({
            icon: "info",
            title: "Write Something First!"
        });
        return;
    }

    const key = "reflections_" + user.name;

    let reflections = JSON.parse(localStorage.getItem(key)) || [];

    reflections.unshift({
        text: text,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(key, JSON.stringify(reflections));

    input.value = "";

    Swal.fire({
        icon: "success",
        title: "Reflection Saved!",
        timer: 1200,
        showConfirmButton: false
    });

    loadReflections();
};

// Load All Reflections
function loadReflections() {
    const user = getCurrentUser();
    if (!user) return;

    const key = "reflections_" + user.name;
    const reflections = JSON.parse(localStorage.getItem(key)) || [];

    const container = document.getElementById("reflection-history");

    container.innerHTML = "";

    if (reflections.length === 0) {
        container.innerHTML = `
            <p class="opacity-70 dark:text-white">
                No reflections yet.
            </p>
        `;
        return;
    }

    reflections.forEach((item, index) => {
        const reflectionHTML = `
            <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg relative">
                <p class="dark:text-white mb-2">${item.text}</p>
                <p class="text-xs opacity-60 dark:text-gray-300">${item.date}</p>
                <button onclick="deleteReflection(${index})"
                    class="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm">
                    Delete
                </button>
            </div>
        `;

        container.innerHTML += reflectionHTML;
    });
}

// Delete Specific Reflection
window.deleteReflection = function(index) {
    const user = getCurrentUser();
    if (!user) return;

    const key = "reflections_" + user.name;
    let reflections = JSON.parse(localStorage.getItem(key)) || [];

    Swal.fire({
        title: "Delete Reflection?",
        text: "This cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "Yes, delete it"
    }).then((result) => {

        if (result.isConfirmed) {

            reflections.splice(index, 1);
            localStorage.setItem(key, JSON.stringify(reflections));

            loadReflections();

            Swal.fire({
                icon: "success",
                title: "Deleted!",
                timer: 1000,
                showConfirmButton: false
            });
        }
    });
};


// DAILY AFFIRMATION GENERATOR
window.generateAffirmation = function() {

    const affirmations = [
        "Progress is better than perfection.",
        "You are capable of more than you think.",
        "Small steps still move you forward.",
        "It’s okay to grow at your own pace.",
        "Your effort today matters.",
        "You handled more than you realize.",
        "One tough moment does not define your day."
    ];

    const random = affirmations[Math.floor(Math.random() * affirmations.length)];

    document.getElementById("affirmation-text").textContent = random;

    Swal.fire({
        icon: "success",
        title: "Affirmation Ready 💜",
        text: random,
        timer: 5000,
        showConfirmButton: false
    });
};

// CALM MUSIC SUGGESTION
window.suggestMusic = function() {

    const songs = [
        "Lo-fi beats playlist",
        "Instrumental piano focus music",
        "Nature sounds playlist",
        "Soft acoustic study music",
        "Listen to phonk if u like it!"
    ];

    const randomSong = songs[Math.floor(Math.random() * songs.length)];

    Swal.fire({
        title: "Calm Music Suggestion 🎵",
        text: "Try listening to: " + randomSong,
        icon: "info"
    });
};


// DRINK WATER REMINDER
window.drinkWaterReminder = function() {

    Swal.fire({
        title: "Hydration Check 💧",
        text: "Go drink a glass of water. Your brain will thank you.",
        icon: "success"
    });
};


// DISPLAY LAST 5 MOODS
function displayRecentMoods() {
    const user = getCurrentUser();
    if (!user) return;

    const moodHistoryKey = "moodHistory_" + user.name;
    const moodHistory = JSON.parse(localStorage.getItem(moodHistoryKey)) || [];

    const container = document.getElementById("recent-moods");
    if (!container) return;

    if (moodHistory.length === 0) {
        container.innerHTML = "<p>No moods logged yet.</p>";
        return;
    }

    const lastFive = moodHistory.slice(0, 5);

    container.innerHTML = lastFive.map(entry => {
        let emoji = "";

        if (entry.score === 100) emoji = "😁";
        if (entry.score === 80) emoji = "🙂";
        if (entry.score === 60) emoji = "😐";
        if (entry.score === 40) emoji = "😔";
        if (entry.score === 20) emoji = "😣";

        return `
            <div class="flex justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <span>${emoji} ${entry.score}</span>
                <span class="text-xs opacity-70">${entry.date}</span>
            </div>
        `;
    }).join("");
};