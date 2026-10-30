function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={task.completed ? 'task-item completed' : 'task-item'}>
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
      >
        &times;
      </button>
    </li>
  )
}

export default TaskItem
