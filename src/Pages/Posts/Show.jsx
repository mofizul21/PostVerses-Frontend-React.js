// fronted\src\Pages\Posts\Show.jsx

import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../../Context/AppContext";
import { BASE_URL } from "../../config";

export default function Show() {
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    const { id } = useParams();
    const { user, token } = useContext(AppContext);

    async function getPost() {
        const res = await fetch(`${ BASE_URL }/api/posts/${ id }`);
        const data = await res.json();

        if (res.ok) {
            setPost(data.post);
        }
    }

    useEffect(() => {
        getPost();
    }, []);

    const handleDelete = async (e) => {
        e.preventDefault();

        const res = await fetch(`${ BASE_URL }/api/posts/${ id }`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${ token }`,
            },
        });
        const data = await res.json();
        console.log(data);

        if (res.ok) {
            navigate("/");
        }
    }

    return (
        <>
            {post ? (
                <>
                    {/* Post Title */}
                    <h1 className="text-3xl font-bold text-center mb-4">{post.title}</h1>

                    {/* Post Metadata */}
                    <div className="text-center mb-6">
                        <small className="text-sm text-gray-500 flex justify-center items-center">
                            <img
                                src="/author.png"
                                alt="Author"
                                className="w-8 h-8 rounded-full mr-2"
                            />
                            Created by {post.user?.name} on{" "}
                            {new Date(post.created_at).toLocaleString()}
                        </small>
                    </div>

                    {/* Post Content */}
                    <div className="max-w-3xl mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                        {/* Post Image */}
                        <div className="mb-6">
                            <img
                                src={`${ BASE_URL }/storage/${ post.image }`}
                                alt={post.title}
                                className="w-full h-96 object-cover rounded-lg"
                            />
                        </div>

                        {/* Post Body */}
                        <p className="text-gray-300 text-lg mb-6">{post.body}</p>

                        {/* Conditional Buttons for Update and Delete */}
                        {user?.id === post.user_id && (
                            <div className="flex space-x-4">
                                <Link
                                    to={`/posts/update/${ post.id }`}
                                    className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    Update
                                </Link>

                                <form onSubmit={handleDelete}>
                                    <button
                                        type="submit"
                                        className="inline-block bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        Delete
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <p className="text-center text-gray-400">No post found</p>
            )}
        </>
    )
}