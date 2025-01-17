import React from 'react';

const ExtraOneSection = () => {
  return (
    <div className="bg-[#8BDEFF] py-16 px-6 lg:px-20">
      <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8">
        What Our Happy Travelers Say
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <img
            src="https://i.ibb.co.com/8Bwws2G/Nq62-Go6jl-Z.webp"
            alt="Traveler 1"
            className="w-20 object-cover h-20 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-center">Rashed khan</h2>
          <p className="text-center text-gray-600 text-sm mb-4">
            "An unforgettable experience! Bangladesh's beauty and hospitality
            are unmatched."
          </p>
          <div className="flex justify-center space-x-1">
            {/* Stars */}
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927a1 1 0 011.902 0l1.377 4.243a1 1 0 00.95.69h4.462a1 1 0 01.592 1.806l-3.63 2.635a1 1 0 00-.364 1.118l1.377 4.243a1 1 0 01-1.537 1.118l-3.63-2.635a1 1 0 00-1.176 0l-3.63 2.635a1 1 0 01-1.537-1.118l1.377-4.243a1 1 0 00-.364-1.118L2.568 9.666a1 1 0 01.592-1.806h4.462a1 1 0 00.95-.69L9.049 2.927z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <img
            src="https://i.ibb.co.com/VSzvR3j/images-1.jpg"
            alt="Traveler 2"
            className="w-20 object-cover h-20 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-center">Jos Butler</h2>
          <p className="text-center text-gray-600 text-sm mb-4">
            "The Sundarbans tour was a dream come true. Highly recommend!"
          </p>
          <div className="flex justify-center space-x-1">
            {/* Stars */}
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927a1 1 0 011.902 0l1.377 4.243a1 1 0 00.95.69h4.462a1 1 0 01.592 1.806l-3.63 2.635a1 1 0 00-.364 1.118l1.377 4.243a1 1 0 01-1.537 1.118l-3.63-2.635a1 1 0 00-1.176 0l-3.63 2.635a1 1 0 01-1.537-1.118l1.377-4.243a1 1 0 00-.364-1.118L2.568 9.666a1 1 0 01.592-1.806h4.462a1 1 0 00.95-.69L9.049 2.927z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <img
            src="https://i.ibb.co.com/LpXbQVL/t-bolt.webp"
            alt="Traveler 3"
            className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-center">Trent Bolt</h2>
          <p className="text-center text-gray-600 text-sm mb-4">
            "Incredible food, mesmerizing landscapes, and warm people. Loved
            every moment."
          </p>
          <div className="flex justify-center space-x-1">
            {/* Stars */}
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927a1 1 0 011.902 0l1.377 4.243a1 1 0 00.95.69h4.462a1 1 0 01.592 1.806l-3.63 2.635a1 1 0 00-.364 1.118l1.377 4.243a1 1 0 01-1.537 1.118l-3.63-2.635a1 1 0 00-1.176 0l-3.63 2.635a1 1 0 01-1.537-1.118l1.377-4.243a1 1 0 00-.364-1.118L2.568 9.666a1 1 0 01.592-1.806h4.462a1 1 0 00.95-.69L9.049 2.927z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtraOneSection;
