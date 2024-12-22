import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import Popup from "./components/Popup";
import { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";

function App() {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupConfig, setPopupConfig] = useState({});

  function persistData(newList) {
    localStorage.setItem("todos", JSON.stringify({ todos: newList }));
  }

  function handleAddTodos(newTodo) {
    if (!newTodo.trim()) return;
    const newTodoList = Array.isArray(todos) ? [...todos] : [];

    if (editIndex !== null) {
      if (editIndex >= 0 && editIndex < newTodoList.length) {
        newTodoList.splice(editIndex, 0, newTodo);
      } else {
        newTodoList.push(newTodo);
      }
    } else {
      newTodoList.push(newTodo);
    }

    persistData(newTodoList);
    setTodos(newTodoList);
    setEditIndex(null);
    setTodoValue("");
  }

  function showPopup(config) {
    setPopupConfig(config);
    setIsPopupOpen(true);
  }

  function handleDeleteTodo(index, todoName) {
    showPopup({
      title: "Confirm Deletion",
      message: `Are you sure you want to delete the todo: "${todoName}"?`,
      confirmText: "Delete",
      cancelText: "Cancel",
      onConfirm: () => {
        const newTodoList = todos.filter((_, todoIndex) => todoIndex !== index);
        persistData(newTodoList);
        setTodos(newTodoList);
        setIsPopupOpen(false);
      },
    });
    if (editIndex === index) setEditIndex(null);
  }

  function handleEditTodo(index) {
    if (editIndex === null) {
      const valueToBeEdited = todos[index];
      setTodoValue(valueToBeEdited);
      setEditIndex(index);

      //deletion logic without popup
      const newTodoList = todos.filter((_, todoIndex) => todoIndex !== index);
      persistData(newTodoList);
      setTodos(newTodoList);
    }
  }

  useEffect(() => {
    const localTodos = localStorage.getItem("todos");
    if (localTodos) {
      try {
        const parsed = JSON.parse(localTodos);
        setTodos(parsed.todos || []);
      } catch (e) {
        console.error("Invalid localStorage data, resetting todos.");
        setTodos([]);
      }
    }
  }, []);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination || destination.index === source.index) {
      return;
    }

    const newTodos = Array.isArray(todos) ? [...todos] : [];
    const [movedItem] = newTodos.splice(source.index, 1);
    newTodos.splice(destination.index, 0, movedItem);

    setTodos(newTodos);
    persistData(newTodos);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <TodoInput
          todoValue={todoValue}
          setTodoValue={setTodoValue}
          handleAddTodos={handleAddTodos}
        />
        <TodoList
          todos={todos}
          handleDeleteTodo={(index) => handleDeleteTodo(index, todos[index])}
          handleEditTodo={handleEditTodo}
          editIndex={editIndex}
        />
      </DragDropContext>
      <Popup
        isOpen={isPopupOpen}
        title={popupConfig.title}
        message={popupConfig.message}
        onConfirm={popupConfig.onConfirm}
        onCancel={() => setIsPopupOpen(false)}
        confirmText={popupConfig.confirmText}
        cancelText={popupConfig.cancelText}
      />
    </>
  );
}

export default App;
