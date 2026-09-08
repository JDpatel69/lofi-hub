start();
document.addEventListener('DOMContentLoaded', function () {
    var username = localStorage.getItem('username') || 'Guest';
    document.getElementById('username').textContent = username;
});
let acitive = document.getElementById("active");
let addBtn = document.getElementById("addBtn");
let done = document.getElementById("done");
addBtn.addEventListener("click", function () {
    let input = document.getElementById("new-element");
    let taskList = document.getElementById("task-list");
    let username = document.getElementById('username').textContent = username;
    if ((input.value.trim()) === "") {
        alert("Please enter a task!");
    }
    else {
        const data = {
            username: document.getElementById('username').textContent,
            task: document.getElementById("new-element")
        }
        fetch("http://localhost:3000/add-task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
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

function start() {
    const data = {
        username: document.getElementById('username').textContent,
    }
    fetch("http://localhost:3000/get-tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
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
                let taskList = document.getElementById("task-list");
                data.tasks.forEach(task => {
                    let newTask = document.createElement("li");
                    newTask.textContent = task;
                    taskList.appendChild(newTask);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message || "Failed to add country!");
        });
}

acitive.addEventListener("click", function () {
    const data = {
        username: document.getElementById('username').textContent,
    }
    fatch("http://localhost:3000/get-acitivetasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
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
                let taskList = document.getElementById("task-list");
                taskList.innerHTML = "";

                data.tasks.forEach(task => {
                    let newTask = document.createElement("li");
                    newTask.textContent = task;
                    taskList.appendChild(newTask);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message || "Failed to add country!");
        });
})


done.addEventListener("click", function () {
    const data = {
        username: document.getElementById('username').textContent,
    }
    fatch("http://localhost:3000/get-donetasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
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
                let taskList = document.getElementById("task-list");
                taskList.innerHTML = "";

                data.tasks.forEach(task => {
                    let newTask = document.createElement("li");
                    newTask.textContent = task;
                    taskList.appendChild(newTask);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message || "Failed to add country!");
        });
})
