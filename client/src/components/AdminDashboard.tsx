import React, { useState, useEffect } from "react";
import { Tour } from "../types";
import { toursAPI, bookingsAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [allBookings, setAllBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"tours" | "bookings">("tours");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const { isAdmin } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    duration: "",
    images: "",
    maxGroupSize: "",
    availableDates: "",
  });

  useEffect(() => {
    if (isAdmin) {
      fetchTours();
      fetchAllBookings();
    }
  }, [isAdmin]);

  const fetchTours = async () => {
    try {
      const data = await toursAPI.getAll();
      setTours(data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllBookings = async () => {
    try {
      const data = await bookingsAPI.getAllBookings();
      setAllBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      location: "",
      price: "",
      duration: "",
      images: "",
      maxGroupSize: "",
      availableDates: "",
    });
  };

  const handleCreateTour = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tourData = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        price: parseFloat(formData.price),
        duration: formData.duration,
        images: formData.images.split(",").map((img) => img.trim()),
        maxGroupSize: parseInt(formData.maxGroupSize),
        availableDates: formData.availableDates
          .split(",")
          .map((date) => new Date(date.trim()).toISOString()),
      };

      await toursAPI.create(tourData);
      setMessage({ type: "success", text: "Tour created successfully!" });
      setShowCreateModal(false);
      resetForm();
      fetchTours();
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to create tour",
      });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleEditTour = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTour) return;

    try {
      const tourData = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        price: parseFloat(formData.price),
        duration: formData.duration,
        images: formData.images.split(",").map((img) => img.trim()),
        maxGroupSize: parseInt(formData.maxGroupSize),
        availableDates: formData.availableDates
          .split(",")
          .map((date) => new Date(date.trim()).toISOString()),
      };

      await toursAPI.update(selectedTour._id, tourData);
      setMessage({ type: "success", text: "Tour updated successfully!" });
      setShowEditModal(false);
      setSelectedTour(null);
      resetForm();
      fetchTours();
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update tour",
      });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDeleteTour = async (tourId: string) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;

    try {
      await toursAPI.delete(tourId);
      setMessage({ type: "success", text: "Tour deleted successfully!" });
      fetchTours();
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to delete tour",
      });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const openEditModal = (tour: Tour) => {
    setSelectedTour(tour);
    setFormData({
      title: tour.title,
      description: tour.description || "",
      location: tour.location || "",
      price: tour.price?.toString() || "",
      duration: tour.duration || "",
      images: tour.images?.join(", ") || "",
      maxGroupSize: tour.maxGroupSize?.toString() || "",
      availableDates:
        tour.availableDates
          ?.map((date) => new Date(date).toISOString().split("T")[0])
          .join(", ") || "",
    });
    setShowEditModal(true);
  };

  if (!isAdmin) {
    return (
      <div className="admin-container">
        <div className="access-denied">
          <h1>Access Denied</h1>
          <p>You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Loading admin dashboard...</div>;
  }

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <div className="admin-tabs">
        <button
          className={activeTab === "tours" ? "active" : ""}
          onClick={() => setActiveTab("tours")}
        >
          Manage Tours ({tours.length})
        </button>
        <button
          className={activeTab === "bookings" ? "active" : ""}
          onClick={() => setActiveTab("bookings")}
        >
          All Bookings ({allBookings.length})
        </button>
      </div>

      {activeTab === "tours" && (
        <div className="tours-management">
          <div className="section-header">
            <h2>Tours Management</h2>
            <button
              className="create-button"
              onClick={() => setShowCreateModal(true)}
            >
              + Create New Tour
            </button>
          </div>

          <div className="tours-table">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th>Duration</th>
                  <th>Max Group</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tours.map((tour) => (
                  <tr key={tour._id}>
                    <td>{tour.title}</td>
                    <td>{tour.location}</td>
                    <td>${tour.price}</td>
                    <td>{tour.duration}</td>
                    <td>{tour.maxGroupSize}</td>
                    <td className="actions">
                      <button
                        className="edit-btn"
                        onClick={() => openEditModal(tour)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteTour(tour._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "bookings" && (
        <div className="bookings-management">
          <h2>All Bookings</h2>
          <div className="bookings-table">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Tour</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Booked On</th>
                </tr>
              </thead>
              <tbody>
                {allBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.user?.name || "N/A"}</td>
                    <td>{booking.tour?.title || "N/A"}</td>
                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge ${booking.status}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`payment-status ${booking.paymentStatus}`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </td>
                    <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Tour Modal */}
      {showCreateModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowCreateModal(false)}
        >
          <div className="modal large" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-modal"
              onClick={() => setShowCreateModal(false)}
            >
              ×
            </button>
            <h2>Create New Tour</h2>
            <form onSubmit={handleCreateTour}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 5 days"
                  />
                </div>
                <div className="form-group">
                  <label>Max Group Size</label>
                  <input
                    type="number"
                    name="maxGroupSize"
                    value={formData.maxGroupSize}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Images (comma-separated URLs)</label>
                <input
                  type="text"
                  name="images"
                  value={formData.images}
                  onChange={handleInputChange}
                  placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                />
              </div>
              <div className="form-group">
                <label>Available Dates (comma-separated, YYYY-MM-DD)</label>
                <input
                  type="text"
                  name="availableDates"
                  value={formData.availableDates}
                  onChange={handleInputChange}
                  placeholder="2025-12-01, 2025-12-15, 2026-01-05"
                />
              </div>
              <button type="submit" className="submit-button">
                Create Tour
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Tour Modal */}
      {showEditModal && selectedTour && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal large" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-modal"
              onClick={() => setShowEditModal(false)}
            >
              ×
            </button>
            <h2>Edit Tour</h2>
            <form onSubmit={handleEditTour}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Duration</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 5 days"
                  />
                </div>
                <div className="form-group">
                  <label>Max Group Size</label>
                  <input
                    type="number"
                    name="maxGroupSize"
                    value={formData.maxGroupSize}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Images (comma-separated URLs)</label>
                <input
                  type="text"
                  name="images"
                  value={formData.images}
                  onChange={handleInputChange}
                  placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                />
              </div>
              <div className="form-group">
                <label>Available Dates (comma-separated, YYYY-MM-DD)</label>
                <input
                  type="text"
                  name="availableDates"
                  value={formData.availableDates}
                  onChange={handleInputChange}
                  placeholder="2025-12-01, 2025-12-15, 2026-01-05"
                />
              </div>
              <button type="submit" className="submit-button">
                Update Tour
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
