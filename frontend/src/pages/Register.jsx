import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("owner");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    const handleRegister = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            alert("Account created successfully!");

            navigate("/login");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full space-y-6">

                {/* Header */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800">
                        Create Account
                    </h2>

                    <p className="text-slate-500 text-sm mt-1">
                        Join as a Landlord or Tenant
                    </p>
                </div>

                {/* Role Selection */}
                <div className="flex bg-slate-100 p-1 rounded-xl">

                    <button
                        type="button"
                        onClick={() => setRole("owner")}
                        className={`flex-1 py-2 text-sm font-semibold rounded-lg transition ${role === "owner"
                                ? "bg-indigo-600 text-white shadow-sm"
                                : "text-slate-600"
                            }`}
                    >
                        Landlord / Owner
                    </button>

                    <button
                        type="button"
                        onClick={() => setRole("tenant")}
                        className={`flex-1 py-2 text-sm font-semibold rounded-lg transition ${role === "tenant"
                                ? "bg-indigo-600 text-white shadow-sm"
                                : "text-slate-600"
                            }`}
                    >
                        Tenant
                    </button>

                </div>

                {/* Error Message */}
                {error && (
                    <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Register Form */}
                <form onSubmit={handleRegister} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Full Name
                        </label>

                        <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Email Address
                        </label>

                        <input
                            type="email"
                            required
                            placeholder="user@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Password
                        </label>

                        <input
                            type="password"
                            required
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 rounded-lg shadow-md transition"
                    >
                        {loading ? "Creating Account..." : "Register Account"}
                    </button>

                </form>

                {/* Login Link */}
                <p className="text-center text-sm text-slate-600">
                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="text-indigo-600 font-semibold hover:underline"
                    >
                        Log In
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Register;