const form = document.getElementById("itemForm");
const titleInput = document.getElementById("title");
const selectInput = document.getElementById("select");
const itemList = document.getElementById("itemList");
const clearAll = document.getElementById("clearAll");
const selectAll = document.getElementById("selectAll");
const selectCompleted = document.getElementById("selectCompleted");
const selectUncompleted = document.getElementById("selectUncompleted");

let todos = [];

itemForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // console.log(titleInput.value, selectInput.value);
  addTodo();
});

// -------------------clearAllTodos() Call--------------------
clearAll.addEventListener("click", () => {
  clearAllTodos();
});

//  ------------change Button Color----------------------

function changeButtonColor(buttonName) {
  selectAll.classList.remove("selected-button");
  selectCompleted.classList.remove("selected-button");
  selectUncompleted.classList.remove("selected-button");

  buttonName.classList.add("selected-button");
}

//----------Filter select All------------------------
selectAll.addEventListener("click", () => {
  filters("all");
  changeButtonColor(selectAll);
});

//----------Filter completed------------------------
selectCompleted.addEventListener("click", () => {
  filters("completed");
  changeButtonColor(selectCompleted);
});

//----------Filter uncompleted------------------------
selectUncompleted.addEventListener("click", () => {
  filters("uncompleted");
  changeButtonColor(selectUncompleted);
});

// -------------Add todo Function-----------------------------------

function addTodo() {
  let todoName = titleInput.value;
  let todoSelect = selectInput.value;
  if (todoName !== "" && todoSelect !== "") {
    const itemObj = {
      id: Date.now(),
      name: todoName,
      select: todoSelect,
      completed: false,
    };
    todos.push(itemObj);
    addToLocalStorage(todos);
    createListItem(todos); // render todo
    titleInput.value = "";
    selectInput.value = "";
  }
}

//------------Render Todo items----------------------------

function createListItem(todos) {
  itemList.innerHTML = "";
  todos.forEach(function (todo) {
    //main messageBox
    const li = document.createElement("li");
    li.classList.add("messageBox");

    // todoItem name and Desc Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todoItemDesc");
    todoDiv.innerHTML = `<div class="v1"><div class="first-title"><h1 class="h1">${todo.name}</h1></div><div class="second-title"><p class="p">${todo.select}</p></div></div>`;

    if (todo.completed) {
      todoDiv.classList.add("checked");
    }

    // delete and chek buttion div
    const iconDiv = document.createElement("div");
    iconDiv.classList.add("iconContainer");

    // check button
    const checkIcon = document.createElement("i");
    checkIcon.setAttribute("class", "fa-solid fa-check");

    if (todo.completed) {
      checkIcon.classList.add("select-button");
    }
    checkIcon.addEventListener("click", function () {
      todoDiv.classList.add("checked"); // text-decoration: line-through;
      checkIcon.classList.add("select-button"); // select button - color change and disabled;
      completeTodo(todo.id);
    });

    // delete icon
    const deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("class", "fa-solid fa-trash-can");
    deleteIcon.addEventListener("click", function () {
      deleteTodo(todo.id);
    });

    iconDiv.appendChild(checkIcon);
    iconDiv.appendChild(deleteIcon);
    li.appendChild(todoDiv);
    li.appendChild(iconDiv);
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

//------------ delete todo------------------------------------------------

function deleteTodo(todoId) {
  const index = todos.findIndex(
    (listOfTodoItem) => listOfTodoItem.id === todoId
  );
  if (index !== -1) {
    todos.splice(index, 1);
  }
  addToLocalStorage(todos);
  createListItem(todos);
}

//------------- complete todo----------------------------------------------

function completeTodo(todoId) {
  const index = todos.findIndex(
    (listOfTodoItem) => listOfTodoItem.id === todoId
  );

  if (index !== -1) {
    todos[index].completed = !todos[index].completed;
    addToLocalStorage(todos);
  }
}

//------------- Clear All----------------------------------------------
function clearAllTodos() {
  todos = [];
  addToLocalStorage(todos);
  createListItem(todos);
}

//---------------Filters------------------------------------------------

function filters(type) {
  let filterItems = [];

  switch (type) {
    case "uncompleted":
      filterItems = todos.filter((todo) => !todo.completed);
      break;
    case "completed":
      filterItems = todos.filter((todo) => todo.completed);
      break;
    default:
      filterItems = todos;
  }

  createListItem(filterItems);
}

// -------------------------Form Validation---------------------------------
function validatons() {
  const titleName = titleInput.value;
  const selectTodo = selectInput.value;
  let text;
  if (titleName === "") {
    text = "Please Add Task";
  } else {
    text = "";
  }
  document.getElementById("taskError").innerHTML = text;

  let selectValue;
  if (selectTodo === "") {
    selectValue = "Please Select The Importance";
  } else {
    selectValue = "";
  }
  document.getElementById("selectError").innerHTML = selectValue;
}
getFromLocalStorage();



