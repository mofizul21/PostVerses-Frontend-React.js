//frontend\src\Pages\Auth\Profile.jsx

import { useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { BASE_URL } from "../../config";
import { Link } from "react-router-dom";

export default function Profile() {

    const { token, user, setUser } = useContext(AppContext);

    // Fetch user profile
    async function getUserProfile() {
        await fetch(`${ BASE_URL }/api/user`, {
            headers: {
                Authorization: `Bearer ${ token }`,
                Accept: "application/json",
            },
        });
    }

    useEffect(() => {
        getUserProfile();
    }, []);


    async function handleUpdateProfile(e) {
        e.preventDefault();

        const formData = new FormData();

        if (user.profile_picture) {
            formData.append("profile_picture", user.profile_picture);
        }

        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("phone", user.phone);
        formData.append("address", user.address);

        console.log("Form Data: ", ...formData);

        const res = await fetch(`${ BASE_URL }/api/update-user`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${ token }`,
                Accept: "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        console.log("Server Response: ", data);
    }

    return (
        <div className="max-w-7xl mx-auto my-6 p-6 bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-center text-white text-3xl font-bold mb-8">Update Profile</h1>

            <div className="flex mb-10">
                <div className="text-center mx-auto">
                    <Link
                        to="/links"
                        className={`px-5 py-2 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400 mx-2 ${ location.pathname === "/links"
                            ? "bg-indigo-700 text-white"
                            : "bg-indigo-400 text-white hover:bg-indigo-600"
                            }`}
                    >
                        Links
                    </Link>
                    <Link
                        to="/profile"
                        className={`px-5 py-2 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400 mx-2 ${ location.pathname === "/profile"
                            ? "bg-indigo-700 text-white"
                            : "bg-indigo-400 text-white hover:bg-indigo-600"
                            }`}
                    >
                        Profile
                    </Link>
                </div>
            </div>

            <div className="flex space-x-8">
                {/* Left Box: Preview */}
                <div className="w-1/3 bg-gray-700 p-6 rounded-lg shadow-lg">

                    <div className="text-center mb-6">
                        <div className="">
                            <img
                                src={
                                    user.profile_picture?.startsWith("data:")
                                        ? user.profile_picture
                                        : user.profile_picture
                                            ? `${ BASE_URL }/storage/${ user.profile_picture }`
                                            : "https://images.nightcafe.studio//assets/profile.png"
                                }
                                alt="Profile"
                                className="w-36 h-36 object-cover rounded-full mx-auto"
                            />

                        </div>
                    </div>

                    <div className="mb-1">
                        <p className="text-white text-center text-lg font-semibold">{user.name}</p>
                    </div>

                    <div className="mb-6">
                        <p className="text-white text-center">{user.email}</p>
                    </div>
                </div>

                {/* Right Box: Update Profile */}
                <div className="w-2/3">
                    <form onSubmit={handleUpdateProfile}>
                        <div className="flex items-center mb-6">
                            <div className="text-lg font-semibold text-white w-1/4">Profile Photo</div>
                            <div className="w-3/4 relative">
                                <img
                                    src={
                                        user.profile_picture?.startsWith("data:")
                                            ? user.profile_picture
                                            : user.profile_picture 
                                                ? `${ BASE_URL }/storage/${ user.profile_picture }`
                                                : "https://images.nightcafe.studio//assets/profile.png"
                                    }
                                    alt="Profile"
                                    className="w-36 h-36 object-cover rounded"
                                />

                                <label className="mt-10 block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                                <input
                                    className="block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    id="file_input"
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = () => setUser({ ...user, profile_picture: reader.result });
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
                                    SVG, PNG, JPG or GIF (Square image will be good).
                                </p>

                            </div>
                        </div>

                        <div className="flex items-center mb-6 mt-20">
                            <div className="text-lg font-semibold text-white w-1/4">Name</div>
                            <div className="w-3/4 text-white">
                                <input
                                    type="text"
                                    value={user.name}
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
                                />
                            </div>
                        </div>

                        <div className="flex items-center mb-6">
                            <div className="text-lg font-semibold text-white w-1/4">Email</div>
                            <div className="w-3/4 text-white">
                                <input
                                    type="email"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
                                />
                            </div>
                        </div>

                        <div className="flex items-center mb-6">
                            <div className="text-lg font-semibold text-white w-1/4">Phone</div>
                            <div className="w-3/4 text-white">
                                <input
                                    type="tel"
                                    className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
                                    value={user.phone}
                                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                />

                            </div>
                        </div>

                        <div className="flex items-center mb-6">
                            <div className="text-lg font-semibold text-white w-1/4">Address</div>
                            <div className="w-3/4 text-white">
                                <textarea
                                    type="text"
                                    className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
                                    value={user.address}
                                    onChange={(e) => setUser({ ...user, address: e.target.value })}
                                ></textarea>
                            </div>
                        </div>

                        <div className="text-right">
                            <button
                                className="px-6 py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                type="submit"
                            >
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
