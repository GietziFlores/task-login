import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Alert from '../components/common/Alert';
import Loading from '../components/common/Loading';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    workArea: '',
    profilePicture: null, // Cambiar a file
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        workArea: user.workArea || '',
        profilePicture: null, // No pre-cargar archivo
        description: user.description || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validación: todos los campos deben estar llenos
    if (!formData.workArea || !formData.description.trim()) {
      setError('Todos los campos son obligatorios');
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('workArea', formData.workArea);
      formDataToSend.append('description', formData.description);
      if (formData.profilePicture) formDataToSend.append('profilePicture', formData.profilePicture);

      const response = await api.put('/auth/profile', formDataToSend);
      setUser({ ...user, ...response.data });
      setSuccess('Perfil actualizado exitosamente');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <Loading />;

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="mb-0">
            <i className="fas fa-user-edit me-2 text-primary"></i>
            Mi Perfil
          </h1>
          <p className="text-muted mt-1">Personaliza tu información de perfil</p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-edit me-2"></i>
                Editar Perfil
              </h5>
            </div>
            <div className="card-body">
              <Alert message={error} />
              <Alert message={success} type="success" />

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <i className="fas fa-briefcase me-1"></i>
                    Área de Trabajo
                  </label>
                  <select
                    className="form-select"
                    name="workArea"
                    value={formData.workArea}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar área</option>
                    <option value="Recursos Humanos">Recursos Humanos</option>
                    <option value="Tecnología de la Información">Tecnología de la Información</option>
                    <option value="Finanzas">Finanzas</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Ventas">Ventas</option>
                    <option value="Operaciones">Operaciones</option>
                    <option value="Legal">Legal</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <i className="fas fa-camera me-1"></i>
                    Foto de Perfil (PNG)
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="profilePicture"
                    accept="image/png"
                    onChange={handleChange}
                  />
                  <div className="form-text">
                    Solo archivos PNG, máximo 5MB
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    <i className="fas fa-align-left me-1"></i>
                    Descripción Breve
                  </label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Cuéntanos un poco sobre ti..."
                    maxLength="500"
                  />
                  <div className="form-text">
                    {formData.description.length}/500 caracteres
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save me-2"></i>
                      Guardar Cambios
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">
                <i className="fas fa-eye me-2"></i>
                Vista Previa
              </h5>
            </div>
            <div className="card-body text-center">
              <div className="mb-3">
                {user.profilePicture ? (
                  <img
                    src={`http://localhost:3000${user.profilePicture}`}
                    alt="Foto de perfil"
                    className="rounded-circle"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=Usuario';
                    }}
                  />
                ) : (
                  <div
                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto"
                    style={{ width: '100px', height: '100px', fontSize: '2rem' }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <h5 className="mb-1">{user.name}</h5>
              <p className="text-muted mb-2">{user.email}</p>
              {formData.workArea && (
                <p className="mb-2">
                  <i className="fas fa-briefcase me-1"></i>
                  {formData.workArea}
                </p>
              )}
              {formData.description && (
                <p className="text-muted small">{formData.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;