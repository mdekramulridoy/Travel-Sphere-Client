import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register the necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

  // Chart data configuration
  const chartData = {
    labels: ["Tour Guides", "Clients", "Packages", "Stories"],
    datasets: [
      {
        label: "Total Count",
        data: [
          stats.totalTourGuides,
          stats.totalClients,
          stats.totalPackages,
          stats.totalStories,
        ],
        backgroundColor: [
          "rgba(255, 159, 64, 0.2)", // Tour Guides color
          "rgba(75, 192, 192, 0.2)", // Clients color
          "rgba(153, 102, 255, 0.2)", // Packages color
          "rgba(255, 99, 132, 0.2)", // Stories color
        ],
        borderColor: [
          "rgba(255, 159, 64, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md max-w-6xl mx-auto">
      <h2 className="text-center text-3xl font-semibold text-gray-700 mb-6">
        Dashboard Statistics
      </h2>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Total Guides</h3>
          <p className="text-4xl font-bold text-blue-500">{stats.totalTourGuides}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Total Clients</h3>
          <p className="text-4xl font-bold text-green-500">{stats.totalClients}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Total Packages</h3>
          <p className="text-4xl font-bold text-purple-500">{stats.totalPackages}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Total Stories</h3>
          <p className="text-4xl font-bold text-red-500">{stats.totalStories}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="w-full">
        <h3 className="text-xl font-semibold text-center mb-4">Overall Statistics</h3>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Bar data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
