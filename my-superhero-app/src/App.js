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
      : `https://superheroapi.com/api.php/${token}/random`; // 

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
                  <h3>Biography:</h3>
                  <p><strong>Full Name:</strong> {hero.biography['full-name']}</p>
                  <p><strong>Alter Egos:</strong> {hero.biography['alter-egos']}</p>
                  <p><strong>Aliases:</strong> {hero.biography.aliases.join(', ')}</p>
                  <p><strong>Place of Birth:</strong> {hero.biography['place-of-birth']}</p>
                  <p><strong>First Appearance:</strong> {hero.biography['first-appearance']}</p>
                  <p><strong>Publisher:</strong> {hero.biography.publisher}</p>
                  <p><strong>Alignment:</strong> {hero.biography.alignment}</p>
                  <h3>Powerstats: </h3>
                  <p><strong>Intelligence:</strong> {hero.powerstats.intelligence}</p>
                  <p><strong>Strength:</strong> {hero.powerstats.strength}</p>  
                  <p><strong>Speed:</strong> {hero.powerstats.speed}</p>
                  <p><strong>Durability:</strong> {hero.powerstats.durability}</p>
                  <p><strong>Power:</strong> {hero.powerstats.power}</p>
                  <p><strong>Combat:</strong> {hero.powerstats.combat}</p>
                  <h3>Connections:</h3> 
                  <p><strong>Group Affiliation:</strong> {hero.connections['group-affiliation']}</p>
                  <p><strong>Relatives:</strong> {hero.connections.relatives}</p>
                  <h3>Work:</h3>
                  <p><strong>Occupation:</strong> {hero.work.occupation}</p>
                  <p><strong>Base:</strong> {hero.work.base}</p>
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
