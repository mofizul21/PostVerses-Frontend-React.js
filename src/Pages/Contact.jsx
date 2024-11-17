import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.email) newErrors.email = "Email is required.";
        if (!formData.message) newErrors.message = "Message is required.";
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Handle form submission (e.g., send to backend)
            console.log("Form submitted", formData);
        }
    };

    return (
        <div className="flex flex-col md:flex-row max-w-5xl mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg items-center">
            {/* Image Section */}
            <div className="w-full md:w-1/2">
                <img
                    src="/writing.jpg" // Replace with your desired image URL
                    alt="Contact Us"
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Form Section */}
            <div className="w-full md:w-1/2 p-6">
                <h1 className="text-3xl font-bold text-center mb-6 text-white">Contact Us</h1>
                <form onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="form-group mb-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={handleChange}
                            value={formData.name}
                        />
                        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="form-group mb-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={handleChange}
                            value={formData.email}
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Message Field */}
                    <div className="form-group mb-4">
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={handleChange}
                            value={formData.message}
                        ></textarea>
                        {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
