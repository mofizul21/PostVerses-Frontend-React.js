import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../config";

export default function Update() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token, user } = useContext(AppContext);

    const [formData, setFormData] = useState({
        title: "",
        body: "",
        image: "",
    });
    const [errors, setErrors] = useState({});

    // Fetch the post data and set initial state
    async function getPost() {
        const res = await fetch(`${ BASE_URL }/api/posts/${ id }`);
        const data = await res.json();

        if (res.ok) {
            if (data.post.user_id !== user.id) {
                navigate("/");
            }
            setFormData({
                title: data.post.title,
                body: data.post.body,
                imagePreview: `${ BASE_URL }/storage/${ data.post.image }`,
            });
        }
    }

    // Handle form submission to update post
    async function handleUpdate(e) {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("body", formData.body);
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }
        formDataToSend.append("_method", 'PUT');

        console.log(...formDataToSend);

        const res = await fetch(`${ BASE_URL }/api/posts/${ id }`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${ token }`,
                Accept: "application/json",
            },
            //body: JSON.stringify(formDataToSend),
            body: formDataToSend,
        });

        const data = await res.json();

        if (data.errors) {
            setErrors(data.errors);
        } else {
            navigate("/");
        }
    }


    useEffect(() => {
        getPost();
    }, []);

    return (
        <>
            {/* Page Title */}
            <h1 className="text-3xl font-bold text-center mb-6">Update Your Post</h1>

            {/* Form Container */}
            <form className="max-w-3xl mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg" onSubmit={handleUpdate}>

                {/* Image Preview */}
                {formData.imagePreview && (
                    <div className="mb-6">
                        <img
                            src={formData.imagePreview}
                            alt={formData.title}
                            className="w-full max-h-80 object-cover rounded-lg"
                        />
                    </div>
                )}

                {/* File Input */}
                <div className="mb-6">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setFormData({
                                    ...formData,
                                    image: file,
                                    imagePreview: URL.createObjectURL(file),
                                });
                            }
                        }}
                        className="block w-full text-sm text-gray-500 file:border-0 file:bg-indigo-600 file:text-white file:py-2 file:px-4 file:rounded-md file:cursor-pointer"
                    />
                    {errors.image && <p className="text-sm text-red-500 mt-2">{errors.image}</p>}
                </div>

                {/* Title Input */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Title"
                        className="form-input w-full py-2 px-4 rounded-md text-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        value={formData.title}
                    />
                    {errors.title && <p className="text-sm text-red-500 mt-2">{errors.title}</p>}
                </div>

                {/* Body Textarea */}
                <div className="mb-6">
                    <textarea
                        placeholder="Body"
                        className="form-textarea w-full py-2 px-4 rounded-md text-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                        value={formData.body}
                    ></textarea>
                    {errors.body && <p className="text-sm text-red-500 mt-2">{errors.body}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 px-6 mt-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Update
                </button>
            </form>
        </>

    );
}
