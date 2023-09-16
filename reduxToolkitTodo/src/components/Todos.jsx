import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";
import { useState } from "react";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editText, setEditText] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);

//? Added a update functionality.
    
  const handleUpdateTodo = (id) => {
    if (editText !== "") {
      dispatch(updateTodo({ id, text: editText }));
      setEditingTodoId(null);
      setEditText("");
    }
  };

  return (
    <>
      <div>Todos</div>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            {editingTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="text-white bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900  text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                <button
                  onClick={() => handleUpdateTodo(todo.id)}
                  className="text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-md"
                >
                  Update
                </button>
              </>
            ) : (
              <>
                <div className="text-white">{todo.text}</div>
                <div className="flex gap-5">
                  <button
                    onClick={() => {
                      setEditText(todo.text);
                      setEditingTodoId(todo.id);
                    }}
                    className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => dispatch(removeTodo(todo.id))}
                    className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
