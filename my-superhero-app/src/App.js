import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [heroes, setHeroes] = useState([]); // Update to store an array of heroes
  const [searchQuery, setSearchQuery] = useState('');

  // Function to fetch hero data based on the search query
  const fetchHero = async (query = '') => {
    const token = process.env.REACT_APP_SUPERHERO_API_KEY;
    const url = query
      ? `https://superheroapi.com/api.php/${token}/search/${query}`
      : `https://superheroapi.com/api.php/${token}/random`; // Default hero

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.results && data.results.length > 0) {
        setHeroes(data.results); // Set the array of heroes
      } else {
        setHeroes([]); // Reset heroes if no results
        alert('Hero not found');
      }
    } catch (error) {
      console.error('Error fetching hero data:', error);
    }
  };

  // Fetch a default hero when the app loads
  useEffect(() => {
    fetchHero();
  }, []); // Empty array means this will run once when the app first loads

  return (
    <div>
      <div>
        <h1>Superhero Info</h1>
        {heroes.length > 0 ? (  // Check if there are multiple heroes
          <div>
            {heroes.map((hero) => (
              <div key={hero.id}>
                <h2>{hero.name}</h2>
                <div>
                  <img src={hero.image?.url} alt={hero.name} />
                  <p>Biography: {JSON.stringify(hero.biography)}</p>
                  <p>Powerstats: {JSON.stringify(hero.powerstats)}</p>
                  <p>Connections: {JSON.stringify(hero.connections)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No hero data available</p>
        )}
      </div>

      <div>
        <h1>Superhero Search</h1>
        <input
          type="text"
          placeholder="Search for a superhero"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery
        />
        <button onClick={() => fetchHero(searchQuery)}>Search</button>
      </div>
    </div>
  );
}

export default App;
