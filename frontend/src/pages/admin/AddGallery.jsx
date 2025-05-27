import React, { useState } from "react";
import axios from "axios";

const AddGallery = () => {
  const [photo, setPhoto] = useState(null);
  const [driveLink, setDriveLink] = useState("");
  const [caption, setCaption] = useState(""); // Add caption state
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      if (photo) formData.append("photo", photo);
      formData.append("drive_link", driveLink);
      formData.append("caption", caption); // Append caption

      await axios.post("/galleries", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
      setPhoto(null);
      setDriveLink("");
      setCaption(""); // Reset caption
      setPreview(null);
      e.target.reset();
    } catch (err) {
      setError("Failed to add photo. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-black-700">Add Photo to Gallery</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 rounded shadow-md w-full h-48 object-cover"
            />
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Drive Link:</label>
          <input
            type="url"
            value={driveLink}
            onChange={(e) => setDriveLink(e.target.value)}
            placeholder="https://drive.google.com/..."
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Caption:</label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Enter caption"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Add Photo
        </button>
        {success && (
          <div className="mt-4 text-green-600 text-center font-semibold">
            Photo added successfully!
          </div>
        )}
        {error && (
          <div className="mt-4 text-red-600 text-center font-semibold">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddGallery;