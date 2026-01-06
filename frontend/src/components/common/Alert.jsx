const Alert = ({ message, type = 'danger' }) => {
  if (!message) return null;

  const getIcon = (type) => {
    const icons = {
      danger: 'fas fa-exclamation-triangle',
      success: 'fas fa-check-circle',
      warning: 'fas fa-exclamation-circle',
      info: 'fas fa-info-circle'
    };
    return icons[type] || 'fas fa-info-circle';
  };

  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      <i className={`bi ${getIcon(type)} me-2`}></i>
      {message}
      <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
    </div>
  );
};

export default Alert;