import { useState, useEffect } from 'react';
import api from '../services/api';
import UserList from '../components/Users/UserList';
import Alert from '../components/common/Alert';
import Loading from '../components/common/Loading';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (err) {
      setError('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/users/${userId}`, { role: newRole });
      setUsers(users.map(user =>
        user._id === userId ? { ...user, role: newRole } : user
      ));
      setSuccess('Rol actualizado exitosamente');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error al actualizar rol');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.')) {
      try {
        await api.delete(`/users/${userId}`);
        setUsers(users.filter(user => user._id !== userId));
        setSuccess('Usuario eliminado exitosamente');
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Error al eliminar usuario');
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-0">
            <i className="fas fa-users me-2 text-success"></i>
            Gestión de Usuarios
          </h1>
          <p className="text-muted mt-1">Administra usuarios y permisos del sistema</p>
        </div>
        <div className="d-flex align-items-center">
          <span className="badge bg-primary fs-6 me-3">
            <i className="fas fa-user-circle me-1"></i>
            {users.length} usuarios
          </span>
        </div>
      </div>

      <Alert message={error} />
      <Alert message={success} type="success" />

      <UserList
        users={users}
        onRoleChange={handleRoleChange}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default UsersPage;