let addbtn = document.getElementById("btn");
let tablebody = document.getElementById("tableBody");
let inputtitle = document.getElementById("task");
let priorityselect = document.getElementById("priority");

// Function for JSON and local storage
function getTask() {
    return JSON.parse(localStorage.getItem("task")) || [];
}

function getdelete() {
    return JSON.parse(localStorage.getItem("deleted")) || [];
}

function saveTask(task) {
    localStorage.setItem("task", JSON.stringify(task));
}

function savedelete(deleted) {
    localStorage.setItem("deleted", JSON.stringify(deleted));
}

function addtask() {
    let title = inputtitle.value.trim();
    let priority = priorityselect.value;
    if (title === "") {
        alert("Task cannot be empty!");
        return;
    }
    let task = getTask();
    task.push({
        "title": title,
        "priority": priority,
        "status": "pending"
    });
    saveTask(task);
    showtask();
    inputtitle.value = "";
    priorityselect.value = "low";
}

function showtask() {
    tablebody.innerHTML = "";
    let task = getTask();
    task.forEach((el, index) => {
        let row = document.createElement("tr");

        let namecell = document.createElement("td");
        namecell.textContent = el.title;
        row.appendChild(namecell);

        let prioritycell = document.createElement("td");
        prioritycell.textContent = el.priority;
        row.appendChild(prioritycell);

        let statuscell = document.createElement("td");
        let statusbutton = document.createElement("button");
        statusbutton.className = "toggle";
        statusbutton.textContent = el.status;
        statusbutton.addEventListener("click", () => togglestatus(index));
        statuscell.appendChild(statusbutton);
        row.appendChild(statuscell);

        let deletecell = document.createElement("td");
        let deletebutton = document.createElement("button");
        deletebutton.className = "removebutton";
        deletebutton.textContent = "remove";
        deletebutton.style.backgroundColor="green"
        deletebutton.addEventListener("click", () => remove(index));
        deletecell.appendChild(deletebutton);
        row.appendChild(deletecell);

        tablebody.appendChild(row);
    });
}

function togglestatus(index) {
    let task = getTask();
    task[index].status = task[index].status === "pending" ? "in-progress" : "complete";
    saveTask(task);
    showtask();
}

function remove(index) {
    let task = getTask();
    let removed = getdelete();
    removed.push(task[index]);
    task.splice(index, 1);
    saveTask(task);
    savedelete(removed);
    showtask();
}

addbtn.addEventListener("click", addtask);
document.addEventListener("DOMContentLoaded", showtask);
