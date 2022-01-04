import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import { useState, useEffect } from "react"
import axios from "axios";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://127.0.0.1:5000/')
      setTasks(result.data)
    };

    fetchData();
    }, [])

  // Add task
  const addTask = async (task) => {
    // Update backend
    await axios.post('http://127.0.0.1:5000/', {"text":task.text, "reminder": task.reminder})
    // GET new data
    const result = await axios.get('http://127.0.0.1:5000/')
    setTasks(result.data)
  }

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task._ID !== id))
    // Update backend
    axios.delete(`http://127.0.0.1:5000/${id}`)
  }

  // Toggle reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task._ID === id ? { ...task, reminder: !task.reminder } : task))

    // Update backend (state is not updated by now? still need to !task.reminder)
    const task = tasks.find( ({_ID}) => _ID === id )
    console.log(task.reminder)
    axios.put(`http://127.0.0.1:5000/${id}`, {"text": task.text, "reminder": !task.reminder})
  }

  return (
    <div className='container'>
      <Header onAdd={() => setShowAddTask(!showAddTask)} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : ('No Tasks To Show')}
    </div>
  );
}

export default App;
