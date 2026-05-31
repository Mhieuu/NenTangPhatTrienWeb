const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");
const countDisplay = document.querySelector("#todoCount");
const clearCompletedBtn = document.querySelector("#clearCompleted");
const filterButtons = document.querySelectorAll(".filters button");

let todos = JSON.parse(localStorage.getItem("todos") || "[]");
let currentFilter = "all";

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getVisibleTodos() {
  if (currentFilter === "active") return todos.filter((todo) => !todo.completed);
  if (currentFilter === "completed") return todos.filter((todo) => todo.completed);
  return todos;
}

function updateCount() {
  const remaining = todos.filter((todo) => !todo.completed).length;
  countDisplay.textContent = `${remaining} item${remaining === 1 ? "" : "s"} left`;
}

function renderTodos() {
  list.textContent = "";
  const visibleTodos = getVisibleTodos();

  visibleTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item${todo.completed ? " completed" : ""}`;
    li.dataset.id = todo.id;

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const actions = document.createElement("div");
    actions.className = "todo-actions";

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.textContent = "Edit";
    editBtn.className = "ghost";

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "❌";
    deleteBtn.className = "delete-btn";
    deleteBtn.dataset.action = "delete";

    actions.append(editBtn, deleteBtn);
    li.append(text, actions);
    list.appendChild(li);
  });

  updateCount();
  saveTodos();
}

function addTodo(text) {
  todos.unshift({ id: Date.now(), text, completed: false });
  renderTodos();
}

function setFilter(filter) {
  currentFilter = filter;
  filterButtons.forEach((button) => button.classList.toggle("active", button.dataset.filter === filter));
  renderTodos();
}

function startEdit(li, todo) {
  if (li.querySelector("input")) return;
  const text = li.querySelector(".todo-text");
  const inputField = document.createElement("input");
  inputField.className = "edit-input";
  inputField.value = todo.text;
  text.replaceWith(inputField);
  inputField.focus();

  const finishEdit = () => {
    const nextValue = inputField.value.trim();
    if (nextValue) {
      todo.text = nextValue;
    }
    renderTodos();
  };

  inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") finishEdit();
    if (event.key === "Escape") renderTodos();
  });
  inputField.addEventListener("blur", finishEdit);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  addTodo(value);
  input.value = "";
  input.focus();
});

list.addEventListener("click", (event) => {
  const item = event.target.closest(".todo-item");
  if (!item) return;
  const todo = todos.find((entry) => String(entry.id) === item.dataset.id);
  if (!todo) return;

  if (event.target.dataset.action === "delete") {
    todos = todos.filter((entry) => entry.id !== todo.id);
    renderTodos();
    return;
  }

  if (event.target.classList.contains("todo-text")) {
    todo.completed = !todo.completed;
    renderTodos();
  }
});

list.addEventListener("dblclick", (event) => {
  const item = event.target.closest(".todo-item");
  if (!item) return;
  const todo = todos.find((entry) => String(entry.id) === item.dataset.id);
  if (!todo) return;
  startEdit(item, todo);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

clearCompletedBtn.addEventListener("click", () => {
  todos = todos.filter((todo) => !todo.completed);
  renderTodos();
});

renderTodos();
