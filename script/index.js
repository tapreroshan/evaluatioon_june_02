let addbtn = document.getElementById("btn");
let tablebody = document.getElementById("tableBody");
let inputtitle = document.getElementById("task");
let priorityselect = document.getElementById("priority");

function getTasks() {
    return JSON.parse(localStorage.getItem("task")) || [];
}

function getDeletedTasks() {
    return JSON.parse(localStorage.getItem("deleted")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("task", JSON.stringify(tasks));
}

function saveDeletedTasks(deletedTasks) {
    localStorage.setItem("deleted", JSON.stringify(deletedTasks));
}

function addTask() {
    let title = inputtitle.value.trim();
    let priority = priorityselect.value;
    if (title === "") {
        alert("Task cannot be empty!");
        return;
    }
    let tasks = getTasks();
    tasks.push({
        title: title,
        priority: priority,
        status: "pending"
    });
    saveTasks(tasks);
    showTasks();
    inputtitle.value = "";
    priorityselect.value = "low";
}

function showTasks() {
    tablebody.innerHTML = "";
    let tasks = getTasks();
    tasks.forEach((task, index) => {
        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.textContent = task.title;
        row.appendChild(nameCell);

        let priorityCell = document.createElement("td");
        priorityCell.textContent = task.priority;
        priorityCell.style.color = getPriorityColor(task.priority);
        row.appendChild(priorityCell);

        let statusCell = document.createElement("td");
        let statusButton = document.createElement("button");
        statusButton.className = "toggle";
        statusButton.textContent = task.status;
        statusButton.style.backgroundColor = getStatuscolor(task.status);
        statusButton.addEventListener("click", () => toggleStatus(index));
        statusCell.appendChild(statusButton);
        row.appendChild(statusCell);

        let deleteCell = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.className = "removebutton";
        deleteButton.textContent = "Remove";
        deleteButton.addEventListener("click", () => removeTask(index));
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tablebody.appendChild(row);
    });
}
function getStatuscolor(status){
    if(status == "pending") return "rgb(255,165,0)";
    if (status=== "in-progress") return "rgb(76,175,80)";
    if (status === "complete") return "rgb(255,192,203)"
}
function getPriorityColor(priority) {
    if (priority === "low") return "rgb(0,128,0)";
    if (priority === "medium") return "rgb(0,0,255)";
    if (priority === "high") return "rgb(255,0,0)";
}

function toggleStatus(index) {
    let tasks = getTasks();
    let statuses = ["pending", "in-progress", "complete"];
    let currentStatusIndex = statuses.indexOf(tasks[index].status);
    tasks[index].status = statuses[(currentStatusIndex + 1) % statuses.length];
    saveTasks(tasks);
    showTasks();
}

function removeTask(index) {
    let tasks = getTasks();
    let deletedTasks = getDeletedTasks();
    deletedTasks.push(tasks[index]);
    tasks.splice(index, 1);
    saveTasks(tasks);
    saveDeletedTasks(deletedTasks);
    showTasks();
}

addbtn.addEventListener("click", addTask);
document.addEventListener("DOMContentLoaded", showTasks);
