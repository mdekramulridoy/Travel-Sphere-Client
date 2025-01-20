import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Trips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("http://localhost:5000/packages");
        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  return (
    <div className="bg-[#8BDEFF] min-h-screen py-16 px-6 lg:px-20">
      <Helmet>
        <title>Trips | Travel Sphere</title>
      </Helmet>

      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
          Discover the Beauty of Bangladesh
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed">
          From pristine beaches to serene hills, Bangladesh offers a variety of
          unforgettable travel experiences. Explore our featured trips and plan
          your next adventure.
        </p>
      </div>

      {/* Trips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {trips.map((trip) => (
          <div
            key={trip._id}
            className="bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105"
          >
            <img
              src={trip.images[0]} // assuming the first image is the main one
              alt={trip.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-5">
                {trip.name}
              </h2>
              <p className="text-gray-600 text-sm">{trip.description}</p>
              <Link
                to={`/package-details/${trip._id}`}
                className="mt-4 bg-[#8BDEFF] text-black py-2 px-6 rounded-lg hover:bg-blue-600 hover:text-white"
              >
                Package Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trips;
