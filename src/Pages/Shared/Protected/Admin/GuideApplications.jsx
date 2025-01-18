import React, { useEffect, useState } from "react";

const GuideApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("/guideApplications");
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleAccept = async (applicationId) => {
    try {
      const response = await fetch(`/accept-guide/${applicationId}`, {
        method: "PUT",
      });

      if (response.ok) {
        alert("Tour guide accepted!");
        setApplications((prev) =>
          prev.filter((app) => app._id !== applicationId)
        );
      } else {
        alert("Error accepting the guide.");
      }
    } catch (err) {
      console.error("Error accepting the guide", err);
    }
  };

  return (
    <div>
      <h1>Guide Applications</h1>
      {loading ? (
        <p>Loading applications...</p>
      ) : (
        <ul>
          {applications.map((application) => (
            <li key={application._id}>
              <p>
                <strong>{application.applicationTitle}</strong>
              </p>
              <p>{application.whyGuide}</p>
              <p>
                <a
                  href={application.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View CV
                </a>
              </p>
              <button onClick={() => handleAccept(application._id)}>
                Accept
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GuideApplications;
