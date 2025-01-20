import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { FacebookShareButton, FacebookIcon } from "react-share";
import { AuthContext } from "../../Provider/AuthProvider";


const Community = () => {
  const [stories, setStories] = useState([]);
  const [error, setError] = useState("");
  const { user, loading } = useContext(AuthContext); // Get user from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has access-token and include it in the request header
    const token = localStorage.getItem("access-token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    // Fetch 4 random stories from the database
    fetch("https://travel-sphere-server-nu.vercel.app/stories/random/4", { headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching stories");
        }
        return response.json();
      })
      .then((data) => setStories(data))
      .catch((error) => {
        console.error(error);
        setError("You Need to Login or failed data.");
      });
  }, []);

  const handleShare = (story) => {
    if (!user) {
      navigate("/login"); // Redirect to login page if not logged in
    }
  };

  return (
    <div className="md:mx-20 mx-10 lg:mx-0 mb-10 pt-10">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
        All Stories Community
      </h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {/* Display stories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stories.length > 0 ? (
          stories.map((story) => (
            <div
              key={story._id}
              className="story-card bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {story.title}
                </h3>
                <p className="text-gray-600 mb-2">{story.text}</p>

                {/* Display images */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {story.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Story Image ${index + 1}`}
                      className="w-full h-[100px] rounded-lg"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <FacebookShareButton
                    url={`https://travel-sphere-server-nu.vercel.app/story/${story._id}`}
                    quote={story.title}
                    onClick={() => handleShare(story)}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <span
                    className="text-blue-600 cursor-pointer"
                    onClick={() => navigate("/dashboard/manage-story")}
                  >
                    All Stories
                  </span>
                  <span
                    className="text-blue-600 cursor-pointer ml-4"
                    onClick={() => navigate("/dashboard/add-stories")}
                  >
                    Add Stories
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No stories available or loading...</p>
        )}
      </div>
    </div>
  );
};

export default Community;
