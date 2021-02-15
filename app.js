// selectors
const THEINPUT = document.querySelector(".todo-input");
const PLUSICON = document.querySelector(".todo-button");
const TODOLIST = document.querySelector(".todo-list");
const FILTEROPTION = document.querySelector(".filter-todos");
//event listeners
window.addEventListener("DOMContentLoaded", getTodos);
window.addEventListener("load", () => {
  THEINPUT.focus();
});
PLUSICON.addEventListener("click", addTodo);
TODOLIST.addEventListener("click", deleteCheck);
FILTEROPTION.addEventListener("click", filterTodo);
//functions
function addTodo(event) {
  //prevent page from reloading
  event.preventDefault();
  if (THEINPUT.value.length > 0) {
    //create div that contains the todo
    const TODODIV = document.createElement("div");
    TODODIV.classList.add("todo");
    // create the li
    const NEWTODO = document.createElement("li");
    NEWTODO.innerHTML = THEINPUT.value;
    NEWTODO.classList.add("todo-item");
    //apends the li to the div
    TODODIV.append(NEWTODO);
    // push todos to my local storage
    saveLocalTodos(THEINPUT.value);
    //create the check mark button
    const CHECKBUTTON = document.createElement("button");
    //add fontawesome icon
    CHECKBUTTON.innerHTML = '<i class="fas fa-check"></i>';
    //add class to the check button
    CHECKBUTTON.classList.add("complete-btn");
    TODODIV.append(CHECKBUTTON);
    //create the trash button
    const TRASHBTN = document.createElement("button");
    //add fontawesome icon
    TRASHBTN.innerHTML = '<i class="fas fa-trash"></i>';
    //add class to the trash button
    TRASHBTN.classList.add("trash-btn");
    TODODIV.append(TRASHBTN);
    //append the whole thing to the ul
    TODOLIST.append(TODODIV);
    //remove the input content
    THEINPUT.value = "";
    //focus on the input
    THEINPUT.focus();
  }
}
function deleteCheck(e) {
  //get clicked item
  const CLICKEDITEM = e.target;
  //Delete item
  if (CLICKEDITEM.classList.contains("trash-btn")) {
    const TODO = CLICKEDITEM.parentElement;
    //go to  the parent and animate it
    TODO.classList.add("fall");
    removeLocalTodos(TODO);
    //delete it after the animation
    TODO.addEventListener("transitionend", () => {
      TODO.remove();
    });
  } else if (CLICKEDITEM.classList.contains("complete-btn")) {
    //go to the perent and add class completed
    CLICKEDITEM.parentElement.classList.toggle("completed");
  }
}
function filterTodo(e) {
  const todos = TODOLIST.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
function saveLocalTodos(todo) {
  //check if i have todos in the local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodos() {
  let todos;
  //check if any thing is in the local storage
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    const TODODIV = document.createElement("div");
    TODODIV.classList.add("todo");
    // create the li
    const NEWTODO = document.createElement("li");
    NEWTODO.innerHTML = todo;
    NEWTODO.classList.add("todo-item");
    //apends the li to the div
    TODODIV.append(NEWTODO);
    //create the check mark button
    const CHECKBUTTON = document.createElement("button");
    //add fontawesome icon
    CHECKBUTTON.innerHTML = '<i class="fas fa-check"></i>';
    //add class to the check button
    CHECKBUTTON.classList.add("complete-btn");
    TODODIV.append(CHECKBUTTON);
    //create the trash button
    const TRASHBTN = document.createElement("button");
    //add fontawesome icon
    TRASHBTN.innerHTML = '<i class="fas fa-trash"></i>';
    //add class to the trash button
    TRASHBTN.classList.add("trash-btn");
    TODODIV.append(TRASHBTN);
    //append the whole thing to the ul
    TODOLIST.append(TODODIV);
  });
}
function removeLocalTodos(todo) {
  //check if any thing is in the local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
