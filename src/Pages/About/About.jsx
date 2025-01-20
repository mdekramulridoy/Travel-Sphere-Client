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
          Bangladesh. Since 2025, we've been committed to providing exceptional
          travel experiences that create lifelong memories for our clients.
        </p>
      </div>


      {/* Developer Info Section */}
      <div className="mt-16 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Meet the Developer
        </h2>
        <p className="text-lg mb-6 text-gray-700">
          This website is developed by Md. Ekramul Hoque, a passionate developer with expertise in creating web applications.
        </p>
        <p className="text-lg mb-6 text-gray-700 font-bold">
          Ekramul has worked on several projects, including:
        </p>
        <ul className=" mx-auto max-w-lg text-gray-700 mb-6 text-center list-none">
          <li className='p-2 border mb-2'><a href="https://typical-hook.surge.sh/" className="text-blue-600 hover:text-white">Typical Hook</a></li>
          <li className='p-2 border mb-2 hover:text-white'><a href="https://air-ticket-client.web.app/" className="text-blue-600 hover:text-white">Air Ticket Client</a></li>
          <li className='p-2 border mb-2 hover:text-white'><a href="https://book-library-client-server.web.app/" className="text-blue-600 hover:text-white">Book Library</a></li>
        </ul>
        <p className="text-gray-700">
          Ekramul has created over 12 projects, showcasing his commitment to building useful and engaging applications.
        </p>
      </div>
    </div>
  );
};

export default About;
