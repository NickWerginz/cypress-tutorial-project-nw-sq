import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

const InputTodo = (props) => {
  const [inputText, setInputText] = useState({
    title: "",
    priority: "Medium", // Default value
    category: "Privat", // Default category
    dueDate: "",
  });

  const onChange = (e) => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.title.trim()) {
      props.addTodoProps(
          inputText.title,
          inputText.priority,
          inputText.category,
          inputText.dueDate
      );
      setInputText({
        title: "",
        priority: "Medium",
        category: "Privat",
        dueDate: "",
      });
    } else {
      alert("Please write item");
    }
  };

  return (
      <form
          data-set="todo-form"
          onSubmit={handleSubmit}
          className="form-container"
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            padding: "10px 0",
            borderBottom: "1px solid #ddd",
          }}
      >
        {/* Titel-Eingabefeld */}
        <input
            type="text"
            className="input-text"
            placeholder="Add todo..."
            value={inputText.title}
            name="title"
            onChange={onChange}
            style={{
              flex: 2,
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
        />

        {/* Priorität-Dropdown */}
        <select
            name="priority"
            value={inputText.priority}
            onChange={onChange}
            className="input-text"
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#f9f9f9",
            }}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {/* Kategorie-Dropdown */}
        <select
            name="category"
            value={inputText.category}
            onChange={onChange}
            className="input-text"
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#f9f9f9",
            }}
        >
          <option value="Privat">Privat</option>
          <option value="Arbeit">Arbeit</option>
          <option value="Sonstiges">Sonstiges</option>
        </select>

        {/* Fälligkeitsdatum */}
        <input
            type="date"
            className="input-text"
            value={inputText.dueDate}
            name="dueDate"
            onChange={onChange}
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
        />

        {/* Hinzufügen-Button */}
        <button
            data-set="add-todo-btn"
            className="input-submit"
            style={{
              flex: 0.5,
              padding: "8px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
        >
          <FaPlusCircle />
        </button>
      </form>
  );
};

export default InputTodo;
