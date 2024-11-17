import { useContext, useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import { BASE_URL } from "../../config";

export default function Profile() {

    const {token, user} = useContext(AppContext);

    async function getUserProfile(){
        const res = await fetch(`${ BASE_URL }/api/user`, {
            headers: {
                Authorization: `Bearer ${ token }`,
            },
        });
        const data = await res.json();     

        console.log("Data: ", data);        
    }

    useEffect(() => {
        getUserProfile();
    }, []);

    const profilePhotoUrl = "https://images.nightcafe.studio//assets/profile.png";

    return (
        <div className="max-w-3xl mx-auto my-6 p-6 bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-center text-white text-3xl font-bold mb-8">Profile Details</h1>

            <p className="text-center text-white mb-8">You are really awesome! Only, creative people can write.</p>

            <div className="flex items-center mb-6">
                <div className="text-lg font-semibold text-white w-1/4">Profile Photo</div>
                <div className="w-3/4">
                    <img
                        src={profilePhotoUrl}
                        alt="Profile"
                        className="w-36 h-36 object-cover"
                    />
                </div>
            </div>

            <div className="flex items-center mb-6">
                <div className="text-lg font-semibold text-white w-1/4">Name</div>
                <div className="w-3/4 text-white">{user.name}</div>
            </div>

            <div className="flex items-center mb-6">
                <div className="text-lg font-semibold text-white w-1/4">Email</div>
                <div className="w-3/4 text-white">{user.email}</div>
            </div>

            <div className="border-t border-gray-300 my-8"></div>

            <div className="text-right">
                <button className="px-6 py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={() => { alert("Update Profile: under in construction...")}}>
                    Update Profile
                </button>
            </div>
        </div>
    );
}
