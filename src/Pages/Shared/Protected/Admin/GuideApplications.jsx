import React, { useEffect, useState } from "react";
import UseAuth from "../../../../Hooks/UseAuth";

const GuideApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, role } = UseAuth();
  const baseUrl = "http://localhost:5000";

  useEffect(() => {
    const fetchApplications = async () => {
      if (role !== "admin") {
        alert("Unauthorized access! Only admins can view this page.");
        return;
      }
      try {
        const response = await fetch(`${baseUrl}/guideApplications`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [role]);

  const handleAccept = async (applicationId, email) => {
    try {
      const response = await fetch(
        `${baseUrl}/guideApplications/${applicationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
          body: JSON.stringify({ status: "approved", email }),
        }
      );

      if (response.ok) {
        alert("Tour guide application approved and user role updated!");
        setApplications((prev) =>
          prev.filter((app) => app._id !== applicationId)
        );
      } else {
        alert("Error approving the guide application.");
      }
    } catch (err) {
      console.error("Error approving the guide application", err);
    }
  };

  if (role !== "admin") {
    return <p>Unauthorized! Only admins can access this page.</p>;
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-8">Guide Applications</h1>
      {loading ? (
        <p className="text-center text-blue-500">Loading applications...</p>
      ) : applications.length > 0 ? (
        <ul className="space-y-6">
          {applications.map((application) => (
            <li
              key={application._id}
              className="p-6 bg-white shadow-md rounded-lg border-l-4 border-blue-300"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {application.applicationTitle}
              </h2>
              <p className="text-gray-600 mb-4">{application.whyGuide}</p>
              <a
                href={application.cvLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mb-4 inline-block"
              >
                View CV
              </a>
              <button
                onClick={() => handleAccept(application._id, application.email)}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
              >
                Accept
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No applications found.</p>
      )}
    </div>
  );
};

export default GuideApplications;
