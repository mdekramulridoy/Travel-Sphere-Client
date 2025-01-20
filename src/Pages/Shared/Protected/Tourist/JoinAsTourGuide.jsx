import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UseAuth from "../../../../Hooks/UseAuth";

const JoinAsTourGuide = () => {
  const [applicationTitle, setApplicationTitle] = useState("");
  const [whyGuide, setWhyGuide] = useState("");
  const [cvLink, setCvLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null); 

  const navigate = useNavigate();
  const { user } = UseAuth();

  useEffect(() => {
    const fetchApplicationStatus = async () => {
      if (user?.email) {
        try {
          const response = await fetch(
            `http://localhost:5000/guideApplications/status/${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access-token")}`,
              },
            }
          );

          const result = await response.json();
          if (response.ok && result?.status) {
            setApplicationStatus(result.status);
          } else {
            setApplicationStatus(null);
          }
        } catch (err) {
          console.error("Error fetching application status:", err);
          setApplicationStatus(null);
        }
      }
    };

    fetchApplicationStatus();
  }, [user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("You must be logged in to apply.");
      navigate("/login");
      return;
    }

    if (!/^https?:\/\/.+/.test(cvLink)) {
      toast.error("Please provide a valid CV link.");
      return;
    }

    const applicationData = {
      applicationTitle,
      whyGuide,
      cvLink,
      email: user.email,
    };

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/guideApplications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify(applicationData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Your application has been submitted successfully!");
        navigate("/");
      } else {
        toast.error(result.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error submitting the application:", err);
      toast.error("Error submitting the application.");
    } finally {
      setLoading(false);
    }
  };

  if (applicationStatus === "pending") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6 text-[#93C5FD]">
            Application Status
          </h1>
          <p className="text-center text-gray-700">
            You already applied. <br />
            Status: <span className="font-semibold text-[#93C5FD]">Pending</span>
          </p>
        </div>
      </div>
    );
  }

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
