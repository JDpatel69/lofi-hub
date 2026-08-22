let addBtn = document.getElementById("addBtn");


addBtn.addEventListener("click", function () {
    let input = document.getElementById("new-element");

    let taskList = document.getElementById("task-list");
    if ((input.value.trim()) === "") {
        alert("Please enter a task!");
    }
    else {
        const li = document.createElement("li");
        li.textContent = input.value;  // set text
        taskList.appendChild(li);
        input.value = "";
    }
});