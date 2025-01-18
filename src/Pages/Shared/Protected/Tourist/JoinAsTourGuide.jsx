import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const JoinAsTourGuide = () => {
  const [applicationTitle, setApplicationTitle] = useState("");
  const [whyGuide, setWhyGuide] = useState("");
  const [cvLink, setCvLink] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const applicationData = {
      applicationTitle,
      whyGuide,
      cvLink,
    };

    setLoading(true);

    try {
      const response = await fetch("/guideApplications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Your application has been submitted successfully!");
        navigate("/"); // Redirect to the home page or another desired page
      } else {
        toast.error(result.message || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Error submitting the application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-[#93C5FD]">
          Join as a Tour Guide
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="applicationTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Application Title
            </label>
            <input
              id="applicationTitle"
              type="text"
              value={applicationTitle}
              onChange={(e) => setApplicationTitle(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#93C5FD] focus:border-[#93C5FD] sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="whyGuide"
              className="block text-sm font-medium text-gray-700"
            >
              Why do you want to be a Tour Guide?
            </label>
            <textarea
              id="whyGuide"
              value={whyGuide}
              onChange={(e) => setWhyGuide(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#93C5FD] focus:border-[#93C5FD] sm:text-sm"
              rows="4"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="cvLink"
              className="block text-sm font-medium text-gray-700"
            >
              CV Link
            </label>
            <input
              id="cvLink"
              type="url"
              value={cvLink}
              onChange={(e) => setCvLink(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#93C5FD] focus:border-[#93C5FD] sm:text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#93C5FD] text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-blue-500 transition duration-300"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinAsTourGuide;
