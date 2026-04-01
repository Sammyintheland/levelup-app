// ==============================
// TRANSITION JS
// ==============================

const transitionData = {

highschool: {
tasks: [
"Learn your new school layout",
"Meet teachers and counselors",
"Join at least one club",
"Organize a homework schedule",
"Make new friends",
"Explore sports or activities"
],
tips: [
"Get involved early to meet people.",
"Ask older students for advice.",
"Use a planner to stay organized."
]
},

college: {
tasks: [
"Research colleges",
"Take SAT or ACT",
"Ask for recommendation letters",
"Write college essay",
"Submit applications",
"Apply for scholarships",
"Complete FAFSA",
"Choose housing",
"Register for classes"
],
tips: [
"Start researching colleges during junior year.",
"Apply for scholarships early.",
"Visit campuses if possible."
]
},

trade: {
tasks: [
"Research trade schools",
"Explore career certifications",
"Visit training programs",
"Apply to trade school",
"Look for apprenticeships",
"Prepare tools or equipment"
],
tips: [
"Trades can offer strong salaries.",
"Hands-on learning is key.",
"Look for apprenticeships while studying."
]
},

job: {
tasks: [
"Create your resume",
"Build a LinkedIn profile",
"Practice interview skills",
"Search for job openings",
"Apply for jobs",
"Prepare for interviews"
],
tips: [
"Keep your resume simple and clear.",
"Practice interviews with friends.",
"Follow up after applying."
]
}

};


// ==============================
// LOAD TRANSITION
// ==============================

window.loadTransition = function(){

    const type = document.getElementById("transition-select").value;

    const checklist = document.getElementById("transition-checklist");
    const tips = document.getElementById("transition-tips");

    // Clear/hide checklist and tips if no option is selected
    if(!type){
        checklist.innerHTML = "";
        tips.innerHTML = "";
        document.getElementById("transition-progress").innerText = "0%";
        document.getElementById("transition-bar").style.width = "0%";
        document.getElementById("transition-score").innerText = "0";

        // Reset badges visibility
        document.getElementById("badge1").style.opacity = 0;
        document.getElementById("badge2").style.opacity = 0;
        document.getElementById("badge3").style.opacity = 0;

        return; // exit early
    }

    // Load data for selected option
    const data = transitionData[type];

    checklist.innerHTML = "";
    tips.innerHTML = "";

    data.tasks.forEach((task,index)=>{
        checklist.innerHTML += `
        <label class="flex items-center gap-2 dark:text-white">
            <input type="checkbox"
                class="transition-task"
                onchange="updateTransitionProgress()">
            ${task}
        </label>
        `;
    });

    data.tips.forEach(tip=>{
        tips.innerHTML += `<li>${tip}</li>`;
    });

    loadSavedChecklist(type);
    updateTransitionProgress();
};


// ==============================
// UPDATE PROGRESS
// ==============================

window.updateTransitionProgress = function(){

const type = document.getElementById("transition-select").value;
if(!type) return;

const tasks = document.querySelectorAll(".transition-task");

let checked = 0;
let saved = [];

tasks.forEach((task,index)=>{

if(task.checked){
checked++;
saved.push(index);
}

});

const percent = Math.round((checked / tasks.length) * 100);

document.getElementById("transition-progress").innerText = percent + "%";
document.getElementById("transition-bar").style.width = percent + "%";

document.getElementById("transition-score").innerText = percent;

localStorage.setItem("transition_"+type,JSON.stringify(saved));

if(percent === 100){

Swal.fire({
icon:"success",
title:"You're Ready! 🎉",
text:"You completed the transition checklist!",
confirmButtonColor:"#22c55e"
});

}

// ACHIEVEMENTS

if(percent >= 25){
document.getElementById("badge1").style.opacity = 1;
}

if(percent >= 50){
document.getElementById("badge2").style.opacity = 1;
}

if(percent === 100){
document.getElementById("badge3").style.opacity = 1;
}

};


// ==============================
// LOAD SAVED PROGRESS
// ==============================

function loadSavedChecklist(type){

const saved = JSON.parse(localStorage.getItem("transition_"+type)) || [];

const tasks = document.querySelectorAll(".transition-task");

tasks.forEach((task,index)=>{

if(saved.includes(index)){
task.checked = true;
}

});

}


// ==============================
// RESET CHECKLIST
// ==============================

window.resetChecklist = function(){

const type = document.getElementById("transition-select").value;

if(!type){

Swal.fire({
icon:"warning",
title:"Select a transition first"
});

return;
}

Swal.fire({
title:"Reset checklist?",
text:"Your progress will be cleared.",
icon:"warning",
showCancelButton:true,
confirmButtonColor:"#ef4444",
confirmButtonText:"Yes reset"
}).then((result)=>{

if(result.isConfirmed){

localStorage.removeItem("transition_"+type);

loadTransition();

Swal.fire({
icon:"success",
title:"Checklist Reset",
timer:1200,
showConfirmButton:false
});

}

});

};

window.askTransitionAI = function() {

const input = document.getElementById("transition-ai-input").value.toLowerCase().trim();
const output = document.getElementById("transition-ai-response");

if (!input) {
Swal.fire({
icon: "warning",
title: "Ask a question",
text: "Please type a question first!"
});
return;
}

let response = "";

if (input.includes("high school")) {

response = `
<h4 class="font-bold mb-2">Preparing for High School</h4>

• Get organized with a planner 📒  
• Join clubs or sports ⚽  
• Talk to upperclassmen for advice  
• Build strong study habits
`;

}

else if (input.includes("college")) {

response = `
<h4 class="font-bold mb-2">Preparing for College</h4>

• Research colleges early 🎓  
• Take SAT or ACT exams  
• Apply for scholarships 💰  
• Build extracurricular activities
`;

}

else if (input.includes("job")) {

response = `
<h4 class="font-bold mb-2">Preparing for Your First Job</h4>

• Create a resume 📄  
• Practice interview questions  
• Apply to multiple positions  
• Build a LinkedIn profile
`;

}

else {

response = `
<h4 class="font-bold mb-2">General Transition Tips</h4>

• Stay organized  
• Plan ahead  
• Ask teachers or mentors for help  
• Explore opportunities early
`;

}

output.innerHTML = response;
output.classList.remove("hidden");

}

// -----------------------------
// CLEAR AI RESPONSE
// -----------------------------
window.clearTransitionAI = function() {
    const output = document.getElementById("transition-ai-response");
    const input = document.getElementById("transition-ai-input");

    if (!output.innerHTML.trim()) {
        Swal.fire({
            icon: "info",
            title: "Nothing to clear",
            text: "The AI response is already empty.",
            timer: 1200,
            showConfirmButton: false
        });
        return;
    }

    Swal.fire({
        title: "Clear AI response?",
        text: "This will remove the current AI response and your input.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        confirmButtonText: "Yes, clear it!"
    }).then((result) => {
        if (result.isConfirmed) {
            output.innerHTML = "";
            output.classList.add("hidden");
            input.value = "";

            Swal.fire({
                icon: "success",
                title: "AI response cleared",
                timer: 1200,
                showConfirmButton: false
            });
        }
    });
};