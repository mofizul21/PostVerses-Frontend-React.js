
const Gallery = () => {
    // Sample images for the gallery
    const images = [
        "https://via.placeholder.com/300x200",
        "https://via.placeholder.com/300x200",
        "https://via.placeholder.com/300x200",
        "https://via.placeholder.com/300x200",
        "https://via.placeholder.com/300x200",
        "https://via.placeholder.com/300x200"
    ];

    return (
        <div className="max-w-5xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-6 text-white">Gallery</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="relative">
                        <img
                            src={image}
                            alt={`Gallery Image ${ index + 1 }`}
                            className="w-full h-60 object-cover rounded-md"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
