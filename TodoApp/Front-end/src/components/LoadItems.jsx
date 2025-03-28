import { useContext, useEffect, useState } from "react";
import { TodoItemsContext } from "../store/TodoItemsContext";
import { todoItemToClientModel } from "../utils/ModelUtil";

const LoadItems = () => {
  const { todoItems, addAllTodoItems } = useContext(TodoItemsContext);
  const [isLoading, setIsLoading] = useState(false);
 
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3000/todos");
        const items = await response.json();
        const newItems = items.map(todoItemToClientModel);
        addAllTodoItems(newItems);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchTodos();
  }, []);
  

  return (
    <>
      {isLoading && (
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <span className="block mt-2 text-gray-500">Loading...</span>
        </div>
      )}
      {!isLoading && todoItems.length === 0 && (
        <p className="text-center text-gray-700">Enjoy your day</p>
      )}
    </>
  );
};

export default LoadItems;
