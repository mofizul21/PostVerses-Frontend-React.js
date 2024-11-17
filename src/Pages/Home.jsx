import { useEffect, useState } from "react";
import { Link } from "react-router-dom";;
import { BASE_URL } from "../config";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getPosts() {
        const res = await fetch(`${ BASE_URL }/api/posts`);
        const data = await res.json();

        if (res.ok) {
            setPosts(data);
            setLoading(false);
        }
    }

    useEffect(() => {
        getPosts();
    }, []);
    
    return (
        <>
            <h1 className="text-3xl font-bold text-center mb-8">Latest Posts</h1>

            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div
                                key={post.id}
                                className="post-card bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
                            >
                                <img
                                    src={post.image ? `${ BASE_URL }/storage/${ post.image }` : '/fallback.jpg'}
                                    alt={post.title}
                                    className="h-60 w-full object-cover"
                                />
                                <div className="p-4 flex flex-col flex-grow">
                                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                                    <small className="text-gray-400 mb-4">
                                        Created by: {post.user.name} on{" "}
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </small>
                                    <p className="text-gray-300 flex-grow">
                                        {post.body.split(" ").slice(0, 16).join(" ")}...
                                        </p>
                                    <Link
                                        to={`/posts/${ post.id }`}
                                        className="w-full py-2 mt-4 inline-block text-center bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-400">No posts found</p>
                    )}
                </div>
            )}
        </>
    );
}
