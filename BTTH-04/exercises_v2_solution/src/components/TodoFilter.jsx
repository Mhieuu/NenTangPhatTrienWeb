import React from "react";

function TodoFilter({ filter, setFilter }) {
  const filters = [
    { key: "all", label: "Tất cả" },
    { key: "active", label: "Chưa xong" },
    { key: "completed", label: "Hoàn thành" },
  ];

  return (
    <div className="todo-filter" role="tablist" aria-label="Lọc todo">
      {filters.map((item) => (
        <button
          key={item.key}
          type="button"
          className={filter === item.key ? "active" : ""}
          onClick={() => setFilter(item.key)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;