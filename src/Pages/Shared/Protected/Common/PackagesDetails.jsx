import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../../../Provider/AuthProvider";

const PackagesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [packageDetails, setPackageDetails] = useState(null);
  const [guides, setGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState("");
  const [tourDate, setTourDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  // Fetch package details
  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await fetch(`https://travel-sphere-server-nu.vercel.app/packages/${id}`);
        const data = await response.json();
        setPackageDetails(data);
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };
    fetchPackageDetails();
  }, [id]);

  // Fetch tour guides
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch("https://travel-sphere-server-nu.vercel.app/guides", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        });
        const data = await response.json();
        setGuides(data);
      } catch (error) {
        console.error("Error fetching guides:", error);
      }
    };
    fetchGuides();
  }, []);

  // Handle booking submission
  const handleBooking = async (e) => {
    e.preventDefault();

    // Find selected guide's email
    const selectedGuideEmail = guides.find(
      (guide) => guide.name === selectedGuide
    )?.email;

    // If guide's email not found, alert the user
    if (!selectedGuideEmail) {
      alert("Please select a valid guide.");
      return;
    }

    const bookingData = {
      packageId: id,
      packageName: packageDetails.name,
      touristName: user.displayName,
      touristEmail: user.email,
      touristImage: user.photoURL,
      price: packageDetails.price,
      tourDate,
      guideName: selectedGuide,
      guideEmail: selectedGuideEmail, // Save guide's email here
      status: "pending", // Set status as pending
    };

    try {
      const response = await fetch("https://travel-sphere-server-nu.vercel.app/bookings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      const result = await response.json();
      if (result.insertedId) {
        setShowModal(true); // Show modal if booking is successful
      } else {
        alert("Failed to book the tour.");
      }
    } catch (error) {
      console.error("Error booking the tour:", error);
    }
  };

  if (!packageDetails) return <div>Loading...</div>;

  return (
    <div className="bg-white min-h-screen py-16 px-6 lg:px-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        {packageDetails.name}
      </h1>
      <p className="text-gray-600 text-lg mb-6">{packageDetails.description}</p>

      {/* Image Gallery */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Places we may visit
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {packageDetails.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${packageDetails.name} - ${index + 1}`}
              className="w-full h-40 object-cover rounded-lg shadow-md"
            />
          ))}
        </div>
      </div>

      {/* Plans */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Plans</h2>
      <ul className="list-disc pl-6">
        {packageDetails.plans.map((plan, index) => (
          <li key={index} className="text-gray-600 list-none">
            <span className="font-semibold">{`Day ${index + 1}: `}</span>
            {plan}
          </li>
        ))}
      </ul>

      {/* Guides Section */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-6">
        Available Guides
      </h2>
      <ul className="mt-4 mb-6">
        {guides.map((guide) => (
          <li
            key={guide._id}
            className="text-black rounded-xl text-center font-bold underline cursor-pointer p-4 border mb-3 bg-[#8BDEFF] uppercase"
            onClick={() => navigate(`/guides/${guide._id}`)}
          >
            {guide.name}
          </li>
        ))}
      </ul>

      {/* Booking Form */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-8">
        Book Your Tour
      </h2>
      <form onSubmit={handleBooking} className="mt-6 space-y-4">
        <div>
          <label className="block text-gray-700">Package Name</label>
          <input
            type="text"
            value={packageDetails.name}
            readOnly
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Tourist Name</label>
          <input
            type="text"
            value={user.displayName}
            readOnly
            className="w-full px-4 py-2 border rounded-md text-black"
          />
        </div>
        <div>
          <label className="block text-gray-700">Tourist Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Tourist Image</label>
          <input
            type="text"
            value={user.photoURL}
            readOnly
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="text"
            value={`${packageDetails.price} BDT`}
            readOnly
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Tour Date</label>
          <DatePicker
            selected={tourDate}
            onChange={(date) => setTourDate(date)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Tour Guide</label>
          <select
            value={selectedGuide}
            onChange={(e) => setSelectedGuide(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          >
            <option value="">Select a guide</option>
            {guides.map((guide) => (
              <option key={guide._id} value={guide.name}>
                {guide.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md"
        >
          Book Now
        </button>
      </form>

      {/* Modal for confirming booking */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-1/3 flex flex-col items-center text-center">
            <h3 className="text-xl font-semibold mb-4">Request pending</h3>
            <p>
              Your booking is now pending. Once the guide confirms, you will
              receive further details.
            </p>
            <div className="mt-4 flex flex-col items-center text-center gap-3">
              <button
                onClick={() => navigate("/dashboard/my-bookings")}
                className="px-6 py-2 bg-blue-600 text-white rounded-md"
              >
                Go to My Bookings
              </button>
              <button
                onClick={() => setShowModal(false)} // Close the modal
                className=" px-6 py-2 bg-gray-300 text-black rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackagesDetails;
