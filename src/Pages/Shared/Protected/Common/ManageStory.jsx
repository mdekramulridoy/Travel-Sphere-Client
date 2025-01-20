import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ManageStory = () => {
  const [stories, setStories] = useState([]);

  // Fetch all stories
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/stories`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        setStories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    fetchStories();
  }, []);

  // Delete a story
  const handleDelete = async (storyId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${import.meta.env.VITE_API_URL}/stories/${storyId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          });
          setStories((prev) => prev.filter((story) => story._id !== storyId));
          Swal.fire("Deleted!", "The story has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting story:", error);
          Swal.fire("Error!", "Something went wrong while deleting the story.", "error");
        }
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">Manage Stories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div key={story._id} className="rounded-lg shadow-lg overflow-hidden bg-white border">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900">{story.title}</h2>
              <p className="text-gray-600 mt-2">{story.description}</p>

              {/* Show images if available */}
              {story.images && story.images.length > 0 && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {story.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Story Image ${index + 1}`}
                      className="w-full h-[100px] rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-between p-4 bg-gray-50">
              <Link
                to={`/dashboard/edit-story/${story._id}`}
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(story._id)}
                className="bg-red-500 text-white text-sm px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {stories.length === 0 && (
        <p className="text-center text-gray-500 text-lg mt-8">No stories to display.</p>
      )}
    </div>
  );
};

export default ManageStory;
