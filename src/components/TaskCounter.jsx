import checkIcon from '../assets/check_icon.png'

function TaskCounter({ total, completed }) {
  return (
    <p className="task-counter">
      <img src={checkIcon} alt="" />
      {total} / {completed}
    </p>
  )
}

export default TaskCounter
