import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateLogin } from '../utils/validation';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setAuthError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateLogin(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const result = login(form.email, form.password);
      if (result.success) navigate('/projects');
      else { setAuthError(result.error); setLoading(false); }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, #f59e0b 0, #f59e0b 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />

      <div className="w-full max-w-sm relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500 rounded-2xl mb-4 shadow-xl">
            <span className="text-gray-900 font-black text-2xl">CF</span>
          </div>
          <h1 className="text-white text-2xl font-bold tracking-tight">ConstructField</h1>
          <p className="text-gray-400 text-sm mt-1">Field Management Platform</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 rounded-3xl p-6 shadow-2xl border border-gray-800">
          <h2 className="text-white font-bold text-lg mb-5">Sign in to your account</h2>

          {authError && (
            <div className="mb-4 bg-red-950 border border-red-800 text-red-300 text-sm px-4 py-3 rounded-xl">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">Email address</label>
              <input
                type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="test@test.com"
                className={`w-full bg-gray-800 border rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:ring-2 transition
                  ${errors.email ? 'border-red-500 focus:ring-red-500/30' : 'border-gray-700 focus:ring-amber-500/30 focus:border-amber-500'}`}
              />
              {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange}
                  placeholder="123456"
                  className={`w-full bg-gray-800 border rounded-xl px-4 py-3 pr-11 text-white text-sm placeholder-gray-600 outline-none focus:ring-2 transition
                    ${errors.password ? 'border-red-500 focus:ring-red-500/30' : 'border-gray-700 focus:ring-amber-500/30 focus:border-amber-500'}`}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-xs">
                  {showPass ? 'HIDE' : 'SHOW'}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-gray-900
                font-bold py-3 rounded-xl transition-all text-sm mt-2 flex items-center justify-center gap-2">
              {loading ? (
                <><span className="w-4 h-4 border-2 border-gray-900/40 border-t-gray-900 rounded-full animate-spin" /> Signing in…</>
              ) : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}