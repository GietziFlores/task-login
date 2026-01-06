import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false,
    assignee: ''
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        completed: task.completed,
        assignee: task.assignee ? task.assignee._id : ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        completed: false,
        assignee: ''
      });
    }
  }, [task]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (user?.role === 'admin') {
        try {
          const response = await api.get('/users');
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
    };
    fetchUsers();
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">
          <i className={`fas ${task ? 'fa-edit' : 'fa-plus-circle'} me-2`}></i>
          {task ? 'Editar Tarea' : 'Nueva Tarea'}
        </h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          onClick={onCancel}
        ></button>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="fas fa-tag me-1"></i>
              Título
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ingresa el título de la tarea"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="fas fa-align-left me-1"></i>
              Descripción
            </label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Describe la tarea (opcional)"
            />
          </div>

          {user?.role === 'admin' && (
            <div className="mb-3">
              <label className="form-label fw-semibold">
                <i className="fas fa-user me-1"></i>
                Asignar a
              </label>
              <select
                className="form-select"
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
              >
                <option value="">Sin asignar</option>
                {users.map(u => (
                  <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
                ))}
              </select>
            </div>
          )}

          {task && (
            <div className="mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="completed"
                  checked={formData.completed}
                  onChange={handleChange}
                  id="completedCheck"
                />
                <label className="form-check-label fw-semibold" htmlFor="completedCheck">
                  <i className="fas fa-check-circle me-1"></i>
                  Marcar como completada
                </label>
              </div>
            </div>
          )}

          <div className="d-flex gap-2 justify-content-end">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onCancel}
            >
              <i className="fas fa-times me-1"></i>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              <i className={`fas ${task ? 'fa-check' : 'fa-plus-circle'} me-1`}></i>
              {task ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;