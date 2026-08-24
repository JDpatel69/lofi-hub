let addBtn = document.getElementById("addBtn");


addBtn.addEventListener("click", function () {
    let input = document.getElementById("new-element");

    let taskList = document.getElementById("task-list");
    if ((input.value.trim()) === "") {
        alert("Please enter a task!");
    }
    else {
        fetch("http://localhost:3000/add-task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ task: input.value })
        })
            .then(response => {
                if (!response.ok) {
                    return response.json()
                        .then(errData => {
                            throw new Error(errData.message || "Error try Again");
                        });
                }
                return response.json();
            })

            .then(data => {
                if (data.success) {
                    let newTask = document.createElement("li");
                    newTask.textContent = input.value;
                    taskList.appendChild(newTask);
                    input.value = "";
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message || "Failed to add country!");
            });

    }
});