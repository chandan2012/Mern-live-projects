import { TodoItemsContext } from "../store/TodoItemsContext";
import { todoItemToClientModel } from "../utils/ModelUtil";
import Button from "./Button";
import { useRef, useContext } from "react";

const AddTodo = () => {
  const todoTextInput = useRef();
  const todoDateInput = useRef();
  const { addTodoItem } = useContext(TodoItemsContext);  
  
  const addHandler = async () => {
    const todoText = todoTextInput.current.value.trim();
    const todoDate = todoDateInput.current.value.trim();
  
    if (!todoText || !todoDate) {
      return alert("Please enter a todo and date");
    }
  
    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: todoText, date: todoDate }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add todo");
      }
  
      const serverItem = await response.json();
      const newItem = todoItemToClientModel(serverItem);
      
      addTodoItem(newItem.id, newItem.todoText, newItem.todoDate);
  
      // Clear input fields after successful submission
      todoTextInput.current.value = "";
      todoDateInput.current.value = "";
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("An error occurred while adding the todo. Please try again.");
    }
  };
  
  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter Todo Here"
            ref={todoTextInput}
          />
        </div>
        <div>
          <input
            type="date"
            className="px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ref={todoDateInput}
          />
        </div>
        <div>
          <Button btnType="success" btnText="Add" handler={addHandler} />
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
