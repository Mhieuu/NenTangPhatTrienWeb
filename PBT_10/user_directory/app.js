const api = {
  baseURL: "https://jsonplaceholder.typicode.com",
  async getUsers() { const res = await fetch(`${this.baseURL}/users`); if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); },
  async getUser(id) { const res = await fetch(`${this.baseURL}/users/${id}`); if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); },
  async createUser(data) { const res = await fetch(`${this.baseURL}/users`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }); if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); },
  async updateUser(id, data) { const res = await fetch(`${this.baseURL}/users/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }); if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); },
  async deleteUser(id) { const res = await fetch(`${this.baseURL}/users/${id}`, { method: "DELETE" }); if (!res.ok) throw new Error(`HTTP ${res.status}`); return true; },
};

const ui = {
  renderUsers(users) {
    userGrid.textContent = "";
    const fragment = document.createDocumentFragment();
    users.forEach((user) => fragment.appendChild(createUserCard(user)));
    userGrid.appendChild(fragment);
  },
  showLoading() { loading.classList.remove("hidden"); },
  hideLoading() { loading.classList.add("hidden"); },
  showError(message) { messageBox.textContent = message; messageBox.className = "state error"; messageBox.classList.remove("hidden"); },
  showSuccess(message) { messageBox.textContent = message; messageBox.className = "state"; messageBox.classList.remove("hidden"); },
};

const userForm = document.querySelector("#userForm");
const nameInput = document.querySelector("#nameInput");
const emailInput = document.querySelector("#emailInput");
const searchInput = document.querySelector("#searchInput");
const submitUserBtn = document.querySelector("#submitUserBtn");
const cancelEditBtn = document.querySelector("#cancelEditBtn");
const userGrid = document.querySelector("#userGrid");
const loading = document.querySelector("#loading");
const messageBox = document.querySelector("#message");

let users = [];
let editingId = null;

function createUserCard(user) {
  const card = document.createElement("article");
  card.className = "user-card";

  const name = document.createElement("h3");
  name.textContent = user.name;
  const email = document.createElement("p");
  email.textContent = user.email;

  const actions = document.createElement("div");
  actions.className = "actions";

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => startEdit(user));

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.textContent = "Delete";
  deleteBtn.style.background = "#ef4444";
  deleteBtn.addEventListener("click", () => removeUser(user.id));

  actions.append(editBtn, deleteBtn);
  card.append(name, email, actions);
  return card;
}

function filteredUsers() {
  const keyword = searchInput.value.trim().toLowerCase();
  return users.filter((user) => user.name.toLowerCase().includes(keyword) || user.email.toLowerCase().includes(keyword));
}

function render() {
  ui.renderUsers(filteredUsers());
}

function resetForm() {
  editingId = null;
  userForm.reset();
  submitUserBtn.textContent = "Add user";
  cancelEditBtn.classList.add("hidden");
}

function startEdit(user) {
  editingId = user.id;
  nameInput.value = user.name;
  emailInput.value = user.email;
  submitUserBtn.textContent = "Update user";
  cancelEditBtn.classList.remove("hidden");
}

async function removeUser(id) {
  if (!confirm("Delete user?")) return;
  try {
    ui.showLoading();
    await api.deleteUser(id);
    users = users.filter((user) => user.id !== id);
    render();
    ui.showSuccess("Deleted successfully");
  } catch (error) {
    ui.showError(error.message);
  } finally {
    ui.hideLoading();
  }
}

userForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const payload = { name: nameInput.value.trim(), email: emailInput.value.trim() };

  try {
    ui.showLoading();
    if (editingId) {
      const updated = await api.updateUser(editingId, payload);
      users = users.map((user) => (user.id === editingId ? { ...user, ...updated } : user));
      ui.showSuccess("Updated successfully");
    } else {
      const created = await api.createUser(payload);
      users.unshift({ id: created.id || Date.now(), ...payload });
      ui.showSuccess("Created successfully");
    }
    render();
    resetForm();
  } catch (error) {
    ui.showError(error.message);
  } finally {
    ui.hideLoading();
  }
});

searchInput.addEventListener("input", render);
cancelEditBtn.addEventListener("click", resetForm);

async function init() {
  try {
    ui.showLoading();
    users = await api.getUsers();
    render();
  } catch (error) {
    ui.showError(error.message);
  } finally {
    ui.hideLoading();
  }
}

init();
