// fronted\src\Pages\Auth\Login.jsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { BASE_URL } from "../../config";

export default function Login() {
    const navigate = useNavigate();

    const { setToken } = useContext(AppContext);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    async function handleLogin(e) {
        e.preventDefault();
        
        const res = await fetch(`${BASE_URL}/api/login`, {
            method: "POST",
            body: JSON.stringify(formData),
        });

        const data = await res.json();  
        console.log('data: ', data);

        if (data.errors) {
            setErrors(data.errors);
        } else {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            navigate("/");
        }
    }

    return (
        <>
            <h1 className="text-center text-3xl font-semibold mb-6">Login to your account</h1>

            <form onSubmit={handleLogin} className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
                {/* Email Field */}
                <div className="form-group mb-4">
                    <label htmlFor="email" className="block text-white font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Password Field */}
                <div className="form-group mb-4">
                    <label htmlFor="password" className="block text-white font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        
                    />
                    {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Login
                </button>
            </form>


        </>
    )
}