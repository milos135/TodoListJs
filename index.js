let data = [
  {
    id: 1,
    name: "Milos",
    email: "milos.@gmail.com",
  },
];

function readAll() {
  localStorage.setItem("object", JSON.stringify(data));
  var tabledata = document.querySelector(".data_table");
  var object = localStorage.getItem("object");
  var objectdata = JSON.parse(object);
  var elements = "";

  objectdata.map(
    (insert) =>
      (elements += `<tr>
  <td>${insert.name}</td>
  <td>${insert.email}</td>
<td>
<button class="edit" onclick={edit(${insert.id})}>Edit</button>
<button class="delete"onclick={deletee(${insert.id})} >Delete</button>
</td>
  <tr>`)
  );
  tabledata.innerHTML = elements;
}

function create() {
  document.querySelector(".create_form").style.display = "block";
  document.querySelector(".add_div").style.display = "none";
}
function add() {
  var name = document.querySelector(".name").value;
  var email = document.querySelector(".email").value;
  var newObj = { id: 2, name: name, email: email };
  data.push(newObj);
  document.querySelector(".create_form").style.display = "none";
  document.querySelector(".add_div").style.display = "block";
  readAll();
  if (name === "") {
    alert("enter name");
    return;
  }

  if (email === "") {
    alert("enter email");
    return;
  }
}

function edit(id) {
  document.querySelector(".update_form").style.display = "block";
  var obj = data.find((rec) => rec.id === id);
  document.querySelector(".uname").value = obj.name;
  document.querySelector(".uemail").value = obj.email;
  document.querySelector(".id").value = obj.id;
}
function update() {
  var id = parseInt(document.querySelector(".id").value);
  var name = document.querySelector(".uname").value;
  var email = document.querySelector(".uemail").value;

  var index = data.findIndex((rec) => rec.id == id);
  data[index] = { id, name, email };
  readAll();
  document.querySelector(".update_form").style.display = "none";
}
function deletee(id) {
  data = data.filter((rec) => rec.id != id);
  readAll();
}
