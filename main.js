const form = document.getElementById("itemForm");
const titleInput = document.getElementById("title");
const selectInput = document.getElementById("select");
const itemList = document.getElementById("itemList");

let todos = [];

itemForm.addEventListener("submit", function (event) {
  event.preventDefault();
  // console.log("hii")
  // console.log(titleInput.value, selectInput.value);
  addTodo();
});

// -------------Add todo Function-----------------------------------

function addTodo() {
  let todoName = titleInput.value;
  let todoSelect = selectInput.value;

  if (todoName !== "" && todoSelect !== "") {
    const itemObj = {
      name: todoName,
      select: todoSelect,
      completed: false,
      id: Date.now(),
    };

    todos.push(itemObj);
    addToLocalStorage(todos);
    createListItem(todos); // render todo
    titleInput.value = "";
    selectInput.value = "";
    // console.log(todos);
  }
}

//------------Render Todo items----------------------------

function createListItem(todos) {
  itemList.innerHTML = "";
  todos.forEach(function (todo) {
    const li = document.createElement("li");
    li.setAttribute("class", "messageBox");
    li.innerHTML = `${todo.name}<br>${todo.select}`;
    itemList.appendChild(li);
  });
}

//------------add todos to local storage----------------------------
function addToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

//------------Get todos from local storage----------------------------
function getFromLocalStorage() {
  const getTodo = localStorage.getItem("todos");
  if (getTodo) {
    todos = JSON.parse(getTodo);
    createListItem(todos);
  }
}

getFromLocalStorage();
