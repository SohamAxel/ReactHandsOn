import { useContext, useRef, useState } from "react";
import { TodoContext } from "../App";

export function TodoItem({ id, name, completed }) {
  const { toggleTodo, deleteTodo, editTodo } = useContext(TodoContext);
  const [startEdit, setStartEdit] = useState(false);
  const inputRef = useRef();

  const handleEditClick = () => {
    if(startEdit) {
      editTodo(id, inputRef.current.value)
    }
    setStartEdit(p => !p);
  }

  return (
    <li className="list-item">
      <label className="list-item-label">
        <input
          type="checkbox"
          data-list-item-checkbox
          checked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        {startEdit ? (
          <input id="name" defaultValue={name} ref={inputRef} />
        ) : (
          <span data-list-item-text>{name}</span>
        )}
      </label>
      {}
      <button data-button-edit onClick={handleEditClick}>
        { startEdit? "Save" : "Edit"}
      </button>
      <button data-button-delete onClick={(e) => deleteTodo(id)}>
        Delete
      </button>
    </li>
  );
}
