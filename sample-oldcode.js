const form = document.querySelector("#itemForm");
const titleInput = document.querySelector("#title");
const selectInput = document.querySelector("#select");
const itemList = document.querySelector("#itemList");

let todos = [];

// common code for onLoad UI and localStorage
function createListItem(todoName, todoSelect, itemList, todosIndex) {
  const li = document.createElement("li");
  li.setAttribute("class", "messageBox");
  li.innerHTML = `${todoName}<br>${todoSelect}`;

  // delete Todoes
  const deleteIcon = document.createElement("i");
  deleteIcon.setAttribute("class", "fa-solid fa-trash-can");
  deleteIcon.addEventListener("click", function (event) {
    // alert();
    // remove li from DOM
    console.log(event.target);
    event.target.parentElement.remove();
    // remove li from todos array   // remove li from localStorage
    todos.splice(todosIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos)); // new todo updated Add
  
  });
  li.appendChild(deleteIcon);
  itemList.appendChild(li);
}

// for ui dispaly
function renderTodos(todos) {
  // loop overly an arry, and create li element and append to the doM
  todos.forEach(function (todo) {
    // let li = document.createElement("li");
    // li.setAttribute("class", "messageBox");
    // li.innerHTML = `${todo.name}<br>${todo.select}`;
    // itemList.appendChild(li);
    createListItem(todo.name, todo.select, itemList); // common code of onload ui and storage createListItem
  });
}

//check is todos exixt in local-Storage
const storedTodos = localStorage.getItem("todos");
// if exist
if (storedTodos) {
  // pars todo JSone.parse todos
  const parsestoredTodos = JSON.parse(storedTodos);
  todos = parsestoredTodos; // to prevent exesting valiu ovverride
  console.log(parsestoredTodos);
  renderTodos(todos); // call renderTodos function on load
}

itemForm.addEventListener("submit", function (event) {
  event.preventDefault();
  //   console.log("hii");
  //   console.log(itemForm.title.value, itemForm.select.value);// access value
  //  console.log(titleInput.value, selectInput.value);
  let todoName = titleInput.value;
  let todoSelect = selectInput.value;

  const itemObj = {
    name: todoName,
    select: todoSelect,
    completed: false,
  };
  todos.push(itemObj);

  titleInput.value = "";
  selectInput.value = "";

  localStorage.setItem("todos", JSON.stringify(todos)); // set my todos data in localStorage
  //create li
  //   const li = document.createElement("li");
  // set in the innerHtml and set in the class
  //   li.setAttribute("class", "messageBox");
  //   li.innerHTML = `${todoName}<br>${todoSelect}`;
  //   itemList.appendChild(li);
  createListItem(todoName, todoSelect, itemList); // common code of onload ui and storage createListItem
});
