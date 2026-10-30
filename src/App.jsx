import { useRef, useState } from 'react'
import TaskList from './components/TaskList.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskCounter from './components/TaskCounter.jsx'
import menuIcon from './assets/menu_icon.png'
import searchIcon from './assets/search_icon.png'
import inboxIcon from './assets/inbox_icon.png'
import calendarIcon from './assets/calendar_icon.png'
import upcomingIcon from './assets/upcoming_icon.png'
import './App.css'

const startingTasks = [
  { id: 1, text: 'Call Mom', completed: false },
  { id: 2, text: 'Buy the new issue of Scientific American', completed: false },
  { id: 3, text: 'Return the textbook to Josie', completed: false },
  { id: 4, text: 'Buy the new album by Rake', completed: false },
  { id: 5, text: 'Buy a gift card for Dad', completed: false },
]

function App() {
  const [tasks, setTasks] = useState(startingTasks)
  const [filter, setFilter] = useState('All')
  const nextId = useRef(6)

  function addTask(text) {
    const id = nextId.current
    nextId.current += 1
    setTasks(currentTasks => [
      ...currentTasks,
      { id, text, completed: false },
    ])
  }

  function toggleTask(id) {
    setTasks(currentTasks => currentTasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  function deleteTask(id) {
    setTasks(currentTasks => currentTasks.filter(task => task.id !== id))
  }

  const completedCount = tasks.filter(task => task.completed).length
  const visibleTasks = tasks.filter(task => {
    if (filter === 'Active') return !task.completed
    if (filter === 'Completed') return task.completed
    return true
  })

  return (
    <>
      <header className="main-header">
        <button className="menu-button" type="button" aria-label="Menu">
          <img src={menuIcon} alt="" />
        </button>

        <div className="search-box">
          <img src={searchIcon} alt="" />
          <input type="text" placeholder="Quick find" aria-label="Quick find" />
        </div>

        <TaskCounter total={tasks.length} completed={completedCount} />
      </header>

      <div className="page-layout">
        <nav className="sidebar" aria-label="Main navigation">
          <ul>
            <li className="active">
              <a href="#inbox" aria-current="page">
                <img src={inboxIcon} alt="" />
                Inbox <span className="count">{tasks.length}</span>
              </a>
            </li>
            <li>
              <a href="#inbox">
                <img src={calendarIcon} alt="" />
                Today <span className="count">{tasks.length}</span>
              </a>
            </li>
            <li>
              <a href="#inbox">
                <img src={upcomingIcon} alt="" />
                Upcoming
              </a>
            </li>
          </ul>
        </nav>

        <main className="main-content" id="inbox">
          <section className="tasks" aria-labelledby="inbox-heading">
            <h1 id="inbox-heading">Inbox</h1>

            <div className="task-filters" aria-label="Filter tasks">
              {['All', 'Active', 'Completed'].map((option, index) => (
                <span className="filter-option" key={option}>
                  {index > 0 && <span className="filter-separator" aria-hidden="true">|</span>}
                  <button
                    type="button"
                    className={filter === option ? 'selected' : ''}
                    aria-pressed={filter === option}
                    onClick={() => setFilter(option)}
                  >
                    {option}
                  </button>
                </span>
              ))}
            </div>

            <TaskList
              tasks={visibleTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
            <TaskForm onAdd={addTask} />
          </section>
        </main>
      </div>
    </>
  )
}

export default App
