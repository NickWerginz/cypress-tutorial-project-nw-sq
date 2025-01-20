<<<<<<< HEAD
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> 0c8fa05ccc08a5bb119d1e6e5308a6f84709e3cc
import InputTodo from "./InputTodo";
import TodoItem from "./TodoItem";

const TodoContainer = () => {
    const [todos, setTodos] = useState([]);
<<<<<<< HEAD
    const [filterPriority, setFilterPriority] = useState("All");
    const [filterCategory, setFilterCategory] = useState("All");
    const [sortByDate, setSortByDate] = useState(false);

    const addTodo = (title, priority, category, dueDate) => {
=======
    const [sortOption, setSortOption] = useState("priorityHighToLow"); // Standard-Sortierung

    // Todos beim Laden der Komponente vom Backend holen
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch("http://localhost:8082/api/todos");
                const data = await response.json();
                setTodos(data);
            } catch (error) {
                console.error("Fehler beim Abrufen der Todos:", error);
            }
        };

        fetchTodos();
    }, []);

    // Neues Todo erstellen und an das Backend senden
    const addTodo = async (title, priority, category, dueDate) => {
>>>>>>> 0c8fa05ccc08a5bb119d1e6e5308a6f84709e3cc
        const newTodo = {
            title,
            completed: false,
            priority,
            category,
            dueDate,
        };

        try {
            const response = await fetch("http://localhost:8082/api/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTodo),
            });

            const createdTodo = await response.json();
            console.log("Erstelltes Todo:", createdTodo); // Debugging
            setTodos((prevTodos) => [...prevTodos, createdTodo]);
        } catch (error) {
            console.error("Fehler beim Erstellen eines Todos:", error);
        }
    };

<<<<<<< HEAD
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
=======
    // Todo-Status (completed) im Backend aktualisieren
    const handleChange = async (id) => {
        const todo = todos.find((todo) => todo.id === id);
        const updatedTodo = { ...todo, completed: !todo.completed };

        try {
            const response = await fetch(`http://localhost:8082/api/todos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTodo),
            });
            const data = await response.json();

            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === id ? data : todo
                )
            );
        } catch (error) {
            console.error("Fehler beim Aktualisieren des Todos:", error);
        }
    };

    // Todo im Backend löschen
    const deleteTodo = async (id) => {
        try {
            await fetch(`http://localhost:8082/api/todos/${id}`, {
                method: "DELETE",
            });
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error("Fehler beim Löschen des Todos:", error);
        }
    };

    // Todo-Titel im Backend aktualisieren
    const setUpdate = async (updatedTitle, id) => {
        const todo = todos.find((todo) => todo.id === id);
        const updatedTodo = { ...todo, title: updatedTitle };

        try {
            const response = await fetch(`http://localhost:8082/api/todos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTodo),
            });
            const data = await response.json();

            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === id ? data : todo
                )
            );
        } catch (error) {
            console.error("Fehler beim Aktualisieren des Titels:", error);
        }
    };

    // Priorität eines Todos im Backend aktualisieren
    const updatePriority = async (id, newPriority) => {
        const todo = todos.find((todo) => todo.id === id);
        const updatedTodo = { ...todo, priority: newPriority };

        try {
            const response = await fetch(`http://localhost:8082/api/todos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTodo),
            });
            const data = await response.json();

            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === id ? data : todo
                )
            );
        } catch (error) {
            console.error("Fehler beim Aktualisieren der Priorität:", error);
        }
    };

    // Todos sortieren basierend auf der Sortieroption
    const getSortedTodos = () => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        const sorted = [...todos];

        if (sortOption === "priorityHighToLow") {
            sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        } else if (sortOption === "priorityLowToHigh") {
            sorted.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        }

        return sorted;
    };

    // Sortieroption ändern
    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    return (
        <div>
            <h1 data-test="todo-header">Todo App</h1>
>>>>>>> 0c8fa05ccc08a5bb119d1e6e5308a6f84709e3cc
            <InputTodo addTodoProps={addTodo} />

            {/* Sortieroption auswählen */}
            <div>
                <label htmlFor="sort">Sortieren nach: </label>
                <select id="sort" value={sortOption} onChange={handleSortChange}>
                    <option value="priorityHighToLow">Hohe Priorität zuerst</option>
                    <option value="priorityLowToHigh">Niedrige Priorität zuerst</option>
                </select>
            </div>

            <ul>
                {getSortedTodos().map((todo) => (
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
