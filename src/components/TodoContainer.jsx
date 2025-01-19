import React, { useState, useEffect } from "react";
import InputTodo from "./InputTodo";
import TodoItem from "./TodoItem";

const TodoContainer = () => {
    const [todos, setTodos] = useState([]);
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
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoContainer;
