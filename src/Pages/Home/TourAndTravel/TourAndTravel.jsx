import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css"; // Styles for react-tabs

const TourAndTravel = () => {
  const [packages, setPackages] = useState([]);
  const [guides, setGuides] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetching random 3 packages
    fetch(`https://travel-sphere-server-nu.vercel.app/packages/random/3`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching packages");
        }
        return response.json();
      })
      .then((data) => setPackages(data))
      .catch((error) => {
        console.error(error);
        setError("Failed to load packages.");
      });

    // Fetching random 6 guides
    fetch(`https://travel-sphere-server-nu.vercel.app/guides/random/6`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching guides");
        }
        return response.json();
      })
      .then((data) => setGuides(data))
      .catch((error) => {
        console.error(error);
        setError("Failed to load guides.");
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold text-center text-blue-600 mb-8">
        Tour and Travel
      </h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {/* Tabs for Our Packages and Meet Our Tour Guides */}
      <Tabs>
        <TabList className="flex justify-center mb-6">
          <Tab className="px-6 py-3 text-lg font-semibold text-blue-600 cursor-pointer hover:text-blue-800">
            Our Packages
          </Tab>
          <Tab className="px-6 py-3 text-lg font-semibold text-blue-600 cursor-pointer hover:text-blue-800">
            Meet Our Tour Guides
          </Tab>
        </TabList>

        {/* Our Packages Tab Panel */}
        <TabPanel>
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Our Packages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.length > 0 ? (
                packages.map((pkg) => (
                  <div
                    key={pkg._id}
                    className="package-card bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
                  >
                    <img
                      src={pkg.images[0]}
                      alt={pkg.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {pkg.name}
                      </h3>
                      <p className="text-gray-600 mb-2">{pkg.places}</p>
                      <p className="text-lg font-bold text-blue-600 mb-4">
                        {pkg.price}
                      </p>
                      <button
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        onClick={() =>
                          (window.location.href = `/package-details/${pkg._id}`)
                        }
                      >
                        View Package
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600">No packages available</p>
              )}
            </div>
          </div>
        </TabPanel>

        {/* Meet Our Tour Guides Tab Panel */}
        <TabPanel>
          <div>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Meet Our Tour Guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {guides.length > 0 ? (
                guides.map((guide) => (
                  <div
                    key={guide._id}
                    className="guide-card bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105"
                  >
                    <img
                      src={guide.photoURL}
                      alt={guide.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {guide.name}
                      </h3>
                      <button
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        onClick={() =>
                          (window.location.href = `/guides/${guide._id}`)
                        }
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600">No guides available</p>
              )}
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TourAndTravel;
