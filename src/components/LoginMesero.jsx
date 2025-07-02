import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function LoginMesero() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (usuario === 'mesero' && clave === '1234') {
      navigate('/mesero/panel');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300" data-aos="fade-up">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-center">Login Mesero</h2>

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={e => setClave(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 transition"
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Ingresar
        </button>
      </div>
    </div>
  );
}
