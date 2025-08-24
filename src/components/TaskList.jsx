function TaskList({ tasks, onToggleTask }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task.id}
          data-testid={task.id}
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            cursor: "pointer",
          }}
          onClick={() => onToggleTask(task.id)}
        >
          {task.title}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
