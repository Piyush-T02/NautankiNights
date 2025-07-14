const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "#Piyush02",
  database: "nautankinights",
});

db.connect((err) => {
  if (err) console.error("❌ MySQL Connection Failed:", err);
  else console.log("✅ MySQL Connected Successfully");
});

// Create new event
app.post("/api/events", (req, res) => {
  const {
    title, description, city, address, date, start_time,
    end_time, category, organizer_name, image_url
  } = req.body;

  const sql = `
    INSERT INTO event1 
    (title, description, city, address, date, start_time, end_time, category, organizer_name, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [title, description, city, address, date, start_time, end_time, category, organizer_name, image_url],
    (err) => {
      if (err) return res.status(500).json({ message: "Insert failed", error: err.message });
      res.send("✅ Event created successfully");
    }
  );
});

// Get events based on filters (city, category, date)
app.get("/api/events", (req, res) => {
  const { city, category, date } = req.query;

  let sql = "SELECT * FROM event1 WHERE 1=1";
  const params = [];

  if (city) {
    sql += " AND city = ?";
    params.push(city);
  }

  if (category) {
    sql += " AND category = ?";
    params.push(category);
  }

  if (date) {
    sql += " AND date = ?";
    params.push(date);
  }

  sql += " ORDER BY date ASC";

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ message: "Fetch failed", error: err.message });
    res.json(results);
  });
});

// Fetch unique cities
app.get("/api/cities", (req, res) => {
  db.query("SELECT DISTINCT city FROM event1 ORDER BY city", (err, results) => {
    if (err) return res.status(500).json({ message: "Fetch cities failed", error: err.message });
    res.json(results.map(row => row.city));
  });
});

// Fetch unique categories
app.get("/api/categories", (req, res) => {
  db.query("SELECT DISTINCT category FROM event1 ORDER BY category", (err, results) => {
    if (err) return res.status(500).json({ message: "Fetch categories failed", error: err.message });
    res.json(results.map(row => row.category));
  });
});

// Fetch single event by ID
app.get("/api/event/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM event1 WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Fetch failed", error: err.message });
    if (result.length === 0) return res.status(404).send("Event not found");
    res.json(result[0]);
  });
});

// Full update (PUT)
app.put("/api/event/:id", (req, res) => {
  const { id } = req.params;
  const {
    title, description, city, address, date,
    start_time, end_time, category, organizer_name, image_url
  } = req.body;

  if (!title || !description || !city || !address || !date || !start_time ||
    !end_time || !category || !organizer_name || !image_url) {
    return res.status(400).send("❌ All fields are required");
  }

  const sql = `
    UPDATE event1 SET 
    title=?, description=?, city=?, address=?, date=?, start_time=?, end_time=?, category=?, organizer_name=?, image_url=? 
    WHERE id=?
  `;

  db.query(sql, [title, description, city, address, date, start_time, end_time, category, organizer_name, image_url, id],
    (err) => {
      if (err) return res.status(500).json({ message: "Update failed", error: err.message });
      res.send("✅ Event fully updated");
    }
  );
});

// Partial update (PATCH)
app.patch("/api/event/:id", (req, res) => {
  const { id } = req.params;
  const fields = req.body;

  if (Object.keys(fields).length === 0) return res.status(400).send("❌ No data to update");

  const allowedFields = ["title", "description", "city", "address", "date", "start_time", "end_time", "category", "organizer_name", "image_url"];
  const updates = [], values = [];

  for (const key of allowedFields) {
    if (fields[key] !== undefined) {
      updates.push(`${key} = ?`);
      values.push(fields[key]);
    }
  }

  if (updates.length === 0) return res.status(400).send("❌ Invalid fields");

  const sql = `UPDATE event1 SET ${updates.join(", ")} WHERE id = ?`;
  values.push(id);

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json({ message: "Update failed", error: err.message });
    res.send("✅ Event updated successfully");
  });
});

// Delete event
app.delete("/api/event/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM event1 WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ message: "Delete failed", error: err.message });
    res.send("✅ Event deleted");
  });
});

// Start server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
