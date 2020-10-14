import React, { useState } from 'react';
import './App.css';
import PokemonList from './PokemoList';

const App = () => {
  const [filter, setFilter] = useState('');
  const [maxCP, setMaxCP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
        <label htmlFor="maxCP" className="max-cp">
            <input
              type="checkbox"
              id="maxCP"
              checked={maxCP}
              onChange={(e) => setMaxCP(e.target.checked)}
            />
            <small>
                Maximum Combat Points
            </small>
        </label>
        <input
          type="text"
          className="input"
          placeholder="Pokemon or type"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {isLoading && <div className="loader"></div>}
        <PokemonList filter={filter} maxCP={maxCP} setIsLoading={setIsLoading}/>
    </>
  );
};

export default App;
