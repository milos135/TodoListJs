let form = document.getElementById("new-task-form");
let input = document.getElementById("new-task-input");
let message = document.getElementById("message");
let posts = document.getElementById("tasks");

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

let tasks = [];

const saveTasksToLocalState = () =>
  localStorage.setItem("tasks", JSON.stringify(tasks));

let renderTasks = () => {
  tasks.push({
    text: input.value,
    isDone: false,
  });
  saveTasksToLocalState();
  displayHtml();
};

let displayHtml = () => {
  posts.innerHTML = "";
  tasks.map(
    (task, index) =>
      (posts.innerHTML += `
      <div class="task"key="${index}" >
      <input type="checkbox" id="checkbox${index}" ${
        task.isDone ? "checked" : ""
      }
      
       onChange="handleCheckbox(id,this)" 
      />
      <div class="content" style="text-decoration: ${
        task.isDone ? "line-through" : "none"
      };">
       ${task.text}
      </div>
      <div class="actions">
        <button  onClick="editPost(this)" class="edit">Edit</button>
        <button onClick="deletePost(this)" class="delete">Delete</button>
      </div>
      </div>
      
      
     `)
  );

  input.value = "";
};

let deletePost = (e) => {
  e.parentElement.parentElement.remove();
  tasks.splice(e.parentElement.parentElement.id, 1);
  saveTasksToLocalState();
};
// ...

let editPost = (e) => {
  const selectedTask = e.parentElement.parentElement;
  const taskIndex = selectedTask.getAttribute("key");

  const contentDiv = selectedTask.querySelector(".content");
  const editButton = selectedTask.querySelector(".edit");

  if (tasks[taskIndex]) {
    if (tasks[taskIndex].isEditing) {
      const updatedText = contentDiv.querySelector("input").value;
      tasks[taskIndex].text = updatedText;
      contentDiv.innerHTML = `<span style="font-size: inherit">${updatedText}</span>`;
      editButton.textContent = "Edit";
    } else {
      const taskText = tasks[taskIndex].text;
      contentDiv.innerHTML = `<input type="text" value="${taskText}" style="font-size: inherit" />`;
      editButton.textContent = "Update";
      tasks[taskIndex].currentText = taskText;
    }

    tasks[taskIndex].isEditing = !tasks[taskIndex].isEditing;
    saveTasksToLocalState();
  }
};

function handleCheckbox(id, el) {
  let checkbox = document.getElementById(id);

  const taskText = el.parentElement.children[1];
  const parentKey = el.parentElement.getAttribute("key");

  tasks[parentKey] ? (tasks[parentKey].isDone = checkbox.checked) : null;

  saveTasksToLocalState();

  if (checkbox.checked) {
    taskText.style.textDecoration = "line-through";
  } else {
    taskText.style.textDecoration = "none";
  }
}

(() => {
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  displayHtml();
})();
