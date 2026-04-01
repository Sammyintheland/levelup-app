// ================= ADVANCED PROFILE SYSTEM =================


// ================= PROFILE SETUP =================
async function openProfileSetup() {
    let data = {
        age: "",
        level: "",
        goal: "",
        challenge: "",
        dailyTime: "",
        learningStyle: "",
        bestTime: "",
        energyLevel: "",
        taskDuration: "",
        motivation: "",
        hobbies: "",
        weeklyAvailability: "",
        stressLevel: "",
        preferredFeedback: ""
    };

    let totalSteps = 14;
    let step = 0;

    while (step >= 0 && step < totalSteps) {
        let config = {};

        switch(step){
            case 0: // AGE
                config = {
                    title: "👤 Enter Your Age",
                    input: "number",
                    inputValue: data.age,
                    inputPlaceholder: "Your age",
                    inputAttributes: { min: 5 },
                    preConfirm: (value) => {
                        value = parseInt(value);
                        if (isNaN(value) || value < 5) {
                            Swal.showValidationMessage("⚠️ Age must be 5 or older!");
                            return false;
                        }
                        return value;
                    }
                };
                break;

            case 1: // LEVEL
                config = {
                    title: "🎓 Select Your Level",
                    input: "select",
                    inputOptions: {
                        elem: "Elementary School",
                        middle: "Middle School",
                        high: "High School",
                        college: "College",
                        adult: "Adult"
                    },
                    inputValue: data.level
                };
                break;

            case 2: // GOAL
                config = {
                    title: "🎯 Your Main Goal",
                    input: "select",
                    inputOptions: {
                        time: "Time Management",
                        stress: "Reduce Stress",
                        money: "Manage Money",
                        career: "Career Planning"
                    },
                    inputValue: data.goal
                };
                break;

            case 3: // CHALLENGE
                config = {
                    title: "⚠️ Biggest Challenge",
                    input: "select",
                    inputOptions: {
                        procrastination: "Procrastination",
                        stress: "Stress",
                        focus: "Focus",
                        money: "Saving Money"
                    },
                    inputValue: data.challenge
                };
                break;

            case 4: // DAILY TIME
                config = {
                    title: "⏰ Daily Time Commitment",
                    input: "number",
                    inputValue: data.dailyTime,
                    inputPlaceholder: "Minutes per day",
                    inputAttributes: { min: 5 },
                    preConfirm: (value) => {
                        value = parseInt(value);
                        if (isNaN(value) || value < 5) Swal.showValidationMessage("⚠️ Enter at least 5 minutes!");
                        return value;
                    }
                };
                break;

            case 5: // LEARNING STYLE
                config = {
                    title: "🧠 Learning Style",
                    input: "select",
                    inputOptions: {
                        visual: "Visual",
                        auditory: "Auditory",
                        reading: "Reading/Writing",
                        kinesthetic: "Kinesthetic"
                    },
                    inputValue: data.learningStyle
                };
                break;

            case 6: // BEST TIME
                config = {
                    title: "⏱️ Best Time of Day",
                    input: "select",
                    inputOptions: {
                        morning: "Morning",
                        afternoon: "Afternoon",
                        evening: "Evening",
                        night: "Night"
                    },
                    inputValue: data.bestTime
                };
                break;

            case 7: // ENERGY LEVEL
                config = {
                    title: "⚡ Energy Level During Day",
                    input: "select",
                    inputOptions: {
                        low: "Low",
                        medium: "Medium",
                        high: "High"
                    },
                    inputValue: data.energyLevel
                };
                break;

            case 8: // TASK DURATION
                config = {
                    title: "⏳ Ideal Task Duration",
                    input: "number",
                    inputValue: data.taskDuration,
                    inputPlaceholder: "Minutes per task",
                    inputAttributes: { min: 5 },
                    preConfirm: (value) => {
                        value = parseInt(value);
                        if (isNaN(value) || value < 5) Swal.showValidationMessage("⚠️ Enter at least 5 minutes!");
                        return value;
                    }
                };
                break;

            case 9: // MOTIVATION
                config = {
                    title: "🎯 Motivation Level",
                    input: "select",
                    inputOptions: {
                        low: "Low",
                        medium: "Medium",
                        high: "High"
                    },
                    inputValue: data.motivation
                };
                break;

            case 10: // HOBBIES
                config = {
                    title: "🎨 Hobbies / Interests",
                    input: "textarea",
                    inputValue: data.hobbies,
                    inputPlaceholder: "List your hobbies or interests"
                };
                break;

            case 11: // WEEKLY AVAILABILITY
                config = {
                    title: "📅 Weekly Availability",
                    input: "textarea",
                    inputValue: data.weeklyAvailability,
                    inputPlaceholder: "When can you spend time on goals?"
                };
                break;

            case 12: // STRESS LEVEL
                config = {
                    title: "😰 Stress Level (1-10)",
                    input: "number",
                    inputValue: data.stressLevel,
                    inputPlaceholder: "1 = low, 10 = high",
                    inputAttributes: { min: 1, max: 10 },
                    preConfirm: (value) => {
                        value = parseInt(value);
                        if (isNaN(value) || value < 1 || value > 10) Swal.showValidationMessage("⚠️ Enter a value 1-10!");
                        return value;
                    }
                };
                break;

            case 13: // PREFERRED FEEDBACK
                config = {
                    title: "💡 Preferred Feedback",
                    input: "select",
                    inputOptions: {
                        tips: "Tips & Advice",
                        reminders: "Reminders & Alerts",
                        challenges: "Mini Challenges",
                        rewards: "Gamified Rewards"
                    },
                    inputValue: data.preferredFeedback
                };
                break;
        }

        // ================= SHOW SWAL =================
        let result = await Swal.fire({
            ...config,
            showCancelButton: true,
            confirmButtonText: step === totalSteps-1 ? "Finish 🚀" : "Next ➡️",
            cancelButtonText: step === 0 ? "Cancel" : "⬅️ Back",
            reverseButtons: true,
            allowOutsideClick: false
        });

        if(result.isDismissed){
            if(step === 0) return;
            step--;
            continue;
        }

        // ================= SAVE INPUT =================
        switch(step){
            case 0: data.age = parseInt(result.value); break;
            case 1: data.level = result.value; break;
            case 2: data.goal = result.value; break;
            case 3: data.challenge = result.value; break;
            case 4: data.dailyTime = parseInt(result.value); break;
            case 5: data.learningStyle = result.value; break;
            case 6: data.bestTime = result.value; break;
            case 7: data.energyLevel = result.value; break;
            case 8: data.taskDuration = parseInt(result.value); break;
            case 9: data.motivation = result.value; break;
            case 10: data.hobbies = result.value; break;
            case 11: data.weeklyAvailability = result.value; break;
            case 12: data.stressLevel = parseInt(result.value); break;
            case 13: data.preferredFeedback = result.value; break;
        }

        step++;
    }

    // ================= CALL FINAL PROFILE LOGIC =================
    processProfile(data);
    addXP(20,"Profile Completed!");
}

