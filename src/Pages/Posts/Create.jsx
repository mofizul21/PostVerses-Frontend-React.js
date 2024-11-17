import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { BASE_URL } from "../../config";
export default function Create() {
    const navigate = useNavigate();
    const { token } = useContext(AppContext);
    const [isCreating, setIsCreating] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        body: "",
        image: ""
    });

    const [imagePreview, setImagePreview] = useState("");
    const [errors, setErrors] = useState({});

    async function handleCreate(e) {
        e.preventDefault();
        setIsCreating(true);

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("body", formData.body);
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        // console.log(...formDataToSend);

        const res = await fetch(`${ BASE_URL }/api/posts`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${ token }`,
            },
            // body: JSON.stringify(formDataToSend),
            body: formDataToSend,
        });

        const data = await res.json();

        if (data.errors) {
            setErrors(data.errors);
        } else {
            navigate("/");
        }
    }

    return (
        <>
            <h1 className="text-3xl font-bold text-center mb-6">Create a new post</h1>

            <form className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg" onSubmit={handleCreate}>
                <div className="form-group mb-4">
                    <input
                        type="text"
                        placeholder="Title"
                        className="form-input w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
                </div>

                <div className="form-group mb-4">
                    <textarea
                        placeholder="Body"
                        className="form-textarea w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    ></textarea>
                    {errors.body && <p className="text-red-400 text-sm mt-1">{errors.body}</p>}
                </div>

                <div className="form-group mb-4">
                    <input
                        type="file"
                        className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setFormData({ ...formData, image: file });
                                setImagePreview(URL.createObjectURL(file));
                            }
                        }}
                    />
                </div>

                {imagePreview && (
                    <div className="mb-4">
                        <img
                            src={imagePreview}
                            alt="Selected Preview"
                            className="w-full max-h-60 object-cover rounded-md"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isCreating}
                    className={`w-full py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${ isCreating ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {isCreating ? (
                        <div className="flex justify-center items-center">
                            <div className="spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        "Create"
                    )}
                </button>

            </form>

        </>
    )
}
