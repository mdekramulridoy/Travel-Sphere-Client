import React from 'react';

const ExtraTwoSection = () => {
  return (
    <div className="bg-[#8BDEFF] py-16 px-6 lg:px-20">
      <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8">
        Essential Travel Tips & Guidelines
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Tip 1 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Pack Smart</h2>
          <p className="text-gray-600 text-sm">
            Carry lightweight luggage with essentials like clothes suitable for
            the climate, personal toiletries, and a power bank. Avoid overpacking!
          </p>
        </div>

        {/* Tip 2 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Stay Safe</h2>
          <p className="text-gray-600 text-sm">
            Keep your important documents, such as passport and ID, safe and
            always accessible. Share your travel itinerary with someone you trust.
          </p>
        </div>

        {/* Tip 3 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Know the Culture</h2>
          <p className="text-gray-600 text-sm">
            Learn basic phrases in the local language and respect the culture
            and traditions of your destination.
          </p>
        </div>

        {/* Tip 4 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Stay Hydrated</h2>
          <p className="text-gray-600 text-sm">
            Always carry a reusable water bottle. Staying hydrated is crucial,
            especially during long trips or outdoor adventures.
          </p>
        </div>

        {/* Tip 5 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Travel Insurance</h2>
          <p className="text-gray-600 text-sm">
            Get travel insurance to cover unexpected expenses like medical
            emergencies, cancellations, or lost baggage.
          </p>
        </div>

        {/* Tip 6 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Plan Ahead</h2>
          <p className="text-gray-600 text-sm">
            Research your destination, book accommodations in advance, and have
            a rough itinerary, but be flexible for unexpected adventures.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExtraTwoSection;
