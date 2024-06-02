let deletedTableBody = document.getElementById("deletedTableBody");
let filterPriority = document.getElementById("filterPriority");
let filterStatus = document.getElementById("filterStatus");

function getDeletedTasks() {
    return JSON.parse(localStorage.getItem("deleted")) || [];
}

function getTasks() {
    return JSON.parse(localStorage.getItem("task")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("task", JSON.stringify(tasks));
}

function saveDeletedTasks(deletedTasks) {
    localStorage.setItem("deleted", JSON.stringify(deletedTasks));
}

function showDeletedTasks() {
    deletedTableBody.innerHTML = "";
    let deletedTasks = getDeletedTasks();
    let filteredTasks = filterTasks(deletedTasks);
    filteredTasks.forEach((task, index) => {
        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.textContent = task.title;
        row.appendChild(nameCell);

        let priorityCell = document.createElement("td");
        priorityCell.textContent = task.priority;
        priorityCell.style.color = getPriorityColor(task.priority);
        row.appendChild(priorityCell);

        let statusCell = document.createElement("td");
        statusCell.textContent = task.status;
        row.appendChild(statusCell);

        let restoreCell = document.createElement("td");
        let restoreButton = document.createElement("button");
        restoreButton.textContent = "Restore";
        restoreButton.className = "button restoreButton";
        restoreButton.addEventListener("click", () => restoreTask(index));
        restoreCell.appendChild(restoreButton);
        row.appendChild(restoreCell);

        let deleteCell = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "button";
        deleteButton.addEventListener("click", () => deleteTask(index));
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        deletedTableBody.appendChild(row);
    });
}

function getPriorityColor(priority) {
    if (priority === "low") return "rgb(0,128,0)";
    if (priority === "medium") return "rgb(0,0,255)";
    if (priority === "high") return "rgb(255,0,0)";
}

function restoreTask(index) {
    let deletedTasks = getDeletedTasks();
    let tasks = getTasks();
    tasks.push(deletedTasks[index]);
    deletedTasks.splice(index, 1);
    saveTasks(tasks);
    saveDeletedTasks(deletedTasks);
    showDeletedTasks();
}

function deleteTask(index) {
    let deletedTasks = getDeletedTasks();
    deletedTasks.splice(index, 1);
    saveDeletedTasks(deletedTasks);
    showDeletedTasks();
}

function filterTasks(tasks) {
    let priority = filterPriority.value;
    let status = filterStatus.value;
    return tasks.filter(task => {
        return (priority === "" || task.priority === priority) &&
               (status === "" || task.status === status);
    });
}

filterPriority.addEventListener("change", showDeletedTasks);
filterStatus.addEventListener("change", showDeletedTasks);

document.addEventListener("DOMContentLoaded", showDeletedTasks);
