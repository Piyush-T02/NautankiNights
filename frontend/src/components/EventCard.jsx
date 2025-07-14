import React from "react";
import { Link } from "react-router-dom";

const formatDate = iso => new Date(iso).toLocaleDateString("en-IN");
const formatTime = time => {
  const [h, m] = time.split(":");
  const hr = parseInt(h);
  return `${hr % 12 || 12}:${m} ${hr >= 12 ? "PM" : "AM"}`;
};

const EventCard = ({ event }) => (
  <div className="event-card">
    <Link to={`/event/${event.id}`} className="event-link">
      <img src={event.image_url} alt={event.title} className="event-image" />
    </Link>
    <h3>{event.title}</h3>
    <p>Date: {formatDate(event.date)}<br />Time: {formatTime(event.start_time)} - {formatTime(event.end_time)}</p>
  </div>
);

export default EventCard;
