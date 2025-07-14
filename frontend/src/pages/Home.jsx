import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";

const Home = ({ appliedFilters }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, [appliedFilters]);

  const fetchEvents = () => {
    setLoading(true);
    
    // Check if any filters are applied
    const hasFilters = appliedFilters && Object.values(appliedFilters).some(value => value);
    
    if (hasFilters) {
      // Use filter endpoint
      const params = new URLSearchParams();
      if (appliedFilters.date) params.append('date', appliedFilters.date);
      if (appliedFilters.city) params.append('city', appliedFilters.city);
      if (appliedFilters.category) params.append('category', appliedFilters.category);
      
      axios.get(`http://localhost:5000/api/events/filter?${params}`)
        .then(res => {
          setEvents(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching filtered events:", err);
          setLoading(false);
        });
    } else {
      // Use regular endpoint for all events
      axios.get("http://localhost:5000/api/events")
        .then(res => {
          setEvents(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching events:", err);
          setLoading(false);
        });
    }
  };

  if (loading) {
    return (
      <div>
        <h2>Upcoming Events</h2>
        <p>Loading events...</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Upcoming Events</h2>
      {appliedFilters && Object.values(appliedFilters).some(value => value) && (
        <div className="filter-indicator">
          <p>Showing filtered results</p>
        </div>
      )}
      <div className="event-grid">
        {events.length > 0 ? events.map(e => (
          <EventCard key={e.id} event={e} />
        )) : <p>No events found.</p>}
      </div>
    </div>
  );
};

export default Home;