import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [joke, setJoke] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    searchJoke();
  }, []);

  useEffect(() => {
    const localStorageFavorites =
      JSON.parse(localStorage.getItem("favoritesList")) || [];
    setFavorites(localStorageFavorites);
  }, []);

  function searchJoke() {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((res) => res.json())
      .then((data) => {
        setJoke(data.value);
      });
  }

  const addToFavorites = (joke) => {
    const favoritesList = [...favorites];
    if (!favoritesList.includes(joke)) {
      favoritesList.push(joke);
      localStorage.setItem("favoritesList", JSON.stringify(favoritesList));
      setFavorites(favoritesList);
    } else {
      alert("Joke already added to favorites list.");
    }
  };

  const removeFromFavorites = (i) => {
    if (window.confirm("Remove from favorites?")) {
      const favoritesList = [...favorites];
      favoritesList.splice(i, 1);
      localStorage.setItem("favoritesList", JSON.stringify(favoritesList));
      setFavorites(favoritesList);
    }
  };

  return (
    <div className="app">
      <h1>Chuck Norris Jokes</h1>
      <hr />
      <div className="joke-container">{joke}</div>
      <div className="joke-buttons-position">
        <button onClick={searchJoke}>Get new joke</button>
        <button onClick={() => addToFavorites(joke)}>Add to favorites</button>
      </div>
      <h1>Favorite Jokes</h1>
      <hr />
      <ul>
        {favorites.length === 0 ? (
          <p>Your list of favorite jokes is empty.</p>
        ) : (
          favorites.map((joke, i) => (
            <li key={i} className="favorite-container">
              {joke}
              <button
                onClick={() => removeFromFavorites(i)}
                className="remove-button"
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
