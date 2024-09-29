import React from 'react';




// src/App.js
import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const App = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [gpsData, setGpsData] = useState({ latitude: 0, longitude: 0, speed: 0 });

  useEffect(() => {
    // Initialize the map
    const mapInstance = L.map('map').setView([0, 0], 2);

    // Set up the OpenStreetMap layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    setMap(mapInstance);
  }, []);

  useEffect(() => {
    // Fetch GPS data from server periodically
    const fetchData = () => {
      axios.get('http://localhost:3000/gps-data')
        .then(response => {
          setGpsData(response.data);
        })
        .catch(error => console.error('Error fetching GPS data:', error));
    };

    const interval = setInterval(fetchData, 5000); // Fetch every 5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (map && gpsData.latitude && gpsData.longitude) {
      // Update marker position
      if (!marker) {
        const newMarker = L.marker([gpsData.latitude, gpsData.longitude]).addTo(map);
        setMarker(newMarker);
      } else {
        marker.setLatLng([gpsData.latitude, gpsData.longitude]);
      }

      // Update map view
      map.setView([gpsData.latitude, gpsData.longitude], 15);
    }
  }, [map, gpsData, marker]);

  return (
    <div>
      <h1>GPS Tracker</h1>
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
      <div>
        <p>Latitude: {gpsData.latitude}</p>
        <p>Longitude: {gpsData.longitude}</p>
        <p>Speed: {gpsData.speed} km/h</p>
      </div>
    </div>
  );
};

export default App;
