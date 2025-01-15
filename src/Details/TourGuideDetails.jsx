import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TourGuideDetails = () => {
  const { id } = useParams();
  const [guideDetails, setGuideDetails] = useState(null);

  useEffect(() => {
    const fetchGuideDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tour-guide-profile/${id}`);
        setGuideDetails(response.data);
      } catch (error) {
        console.error('Error fetching tour guide details:', error);
      }
    };

    fetchGuideDetails();
  }, [id]);

  if (!guideDetails) {
    return <div>Loading...</div>;
  }

  const { name, specialization, bio, image } = guideDetails;

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold text-center mb-5">{name}</h1>
      <img src={image} alt={name} className="w-[1080px] h-[520px] object-cover rounded-lg mb-5" />

      <p className="text-lg text-center font-bold mb-2">Specialization: {specialization}</p>
        <p className="text-gray-600 mb-4 text-center">{bio}</p>

    </div>
  );
};

export default TourGuideDetails;
