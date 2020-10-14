import React, { useEffect, useState } from 'react';

const URL_PATH = "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";

const highlight = (text, filter) => {
  const index = text.toLowerCase().indexOf(filter.toLowerCase());
  if (index < 0) {
    return text;
  }
  return (
    <>
      {text.substring(0,index)}<span className="hl">{text.substring(index,index+filter.length)}</span>{text.substring(index + filter.length)}
    </>
  );
}

const PokemonList = ({ filter, maxCP, setIsLoading }) => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsFiltered, setPokemonsFiltered] = useState([]);

  useEffect(() => {
    if (!filter) { return };
    setIsLoading(true);
    fetch(URL_PATH)
      .then((res) => res.json())
      .then((res) => {
        setPokemons(res);
        setPokemonsFiltered(res);
        setIsLoading(false);
      });
  }, [filter, setIsLoading]);

  useEffect(() => {
    setPokemonsFiltered(
      pokemons
        .filter(
          (pokemon) => {
            return pokemon.Name.toLowerCase().includes(filter.toLowerCase())
            || pokemon.Types.join(' ').toLowerCase().includes(filter.toLowerCase())
          }
        )
        .slice(0, 4)
        .sort((a, b) => {
          if (maxCP) {
            if (a.MaxCP < b.MaxCP) return 1;
            if (b.MaxCP < a.MaxCP) return -1;

            return 0;
          }
          if (a.Name.toLowerCase() < b.Name.toLowerCase()) return -1;
          if (b.Name.toLowerCase() < a.Name.toLowerCase()) return 1;
          return 0;
        })
    )
  }, [filter, pokemons, maxCP])

  return (
    <ul className="suggestions">
        {
          !pokemonsFiltered.length && filter && <span className="no-results"> There are not results </span>
        }
        {
          filter && pokemonsFiltered.map((poke) => (
            <li key={poke.Number}>
                <img src={poke.img} alt="" />
                <div className="info">
                    <h1>
                      {highlight(poke.Name, filter)}
                    </h1>
                    {poke.Types.map((type => (
                      <span key={type} className={`type ${type.toLowerCase()}`}>{type}</span>
                    )))}
                </div>
            </li>
          ))
        }
    </ul>
  )
};

export default PokemonList;
