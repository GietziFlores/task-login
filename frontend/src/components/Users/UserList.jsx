import UserItem from './UserItem';

const UserList = ({ users, onRoleChange, onDelete }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-header bg-light">
        <h5 className="mb-0">
          <i className="fas fa-table me-2"></i>
          Lista de Usuarios
        </h5>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th className="border-0">
                  <i className="fas fa-user me-1"></i>
                  Nombre
                </th>
                <th className="border-0">
                  <i className="fas fa-envelope me-1"></i>
                  Email
                </th>
                <th className="border-0">
                  <i className="fas fa-shield-alt me-1"></i>
                  Rol
                </th>
                <th className="border-0">
                  <i className="fas fa-calendar me-1"></i>
                  Registro
                </th>
                <th className="border-0 text-center">
                  <i className="fas fa-cogs me-1"></i>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <UserItem
                  key={user._id}
                  user={user}
                  onRoleChange={onRoleChange}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;