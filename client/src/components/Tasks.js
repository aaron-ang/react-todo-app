import React from "react";
import Task from "./Task";

function Tasks({ tasks, onDelete, onToggle }) {
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
  );
}

export default Tasks;
