import React from "react";
import { Draggable } from "@hello-pangea/dnd";

export default function TodoCard(props) {
  const { children, handleDeleteTodo, index, handleEditTodo, editIndex } =
    props;

  return (
    <Draggable draggableId={index.toString()} index={index}>
      {(provided) => (
        <li
          className="todoItem"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
          <div className="actionsContainer">
            <button
              onClick={() => handleEditTodo(index)}
              disabled={editIndex !== null && editIndex !== index}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
            <button onClick={() => handleDeleteTodo(index)}>
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </li>
      )}
    </Draggable>
  );
}
