/* eslint react/prop-types: 0 */
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import styles from "./TodoItem.module.css";

const TodoItem = (props) => {
    const [editing, setEditing] = useState(false);

    const handleEditing = () => {
        setEditing(true);
    };

    const handleUpdatedDone = (event) => {
        if (event.key === "Enter") {
            setEditing(false);
        }
    };

    const completedStyle = {
        fontStyle: "italic",
        color: "#a9a9a9",
        opacity: 0.6,
        textDecoration: "line-through",
    };

    const { completed, id, title, priority } = props.todo;

    const viewMode = {};
    const editMode = {};

    if (editing) {
        viewMode.display = "none";
    } else {
        editMode.display = "none";
    }

    useEffect(
        () => () => {
            console.log("Cleaning up...");
        },
        []
    );

    // Dynamische Prioritätsfarbe basierend auf dem Wert
    const priorityColor = (priority) => {
        if (priority === "High") return "#FF6347"; // Rot
        if (priority === "Medium") return "#FFD700"; // Gelb
        if (priority === "Low") return "#32CD32"; // Grün
        return "#000"; // Standardfarbe
    };

    return (
        <li className={styles.item} data-type="todo-item">
            <div onDoubleClick={handleEditing} style={viewMode}>
                <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={completed}
                    onChange={() => props.handleChangeProps(id)}
                    name="checkbox"
                />
                <button
                    data-set="delete-todo-btn"
                    onClick={() => props.deleteTodoProps(id)}
                    style={{ backgroundColor: "#f0f0f0", color: "#888" }}
                >
                    <FaTrash style={{ color: "orangered", fontSize: "16px" }} />
                </button>
                <span style={completed ? completedStyle : null}>{title}</span>
                {/* Priorität mit dynamischer Farbe */}
                <span
                    className={styles.priority}
                    style={{ backgroundColor: priorityColor(priority) }}
                >
          Priority: {priority}
        </span>
                {/* Dropdown zum Ändern der Priorität */}
                <select
                    value={priority}
                    onChange={(e) => props.updatePriorityProps(id, e.target.value)}
                    className={styles.priorityDropdown}
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>
            <input
                type="text"
                style={editMode}
                className={styles.textInput}
                value={title}
                onChange={(e) => {
                    props.setUpdate(e.target.value, id);
                }}
                onKeyDown={handleUpdatedDone}
            />
        </li>
    );
};

export default TodoItem;
