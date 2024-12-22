export default function TodoInput(props) {
  const { handleAddTodos, todoValue, setTodoValue } = props;

  return (
    <header>
      <input
        value={todoValue}
        onChange={(e) => setTodoValue(e.target.value)}
        type="text"
        placeholder="Enter todo...."
      />
      <button
        onClick={() => {
          handleAddTodos(todoValue);
        }}
      >
        Add
      </button>
    </header>
  );
}
