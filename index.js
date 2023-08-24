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
    acceptData();
  }
};
let data = {};

let acceptData = () => {
  data["text"] = input.value;
  createPost();
};
let createPost = () => {
  posts.innerHTML += ` <div id="tasks">
  <div class="task">
    <div class="content">
      ${data.text}
    </div>
    <div class="actions">
      <button  onClick="editPost(this)" class="edit">Edit</button>
      <button onClick="deletePost(this)" class="delete">Delete</button>
    </div>
  </div>`;
  input.value = "";
};

let deletePost = (e) => {
  e.parentElement.parentElement.remove();
};
let editPost = (e) => {
  input.value = e.parentElement.previousElementSibling.innerHTML;
  e.parentElement.parentElement.remove();
};
