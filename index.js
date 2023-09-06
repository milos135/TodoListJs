let form = document.getElementById("new-task-form");
let input = document.getElementById("new-task-input");
let message = document.getElementById("message");
let posts = document.getElementById("tasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (input.value === "") {
    message.innerHTML = "Input field can not be blank...";
  } else {
    message.innerHTML = "";
    renderTasks();
  }
};

const saveTasksToLocalState = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

let renderTasks = () => {
  tasks.push({
    id: Date.now(),
    text: input.value,
    isDone: false,
  });
  saveTasksToLocalState();
  displayHtml();
  input.value = "";
};

let displayHtml = () => {
  posts.innerHTML = "";
  tasks.map((task) => {
    posts.innerHTML += `
            <div class="task" data-id="${task.id}">
                <input type="checkbox" ${task.isDone ? "checked" : ""} 
                    onchange="handleCheckbox(this)" />
                <div class="content" style="text-decoration: ${
                  task.isDone ? "line-through" : "none"
                };">
                    <span class="task-text">${task.text}</span>
                </div>
                <div class="actions">
                    <button onclick="editPost(this)">Edit</button>
                    <button onclick="deletePost(this)">Delete</button>
                </div>
            </div>
        `;
  });
};

let deletePost = (button) => {
  const taskId = button.parentElement.parentElement.getAttribute("data-id");
  tasks = tasks.filter((task) => task.id !== Number(taskId));
  saveTasksToLocalState();
  displayHtml();
};

let editPost = (button) => {
  const taskId = button.parentElement.parentElement.getAttribute("data-id");
  const task = tasks.find((t) => t.id === Number(taskId));
  if (task) {
    const contentDiv =
      button.parentElement.parentElement.querySelector(".content");
    if (!task.isEditing) {
      contentDiv.innerHTML = `<input type="text" value="${task.text}" style="font-size: inherit" />`;
      button.textContent = "Update";
    } else {
      const updatedText = contentDiv.querySelector("input").value;
      task.text = updatedText;
      contentDiv.innerHTML = `<span style="font-size: inherit">${updatedText}</span>`;
      button.textContent = "Edit";
    }
    task.isEditing = !task.isEditing;
    saveTasksToLocalState();
  }
};

function handleCheckbox(checkbox) {
  const taskId = checkbox.parentElement.getAttribute("data-id");
  const task = tasks.find((t) => t.id === Number(taskId));
  if (task) {
    task.isDone = checkbox.checked;
    const taskText = checkbox.parentElement.querySelector(".content");
    taskText.style.textDecoration = task.isDone ? "line-through" : "none";
    saveTasksToLocalState();
  }
}

displayHtml();
