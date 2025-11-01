import React, { useState, useEffect } from "react";
import { Booking } from "../types";
import { bookingsAPI } from "../services/api";
import "./Bookings.css";

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await bookingsAPI.getUserBookings();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id: string) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      await bookingsAPI.cancel(id);
      setMessage({ type: "success", text: "Booking cancelled successfully" });
      fetchBookings();
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to cancel booking",
      });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (loading) {
    return <div className="loading">Loading bookings...</div>;
  }

  return (
    <div className="bookings-container">
      <h1>My Bookings</h1>

      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      {bookings.length === 0 ? (
        <div className="no-bookings">
          <p>You haven't made any bookings yet.</p>
          <p>Explore our tours and book your next adventure!</p>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => {
            const tour = typeof booking.tour === "object" ? booking.tour : null;
            return (
              <div key={booking._id} className="booking-card">
                <div className="booking-header">
                  <h3>{tour?.title || "Tour Details"}</h3>
                  <span className={`status-badge ${booking.status}`}>
                    {booking.status.toUpperCase()}
                  </span>
                </div>

                <div className="booking-details">
                  <p>
                    <strong>📍 Location:</strong> {tour?.location || "N/A"}
                  </p>
                  <p>
                    <strong>📅 Date:</strong>{" "}
                    {new Date(booking.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p>
                    <strong>⏱️ Duration:</strong> {tour?.duration || "N/A"}
                  </p>
                  <p>
                    <strong>💰 Price:</strong> ${tour?.price || "N/A"}
                  </p>
                  <p>
                    <strong>💳 Payment:</strong>
                    <span className={`payment-status ${booking.paymentStatus}`}>
                      {booking.paymentStatus.toUpperCase()}
                    </span>
                  </p>
                  <p className="booking-date">
                    <small>
                      Booked on:{" "}
                      {new Date(booking.createdAt!).toLocaleDateString()}
                    </small>
                  </p>
                </div>

                {booking.status !== "cancelled" && (
                  <button
                    className="cancel-button"
                    onClick={() => handleCancelBooking(booking._id)}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Bookings;
