const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');
const dataInput = document.getElementById('task-input');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let id = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

function newTodo() {
  const data = {
    id: id++,
    task: dataInput.value,
    isCompleted: false
  };

  tasks.push(data);

  saveToLocalStorage();
  render(tasks);
  updateCounter();
}

function renderTodo(data) {
  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${data.id}" ${data.isCompleted ? 'checked' : ''} onchange="checkTodo(${data.id})"/>
      <label for="${data.id}"> <span class="${data.isCompleted ? 'text-success text-decoration-line-through' : ''}"> ${data.task}</span></label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${data.id})">delete</button></li>`;
}

function render(tasks) {
  const renderedTasks = tasks.map(task => renderTodo(task)).join('');
  list.innerHTML = renderedTasks;
}

function updateCounter() {
  itemCountSpan.textContent = tasks.length;
  const unchecked = tasks.filter(task => !task.isCompleted).length;
  uncheckedCountSpan.textContent = unchecked;
}

function deleteTodo(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveToLocalStorage();
  render(tasks);
  updateCounter();
}

function checkTodo(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      return {
        id: task.id,
        task: task.task,
        isCompleted: !task.isCompleted
      };
    }
    return task;
  });
  saveToLocalStorage();
  render(tasks);
  updateCounter();
}

function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function initApp() {
  render(tasks);
  updateCounter();
}

document.addEventListener('DOMContentLoaded', initApp);