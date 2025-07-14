// src/pages/Search.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import EventCard from "../components/EventCard";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const city = searchParams.get("city");
  const category = searchParams.get("category");
  const date = searchParams.get("date");

  useEffect(() => {
    const params = new URLSearchParams();
    if (city) params.append("city", city);
    if (category) params.append("category", category);
    if (date) params.append("date", date);

    axios
      .get(`http://localhost/Backend/api/index.php/events?${params.toString()}`)
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
        setLoading(false);
      });
  }, [city, category, date]);

  if (loading) return <p>Loading filtered events...</p>;

  return (
    <div>
      <h2>Filtered Events</h2>
      <div className="event-grid">
        {events.length > 0 ? (
          events.map((e) => <EventCard key={e.id} event={e} />)
        ) : (
          <p>No events found matching your filters.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
