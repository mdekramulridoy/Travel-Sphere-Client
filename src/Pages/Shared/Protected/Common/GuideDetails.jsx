import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GuideDetails = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null); 
  const [packages, setPackages] = useState([]); // Packages for the guide

  // Fetch guide details
  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const response = await fetch(`https://travel-sphere-server-nu.vercel.app/guides/${id}`);
        const data = await response.json();
        setGuide(data);
      } catch (error) {
        console.error("Error fetching guide details:", error);
      }
    };
    fetchGuide();
  }, [id]);

  // Fetch packages for the guide
useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch(`https://travel-sphere-server-nu.vercel.app/packages?guide=${id}`);
        const data = await response.json();
        setPackages(data.filter(pkg => pkg.guide === id)); 
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, [id]);
  

  if (!guide) return <div>Loading...</div>;

  return (
    <div className="bg-white min-h-screen py-16 px-6 lg:px-20">
      {/* Guide Details */}
      <div className="flex items-center space-x-4 mb-8">
        <img
          src={guide.photoURL}
          alt={guide.name}
          className="w-24 h-24 rounded-full object-cover shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800 uppercase">{guide.name}</h1>
          <p className="text-gray-600">Email: {guide.email}</p>
        </div>
      </div>

      {/* Packages */}
      <h2 className="text-2xl uppercase font-semibold text-gray-800 mb-4">
        Packages Managed by <span className="text-[#8BDEFF]">'{guide.name}'</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-800">{pkg.name}</h3>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Places:</span> {pkg.places}
            </p>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Price:</span> {pkg.price} BDT
            </p>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Plans:</span>
            </p>
            <ul className="list-disc list-inside">
              {pkg.plans.map((plan, index) => (
                <li key={index} className="text-gray-600">{plan}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuideDetails;
