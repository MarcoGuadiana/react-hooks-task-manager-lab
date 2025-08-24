import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

const API_URL = "http://localhost:7000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from JSON Server
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, []);

  // Add task
  const handleAddTask = async (title) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          completed: false,
          id: Date.now(),
        }),
      });
      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Toggle completion
  const handleToggleTask = async (id) => {
    try {
      const task = tasks.find((t) => t.id === id);
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      const updated = await res.json();
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updated : t))
      );
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onToggleTask={handleToggleTask} />
    </div>
  );
}

export default App;
