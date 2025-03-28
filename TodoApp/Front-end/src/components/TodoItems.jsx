import { TodoItemsContext } from "../store/TodoItemsContext";
import TodoItem from "./TodoItem";
import { useContext } from "react";

const TodoItems = () => {
  const { todoItems } = useContext(TodoItemsContext);

  return (
    <div className="divide-y divide-gray-200 max-w-lg">
      {todoItems.map((item) => (
        <TodoItem
          key={item.id}
          id={item.id}
          todoText={item.todoText}
          todoDate={item.todoDate}
          completed={item.completed}
        />
      ))}
    </div>
  );
};

export default TodoItems;
