import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  // Fetch bookings of the current user
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/bookings/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access-token")}`, // Assuming you're using JWT token
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (user?.email) {
      fetchBookings();
    }
  }, [user]);

  // Function to determine the text color based on the status
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-500"; // Yellow for pending status
      case "confirmed":
        return "text-green-500"; // Green for confirmed status
      default:
        return "text-gray-600"; // Default gray color
    }
  };

  return (
    <div className="bg-white py-16 px-6 lg:px-20 min-h-screen">
      <h1 className="text-4xl font-semibold text-gray-800 mb-6">
        Your Bookings
      </h1>

      {bookings.length === 0 ? (
        <p className="text-lg text-gray-600">You have no bookings yet.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="p-6 border rounded-md shadow-md bg-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                Package: {booking.packageName}
              </h3>
              <p className="text-gray-600">
                Tour Date: {new Date(booking.tourDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600">Guide: {booking.guideName}</p>
              <p className={`font-semibold ${getStatusColor(booking.status)}`}>
                Status: {booking.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