// ================= CORE LOGIC ENGINE =================
function processProfile(data){
    let scores = { productivity: 0, wellness: 0, finance: 0, career: 0 };
    let suggestions = [];
    let insights = [];

    // ===== GOAL IMPACT =====
    if(data.goal === "time") scores.productivity +=3;
    if(data.goal === "stress") scores.wellness +=3;
    if(data.goal === "money") scores.finance +=3;
    if(data.goal === "career") scores.career +=3;

    // ===== CHALLENGE IMPACT =====
    if(data.challenge === "procrastination") scores.productivity -=2;
    if(data.challenge === "stress") scores.wellness -=2;
    if(data.challenge === "focus") scores.productivity -=1;
    if(data.challenge === "money") scores.finance -=2;

    // ===== AGE ADAPTATION =====
    if(data.age < 14) insights.push("🌱 Early stage — focus on habit building.");
    else if(data.age <=18) insights.push("📈 Critical growth phase — consistency matters.");
    else insights.push("🚀 Long-term optimization stage.");

    // ===== LEVEL ADAPTATION =====
    if(data.level === "middle") scores.productivity +=1;
    if(data.level === "high") scores.career +=1;
    if(data.level === "college") scores.finance +=1;
    if(data.level === "adult") scores.finance +=2;

    // ===== PRIORITY DETECTION =====
    let sorted = Object.entries(scores).sort((a,b) => b[1]-a[1]);
    let topPriority = sorted[0][0];
    let secondPriority = sorted[1][0];

    const moduleMap = {
        productivity: "📚 Smart Planner",
        wellness: "🧠 Wellness Hub",
        finance: "💰 Budget Tracker",
        career: "🎓 Career Explorer"
    };

    suggestions.push(`🔥 Focus on ${moduleMap[topPriority]}`);
    suggestions.push(`⚡ Improve ${moduleMap[secondPriority]}`);

    // ===== PATTERN INSIGHT =====
    if(data.goal === data.challenge) insights.push("⚠️ Your goal matches your struggle — focus here first.");
    if(data.challenge === "stress" && data.goal === "time") insights.push("🧠 Time pressure may be causing stress.");
    if(data.challenge === "money" && data.goal === "stress") insights.push("💸 Financial stress may affect your wellness.");

    // ===== SAVE LOCAL STORAGE =====
    localStorage.setItem("profileData", JSON.stringify(data));
    localStorage.setItem("profileScores", JSON.stringify(scores));

    // ===== FINAL OUTPUT =====
    Swal.fire({
        title: "🚀 Your Life Analysis",
        html: `
            <b>Top Priorities:</b><br>${suggestions.join("<br>")}<br><br>
            <b>Insights:</b><br>${insights.join("<br>")}<br><br>
            <b>Daily Time:</b> ⏰ ${data.dailyTime} minutes/day<br>
            <b>Learning Style:</b> ${data.learningStyle}<br>
            <b>Best Time:</b> ${data.bestTime}<br>
            <b>Energy Level:</b> ${data.energyLevel}<br>
            <b>Task Duration:</b> ${data.taskDuration} mins<br>
            <b>Motivation:</b> ${data.motivation}<br>
            <b>Hobbies:</b> ${data.hobbies}<br>
            <b>Weekly Availability:</b> ${data.weeklyAvailability}<br>
            <b>Stress Level:</b> ${data.stressLevel}<br>
            <b>Preferred Feedback:</b> ${data.preferredFeedback}<br><br>
            <b>System Scores:</b><br>
            📚 Productivity: ${scores.productivity}<br>
            🧠 Wellness: ${scores.wellness}<br>
            💰 Finance: ${scores.finance}<br>
            🎓 Career: ${scores.career}
        `,
        icon: "success",
        confirmButtonText: "Start Leveling Up 🔥"
    });
}