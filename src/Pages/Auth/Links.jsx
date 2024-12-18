import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";

export default function Links() {

    const { user } = useContext(AppContext);

    // State to manage links
    const [links, setLinks] = useState([
        { id: 1, platform: 'facebook', url: 'https://facebook.com' },
        { id: 2, platform: 'twitter', url: 'https://twitter.com' },
        { id: 3, platform: 'linkedin', url: 'https://linkedin.com' },
    ]);

    // Function to handle adding new link
    const addLink = () => {
        const newLink = {
            id: links.length + 1,
            platform: '',
            url: ''
        };
        setLinks([...links, newLink]);
    };

    // Function to handle removing a link
    const removeLink = (id) => {
        setLinks(links.filter(link => link.id !== id));
    };

    // Function to update the link platform
    const updateLinkPlatform = (id, platform) => {
        const updatedLinks = links.map(link => link.id === id ? { ...link, platform } : link);
        setLinks(updatedLinks);
    };

    // Function to update the link URL
    const updateLinkUrl = (id, url) => {
        const updatedLinks = links.map(link => link.id === id ? { ...link, url } : link);
        setLinks(updatedLinks);
    };

    const profilePhotoUrl = "https://images.nightcafe.studio//assets/profile.png";

    return (
        <div className="max-w-7xl mx-auto my-6 p-6 bg-gray-800 rounded-lg shadow-lg">

            <h1 className="text-center text-white text-3xl font-bold mb-8">Links</h1>
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
                                src={profilePhotoUrl}
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

                    <div className="mb-6">
                        {links.map(link => (
                            <div key={link.id} className="bg-slate-500 p-4 mb-4 rounded-lg">
                                <p className="text-white">{link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}</p>
                                <a href={link.url} className="text-blue-400">{link.url}</a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Box: Update Profile */}
                <div className="w-2/3">

                    <div className="flex items-center mb-6">
                        <div className="text-lg font-semibold text-white w-1/4">Links</div>
                        <div className="w-3/4 text-white">
                            <button
                                className="w-full px-4 py-2 mb-3 rounded-md bg-gray-700 text-white"
                                onClick={addLink}
                            >
                                + Add New Links
                            </button>

                            {links.map(link => (
                                <div key={link.id} className="linkContainer bg-slate-500 mb-4 rounded p-4">
                                    <div className="linkMoveIconDraggable mb-4">
                                        <i className="fa-solid fa-ellipsis-vertical"></i> Link #{link.id}
                                        <span
                                            className="linkRemove float-right text-red-800 cursor-pointer"
                                            onClick={() => removeLink(link.id)}
                                        >
                                            Remove
                                        </span>
                                    </div>

                                    <p>Platform</p>
                                    <select
                                        value={link.platform}
                                        onChange={(e) => updateLinkPlatform(link.id, e.target.value)}
                                        className="w-full px-4 py-2 rounded-md bg-slate-600"
                                    >
                                        <option value="facebook"><i className="fa fa-facebook"></i> Facebook</option>
                                        <option value="twitter"><i className="fa fa-twitter"></i> Twitter</option>
                                        <option value="linkedin"><i className="fa fa-linkedin"></i> LinkedIn</option>
                                    </select>

                                    <p>Link</p>
                                    <input
                                        type="text"
                                        value={link.url}
                                        onChange={(e) => updateLinkUrl(link.id, e.target.value)}
                                        className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-right">
                        <button
                            className="px-6 py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onClick={() => { alert("Update Profile: under construction...") }}
                        >
                            Update Profile
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
