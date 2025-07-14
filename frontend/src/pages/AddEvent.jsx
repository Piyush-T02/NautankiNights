import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEvent = ({ user }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    start_time: "",
    end_time: "",
    category: "",
    image_url: "",
    organizer_name: user?.displayName || "",
  });

  const navigate = useNavigate();

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost/Backend/api/index.php/events", formData)
      .then(() => navigate("/"))
      .catch(err => console.log("POST Error:", err));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Add New Event</h2>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
      <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      <input name="city" value={formData.city} onChange={handleChange} placeholder="city" required />
      <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
      <input name="date" type="date" value={formData.date} onChange={handleChange} placeholder="Date" required />
      <input name="start_time" type="time" value={formData.start_time} onChange={handleChange} placeholder="Start Time" required />
      <input name="end_time" type="time" value={formData.end_time} onChange={handleChange} placeholder="End Time" required />
      <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
      <input name="image_url" value={formData.image_url} onChange={handleChange} placeholder="Image URL" required />
      <input name="organizer_name" value={formData.organizer_name} onChange={handleChange} placeholder="Organizer Name" required />
      <button type="submit">Add Event</button>
    </form>
  );
};

export default AddEvent;
