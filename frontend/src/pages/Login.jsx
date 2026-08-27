import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('owner');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Temporary redirecting based on selected role
        if (role === 'owner') {
            navigate('/owner/dashboard');
        } else {
            navigate('/tenant/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full space-y-6">
                <div className="text-center">
                    <div className="inline-flex p-3 bg-indigo-100 rounded-xl mb-3">
                        <span className="text-3xl">🏠</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
                    <p className="text-slate-500 text-sm mt-1">Select your role to sign in</p>
                </div>

                {/* Role Selector */}
                <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                        type="button"
                        onClick={() => setRole('owner')}
                        className={`flex-1 py-2 text-sm font-semibold rounded-lg transition ${role === 'owner' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600'
                            }`}
                    >
                        Landlord / Owner
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole('tenant')}
                        className={`flex-1 py-2 text-sm font-semibold rounded-lg transition ${role === 'tenant' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600'
                            }`}
                    >
                        Tenant
                    </button>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            placeholder="user@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
                    >
                        Sign In as {role === 'owner' ? 'Landlord' : 'Tenant'}
                    </button>
                </form>

                <p className="text-center text-sm text-slate-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;