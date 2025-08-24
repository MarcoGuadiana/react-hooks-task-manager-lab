import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import SearchBar from "./SearchBar";
import TaskList from "./TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState("");

  // Fetch tasks
  useEffect(() => {
    fetch("http://localhost:6001/tasks")
      .then((r) => r.json())
      .then((data) => setTasks(data));
  }, []);

  // Add new task
  function addTask(title) {
    const newTask = { id: Date.now(), title, completed: false };
    setTasks([...tasks, newTask]);
    // optionally also POST to server
    fetch("http://localhost:6001/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
  }

  // Toggle complete
  function toggleComplete(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    const task = tasks.find((t) => t.id === id);
    fetch(`http://localhost:6001/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    });
  }

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      <SearchBar query={query} setQuery={setQuery} />
      <TaskList tasks={tasks} query={query} toggleComplete={toggleComplete} />
    </div>
  );
}

export default App;