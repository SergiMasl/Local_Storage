"use strict";

let todoControl = document.querySelector(".todo-control");
let headerInput = document.querySelector(".header-input");
let todoContainer = document.querySelector(".todo-container");
let todoList = document.querySelector(".todo-list");
let todoCompleted = document.querySelector(".todo-completed");

let todoData = [];
var data = localStorage.getItem('todoData');

if(data !== null){
 todoData = JSON.parse(data);
};

const render = function () {
  todoList.textContent = "";
  todoCompleted.textContent = "";

  todoData.forEach(function (item, index) {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    li.innerHTML =
      "<span class='text-todo'>" +
      item.value +
      "</span>" +
      "<div class='todo-buttons'>" +
      "<button class='todo-remove'></button>" +
      "<button class='todo-complete'></button>" +
      "</div>";

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoComplete = li.querySelector(".todo-complete");

    btnTodoComplete.addEventListener("click", function () {
      item.completed = !item.completed;
      localStorage.setItem('todoData', JSON.stringify(todoData));
      render();
    });

    const btnTodoDelet = li.querySelector('.todo-remove');

    btnTodoDelet.addEventListener('click', function() {
      let newItems =[];

      todoData.forEach(function(todoItem, todoIndex){
        if (todoIndex !== index){
          newItems.push(todoItem);
          todoData = newItems;
        }
      });
      todoData = newItems;

      localStorage.setItem('todoData', JSON.stringify(todoData));

      render();
    });
  });
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();
  if(headerInput.value === ''){
    alert('Не введено значения!')
    return;
  }

  const newTodo = {
    value: headerInput.value,
    completed: false,
  };

  todoData.push(newTodo);
  localStorage.setItem('todoData', JSON.stringify(todoData));
  render();
  headerInput.value = '';
});


render();


