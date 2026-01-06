import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="fade-in">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-white mb-3">Bienvenido a TaskFlow</h1>
        <p className="lead text-white-50">Hola, {user?.name} • Rol: {user?.role}</p>
      </div>

      <div className="dashboard-cards">
        <div className="card h-100">
          <div className="card-body text-center p-4">
            <div className="mb-3">
              <i className="fas fa-tasks fs-1 text-primary"></i>
            </div>
            <h5 className="card-title">Mis Tareas</h5>
            <p className="card-text text-muted">Gestiona tus tareas personales de manera eficiente.</p>
            <a href="/tasks" className="btn btn-primary btn-lg">
              <i className="fas fa-arrow-right me-2"></i>
              Ver Tareas
            </a>
          </div>
        </div>

        {user?.role === 'admin' && (
          <div className="card h-100">
            <div className="card-body text-center p-4">
              <div className="mb-3">
                <i className="fas fa-users fs-1 text-success"></i>
              </div>
              <h5 className="card-title">Gestión de Usuarios</h5>
              <p className="card-text text-muted">Administra usuarios y permisos del sistema.</p>
              <a href="/users" className="btn btn-outline-primary btn-lg">
                <i className="fas fa-cogs me-2"></i>
                Gestionar Usuarios
              </a>
            </div>
          </div>
        )}

        <div className="card h-100">
          <div className="card-body text-center p-4">
            <div className="mb-3">
              <i className="fas fa-chart-line fs-1 text-info"></i>
            </div>
            <h5 className="card-title">Estadísticas</h5>
            <p className="card-text text-muted">Próximamente: métricas y reportes de productividad.</p>
            <button className="btn btn-outline-secondary btn-lg" disabled>
              <i className="fas fa-chart-bar me-2"></i>
              En Desarrollo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;