import React from 'react';
import { Helmet } from 'react-helmet-async';

const Trips = () => {
  const trips = [
    {
      name: "Sundarbans",
      description:
        "Explore the world's largest mangrove forest and the home of the Royal Bengal Tiger.",
      image: "https://i.ibb.co.com/Mgc6R4K/7-Mhg-A1683356094-sub-img-1.jpg",
    },
    {
      name: "Cox's Bazar",
      description:
        "Relax on the world's longest unbroken sandy sea beach and enjoy breathtaking sunsets.",
      image: "https://i.ibb.co.com/V97ZwxN/cox-bazar.jpg",
    },
    {
      name: "Bandarban",
      description:
        "Discover the serenity of lush green hills, tribal culture, and majestic waterfalls.",
      image: "https://i.ibb.co.com/mz5c5Bg/204-36376273530-3c9a0335f5-b-copyjpg.jpg",
    },
    {
      name: "Srimangal",
      description:
        "Known as the 'Tea Capital of Bangladesh,' Srimangal is perfect for nature lovers.",
      image: "https://i.ibb.co.com/Kjc8t2j/images-1.jpg",
    },
    {
      name: "Rangamati",
      description:
        "Experience the beauty of the Kaptai Lake and the tranquil environment of Rangamati.",
      image: "https://i.ibb.co.com/HYJpR7w/Ranga-mati-Kaptai-Lake.jpg",
    },
    {
      name: "Paharpur",
      description:
        "Visit the UNESCO World Heritage Site, Somapura Mahavihara, an ancient Buddhist monastery.",
      image: "https://i.ibb.co.com/2YBXhdt/Paharpur-Temple-Village-Tou.jpg",
    },
  ];

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
          unforgettable travel experiences. Explore our featured trips and plan your next adventure.
        </p>
      </div>

      {/* Trips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {trips.map((trip, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105"
          >
            <img
              src={trip.image}
              alt={trip.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {trip.name}
              </h2>
              <p className="text-gray-600 text-sm">{trip.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Ready to Plan Your Trip?
        </h2>
        <p className="text-gray-700 text-lg mb-6">
          Contact us today to create a customized itinerary and make your dream trip a reality.
        </p>
        <button className="bg-gray-800 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-700 transition-all">
          Plan Your Trip
        </button>
      </div>
    </div>
  );
};

export default Trips;
