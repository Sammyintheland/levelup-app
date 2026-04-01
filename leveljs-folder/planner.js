// ================= SMART PLANNER JS =================

window.tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    const container = document.getElementById("tasks-container");
    if (!container) return;

    container.innerHTML = "";

    const today = new Date().toISOString().split("T")[0];

    tasks.forEach((task, index) => {

        const isOverdue = !task.completed && task.date < today;

        const taskItem = document.createElement("li");

        taskItem.className = `
            p-3 rounded shadow flex justify-between items-center mb-2 transition-all duration-300
            ${task.completed 
                ? "bg-green-200 dark:bg-green-700 opacity-60 scale-95 text-gray-900 dark:text-white"
                : task.priority === "High"
                    ? "bg-red-100 dark:bg-red-800 text-gray-900 dark:text-white"
                    : task.priority === "Medium"
                        ? "bg-yellow-100 dark:bg-yellow-800 text-gray-900 dark:text-white"
                        : "bg-green-100 dark:bg-green-800 text-gray-900 dark:text-white"
            }
            ${isOverdue ? "overdue-task border-2 border-red-500" : ""}
        `;

        taskItem.innerHTML = `
            <div>
                <strong>${task.name}</strong>

                ${task.completed 
                    ? `<span class="ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                        ✓ Completed
                       </span>`
                    : ""
                }

                ${isOverdue 
                    ? `<span class="ml-2 text-xs font-bold text-red-600 dark:text-red-400">
                        OVERDUE
                       </span>`
                    : ""
                }

                <br>
                Due: ${task.date} | Priority: ${task.priority}
            </div>

            <div class="space-x-2">
                <button onclick="completeTask(${index})"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">
                    ✓
                </button>
                <button onclick="deleteTask(${index})"
                    class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">
                    ✕
                </button>
            </div>
        `;

        container.appendChild(taskItem);
    });
}

// Add new task with Swal.fire
window.addTask = function() {
    const name = document.getElementById("task-name").value.trim();
    const date = document.getElementById("task-date").value;
    const priority = document.getElementById("task-priority").value;

    if (!name || !date) {
        Swal.fire({
            icon: "warning",
            title: "Oops!",
            text: "Please enter a task name and date!"
        });
        return;
    }

    tasks.push({ name, date, priority, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Clear inputs
    document.getElementById("task-name").value = "";
    document.getElementById("task-date").value = "";

    renderTasks();

        // ✅ Custom Swal for task added
    Swal.fire({
        icon: "success",
        title: "Task Added!",
        text: `"${name}" has been added to your planner. +30 XP!`,
        timer: 1500,
        showConfirmButton: false
    });

    // ✅ Give XP (no popup this time)
    addXP(30, `"${name}" added to your planner!`, false);



    // ✅ Update assignments due stats
    const stats = getUserStats();
    stats.assignmentsDue = tasks.filter(t => !t.completed).length;
    saveUserStats(stats);
    updateDashboardStats();
};
// Complete / undo complete with Swal.fire
window.completeTask = function(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();

    // ✅ Update assignments due
    const stats = getUserStats();
    stats.assignmentsDue = tasks.filter(t => !t.completed).length;
    saveUserStats(stats);
    updateDashboardStats();

    Swal.fire({
        icon: "info",
        title: tasks[index].completed ? "Task Completed!" : "Task Marked Incomplete",
        timer: 1200,
        showConfirmButton: false
    });
};

// Delete task with Swal.fire confirmation
window.deleteTask = function(index) {
    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this task?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Cancel",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            const removed = tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();

            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: `"${removed[0].name}" has been removed.`,
                timer: 1500,
                showConfirmButton: false
            });
        }
    });
};



function checkOverdueTasks() {
    const today = new Date().toISOString().split("T")[0];

    const overdueTasks = tasks.filter(task => 
        !task.completed && task.date < today
    );

    if (overdueTasks.length > 0) {
       Swal.fire({
    icon: "warning",
    title: "Overdue Tasks!",
    text: `You have ${overdueTasks.length} overdue task(s).`,
    timer: 5000,
    showConfirmButton: false
    
});
    }
}
// Initial render
renderTasks();
checkOverdueTasks();
