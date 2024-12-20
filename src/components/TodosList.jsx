import TodoItem from "./TodoItem";

const TodosList = (props) => (
    <ul data-set="todo-list">
      {props.todos.map((todo) => (
          <TodoItem
              key={todo.id}
              todo={todo}
              handleChangeProps={props.handleChangeProps}
              deleteTodoProps={props.deleteTodoProps}
              setUpdate={props.setUpdate}
          />
      ))}
    </ul>
);

export default TodosList;
