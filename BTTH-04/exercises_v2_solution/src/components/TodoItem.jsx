import React from "react";

function formatDateTime(value) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${todo.done ? "is-done" : ""}`}>
      <label className="todo-item__left">
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
        />
        <span>
          <strong>{todo.text}</strong>
          <small>{formatDateTime(todo.createdAt)}</small>
        </span>
      </label>
      <button type="button" className="danger ghost" onClick={() => onDelete(todo.id)}>
        Xóa
      </button>
    </li>
  );
}

export default TodoItem;