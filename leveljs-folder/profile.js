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

    // ===== CORE GOAL =====
    if(data.goal === "time") scores.productivity +=3;
    if(data.goal === "stress") scores.wellness +=3;
    if(data.goal === "money") scores.finance +=3;
    if(data.goal === "career") scores.career +=3;

    // ===== CHALLENGES =====
    if(data.challenge === "procrastination"){
        scores.productivity -=2;
        suggestions.push("⚡ Try 10-minute starter tasks to beat procrastination");
    }

    if(data.challenge === "stress"){
        scores.wellness -=2;
        suggestions.push("🧠 Add daily breathing or reflection sessions");
    }

    if(data.challenge === "focus"){
        scores.productivity -=1;
        suggestions.push("📵 Use focus timers and remove distractions");
    }

    if(data.challenge === "money"){
        scores.finance -=2;
        suggestions.push("💸 Track every expense for 3 days to build awareness");
    }

    // ===== DAILY TIME =====
    if(data.dailyTime < 15){
        insights.push("⏱️ You have limited time — focus on micro-tasks.");
    } else if(data.dailyTime > 60){
        insights.push("🚀 You have strong availability — aim for bigger goals.");
    }

    // ===== ENERGY =====
    if(data.energyLevel === "high"){
        suggestions.push("⚡ Schedule your hardest tasks first");
    }
    if(data.energyLevel === "low"){
        suggestions.push("🌱 Start with easy wins to build momentum");
    }

    // ===== STRESS =====
    if(data.stressLevel >= 7){
        insights.push("⚠️ High stress detected — prioritize wellness.");
    }

    // ===== LEARNING STYLE =====
    if(data.learningStyle === "visual"){
        suggestions.push("🎥 Use videos and diagrams to learn faster");
    }
    if(data.learningStyle === "kinesthetic"){
        suggestions.push("🛠️ Learn by doing — practice tasks actively");
    }

    // ===== PATTERN INSIGHT =====
    if(data.goal === data.challenge){
        insights.push("🎯 Your goal matches your struggle — focus here first.");
    }

    // ===== PRIORITY SYSTEM =====
    let sorted = Object.entries(scores).sort((a,b)=>b[1]-a[1]);
    let top = sorted[0][0];

    const moduleMap = {
        productivity: "📚 Smart Planner",
        wellness: "🧠 Wellness Hub",
        finance: "💰 Budget Tracker",
        career: "🎓 Career Explorer"
    };

    suggestions.unshift(`🔥 Primary Focus: ${moduleMap[top]}`);

    // ===== SAVE =====
    localStorage.setItem("profileData", JSON.stringify(data));
    localStorage.setItem("profileScores", JSON.stringify(scores));
    localStorage.setItem("profileSuggestions", JSON.stringify(suggestions));
    localStorage.setItem("profileInsights", JSON.stringify(insights));

    // ===== OUTPUT =====
    Swal.fire({
        title: "🚀 Your Personalized Plan",
        html: `
            <b>🔥 Suggestions:</b><br>${suggestions.join("<br>")}<br><br>
            <b>🧠 Insights:</b><br>${insights.join("<br>")}
        `,
        icon: "success"
    });

    loadProfileDashboard();
}
