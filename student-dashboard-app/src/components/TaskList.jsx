import { useState } from 'react';
import { initialTasks } from '../data/mockData';

const PRIORITIES = ['High', 'Medium', 'Low'];

function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(`${dateString}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function TaskList({ compact = false }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');

  const visibleTasks = compact ? tasks.filter((t) => !t.completed).slice(0, 3) : tasks;

  function handleAddTask(event) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    setTasks((prev) => [
      {
        id: Date.now(),
        title: trimmed,
        dueDate,
        priority,
        completed: false,
      },
      ...prev,
    ]);

    setTitle('');
    setDueDate('');
    setPriority('Medium');
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    );
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  return (
    <section className="task-list" aria-labelledby="tasks-heading">
      <h2 id="tasks-heading" className="section-title">
        {compact ? 'Upcoming Tasks' : 'Task Manager'}
      </h2>

      {!compact && (
        <form className="task-form" onSubmit={handleAddTask}>
          <div className="task-form__row">
            <input
              type="text"
              className="task-form__input"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-label="Task title"
            />
            <input
              type="date"
              className="task-form__input task-form__input--date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              aria-label="Due date"
            />
            <select
              className="task-form__select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              aria-label="Priority"
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn--primary">
              Add Task
            </button>
          </div>
        </form>
      )}

      <ul className="task-items">
        {visibleTasks.length === 0 ? (
          <li className="task-item task-item--empty">No tasks yet. Add one above!</li>
        ) : (
          visibleTasks.map((task) => (
            <li
              key={task.id}
              className={`task-item ${task.completed ? 'task-item--completed' : ''}`}
            >
              <label className="task-item__check">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span className="task-item__checkbox" />
              </label>
              <div className="task-item__content">
                <p className="task-item__title">{task.title}</p>
                <div className="task-item__meta">
                  {task.dueDate && (
                    <span className="task-item__date">Due {formatDate(task.dueDate)}</span>
                  )}
                  <span className={`priority-tag priority-tag--${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </div>
              </div>
              {!compact && (
                <button
                  type="button"
                  className="task-item__remove"
                  onClick={() => removeTask(task.id)}
                  aria-label={`Remove ${task.title}`}
                >
                  ×
                </button>
              )}
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
