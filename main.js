const form = document.querySelector("#itemForm");
const titleInput = document.querySelector("#title");
const selectInput = document.querySelector("#select");
const itemList = document.querySelector("#itemList");
const filters = document.querySelectorAll(".filters");

// create empty item list
let todoItems = [];

//hendle action buttion event
const handleItem = function (itemData) {
  const items = document.querySelectorAll(".messageBox");
  items.forEach((item) => {
    if (
      item.querySelector(".vl").getAttribute("data-time") ===
      String(itemData.addedAt)
    ) {
      // done
      item.querySelector("[data-done]").addEventListener("click", function (e) {
        e.preventDefault();
        const itemIndex = todoItems.indexOf(itemData);
        const currentItem = todoItems[itemIndex];
        currentItem.isDone = currentItem.isDone ? false : true;
        todoItems.splice(itemIndex, 1, currentItem);
        setLocalStorage(todoItems);
      });
        
    }
  });
};

// get todos list
const getList = function (todoItems) {
  itemList.innerHTML = "";
  if (todoItems.length > 0) {
    todoItems.forEach((item) => {
      itemList.insertAdjacentHTML(
        "beforeend",
        `<div class="messageBox">
                <div data-time="${item.addedAt}" class="vl" >
                    <div style="margin-left: 1rem;">
                        <h5>${item.name}</h5>
                        <p>${item.select}</p>
                    </div>
                </div>
                <div>
                    <a  data-done  class="clear-button">
                        <i class="fa-solid fa-check"></i>
                    </a>
                    <a href="#" data-delete class="clear-button">
                        <i class="fas fa-trash-alt"></i>
                    </a>
                <div>
            </div>`
      );
      handleItem(item);
    });
  }
};

// get localStorage from the page
const getLocalStorage = function () {
  const todoStorage = localStorage.getItem("todoItems");
  if (todoStorage === "undefined" || todoStorage === "null") {
    todoItems = [];
  } else {
    todoItems = JSON.parse(todoStorage);
  }
  console.log("items", todoItems);
  getList(todoItems);
};

// set in localStorage
const setLocalStorage = function (todoItems) {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
};

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const itemName = titleInput.value;
    const itemImportance = selectInput.value;
    if (itemName.length === 0 || itemImportance.length === 0) {
      alert("Please enter the fields");
    } else {
      const itemObj = {
        name: itemName,
        select: itemImportance,
        isDone: false,
        addedAt: new Date().getTime(),
      };
      todoItems.push(itemObj);
      setLocalStorage(todoItems);
      //   getList(todoItems); // Update the list after adding a new item
    }
  });
  // load Items
  getLocalStorage();
});
