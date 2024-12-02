import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

const InputTodo = (props) => {
  const [inputText, setInputText] = useState({
    title: "",
    priority: "Medium", // Default value
    category: "",
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
      props.addTodoProps(inputText.title, inputText.priority, inputText.category, inputText.dueDate);
      setInputText({
        title: "",
        priority: "Medium",
        category: "",
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
      >
        <input
            type="text"
            className="input-text"
            placeholder="Add todo..."
            value={inputText.title}
            name="title"
            onChange={onChange}
        />
        <select
            name="priority"
            value={inputText.priority}
            onChange={onChange}
            className="input-text"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <input
            type="text"
            className="input-text"
            placeholder="Category"
            value={inputText.category}
            name="category"
            onChange={onChange}
        />
        <input
            type="date"
            className="input-text"
            value={inputText.dueDate}
            name="dueDate"
            onChange={onChange}
        />
        <button data-set="add-todo-btn" className="input-submit">
          <FaPlusCircle />
        </button>
      </form>
  );
};

export default InputTodo;
