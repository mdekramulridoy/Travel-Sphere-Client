import React from 'react';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <div className="bg-[#8BDEFF] min-h-screen py-16 px-6 lg:px-20">
      <Helmet>
        <title>About Us | Travel Sphere</title>
      </Helmet>
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl lg:text-5xl font-bold mb-8 text-gray-800">
          About Travel Sphere
        </h1>
        <p className="text-gray-700 text-lg mb-12 leading-relaxed">
          Welcome to Travel Sphere, your trusted companion for exploring the
          breathtaking landscapes, rich history, and vibrant culture of
          Bangladesh. Since 2024, we've been committed to providing exceptional
          travel experiences that create lifelong memories for our clients.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Mission Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Our Mission
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Our mission is to make travel easy, enjoyable, and accessible for
            everyone. Whether you're an adventurer seeking thrilling experiences
            or a family looking for a peaceful getaway, we ensure every trip
            meets your expectations.
          </p>
        </div>

        {/* Vision Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Our Vision
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            At Travel Sphere, we envision a world where travel connects people,
            cultures, and ideas. We aim to become the most trusted travel
            service in Bangladesh, known for quality, innovation, and integrity.
          </p>
        </div>
      </div>

      <div className="mt-16 max-w-6xl mx-auto">
        {/* Why Choose Us Section */}
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Expert Guides
            </h3>
            <p className="text-gray-600 text-sm">
              Our experienced guides ensure you have an authentic and enriching
              travel experience.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Customized Tours
            </h3>
            <p className="text-gray-600 text-sm">
              Every traveler is unique, and so are our packages. Tailor your
              trips to match your needs.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              24/7 Support
            </h3>
            <p className="text-gray-600 text-sm">
              We're here for you whenever you need us, ensuring a seamless
              travel experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
