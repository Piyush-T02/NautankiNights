import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AddEvent from "./pages/AddEvent";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import EventDetail from "./pages/EventDetail";
import FilterModal from "./components/FilterModal";
import Category from "./pages/Category";
import City from "./pages/City";
import Search from "./pages/Search";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});

  const handleFilterClick = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleApplyFilter = (filters) => {
    setAppliedFilters(filters);
  };

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} onFilterClick={handleFilterClick} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home appliedFilters={appliedFilters} />} />
          <Route path="/add" element={user ? <AddEvent user={user} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/category" element={<Category />} />
          <Route path="/city" element={<City />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
      
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        onApplyFilter={handleApplyFilter}
      />
    </BrowserRouter>
  );
}

export default App;