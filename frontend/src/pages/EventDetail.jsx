import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const formatDate = iso => {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("en-IN");
};

const formatTime = time => {
  if (!time) return "-";
  const [h, m] = time.split(":");
  const hr = parseInt(h);
  return `${hr % 12 || 12}:${m} ${hr >= 12 ? "PM" : "AM"}`;
};

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost/Backend/api/index.php/event/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => {
        console.error("Fetch error:", err);
        setEvent(null);
      });
  }, [id]);

  if (!event || !event.title) return <p>Loading event...</p>;

  return (
    <div className="event-detail">
      <img src={event.image_url} alt={event.title} className="event-image" />
      <h2>{event.title}</h2>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>City:</strong> {event.city}</p>
      <p><strong>Address:</strong> {event.address}</p>
      <p><strong>Date:</strong> {formatDate(event.date)}</p>
      <p><strong>Time:</strong> {formatTime(event.start_time)} - {formatTime(event.end_time)}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Organizer:</strong> {event.organizer_name}</p>
    </div>
  );
};

export default EventDetail;
