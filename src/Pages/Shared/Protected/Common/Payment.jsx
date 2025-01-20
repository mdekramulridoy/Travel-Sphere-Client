import React, { useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import axios from "axios";

// Load Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = ({ bookingId, price }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      setProcessing(true);

      // Step 1: Create Payment Intent (Server-Side)
      const { data: clientSecret } = await axios.post(
        "https://travel-sphere-server-nu.vercel.app/create-payment-intent",
        { amount: price }
      );

      // Step 2: Confirm Payment (Client-Side)
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: "John Doe", // You can replace this with dynamic user data
            },
          },
        }
      );

      if (error) {
        setError(error.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        setSuccess(true);

        // Step 3: Send payment details to the server
        const paymentDetails = {
          bookingId,
          amount: price,
          cardInfo: {
            number: "4242424242424242", // Example card number, please don't send real card data
            expiry: "12/25",
            cvc: "123",
          },
          userInfo: {
            name: "John Doe",
            email: "john.doe@example.com", // Replace with user email if available
          },
        };

        await axios.post("https://travel-sphere-server-nu.vercel.app/payments", paymentDetails);

        // Step 4: Update booking status on the server
        await axios.patch(
          `https://travel-sphere-server-nu.vercel.app/bookings/confirm/${bookingId}`,
          { action: "in review" }
        );

        setProcessing(false);
      }
    } catch (error) {
      setError("Payment failed. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Complete Payment
      </h2>
      <p className="text-lg mb-4 font-semibold text-gray-700">
        Total Amount: <span className="text-blue-600">${price}</span>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="card-element"
            className="block text-lg font-medium mb-2"
          >
            Credit Card Information
          </label>
          <CardElement id="card-element" />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success ? (
          <p className="text-green-500 text-lg">
            Payment successful! Your booking is now in review.
          </p>
        ) : (
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
            disabled={!stripe || processing}
          >
            {processing ? "Processing..." : "Pay Now"}
          </button>
        )}
      </form>
    </div>
  );
};

const Payment = () => {
  const location = useLocation();
  const { bookingId, price } = location.state; // Get bookingId and price from route state

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm bookingId={bookingId} price={price} />
    </Elements>
  );
};

export default Payment;
