import React, { useState } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

  const handleEditInputChange = (e) => {
    setEditingText(e.target.value);
  };

  const handleEditFormSubmit = (e, index) => {
    e.preventDefault();
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: editingText } : task
    );
    setTasks(updatedTasks);
    setEditingIndex(null);
  };

  const handleDeleteClick = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Enter a new task"
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
            }}
          >
            {editingIndex === index ? (
              <form onSubmit={(e) => handleEditFormSubmit(e, index)}>
                <input
                  type="text"
                  value={editingText}
                  onChange={handleEditInputChange}
                />
                <button type="submit">Save</button>
              </form>
            ) : (
              <span onClick={() => toggleTaskCompletion(index)}>{task.text}</span>
            )}
            <button onClick={() => handleEditClick(index)}>Edit</button>
            <button onClick={() => handleDeleteClick(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
