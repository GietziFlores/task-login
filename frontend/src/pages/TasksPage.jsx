import { useState, useEffect } from 'react';
import api from '../services/api';
import TaskList from '../components/Tasks/TaskList';
import TaskForm from '../components/Tasks/TaskForm';
import Alert from '../components/common/Alert';
import Loading from '../components/common/Loading';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (err) {
      setError('Error al cargar tareas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (taskData) => {
    try {
      await api.post('/tasks', taskData);
      setSuccess('Tarea creada exitosamente');
      setShowForm(false);
      fetchTasks();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error al crear tarea');
    }
  };

  const handleUpdate = async (taskData) => {
    try {
      await api.put(`/tasks/${editingTask._id}`, taskData);
      setSuccess('Tarea actualizada exitosamente');
      setShowForm(false);
      setEditingTask(null);
      fetchTasks();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error al actualizar tarea');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
      try {
        await api.delete(`/tasks/${taskId}`);
        setSuccess('Tarea eliminada exitosamente');
        fetchTasks();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Error al eliminar tarea');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  if (loading) return <Loading />;

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-0">
            <i className="fas fa-list-check me-2 text-primary"></i>
            Mis Tareas
          </h1>
          <p className="text-muted mt-1">Gestiona tus tareas de manera eficiente</p>
        </div>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => setShowForm(true)}
        >
          <i className="fas fa-plus-circle me-2"></i>
          Nueva Tarea
        </button>
      </div>

      <Alert message={error} />
      <Alert message={success} type="success" />

      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? handleUpdate : handleCreate}
          onCancel={handleCancel}
        />
      )}

      <TaskList
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TasksPage;