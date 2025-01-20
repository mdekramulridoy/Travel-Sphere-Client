import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

// Assigned Tours Component
const AssignedTours = () => {
  const { user } = useContext(AuthContext); // Retrieve logged-in user's info (email, etc.)
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings for the logged-in guide
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/bookings/guide/${user?.email}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching guide bookings:", error);
        Swal.fire("Error", "Failed to load bookings", "error");
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) fetchBookings();
  }, [user?.email]);

  // Confirm or Reject booking
  const handleStatusChange = async (bookingId, action) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/bookings/confirm/${bookingId}`,
        { action },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire("Success!", `Booking ${action}ed successfully.`, "success");
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      Swal.fire("Error!", "There was an issue updating the booking.", "error");
    }
  };

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  return (
    <div className="assigned-tours">
      <h2 className="text-2xl font-semibold">Assigned Tours</h2>
      {bookings.length === 0 ? (
        <p>No bookings assigned yet.</p>
      ) : (
        <div>
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="flex justify-between items-center border-b border-gray-300 py-4"
            >
              <div>
                <h3 className="text-lg font-semibold">{booking.packageName}</h3>
                <p>Tourist: {booking.touristName}</p>
                <p>Email: {booking.touristEmail}</p>
                <p>Price: ${booking.price}</p>
                <p>Date: {new Date(booking.tourDate).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleStatusChange(booking._id, "confirm")}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleStatusChange(booking._id, "reject")}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignedTours;
