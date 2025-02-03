import { TodoItemsContext } from "../store/TodoItemsContext";
import { todoItemToClientModel } from "../utils/ModelUtil";
import Button from "./Button";
import { useContext, useState } from "react";

const TodoItem = ({ id, todoText, todoDate,completed }) => {
  const { deleteTodoItem } = useContext(TodoItemsContext);
  const [isChecked, setIsChecked] = useState(completed);
  console.log(isChecked)

  const formattedDate = new Date(todoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const deleteHandler = async () => {
    console.log("Deleting item", id);
  
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const deletedItem = await response.json();
      const data = todoItemToClientModel(deletedItem);
  
      deleteTodoItem(data.id); // Remove the item from state/UI
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  

  const toggleHandler = async () => {
    console.log("Toggling item", id);
  
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !isChecked }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const updatedItem = await response.json();
      const clientUpdatedItem = todoItemToClientModel(updatedItem);
  
      setIsChecked(clientUpdatedItem.completed);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };
  

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <input checked={isChecked} onChange={toggleHandler} type="checkbox" className="mr-4 w-5 h-5 text-pink-600 bg-gray-100 border-gray-300 rounded-full focus:ring-0 cursor-pointer" />
      <div className="flex-1 text-gray-700 truncate text-start">{todoText}</div>
      <div className="text-gray-500 text-sm">{formattedDate}</div>
      <div className="ml-4">
        <Button btnType="danger" btnText="Delete" handler={deleteHandler} />
      </div>
    </div>
  );
};

export default TodoItem;
