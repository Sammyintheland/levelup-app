// CAREER JS

const careerMap = {

    tech: [
        {
            name: "Software Developer 💻",
            desc: "Build apps, websites, and software systems.",
            salary: "$90,000 - $130,000",
            education: "Bachelor's Degree in Computer Science",
            skills: ["coding", "math"]
        },
        {
            name: "Cybersecurity Analyst 🔐",
            desc: "Protect networks and systems from cyber threats.",
            salary: "$85,000 - $120,000",
            education: "Bachelor's Degree + Certifications",
            skills: ["coding", "analysis"]
        },
        {
            name: "Data Scientist 📊",
            desc: "Analyze data to solve business problems.",
            salary: "$100,000 - $140,000",
            education: "Bachelor's or Master's Degree",
            skills: ["math", "coding"]
        }
    ],

    medical: [
        {
            name: "Doctor (Physician) 🩺",
            desc: "Diagnose and treat illnesses.",
            salary: "$180,000 - $300,000+",
            education: "Medical School (MD/DO)",
            skills: ["math", "communication"]
        },
        {
            name: "Registered Nurse 🏥",
            desc: "Provide patient care.",
            salary: "$70,000 - $100,000",
            education: "Nursing Degree",
            skills: ["communication"]
        }
    ]
};

// -------------------------------
// GENERATE CAREERS WITH SCORING
// -------------------------------

window.generateCareers = function() {

    const user = getCurrentUser();
    if (!user) {
        Swal.fire({ icon: "warning", title: "Not Logged In" });
        return;
    }

    const interest = document.getElementById("interest-select").value;
    const selectedSkills = Array.from(
        document.querySelectorAll("#career-section input[type='checkbox']:checked")
    ).map(cb => cb.value);

    if (!interest) {
        Swal.fire({ icon: "info", title: "Select an interest first!" });
        return;
    }

    const careers = careerMap[interest] || [];
    const container = document.getElementById("career-results");

    if (careers.length === 0) {
        container.innerHTML = "<p>No matches found.</p>";
        return;
    }

    // Calculate match score
const scoredCareers = careers.map(career => {

    let score = 50;
    let matchedSkills = [];

    selectedSkills.forEach(skill => {
        if (career.skills.includes(skill)) {
            score += 15;
            matchedSkills.push(skill);
        }
    });

    return {
        ...career,
        score: Math.min(score, 100),
        matchedSkills
    };
});

    // Sort highest match first
    scoredCareers.sort((a, b) => b.score - a.score);

    container.innerHTML = scoredCareers.map(career => `
        <div class="bg-gray-100 dark:bg-gray-700 p-5 rounded-xl shadow">
            <div class="flex justify-between items-center">
                <h4 class="font-semibold text-lg">${career.name}</h4>
                <span class="text-sm bg-blue-500 text-white px-3 py-1 rounded-full">
                    ${career.score}% Match
                </span>
            </div>

            <p class="text-sm mt-2 opacity-80">${career.desc}</p>
            <p class="text-sm mt-2"><strong>Salary:</strong> ${career.salary}</p>
            <p class="text-sm"><strong>Education:</strong> ${career.education}</p>
            <p class="text-xs mt-2 text-green-600 dark:text-green-400">
    ${career.matchedSkills.length > 0 
        ? "Strong match because of: " + career.matchedSkills.join(", ")
        : "General interest-based recommendation"}
</p>

            <div class="mt-3 flex flex-wrap gap-2">
                <button onclick="showCareerDetails(\`${career.name}\`)"
                    class="bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600 transition">
                    View Details
                </button>

                <button onclick="generateRoadmap(\'${career.name}\')"
                    class="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition">
                    Roadmap
                </button>

                <button onclick="saveCareer(\'${career.name}\')"
                    class="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition">
                    Save
                </button>
            </div>
        </div>
    `).join("");

    Swal.fire({
        icon: "success",
        title: "Careers Generated! and 50 XP was added!",
        timer: 1200,
        showConfirmButton: false
    });

    addXP(50,"Found some Careers!")
};

// -------------------------------
// CAREER DETAILS POPUP
// -------------------------------

window.showCareerDetails = function(careerName) {

    const allCareers = Object.values(careerMap).flat();
    const career = allCareers.find(c => c.name === careerName);
    if (!career) return;

    Swal.fire({
        title: career.name,
        html: `
            <p><strong>Description:</strong> ${career.desc}</p>
            <p><strong>Salary:</strong> ${career.salary}</p>
            <p><strong>Education:</strong> ${career.education}</p>
            <p><strong>Key Skills:</strong> ${career.skills.join(", ")}</p>
        `,
        width: 500
    });
};

// -------------------------------
// ROADMAP GENERATOR
// -------------------------------

window.generateRoadmap = function(careerName) {

    const roadmapSteps = {
        "Software Developer 💻": [
            "Learn basic programming (HTML, CSS, JS)",
            "Build small projects",
            "Earn CS degree or bootcamp certification",
            "Build portfolio",
            "Apply for internships"
        ],
        "Doctor (Physician) 🩺": [
            "Take advanced science classes",
            "Earn Bachelor's degree (Pre-med)",
            "Take MCAT",
            "Attend Medical School",
            "Complete Residency"
        ]
    };

    const steps = roadmapSteps[careerName];

    if (!steps) {
        Swal.fire("Roadmap coming soon!");
        return;
    }

    Swal.fire({
        title: "Career Roadmap 🚀",
        html: `
            <ol style="text-align:left;">
                ${steps.map(step => `<li>${step}</li>`).join("")}
            </ol>
        `,
        width: 600
    });
};

// -------------------------------
// SAVE CAREER (UNCHANGED)
// -------------------------------

window.saveCareer = function(careerName) {

    const user = getCurrentUser();
    if (!user) return;

    const key = "savedCareers_" + user.name;
    let saved = JSON.parse(localStorage.getItem(key)) || [];

    if (!saved.includes(careerName)) {
        saved.push(careerName);
        localStorage.setItem(key, JSON.stringify(saved));

        Swal.fire({
            icon: "success",
            title: "Career Saved!",
            timer: 1000,
            showConfirmButton: false
        });
    } else {
        Swal.fire({
            icon: "info",
            title: "Already Saved"
        });
    }
};

window.viewSavedCareers = function() {

    const user = getCurrentUser();
    if (!user) return;

    const key = "savedCareers_" + user.name;
    const saved = JSON.parse(localStorage.getItem(key)) || [];

    const container = document.getElementById("saved-careers-container");

document.getElementById("career-section").classList.add("hidden");
document.getElementById("saved-careers-section").classList.remove("hidden");

if (saved.length === 0) {
    container.innerHTML = "<p>No saved careers yet.</p>";
    return;
}

    container.innerHTML = saved.map(name => `
        <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl flex justify-between items-center">
            <span>${name}</span>
            <button onclick="removeSavedCareer('${name}')"
                class="bg-red-500 text-white px-3 py-1 rounded-lg">
                Remove
            </button>
        </div>
    `).join("");

    document.getElementById("career-section").classList.add("hidden");
    document.getElementById("saved-careers-section").classList.remove("hidden");
};

window.removeSavedCareer = function(careerName) {

    const user = getCurrentUser();
    if (!user) return;

    const key = "savedCareers_" + user.name;
    let saved = JSON.parse(localStorage.getItem(key)) || [];

    saved = saved.filter(name => name !== careerName);

    localStorage.setItem(key, JSON.stringify(saved));
    viewSavedCareers();
};

