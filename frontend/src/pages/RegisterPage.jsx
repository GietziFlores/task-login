import Register from '../components/Auth/Register';

const RegisterPage = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-4">
      <div className="w-100" style={{ maxWidth: '450px' }}>
        <Register />
      </div>
    </div>
  );
};

export default RegisterPage;