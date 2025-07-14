# 🎭 NautankiNights – Event Management App

A full-stack web application that allows users to:
- 🔐 Login with Google (via Firebase)
- 📅 Create and view events
- 🗂️ Filter events by **date**, **city**, and **category**
- 📸 Upload event images
- 🧠 Store and manage data via MySQL

Frontend: [(https://nautanki-nights.vercel.app/)](#)  
Note: The backend and database run locally due to database hosting limitations.  
Only the frontend is deployed. You can still replicate the full project locally using the instructions below.


## 📁 Project Structure

NautankiNights/
├── frontend/ # React frontend
├── backend/ # Node.js + Express backend
└── README.md # Project instructions

### 🔗 Git Repository
(https://github.com/Piyush-T02/NautankiNights)

Follow these steps to run the project locally:

## 🚀 Local Setup Guide

### 1. Clone the Repository

```bash
git clone https://github.com/Piyush-T02/NautankiNights.git
cd NautankiNights
2. Install Dependencies
Frontend:

bash
Copy code
cd frontend
npm install
Backend:

bash
Copy code
cd ../backend
npm install
3. Set Up MySQL Database
Open MySQL and create a new database:

sql
Copy code
create database if not exists nautankinights;
use nautankinights;
create table if not exists event1(
	id int auto_increment primary key,
    title varchar(500) not null,
    description text,
    city varchar(800),
    address varchar(800),
    date DATE,
    start_time TIME,
    end_time TIME,
    category varchar(800),
    organizer_name varchar(950),
    image_url varchar(800),
    created_at timestamp default current_timestamp
);

Make sure your MySQL credentials match in backend/server.js:
js
Copy code
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "#Piyush02",
  database: "nautankinights",
});
4. Start the Application
Backend:

bash
Copy code
cd backend
node server.js
Frontend:
Open a new terminal window:
bash
Copy code
cd frontend
npm start
Then go to:
 http://localhost:3000 to use the app

Features:
 Google Login using Firebase Authentication
 Create and view public events
 Filter events by city, date, and category
 Upload images while creating events
 React frontend, Express backend, MySQL database
