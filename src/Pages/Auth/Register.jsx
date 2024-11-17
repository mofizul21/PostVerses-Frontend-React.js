import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { BASE_URL } from "../../config";

export default function Register() {
    const navigate = useNavigate();

    const {setToken} = useContext(AppContext);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState({});

    async function handleRegister (e) {
        e.preventDefault();

        const res = await fetch(`${BASE_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.errors) {
            setErrors(data.errors);
            console.log(data);       
        } else {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            navigate(`/login`);
            console.log(data);       
        }        
    }

    return (
        <>
            <h1 className="text-center text-3xl font-semibold mb-6">Register</h1>

            <form onSubmit={handleRegister} className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
                {/* Name Field */}
                <div className="form-group mb-4">
                    <label htmlFor="name" className="block text-white font-semibold mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

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
                        required
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
                        required
                    />
                    {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>

                {/* Confirm Password Field */}
                <div className="form-group mb-6">
                    <label htmlFor="confirm-password" className="block text-white font-semibold mb-2">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        className="form-control w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Confirm your password"
                        value={formData.password_confirmation}
                        onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                        required
                    />
                    {errors.password_confirmation && <p className="text-red-400 text-sm mt-1">{errors.password_confirmation}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Register
                </button>
            </form>

        </>
    )
}