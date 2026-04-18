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
        },
        {
            name: "Game Developer 🎮",
            desc: "Design and develop video games.",
            salary: "$80,000 - $115,000",
            education: "Bachelor's Degree or Portfolio",
            skills: ["coding", "creativity"]
        },
        {
            name: "Web Developer 🌐",
            desc: "Create and maintain websites.",
            salary: "$75,000 - $105,000",
            education: "Bachelor's Degree or Bootcamp",
            skills: ["coding", "design"]
        },
        {
            name: "AI / Machine Learning Engineer 🤖",
            desc: "Build intelligent systems and predictive models.",
            salary: "$110,000 - $150,000",
            education: "Bachelor's or Master's Degree",
            skills: ["coding", "math", "analysis"]
        },
        {
            name: "Network Engineer 🌍",
            desc: "Manage and maintain computer networks.",
            salary: "$80,000 - $110,000",
            education: "IT Degree + Certifications",
            skills: ["coding", "analysis"]
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
        },
        {
            name: "Pharmacist 💊",
            desc: "Prepare and dispense medications.",
            salary: "$110,000 - $140,000",
            education: "Doctor of Pharmacy",
            skills: ["math", "analysis"]
        },
        {
            name: "Dentist 🦷",
            desc: "Diagnose and treat oral health issues.",
            salary: "$150,000 - $220,000",
            education: "Dental School",
            skills: ["communication", "analysis"]
        },
        {
            name: "Physical Therapist 🏃",
            desc: "Help patients recover movement and strength.",
            salary: "$80,000 - $110,000",
            education: "Doctor of Physical Therapy",
            skills: ["communication"]
        },
        {
            name: "Surgeon 🏨",
            desc: "Perform operations to treat injuries and diseases.",
            salary: "$250,000 - $400,000+",
            education: "Medical School + Residency",
            skills: ["math", "analysis", "communication"]
        },
        {
            name: "Radiologic Technologist 🩻",
            desc: "Perform imaging tests like X-rays and MRIs.",
            salary: "$65,000 - $90,000",
            education: "Associate or Bachelor's Degree",
            skills: ["analysis", "communication"]
        }
    ]
},

creative: [
    {
        name: "Graphic Designer 🎨",
        desc: "Create visual designs for brands and media.",
        salary: "$50,000 - $80,000",
        education: "Design Degree or Portfolio",
        skills: ["creativity", "design"]
    },
    {
        name: "Animator 🎬",
        desc: "Create animations for movies, games, and media.",
        salary: "$60,000 - $100,000",
        education: "Animation Degree or Portfolio",
        skills: ["creativity"]
    },
    {
        name: "Photographer 📸",
        desc: "Capture and edit professional photos.",
        salary: "$40,000 - $75,000",
        education: "Optional",
        skills: ["creativity"]
    },
    {
        name: "Musician 🎵",
        desc: "Create and perform music.",
        salary: "Varies",
        education: "Optional",
        skills: ["creativity"]
    },
    {
        name: "Video Editor 🎥",
        desc: "Edit video content for media and entertainment.",
        salary: "$45,000 - $80,000",
        education: "Optional",
        skills: ["creativity"]
    }
],

business: [
    {
        name: "Entrepreneur 🚀",
        desc: "Start and run your own business.",
        salary: "Varies",
        education: "Optional",
        skills: ["leadership", "creativity"]
    },
    {
        name: "Business Manager 📊",
        desc: "Oversee operations and teams in a company.",
        salary: "$70,000 - $120,000",
        education: "Business Degree",
        skills: ["leadership", "communication"]
    },
    {
        name: "Marketing Manager 📈",
        desc: "Promote products and brands.",
        salary: "$70,000 - $120,000",
        education: "Marketing Degree",
        skills: ["creativity", "communication"]
    },
    {
        name: "Financial Analyst 💰",
        desc: "Analyze financial data and trends.",
        salary: "$75,000 - $110,000",
        education: "Finance Degree",
        skills: ["math", "analysis"]
    },
    {
        name: "Human Resources Manager 👥",
        desc: "Manage hiring and employee relations.",
        salary: "$70,000 - $110,000",
        education: "Business Degree",
        skills: ["communication", "leadership"]
    }
],

helping: [
    {
        name: "Teacher 🍎",
        desc: "Educate students in schools.",
        salary: "$50,000 - $80,000",
        education: "Education Degree",
        skills: ["communication"]
    },
    {
        name: "Social Worker 🤝",
        desc: "Help people solve and cope with problems.",
        salary: "$50,000 - $75,000",
        education: "Social Work Degree",
        skills: ["communication"]
    },
    {
        name: "Psychologist 🧠",
        desc: "Study behavior and help with mental health.",
        salary: "$70,000 - $120,000",
        education: "Master's or Doctorate",
        skills: ["analysis", "communication"]
    },
    {
        name: "Firefighter 🚒",
        desc: "Respond to emergencies and save lives.",
        salary: "$50,000 - $90,000",
        education: "Training Academy",
        skills: ["communication"]
    },
    {
        name: "Police Officer 🚓",
        desc: "Protect communities and enforce laws.",
        salary: "$55,000 - $90,000",
        education: "Police Academy",
        skills: ["communication"]
    }
];

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

