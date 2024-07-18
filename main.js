const form = document.getElementById("itemForm");
const titleInput = document.getElementById("title");
const selectInput = document.getElementById("select");
const itemList = document.getElementById("itemList");
const clearAll = document.getElementById("clearAll");
const selectAll = document.getElementById("selectAll");
const selectCompleted = document.getElementById("selectCompleted");
const selectUncompleted = document.getElementById("selectUncompleted");

let todos = [];

itemForm.addEventListener("submit", function (event) {

  event.preventDefault();
  // console.log("hii");
  // console.log(titleInput.value, selectInput.value);
  addTodo();
});

// -------------------clearAllTodos() Call--------------------
clearAll.addEventListener("click", function () {
  clearAllTodos();
});

//----------Filter select All------------------------
selectAll.addEventListener("click", function () {
  filters("all");
});

//----------Filter completed------------------------
selectCompleted.addEventListener("click", function () {
  filters("completed");
});

//----------Filter uncompleted------------------------
selectUncompleted.addEventListener("click", function () {
  filters("uncompleted");
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
    // console.log(todos);
  }
}

//------------Render Todo items----------------------------

function createListItem(todos) {
  itemList.innerHTML = "";
  todos.forEach(function (todo) {
    //main messageBox
    const li = document.createElement("li");
    li.setAttribute("class", "messageBox");


    // todoItem name and Desc Div
    const todoDiv = document.createElement("div");
    todoDiv.setAttribute("class", "todoItemDesc");
    todoDiv.innerHTML = `<div class="v1"><div class="first-title">${todo.name}</div><div class="second-title">${todo.select}</div></div>`;

    if (todo.completed) {
      todoDiv.classList.add("checked");
    }

    // delete and chek buttion div
    const iconDiv = document.createElement("div");
    iconDiv.setAttribute("class", "iconContainer");

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
      // console.log("todosid", todo.id);
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
  const index = todos.findIndex(function (listOfTodoItem) {
    return listOfTodoItem.id === todoId;
  });
  if (index !== -1) {
    todos.splice(index, 1);
  }
  addToLocalStorage(todos);
  createListItem(todos);
}

//------------- complete todo----------------------------------------------
function completeTodo(todoId) {
  const index = todos.findIndex(function (listOfTodoItem) {
    return listOfTodoItem.id === todoId;
  });

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
      filterItems = todos.filter(function (todo) {
        return !todo.completed;
      });
      break;
    case "completed":
      filterItems = todos.filter(function (todo) {
        return todo.completed;
      });
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
