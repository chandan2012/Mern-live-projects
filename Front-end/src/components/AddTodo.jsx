import { TodoItemsContext } from "../store/TodoItemsContext";
import { todoItemToClientModel } from "../utils/ModelUtil";
import Button from "./Button";
import { useRef, useContext } from "react";

const AddTodo = () => {
  const todoTextInput = useRef();
  const todoDateInput = useRef();
  const { addTodoItem } = useContext(TodoItemsContext);  

  const addHandler = () => {
    const todoText = todoTextInput.current.value;
    const todoDate = todoDateInput.current.value;    
    if(todoText.length === 0 || todoDate.length === 0) return alert('Please enter a todo and date');
    console.log(todoText.length)
    todoTextInput.current.value = '';
    todoDateInput.current.value = '';
    fetch("http://localhost:3000/todos", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task: todoText,
        date: todoDate,
      }),
    })
      .then((res) => res.json())
      .then((serverItem) => {
        const { id, todoText, todoDate } = todoItemToClientModel(serverItem);
        addTodoItem(id, todoText, todoDate);
      });
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
