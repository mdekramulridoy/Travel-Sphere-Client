import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PackagesDetails = () => {
  const { id } = useParams();
  const [packageDetails, setPackageDetails] = useState(null);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/packages/${id}`);
        setPackageDetails(response.data);
      } catch (error) {
        console.error('Error fetching package details:', error);
      }
    };

    fetchPackageDetails();
  }, [id]);

  if (!packageDetails) {
    return <div>Loading...</div>;
  }

  const { title, description, price, duration, tourGuide, images, createdAt } = packageDetails;

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold text-center mb-5">{title}</h1>
      <img src={images} alt={title} className="w-full h-96 object-cover rounded-lg mb-5" />
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-600 mb-4">{description}</p>
        <p className="text-lg font-bold mb-2">Price: ${price}</p>
        <p className="text-sm text-gray-500 mb-2">Duration: {duration}</p>
        <p className="text-sm text-gray-500 mb-4">Tour Guide: {tourGuide}</p>
        <p className="text-xs text-gray-400">Created At: {new Date(createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default PackagesDetails;
