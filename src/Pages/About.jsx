export default function About() {
    return (
        <div className="max-w-3xl mx-auto my-6 p-6 bg-gray-100 rounded-lg shadow-lg">
            {/* Title */}
            <h1 className="text-center text-3xl font-bold mb-8">About Us</h1>

            {/* About Content */}
            <p className="text-center text-gray-600 mb-8">
                Welcome to our full-stack blog application. We aim to provide high-quality content and create an engaging experience for our users. Our platform is built with the latest web technologies, offering a seamless reading experience across all devices.
            </p>

            {/* Our Mission */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-gray-700">
                    Our mission is to create a space where people can read, write, and share their thoughts freely. We believe in fostering a community-driven environment, and we are committed to providing a platform that empowers both writers and readers.
                </p>
            </div>

            {/* Our Vision */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
                <p className="text-gray-700">
                    We envision a world where knowledge is shared openly and where everyone has the opportunity to contribute. Our goal is to grow into a platform that becomes a trusted source for content on various topics.
                </p>
            </div>

            {/* Footer Section */}
            <div className="text-center mt-10">
                <p className="text-gray-600">Thank you for visiting our blog! Stay tuned for more updates.</p>
            </div>
        </div>
    );
}
