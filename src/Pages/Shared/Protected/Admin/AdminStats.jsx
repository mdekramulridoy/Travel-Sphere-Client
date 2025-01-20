import React, { useState, useEffect } from "react";

const AdminStats = () => {
  const [stats, setStats] = useState({
    totalTourGuides: 0,
    totalClients: 0,
    totalPackages: 0,
    totalStories: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`https://travel-sphere-server-nu.vercel.app/admin/stats`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="text-center my-3 text-3xl font-bold">Statistics</h2>
      <div className="text-center">
        <p>
          Total Tour Guides: <span className="font-bold text-xl">{stats.totalTourGuides}</span>
        </p>
        <p>
          Total Clients: <span className="font-bold text-xl">{stats.totalClients}</span>
        </p>
        <p>
          Total Packages: <span className="font-bold text-xl">{stats.totalPackages}</span>
        </p>
        <p>
          Total Stories: <span className="font-bold text-xl">{stats.totalStories}</span>
        </p>
      </div>
    </div>
  );
};

export default AdminStats;
