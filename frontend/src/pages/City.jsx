// src/pages/City.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import EventCard from "../components/EventCard";
import "../index.css";

const City = () => {
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;

    setLoading(true);
    axios
      .get(`http://localhost/Backend/api/index.php/events?city=${encodeURIComponent(city)}`)
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching city events:", err);
        setLoading(false);
      });
  }, [city]);

  if (!city) return <p>❌ No city specified in the URL.</p>;
  if (loading) return <p>Loading events in "{city}"...</p>;

  return (
    <div>
      <h2>Events in City: {city}</h2>
      <div className="event-grid">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <p>No events found in this city.</p>
        )}
      </div>
    </div>
  );
};

export default City;
