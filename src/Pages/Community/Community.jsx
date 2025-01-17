import React from 'react';
import { Helmet } from 'react-helmet-async';

const Community = () => {
  return (
    <div className="bg-[#8BDEFF] min-h-screen py-16 px-6 lg:px-20">
      <Helmet>
        <title>Community | Travel Sphere</title>
      </Helmet>
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-gray-800">
          Join Our Community
        </h1>
        <p className="text-gray-700 text-lg mb-12 leading-relaxed">
          At Travel Sphere, we believe in the power of community. Whether you're 
          a travel enthusiast, an adventurer, or simply someone who loves to connect 
          with like-minded individuals, our community is here to inspire, share, and 
          grow together.
        </p>
      </div>

      {/* Community Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Exclusive Events</h2>
          <p className="text-gray-600 text-sm">
            Participate in meetups, workshops, and exclusive travel events with fellow travelers.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Local Insights</h2>
          <p className="text-gray-600 text-sm">
            Gain insider tips and recommendations from local experts and community members.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Collaborative Planning</h2>
          <p className="text-gray-600 text-sm">
            Share your travel plans and collaborate with others to create unforgettable experiences.
          </p>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="mt-16 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">How to Join?</h2>
        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
          Becoming a part of our community is simple and free. Sign up to access 
          member-only benefits, connect with others, and stay updated on the latest events and tours.
        </p>
        <button className="bg-gray-800 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-700 transition-all">
          Join Now
        </button>
      </div>

      {/* Testimonials Section */}
      <div className="mt-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">What Our Members Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-600 italic">
              "Joining the Travel Sphere community has been a game-changer for my travel experiences. 
              The connections and tips I gained are invaluable."
            </p>
            <h3 className="text-gray-800 font-semibold mt-4">- Aisha Rahman</h3>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-600 italic">
              "I love the events organized by the community. They're fun, insightful, and perfect for 
              networking with other travel lovers."
            </p>
            <h3 className="text-gray-800 font-semibold mt-4">- Imran Hossain</h3>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <p className="text-gray-600 italic">
              "Travel Sphere is more than just a platform—it's a family. I've made lifelong friends here."
            </p>
            <h3 className="text-gray-800 font-semibold mt-4">- Farah Khan</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
