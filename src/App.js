import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [error, setError] = useState(null);

  const apiUrl = 'https://ghibliapi.vercel.app';

  useEffect(() => {
    axios.get(`${apiUrl}/films`)
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
    axios.get(`${apiUrl}/films/${filmId}`)
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
            {selectedFilm.people.map(characterUrl => (
              <li key={characterUrl}>
                <a href={characterUrl} target="_blank" rel="noopener noreferrer">
                  View Character
                </a>
              </li>
            ))}
          </ul>

          <h3>Locations</h3>
          <ul>
            {selectedFilm.locations.map(locationUrl => (
              <li key={locationUrl}>
                <a href={locationUrl} target="_blank" rel="noopener noreferrer">
                  View Location
                </a>
              </li>
            ))}
          </ul>

          <h3>Species</h3>
          <ul>
            {selectedFilm.species.map(speciesUrl => (
              <li key={speciesUrl}>
                <a href={speciesUrl} target="_blank" rel="noopener noreferrer">
                  View Species
                </a>
              </li>
            ))}
          </ul>

          <h3>Vehicles</h3>
          <ul>
            {selectedFilm.vehicles.map(vehicleUrl => (
              <li key={vehicleUrl}>
                <a href={vehicleUrl} target="_blank" rel="noopener noreferrer">
                  View Vehicle
                </a>
              </li>
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