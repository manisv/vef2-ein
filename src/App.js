import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/films')
      .then(response => {
        console.log('Films fetched:', response.data);
        setFilms(response.data);
      })
      .catch(error => {
        console.error('Error fetching films:', error);
        setError('Failed to fetch films. Please check the backend.');
      });
  }, []);

  const handleFilmClick = (filmId) => {
    axios.get(`http://localhost:5000/api/films/${filmId}`)
      .then(response => {
        console.log('Film details fetched:', response.data);
        setSelectedFilm(response.data);
      })
      .catch(error => {
        console.error('Error fetching film details:', error);
        setError('Failed to fetch film details. Please check the backend.');
      });
  };

  const handleBackClick = () => {
    setSelectedFilm(null);
  };

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Studio Ghibli Films</h1>

      {selectedFilm ? (
        <div>
          <button
            onClick={handleBackClick}
            style={{
              marginBottom: '20px',
              padding: '10px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Back to Films
          </button>

          <h2>{selectedFilm.title}</h2>
          <img
            src={selectedFilm.movie_banner}
            alt={`${selectedFilm.title} Banner`}
            style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
          />
          <p>{selectedFilm.description}</p>

          <h3>Characters</h3>
          <ul>
            {selectedFilm.characters.map(character => (
              <li key={character.id}>{character.name}</li>
            ))}
          </ul>

          <h3>Locations</h3>
          <ul>
            {selectedFilm.locations.map(location => (
              <li key={location.id}>
                <strong>{location.name}</strong>
                <p>Climate: {location.climate}</p>
                <p>Terrain: {location.terrain}</p>
                <p>Surface Water: {location.surface_water}%</p>
              </li>
            ))}
          </ul>

          <h3>Species</h3>
          <ul>
            {selectedFilm.species.map(species => (
              <li key={species.id}>{species.name}</li>
            ))}
          </ul>

          <h3>Vehicles</h3>
          <ul>
            {selectedFilm.vehicles.map(vehicle => (
              <li key={vehicle.id}>{vehicle.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {films.map(film => (
            <div
              key={film.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                margin: '10px',
                width: '200px',
                cursor: 'pointer',
              }}
              onClick={() => handleFilmClick(film.id)}
            >
              <img
                src={film.image}
                alt={`${film.title} Poster`}
                style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
              />
              <h3>{film.title}</h3>
              <p>{film.release_date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
