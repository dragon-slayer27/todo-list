import { Droppable } from "@hello-pangea/dnd";
import TodoCard from "./TodoCard.jsx";

export default function TodoList(props) {
  const { todos = [], editIndex } = props;

  return (
    <Droppable droppableId="TodosList">
      {(provided) => (
        <ul
          className="main"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {todos.length > 0 ? (
            todos.map((todo, todoIndex) => (
              <TodoCard
                {...props}
                key={todoIndex}
                index={todoIndex}
                editIndex={editIndex}
              >
                <h3>{todoIndex + 1 + "."}</h3>
                <p>{todo}</p>
              </TodoCard>
            ))
          ) : (
            <h4 style={{ textAlign: "center" }}>No Todos To Show...</h4>
          )}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}
