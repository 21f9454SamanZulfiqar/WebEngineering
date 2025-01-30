document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("taskList");

    // LocalStorage se tasks ko load karna
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            addTaskToList(task);
        });
    }

    // Task ko UI mein add karne ka function
    function addTaskToList(task) {
        const li = document.createElement("li");
        li.id = task.name;  // ID for the task (can be used for deletion)

        // Create the task content
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");
        checkbox.checked = task.completed;

        const text = document.createElement("span");
        text.textContent = task.name;

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = "❌"; // Add icon for delete
        deleteBtn.onclick = function () {
            deleteTask(task.name);  // Delete task based on task name
        };

        // Appending elements
        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    // Task add karne ka function
    window.addTask = function () {
        const taskInput = document.getElementById("taskInput");
        const newTask = taskInput.value.trim();

        if (newTask !== "") {
            const task = {
                name: newTask,
                completed: false, // Default task is not completed
            };

            // Save task to localStorage
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.push(task);
            localStorage.setItem("tasks", JSON.stringify(tasks));

            taskInput.value = ""; // Clear input field
            addTaskToList(task);  // Task ko list mein add karo
        } else {
            alert("Please enter a task!");
        }
    };

    // Task delete karne ka function
    function deleteTask(taskName) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task.name !== taskName);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        // Remove task from UI
        const taskElement = document.getElementById(taskName);
        if (taskElement) {
            taskElement.remove();
        }
    }

    // Task ko mark as complete karna
    taskList.addEventListener("change", function (event) {
        if (event.target.classList.contains("task-checkbox")) {
            const checkbox = event.target;
            const taskName = checkbox.parentElement.id; // Get task name from id

            // Mark task as completed in localStorage
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks = tasks.map(task => {
                if (task.name === taskName) {
                    task.completed = checkbox.checked;
                }
                return task;
            });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    });

    // Load tasks from localStorage when page loads
    loadTasks();
});
