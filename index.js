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
    createPostAndStoreData();
  }
};
let data = [];

let createPostAndStoreData = () => {
  data.push({
    text: input.value,
  });
  localStorage.setItem("data", JSON.stringify(data));
  displayHtml();
};
let displayHtml = () => {
  posts.innerHTML = "";
  data.map(
    (task, index) =>
      (posts.innerHTML += `
      <div class="task" ${index}>
      <input type="checkbox" id="checkbox"  onChange="handleCheckbox(id,this)" />
      <div class="content">
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
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
};
let editPost = (e) => {
  let selectedTask = e.parentElement.parentElement;
  input.value = selectedTask.children[1].innerText;
  deletePost(e);
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  displayHtml();
})();

function handleCheckbox(id, el) {
  let checkbox = document.getElementById(id);
  const inText = el.parentElement.children[1];
  if (checkbox.checked) {
    inText.style.textDecoration = "line-through";
  } else {
    inText.style.textDecoration = "none";
  }
}
