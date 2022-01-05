import Task from "./Task"

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <>
    {tasks.map((task) => (
      <Task 
        key={task._ID} 
        task={task}
        onDelete={onDelete} 
        onToggle={onToggle}
      />
    ))}
    </>
  )
}

export default Tasks
