import React from "react";
import { useSpring, animated } from "@react-spring/web";

const ExtraTwoSection = () => {
  // Function to create infinite animation for each tip
  const useInfiniteAnimation = (delay) =>
    useSpring({
      from: { opacity: 0, transform: "translateY(50px)" },
      to: [
        { opacity: 1, transform: "translateY(0)" },
        { opacity: 0, transform: "translateY(-50px)" },
      ],
      loop: { reverse: true }, // Infinite reverse loop
      delay: delay, // Delay for each tip
      config: { duration: 10000 }, // Total duration for one loop
    });

  // Animations with different delays for each tip
  const tip1Animation = useInfiniteAnimation(0);
  const tip2Animation = useInfiniteAnimation(1000);
  const tip3Animation = useInfiniteAnimation(2000);
  const tip4Animation = useInfiniteAnimation(3000);
  const tip5Animation = useInfiniteAnimation(4000);
  const tip6Animation = useInfiniteAnimation(5000);

  return (
    <div className="bg-[#8BDEFF] py-16 px-6 lg:px-20">
      <h1 className="text-3xl lg:text-4xl font-bold text-center mb-8">
        Essential Travel Tips & Guidelines
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Tip 1 */}
        <animated.div
          style={tip1Animation}
          className="bg-white shadow-md rounded-lg p-6 transform transition-all duration-300"
        >
          <h2 className="text-xl font-semibold mb-4 text-center">Pack Smart</h2>
          <p className="text-gray-600 text-sm">
            Carry lightweight luggage with essentials like clothes suitable for
            the climate, personal toiletries, and a power bank. Avoid overpacking!
          </p>
        </animated.div>

        {/* Tip 2 */}
        <animated.div
          style={tip2Animation}
          className="bg-white shadow-md rounded-lg p-6 transform transition-all duration-300"
        >
          <h2 className="text-xl font-semibold mb-4 text-center">Stay Safe</h2>
          <p className="text-gray-600 text-sm">
            Keep your important documents, such as passport and ID, safe and
            always accessible. Share your travel itinerary with someone you trust.
          </p>
        </animated.div>

        {/* Tip 3 */}
        <animated.div
          style={tip3Animation}
          className="bg-white shadow-md rounded-lg p-6 transform transition-all duration-300"
        >
          <h2 className="text-xl font-semibold mb-4 text-center">
            Know the Culture
          </h2>
          <p className="text-gray-600 text-sm">
            Learn basic phrases in the local language and respect the culture
            and traditions of your destination.
          </p>
        </animated.div>

        {/* Tip 4 */}
        <animated.div
          style={tip4Animation}
          className="bg-white shadow-md rounded-lg p-6 transform transition-all duration-300"
        >
          <h2 className="text-xl font-semibold mb-4 text-center">Stay Hydrated</h2>
          <p className="text-gray-600 text-sm">
            Always carry a reusable water bottle. Staying hydrated is crucial,
            especially during long trips or outdoor adventures.
          </p>
        </animated.div>

        {/* Tip 5 */}
        <animated.div
          style={tip5Animation}
          className="bg-white shadow-md rounded-lg p-6 transform transition-all duration-300"
        >
          <h2 className="text-xl font-semibold mb-4 text-center">
            Travel Insurance
          </h2>
          <p className="text-gray-600 text-sm">
            Get travel insurance to cover unexpected expenses like medical
            emergencies, cancellations, or lost baggage.
          </p>
        </animated.div>

        {/* Tip 6 */}
        <animated.div
          style={tip6Animation}
          className="bg-white shadow-md rounded-lg p-6 transform transition-all duration-300"
        >
          <h2 className="text-xl font-semibold mb-4 text-center">Plan Ahead</h2>
          <p className="text-gray-600 text-sm">
            Research your destination, book accommodations in advance, and have
            a rough itinerary, but be flexible for unexpected adventures.
          </p>
        </animated.div>
      </div>
    </div>
  );
};

export default ExtraTwoSection;
