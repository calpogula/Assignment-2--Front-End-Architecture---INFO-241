import { useState } from 'react'
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
  { id: 5, text: 'Buy a gift card for Dad', completed: false }
]

function App() {
  const [tasks, setTasks] = useState(startingTasks)
  const [filter, setFilter] = useState('All')

  function addTask(text) {
    setTasks(previousTasks => {
      const lastId = Math.max(0, ...previousTasks.map(task => task.id))
      return [...previousTasks, { id: lastId + 1, text: text, completed: false }]
    })
  }

  function toggleTask(id) {
    setTasks(previousTasks => previousTasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      }
      return task
    }))
  }

  function deleteTask(id) {
    setTasks(previousTasks => previousTasks.filter(task => task.id !== id))
  }

  const completedCount = tasks.filter(task => task.completed).length
  const filteredTasks = tasks.filter(task => {
    if (filter === 'Active') return !task.completed
    if (filter === 'Completed') return task.completed
    return true
  })

  return (
    <>
      <header className="main-header">
        <button className="menu-button" type="button">
          <img src={menuIcon} alt="Menu" />
        </button>
        <div className="search-box">
          <img src={searchIcon} alt="" />
          <input type="text" placeholder="Quick find" aria-label="Quick find" />
        </div>
        <TaskCounter total={tasks.length} completed={completedCount} />
      </header>

      <div className="page-layout">
        <nav className="sidebar">
          <ul>
            <li className="active">
              <a href="#inbox">
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
          <section className="tasks">
            <h1>Inbox</h1>
            <div className="task-filters">
              <button type="button" className={filter === 'All' ? 'selected' : ''} onClick={() => setFilter('All')}>All</button>
              <span>|</span>
              <button type="button" className={filter === 'Active' ? 'selected' : ''} onClick={() => setFilter('Active')}>Active</button>
              <span>|</span>
              <button type="button" className={filter === 'Completed' ? 'selected' : ''} onClick={() => setFilter('Completed')}>Completed</button>
            </div>
            <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
            <TaskForm onAdd={addTask} />
          </section>
        </main>
      </div>
    </>
  )
}

export default App
