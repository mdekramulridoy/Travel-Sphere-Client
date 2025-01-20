import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { imageUpload } from "../../../../api/utils";

const AddStory = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload all images and get their URLs
      const uploadedImages = await Promise.all(
        images.map((image) => imageUpload(image))
      );

      // Prepare story data
      const storyData = {
        title,
        text,
        images: uploadedImages,
      };

      // Send story data to the server
      const response = await fetch(`${import.meta.env.VITE_API_URL}/stories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify(storyData),
      });

      if (response.ok) {
        console.log("Story added successfully!");
        navigate("/dashboard/manage-story");
      } else {
        console.error("Error adding story:", await response.text());
      }
    } catch (error) {
      console.error("Error uploading story:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Add Your Story</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Text:</label>
          <textarea
            className="w-full border rounded p-2"
            rows="5"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700">Upload Images:</label>
          <input
            type="file"
            multiple
            className="block"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Submit Story
        </button>
      </form>
    </div>
  );
};

export default AddStory;
