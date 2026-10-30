function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item${task.completed ? ' completed' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span>{task.text}</span>
      </label>
      <button
        type="button"
        className="delete-task"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete ${task.text}`}
        title="Delete task"
      >
        &times;
      </button>
    </li>
  )
}

export default TaskItem
