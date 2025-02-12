const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors({ origin: 'https://spectacular-cendol-3cb9b3.netlify.app/' }));

const ghibliData = require('./ghibli-data.json');

app.get('/api/films', (req, res) => {
  res.json(ghibliData.films);
});

app.get('/api/films/:id', (req, res) => {
  const filmId = req.params.id;
  const film = ghibliData.films.find(f => f.id === filmId);

  if (film) {
    const characters = film.people
      .map(url => ghibliData.people.find(p => p.url === url))
      .filter(Boolean);

    const locations = film.locations
      .map(url => ghibliData.locations.find(l => l.url === url))
      .filter(Boolean);

    const species = film.species
      .map(url => ghibliData.species.find(s => s.url === url))
      .filter(Boolean);

    const vehicles = film.vehicles
      .map(url => ghibliData.vehicles.find(v => v.url === url))
      .filter(Boolean);

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
