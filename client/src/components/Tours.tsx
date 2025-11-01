import React, { useState, useEffect } from "react";
import { Tour } from "../types";
import { toursAPI, bookingsAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Tours.css";

const Tours: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [durationFilter, setDurationFilter] = useState<string>("all");
  const [bookingMessage, setBookingMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const { isAuthenticated } = useAuth();

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchTours();
  }, []);

  useEffect(() => {
    const filterTours = () => {
      let filtered = [...tours];

      // Search filter
      if (searchTerm) {
        filtered = filtered.filter(
          (tour) =>
            tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tour.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tour.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Price filter
      if (priceFilter !== "all") {
        filtered = filtered.filter((tour) => {
          const price = tour.price || 0;
          switch (priceFilter) {
            case "low":
              return price < 500;
            case "medium":
              return price >= 500 && price < 1000;
            case "high":
              return price >= 1000;
            default:
              return true;
          }
        });
      }

      // Duration filter
      if (durationFilter !== "all") {
        filtered = filtered.filter((tour) => {
          const duration = tour.duration?.toLowerCase() || "";
          switch (durationFilter) {
            case "short":
              return (
                duration.includes("3") ||
                duration.includes("4") ||
                duration.includes("5")
              );
            case "medium":
              return (
                duration.includes("6") ||
                duration.includes("7") ||
                duration.includes("8") ||
                duration.includes("9") ||
                duration.includes("10")
              );
            case "long":
              return (
                duration.includes("11") ||
                duration.includes("12") ||
                duration.includes("13") ||
                duration.includes("14") ||
                duration.includes("15") ||
                duration.includes("16")
              );
            default:
              return true;
          }
        });
      }

      setFilteredTours(filtered);
    };

    filterTours();
  }, [tours, searchTerm, priceFilter, durationFilter]);

  const fetchTours = async () => {
    try {
      const data = await toursAPI.getAll();
      setTours(data);
      setFilteredTours(data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookTour = async () => {
    if (!selectedTour || !selectedDate) return;

    try {
      await bookingsAPI.create(selectedTour._id, selectedDate);
      setBookingMessage({
        type: "success",
        text: "Booking successful! Check your bookings page.",
      });
      setSelectedTour(null);
      setSelectedDate("");
      setTimeout(() => setBookingMessage(null), 5000);
    } catch (error: any) {
      setBookingMessage({
        type: "error",
        text:
          error.response?.data?.message || "Booking failed. Please try again.",
      });
      setTimeout(() => setBookingMessage(null), 5000);
    }
  };

  if (loading) {
    return <div className="loading">Loading tours...</div>;
  }

  return (
    <div className="tours-container">
      <h1>Available Tours</h1>

      {bookingMessage && (
        <div className={`message ${bookingMessage.type}`}>
          {bookingMessage.text}
        </div>
      )}

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title, location, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filters">
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Prices</option>
            <option value="low">Under $500</option>
            <option value="medium">$500 - $1000</option>
            <option value="high">Over $1000</option>
          </select>
          <select
            value={durationFilter}
            onChange={(e) => setDurationFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Durations</option>
            <option value="short">3-5 days</option>
            <option value="medium">6-10 days</option>
            <option value="long">11+ days</option>
          </select>
        </div>
      </div>

      <div className="results-count">
        Showing {filteredTours.length} of {tours.length} tours
      </div>

      {filteredTours.length === 0 ? (
        <div className="no-tours">
          <p>
            No tours match your search criteria. Try adjusting your filters!
          </p>
        </div>
      ) : (
        <div className="tours-grid">
          {filteredTours.map((tour) => (
            <div key={tour._id} className="tour-card">
              <div className="tour-image">
                <img
                  src={
                    tour.images[0] ||
                    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
                  }
                  alt={tour.title}
                />
                <span className="tour-price">${tour.price}</span>
              </div>
              <div className="tour-content">
                <h3>{tour.title}</h3>
                <p className="tour-location">
                  📍 {tour.location || "Himalayan Region"}
                </p>
                <p className="tour-description">
                  {tour.description || "An amazing tour experience"}
                </p>
                <div className="tour-details">
                  <span>⏱️ {tour.duration || "Multiple days"}</span>
                  <span>👥 Max {tour.maxGroupSize || 15} people</span>
                </div>
                <button
                  className="book-button"
                  onClick={() => setSelectedTour(tour)}
                  disabled={!isAuthenticated}
                >
                  {isAuthenticated ? "Book Now" : "Login to Book"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTour && (
        <div className="modal-overlay" onClick={() => setSelectedTour(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-modal"
              onClick={() => setSelectedTour(null)}
            >
              ×
            </button>
            <h2>Book {selectedTour.title}</h2>
            <div className="modal-content">
              <p>
                <strong>Location:</strong> {selectedTour.location}
              </p>
              <p>
                <strong>Duration:</strong> {selectedTour.duration}
              </p>
              <p>
                <strong>Price:</strong> ${selectedTour.price}
              </p>
              <p>
                <strong>Max Group Size:</strong> {selectedTour.maxGroupSize}
              </p>

              <div className="date-selection">
                <label>Select Your Travel Date:</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={today}
                  className="date-input"
                />
                <small className="date-hint">
                  Select any future date for your tour
                </small>
              </div>

              <button
                className="confirm-booking-button"
                onClick={handleBookTour}
                disabled={!selectedDate}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tours;
