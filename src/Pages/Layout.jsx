import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { BASE_URL } from "../config";

export default function Layout() {
    const navigate = useNavigate();

    const { user, setUser, token, setToken } = useContext(AppContext);

    async function handleLogout(e) {
        e.preventDefault();

        const res = await fetch(`${ BASE_URL }/api/logout`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${ token }`,
            }
        });
        // const data = await res.json();
        if (res.ok) {
            setToken(null);
            setUser(null);
            localStorage.removeItem("token");
            navigate("/login");
        }
    }

    return (
        <>
            <header className="bg-gray-800 text-white px-4 py-3">

                <nav className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Link to="/" className="hover:text-gray-300">
                            <img
                                src="/mofizul_blog.png"
                                alt="Logo"
                                className="h-10 "
                            />
                        </Link>

                    </div>

                    <div className="hidden md:flex space-x-6 font-bold">
                        <Link to="/" className="hover:text-gray-300">
                            Home
                        </Link>
                        <Link to="/about" className="hover:text-gray-300">
                            About Us
                        </Link>
                        <Link to="/gallery" className="hover:text-gray-300">
                            Gallery
                        </Link>
                        <Link to="/contact" className="hover:text-gray-300">
                            Contact Us
                        </Link>
                    </div>

                    <div className="dropdown inline-block relative">
                        {user ? (
                            <>
                                <button className="font-semibold py-2 px-4 rounded inline-flex items-center">
                                    <span className="mr-1">Welcome to {user.name}</span>
                                    <svg
                                        className="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                <ul className="dropdown-menu rounded absolute hidden text-white bg-gray-800 pt-1 right-5 left-auto">
                                    <li>
                                        <Link
                                            to="/profile"
                                            className="rounded-t bg-gray-700 hover:bg-gray-600 py-2 px-4 block whitespace-no-wrap"
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/create"
                                            className="bg-gray-700 hover:bg-gray-600 py-2 px-4 block whitespace-no-wrap"
                                        >
                                            Add New Post
                                        </Link>
                                    </li>
                                    <li>
                                        <form onSubmit={handleLogout}>
                                            <button
                                                type="submit"
                                                className="rounded-b bg-gray-700 hover:bg-gray-600 py-2 px-4 block whitespace-no-wrap w-full text-left"
                                            >
                                                Logout
                                            </button>
                                        </form>
                                    </li>
                                </ul>

                            </>
                        ) : (
                            <>
                                    <div className="md:flex space-x-6 font-bold">                                        
                                        <Link to="/login" className="hover:text-gray-300">
                                            Login
                                        </Link>
                                        <Link to="/register" className="hover:text-gray-300">
                                            Register
                                        </Link>
                                    </div>
                               
                            </>
                        )}
                    </div>
                </nav>
            </header>

            <main className="max-w-7xl mx-auto py-6">
                <Outlet />
            </main>

            <footer className="bg-gray-800 text-white py-3">
                <div className="container mx-auto">
                    <div className="flex justify-between">
                        <div className="w-full sm:w-auto text-center sm:text-left">
                            <p>&copy; 2024 Your Company. All Rights Reserved.</p>
                        </div>

                        <div className="w-full sm:w-auto  text-center sm:text-right">
                            <div className="flex justify-center sm:justify-end space-x-6">
                                <Link to="/privacy" className="text-gray-400 hover:text-gray-300">Privacy Policy</Link>
                                <Link to="/terms" className="text-gray-400 hover:text-gray-300">Terms of Service</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>


        </>
    )
}