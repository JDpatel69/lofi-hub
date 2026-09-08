document.addEventListener('DOMContentLoaded', function () {
    var username = localStorage.getItem('username') || 'Guest';
    document.getElementById('username').textContent = username;

});
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
   /* let input = document.getElementById("new-element");
    let taskList = document.getElementById("task-list");
    let username = document.getElementById('username').textContent = username; */
    if ((input.value.trim()) === "") {
        alert("Please enter a task!");
    }
    else {


        const data ={
            username:document.getElementById('username').textContent,
            task:document.getElementById("new-element")
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
