const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); // Enable CORS

// Load the JSON data
const ghibliData = require('./ghibli-data.json');

// Endpoint to get all films
app.get('/api/films', (req, res) => {
  res.json(ghibliData.films);
});

// Endpoint to get details of a specific film by ID
app.get('/api/films/:id', (req, res) => {
  const filmId = req.params.id;
  const film = ghibliData.films.find(f => f.id === filmId);

  if (film) {
    // Fetch related characters, locations, species, and vehicles
    const characters = film.people
      .map(url => ghibliData.people.find(p => p.url === url))
      .filter(Boolean); // Remove undefined values

    const locations = film.locations
      .map(url => ghibliData.locations.find(l => l.url === url))
      .filter(Boolean); // Remove undefined values

    const species = film.species
      .map(url => ghibliData.species.find(s => s.url === url))
      .filter(Boolean); // Remove undefined values

    const vehicles = film.vehicles
      .map(url => ghibliData.vehicles.find(v => v.url === url))
      .filter(Boolean); // Remove undefined values

    res.json({
      ...film,
      characters,
      locations,
      species,
      vehicles,
    });
  } else {
    res.status(404).json({ error: 'Film not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});