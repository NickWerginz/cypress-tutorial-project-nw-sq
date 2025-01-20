/* eslint react/prop-types: 0 */
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import styles from "./TodoItem.module.css";

const TodoItem = (props) => {
    const [editingTitle, setEditingTitle] = useState(false);
    const [editingCategory, setEditingCategory] = useState(false);
    const [editingPriority, setEditingPriority] = useState(false);
    const [newCategory, setNewCategory] = useState("");

    const handleTitleEditing = () => {
        setEditingTitle(true);
    };

    const handleCategoryEditing = () => {
        setEditingCategory(true);
    };

    const handlePriorityEditing = () => {
        setEditingPriority(true);
    };

    const handleUpdatedDone = (event) => {
        if (event.key === "Enter" || event.type === "blur") {
            setEditingTitle(false);
            setEditingCategory(false);
            setEditingPriority(false);
        }
    };

    const isDueSoon = (dueDate) => {
        const now = new Date();
        const due = new Date(dueDate);
        const diff = due - now;
        return diff > 0 && diff <= 24 * 60 * 60 * 1000; // Innerhalb von 24 Stunden
    };

    const completedStyle = {
        fontStyle: "italic",
        color: "#a9a9a9",
        opacity: 0.6,
        textDecoration: "line-through",
    };

    const dueSoonStyle = isDueSoon(props.todo.dueDate)
        ? { backgroundColor: "#ffcccb" } // Rot bei naher Fälligkeit
        : {};

    const { completed, id, title, priority, category, dueDate } = props.todo;

    const priorityColor = (priority) => {
        if (priority === "High") return "#FF6347"; // Rot
        if (priority === "Medium") return "#FFD700"; // Gelb
        if (priority === "Low") return "#32CD32"; // Grün
        return "#000";
    };

    const handleCategoryChange = (e) => {
        if (newCategory && !props.categories.includes(newCategory)) {
            props.addCategory(newCategory); // Neue Kategorie zur Liste hinzufügen
        }
        setNewCategory(e.target.value);
    };

    return (
        <li
            className={styles.item}
            data-type="todo-item"
            style={{ ...dueSoonStyle, padding: "10px", borderBottom: "1px solid #ddd" }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* Checkbox */}
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={completed}
                    onChange={() => props.handleChangeProps(id)}
                    name="checkbox"
                />

                {/* Titel */}
                <div style={{ flex: 2 }}>
                    <span
                        onDoubleClick={handleTitleEditing}
                        style={completed ? completedStyle : null}
                    >
                        {editingTitle ? (
                            <input
                                type="text"
                                className={styles.textInput}
                                value={title}
                                onChange={(e) => props.setUpdate(e.target.value, id)}
                                onKeyDown={handleUpdatedDone}
                                onBlur={handleUpdatedDone}
                            />
                        ) : (
                            title
                        )}
                    </span>
                </div>

                {/* Priorität */}
                <div style={{ flex: 1, textAlign: "center" }}>
                    {editingPriority ? (
                        <select
                            value={priority}
                            onChange={(e) => props.updatePriorityProps(id, e.target.value)}
                            onBlur={handleUpdatedDone}
                            className={styles.priorityDropdown}
                        >
                            <option value="High">Hoch</option>
                            <option value="Medium">Mittel</option>
                            <option value="Low">Niedrig</option>
                        </select>
                    ) : (
                        <span
                            onDoubleClick={handlePriorityEditing}
                            className={styles.priority}
                            style={{
                                backgroundColor: priorityColor(priority),
                                color: "#fff",
                                padding: "5px 10px",
                                borderRadius: "5px",
                            }}
                        >
                            {priority}
                        </span>
                    )}
                </div>

                {/* Kategorie */}
                <div style={{ flex: 1, textAlign: "center" }}>
                    {editingCategory ? (
                        <div>
                            <select
                                value={category}
                                onChange={(e) => props.updateCategoryProps(id, e.target.value)}
                                onBlur={handleUpdatedDone}
                                className={styles.categoryDropdown}
                            >
                                <option value="Privat">Privat</option>
                                <option value="Arbeit">Arbeit</option>
                                <option value="Sonstiges">Sonstiges</option>
                            </select>

                            <input
                                type="text"
                                placeholder="Neue Kategorie hinzufügen"
                                value={newCategory}
                                onChange={handleCategoryChange}
                                onBlur={handleUpdatedDone}
                                className={styles.newCategoryInput}
                            />
                        </div>
                    ) : (
                        <span onDoubleClick={handleCategoryEditing}>
                            {category || "Keine Kategorie"}
                        </span>
                    )}
                </div>

                {/* Fälligkeitsdatum */}
                <div style={{ flex: 1, textAlign: "center" }}>
                    <span
                        className={styles.dueDate}
                        style={{
                            color: isDueSoon(dueDate) ? "#FF6347" : "#000",
                        }}
                    >
                        {dueDate ? new Date(dueDate).toLocaleDateString() : "Kein Fälligkeitsdatum"}
                    </span>
                </div>

                {/* Löschen-Button */}
                <button
                    data-set="delete-todo-btn"
                    onClick={() => props.deleteTodoProps(id)}
                    style={{
                        backgroundColor: "#f8f8f8",
                        color: "#888",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    <FaTrash style={{ color: "orangered", fontSize: "16px" }} />
                </button>
            </div>
        </li>
    );
};

export default TodoItem;
