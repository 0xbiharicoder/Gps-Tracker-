import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Optional: Import any global styles if necessary
import './index.css';

// Create a root element for rendering the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let gpsData = {};

// Endpoint to receive GPS data
app.post('/gps-data', (req, res) => {
  gpsData = req.body; // Store the incoming GPS data
  console.log('Received GPS data:', gpsData);
  res.status(200).send('Data received');
});

// Endpoint for frontend to fetch GPS data
app.get('/gps-data', (req, res) => {
  res.json(gpsData);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
