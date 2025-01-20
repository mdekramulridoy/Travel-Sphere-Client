import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { imageUpload } from "../../../../api/utils";

const EditStory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);

  // Fetch the story by ID
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/stories/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        setStory(data);
      } catch (error) {
        console.error("Error fetching story:", error);
      }
    };
    fetchStory();
  }, [id]);

  // Handle photo removal
  const handleRemovePhoto = async (photo) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/stories/${id}`,
        { removePhoto: photo },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );
      if (response.status === 200) {
        setStory((prev) => ({
          ...prev,
          images: prev.images.filter((img) => img !== photo),
        }));
      }
    } catch (error) {
      console.error("Error removing photo:", error);
    }
  };

  // Handle photo addition
  const handleAddPhotos = async (e) => {
    const files = Array.from(e.target.files);
    try {
      const uploadedPhotos = await Promise.all(
        files.map((file) => imageUpload(file))
      );

      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/stories/${id}`,
        { addPhotos: uploadedPhotos },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );

      if (response.status === 200) {
        setStory((prev) => ({
          ...prev,
          images: [...prev.images, ...uploadedPhotos],
        }));
      }
    } catch (error) {
      console.error("Error adding photos:", error);
    }
  };

  if (!story) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edit Story</h1>
      <h2 className="text-xl font-medium text-gray-700 mb-4">Title: {story.title}</h2>
      <p className="text-gray-600 mb-4">{story.text}</p>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800">Photos:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {story.images.map((photo, index) => (
            <div key={index} className="relative">
              <img src={photo} alt={`Story Photo ${index + 1}`} className="rounded shadow-md" />
              <button
                onClick={() => handleRemovePhoto(photo)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800">Add New Photos:</h3>
        <input
          type="file"
          multiple
          className="block w-full mt-2"
          accept="image/*"
          onChange={handleAddPhotos}
        />
      </div>

      <button
        onClick={() => navigate("/dashboard/manage-story")}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Back to Manage Stories
      </button>
    </div>
  );
};

export default EditStory;
