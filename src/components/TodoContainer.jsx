import React, { useState } from "react";
import InputTodo from "./InputTodo";
import TodoItem from "./TodoItem";

const TodoContainer = () => {
    const [todos, setTodos] = useState([]);

    // Funktion zum Hinzufügen von Todos
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

    // Funktion zum Ändern des Status (completed)
    const handleChange = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    // Funktion zum Löschen eines Todos
    const deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    // Funktion zum Aktualisieren des Titels
    const setUpdate = (updatedTitle, id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, title: updatedTitle } : todo
            )
        );
    };

    // Funktion zum Aktualisieren der Priorität
    const updatePriority = (id, newPriority) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, priority: newPriority } : todo
            )
        );
    };

    // Todos sortieren
    const sortedTodos = todos.sort((a, b) => {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    return (
        <div>
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
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoContainer;
