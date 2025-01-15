import React, { useEffect, useState } from "react";
import axios from "axios";

const TourAndTravel = () => {
  const [packages, setPackages] = useState([]);

 
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/random-packages"
        );
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div>
      <h2 className="text-center text-3xl font-bold">Our Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <div key={pkg._id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between">
            <div>
              <img
                src={pkg.images}
                alt={pkg.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{pkg.title}</h3>
              <p className="text-gray-600">{pkg.description}</p>
              <p className="mt-2 text-lg font-bold">${pkg.price}</p>
              <p className="text-sm text-gray-500">{pkg.duration}</p>
            </div>
            <div>
              <button
                onClick={() =>
                  (window.location.href = `/package-details/${pkg._id}`)
                }
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
              >
                View Package
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourAndTravel;
