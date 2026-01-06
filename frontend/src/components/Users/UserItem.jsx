const UserItem = ({ user, onRoleChange, onDelete }) => {
  const handleRoleChange = (e) => {
    onRoleChange(user._id, e.target.value);
  };

  const getRoleBadge = (role) => {
    const badges = {
      user: 'bg-secondary',
      admin: 'bg-danger'
    };
    return badges[role] || 'bg-secondary';
  };

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <div className="avatar-circle me-2 bg-primary text-white d-flex align-items-center justify-content-center" style={{width: '32px', height: '32px', borderRadius: '50%'}}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <span className="fw-semibold">{user.name}</span>
        </div>
      </td>
      <td>
        <span className="text-muted">{user.email}</span>
      </td>
      <td>
        <select
          className={`form-select form-select-sm d-inline-block w-auto badge ${getRoleBadge(user.role)} text-white border-0`}
          value={user.role}
          onChange={handleRoleChange}
          style={{minWidth: '100px'}}
        >
          <option value="user" className="bg-light text-dark">User</option>
          <option value="admin" className="bg-light text-dark">Admin</option>
        </select>
      </td>
      <td>
        <small className="text-muted">
          {new Date(user.createdAt).toLocaleDateString()}
        </small>
      </td>
      <td className="text-center">
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => onDelete(user._id)}
          title="Eliminar usuario"
        >
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default UserItem;