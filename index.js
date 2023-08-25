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
let data = [];

let acceptData = () => {
  data.push({
    text: input.value,
  });
  localStorage.setItem("data", JSON.stringify(data));
  createPost();
};
let createPost = () => {
  posts.innerHTML = "";
  data.map((x, y) => {
    return (posts.innerHTML += ` <div id=${y}><div id="tasks">
    <div class="task">
      <div class="content">
        ${x.text}
      </div>
      <div class="actions">
        <button  onClick="editPost(this)" class="edit">Edit</button>
        <button onClick="deletePost(this)" class="delete">Delete</button>
      </div>
    </div> </div>`);
  });

  input.value = "";
};

let deletePost = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
};
let editPost = (e) => {
  let selectedTask = e.parentElement.parentElement;
  input.value = selectedTask.children[0].innerHTML;
  deletePost(e);
};
(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createPost();
})();
