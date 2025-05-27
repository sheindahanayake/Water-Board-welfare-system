import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://10.5.0.2:80/backend/public/"; // Vite style
// If using Create React App, use: const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

const ViewGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/galleries")
      .then((res) => {
        setGalleryItems(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-white mb-10">Gallery</h2>
      {loading ? (
        <div className="text-center text-gray-300 text-lg py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {galleryItems.length === 0 ? (
            <div className="col-span-full text-center text-gray-400">No gallery items found.</div>
          ) : (
            galleryItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={
                    item.photo
                      ? item.photo.startsWith("http")
                        ? item.photo
                        : `${BACKEND_URL}/storage/${item.photo}`
                      : "https://via.placeholder.com/400x224?text=No+Image"
                  }
                  alt={item.caption || "Gallery"}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{item.caption || "No Caption"}</h3>
                  {item.drive_link && (
                    <a
                      href={item.drive_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-blue-600 hover:underline"
                    >
                      View on Google Drive
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ViewGallery;