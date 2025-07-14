// src/pages/Category.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import "../index.css";

const Category = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;

    setLoading(true);
    axios
      .get(`http://localhost/Backend/api/index.php/events?category=${encodeURIComponent(category)}`)
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching category events:", err);
        setLoading(false);
      });
  }, [category]);

  if (!category) return <p>❌ No category specified in the URL.</p>;
  if (loading) return <p>Loading events for category "{category}"...</p>;

  return (
    <div>
      <h2>Events in Category: {category}</h2>
      <div className="event-grid">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <p>No events found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Category;
