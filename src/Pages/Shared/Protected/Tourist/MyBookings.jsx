import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate(); // React Router navigate hook

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

  // Handle payment redirection
  const handlePayment = async (bookingId) => {
    // You can optionally check the status or prepare data here
    // Redirect to the payment route
    navigate(`/dashboard/payment/${bookingId}`); // Redirect to the payment page with the bookingId
  };

  // Handle booking cancellation
  const handleCancel = async (bookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:5000/bookings/cancel/${bookingId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access-token")}`,
              },
            }
          );
          // Remove the booking from the UI
          setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
          Swal.fire("Cancelled!", "The booking has been cancelled.", "success");
        } catch (error) {
          console.error("Error cancelling booking:", error);
          Swal.fire("Error!", "Something went wrong while cancelling the booking.", "error");
        }
      }
    });
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

              {/* Display Pay and Cancel buttons if status is pending */}
              {booking.status === "pending" && (
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handlePayment(booking._id)} // Redirect to payment page
                    className="bg-blue-600 text-white text-sm px-6 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Pay
                  </button>
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="bg-red-600 text-white text-sm px-6 py-2 rounded hover:bg-red-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
