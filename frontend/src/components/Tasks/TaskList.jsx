import TaskItem from './TaskItem';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="fas fa-tasks fs-1 text-muted mb-3"></i>
        <h4 className="text-muted">No hay tareas aún</h4>
        <p className="text-muted">¡Crea tu primera tarea para comenzar!</p>
      </div>
    );
  }

  return (
    <div className="task-grid">
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;