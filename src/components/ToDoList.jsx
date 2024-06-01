import React, { useState, useEffect } from 'react';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput('');
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleCompletion = (index) => {
    setTasks(tasks.map((task, i) => i === index ? { ...task, completed: !task.completed } : task));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", fontSize: "900", marginLeft: "auto" }}>
      <h1>To-Do List</h1>
      <span style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a new task"
          style={{ height: "24px", paddingLeft: "16px", paddingRight: "16px", fontSize: "16px", lineHeight: "20px", borderRadius: "8px", borderWidth: "1px", borderColor: "transparent" }}
        />
        <button style={{ marginLeft: "10px", height: "24px", borderRadius: "8px", borderColor: "transparent", fontSize: "16px", color: "#1a1a1a", cursor: "pointer" }} onClick={addTask}>Add Task</button>
      </span>
      <div>
        <button style={{ marginLeft: "10px", height: "24px", borderRadius: "8px", borderColor: "transparent", fontSize: "16px", color: "#1a1a1a", cursor: "pointer" }} onClick={() => setFilter('all')}>All</button>
        <button style={{ marginLeft: "10px", height: "24px", borderRadius: "8px", borderColor: "transparent", fontSize: "16px", color: "#1a1a1a", cursor: "pointer" }} onClick={() => setFilter('completed')}>Completed</button>
        <button style={{ marginLeft: "10px", height: "24px", borderRadius: "8px", borderColor: "transparent", fontSize: "16px", color: "#1a1a1a", cursor: "pointer" }} onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index} style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ marginBottom: "10px" }}>
              <span
                style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: "pointer", marginRight: "10px" }}
                onClick={() => toggleCompletion(index)}
              >
                {task.text}
              </span>
              <button style={{ marginLeft: "10px", height: "24px", borderRadius: "8px", borderColor: "transparent", fontSize: "16px", color: "#1a1a1a", cursor: "pointer" }} onClick={() => removeTask(index)}>Remove</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;

