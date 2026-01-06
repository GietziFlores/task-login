import { useAuth } from '../../context/AuthContext';

const TaskItem = ({ task, onEdit, onDelete }) => {
  const { user } = useAuth();
  return (
    <div className="card task-card h-100">
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="card-title mb-0 flex-grow-1 me-2">{task.title}</h5>
          <span className={`badge ${task.completed ? 'bg-success' : 'bg-warning'} fs-6`}>
            <i className={`fas ${task.completed ? 'fa-check-circle' : 'fa-clock'} me-1`}></i>
            {task.completed ? 'Completada' : 'Pendiente'}
          </span>
        </div>

        {task.description && (
          <p className="card-text text-muted flex-grow-1">{task.description}</p>
        )}

        {task.assignee && (
          <p className="card-text small text-primary">
            <i className="fas fa-user me-1"></i>
            Asignada a: {task.assignee.name}
          </p>
        )}

        {user?.role === 'admin' && task.user && (
          <p className="card-text small text-secondary">
            <i className="fas fa-user-edit me-1"></i>
            Creada por: {task.user.name}
          </p>
        )}

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              <i className="fas fa-calendar me-1"></i>
              {new Date(task.createdAt).toLocaleDateString()}
            </small>
            <div className="btn-group btn-group-sm">
              <button
                className="btn btn-outline-primary"
                onClick={() => onEdit(task)}
                title="Editar tarea"
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDelete(task._id)}
                title="Eliminar tarea"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;