import Login from '../components/Auth/Login';

const LoginPage = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-4">
      <div className="w-100" style={{ maxWidth: '450px' }}>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;