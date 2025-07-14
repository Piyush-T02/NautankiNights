// src/components/FilterModal.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";

const FilterModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    date: "",
    city: "",
    category: "",
  });

  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isOpen) {
      axios.get("http://localhost/Backend/api/index.php/cities").then(res => setCities(res.data));
      axios.get("http://localhost/Backend/api/index.php/categories").then(res => setCategories(res.data));
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilter = () => {
    const params = new URLSearchParams();
    if (filters.city) params.append("city", filters.city);
    if (filters.category) params.append("category", filters.category);
    if (filters.date) params.append("date", filters.date);
    navigate(`/search?${params.toString()}`);
    onClose();
  };

  const handleClearFilters = () => {
    setFilters({ date: "", city: "", category: "" });
    navigate("/");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Filter Events</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="filter-form">
          <div className="filter-group">
            <label htmlFor="date">Date:</label>
            <input 
              type="date" 
              id="date" 
              name="date" 
              value={filters.date} 
              onChange={handleInputChange} 
              className="filter-input"
            />
          </div>
          <div className="filter-group">
            <label htmlFor="city">City:</label>
            <select 
              id="city" 
              name="city" 
              value={filters.city} 
              onChange={handleInputChange}
              className="filter-input"
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label htmlFor="category">Category:</label>
            <select 
              id="category" 
              name="category" 
              value={filters.category} 
              onChange={handleInputChange}
              className="filter-input"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="filter-buttons">
            <button className="apply-btn" onClick={handleApplyFilter}>
              Apply Filters
            </button>
            <button className="clear-btn" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;