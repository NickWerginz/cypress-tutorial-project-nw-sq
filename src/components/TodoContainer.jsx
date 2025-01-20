// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import InputTodo from "./InputTodo";
import TodoItem from "./TodoItem";

const TodoContainer = () => {
    const [todos, setTodos] = useState([]);
    const [filterPriority, setFilterPriority] = useState("All");
    const [filterCategory, setFilterCategory] = useState("All");
    const [sortByDate, setSortByDate] = useState(false);

    const addTodo = (title, priority, category, dueDate) => {
        const newTodo = {
            id: new Date().getTime(),
            title,
            completed: false,
            priority,
            category,
            dueDate,
        };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    };

    const handleChange = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const setUpdate = (updatedTitle, id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, title: updatedTitle } : todo
            )
        );
    };

    const updatePriority = (id, newPriority) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, priority: newPriority } : todo
            )
        );
    };

    const updateCategory = (id, newCategory) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, category: newCategory } : todo
            )
        );
    };

    const sortedTodos = todos
        .filter(
            (todo) =>
                (filterPriority === "All" || todo.priority === filterPriority) &&
                (filterCategory === "All" || todo.category === filterCategory)
        )
        .sort((a, b) => {
            if (sortByDate) {
                const dateA = new Date(a.dueDate);
                const dateB = new Date(b.dueDate);
                return dateA - dateB; // Sortieren nach Datum
            }
            return 0; // Keine zusätzliche Sortierung
        });

    return (
        <div>
            {/* Filter für Priorität */}
            <div style={{ marginBottom: "10px" }}>
                <label htmlFor="filter-priority" style={{ marginRight: "10px" }}>
                    Filter by Priority:
                </label>
                <select
                    id="filter-priority"
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    style={{ padding: "5px", fontSize: "16px" }}
                >
                    <option value="All">All</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>
            {/* Filter für Kategorie */}
            <div style={{ marginBottom: "10px" }}>
                <label htmlFor="filter-category" style={{ marginRight: "10px" }}>
                    Filter by Category:
                </label>
                <select
                    id="filter-category"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    style={{ padding: "5px", fontSize: "16px" }}
                >
                    <option value="All">All</option>
                    {[...new Set(todos.map((todo) => todo.category))]
                        .filter((cat) => cat)
                        .map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                </select>
            </div>
            {/* Sortieren nach Datum */}
            <div style={{ marginBottom: "10px" }}>
                <label htmlFor="sort-by-date" style={{ marginRight: "10px" }}>
                    Sort by Date:
                </label>
                <input
                    type="checkbox"
                    id="sort-by-date"
                    checked={sortByDate}
                    onChange={(e) => setSortByDate(e.target.checked)}
                />
            </div>
            <InputTodo addTodoProps={addTodo} />
            <ul>
                {sortedTodos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        handleChangeProps={handleChange}
                        deleteTodoProps={deleteTodo}
                        setUpdate={setUpdate}
                        updatePriorityProps={updatePriority}
                        updateCategoryProps={updateCategory}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoContainer;
