let form = document.getElementById("new-task-form");
let input = document.getElementById("new-task-input");
let message = document.getElementById("message");
let posts = document.getElementById("tasks");
let checkbox = document.getElementById("checkbox");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});
let formValidation = () => {
  if (input.value === "") {
    message.innerHTML = "Input field can not be blank...";
  } else if (!checkbox.checked) {
    message.innerHTML = "The field must be checked first";
  } else {
    message.innerHTML = "";
    storeData();
    checkbox.checked = false;
  }
};
let data = [];

let storeData = () => {
  data.push({
    text: input.value,
  });
  localStorage.setItem("data", JSON.stringify(data));
  createPost();
};
let createPost = () => {
  posts.innerHTML = "";
  data.map(
    (x) =>
      (posts.innerHTML += `
    <div class="task">
      <div class="content">
        ${x.text}
      </div>
      <div class="actions">
        <button  onClick="editPost(this)" class="edit">Edit</button>
        <button onClick="deletePost(this)" class="delete">Delete</button>
      </div>
    </div>`)
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

  input.value = selectedTask.children[0].innerText;

  deletePost(e);
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];

  createPost();
})();
