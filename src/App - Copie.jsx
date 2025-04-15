import { useState } from 'react';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import './App.css'; // Ou tu peux coller le style juste après ce fichier dans le même fichier s’il est autorisé.
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';






function App() {
  const [movies, setMovies] = useState([
    {
      title: 'Inception',
      description: 'Un film sur les rêves imbriqués',
      posterURL: 'https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/img_20240813_134759.jpg',
      rating: 9,
    },
    {
      title: 'Interstellar',
      description: 'Voyage à travers l’espace et le temps',
      posterURL: 'https://cdn.mos.cms.futurecdn.net/T8zD3XpYjWCaXuHdfFtF8V-320-80.jpg',
      rating: 8.5,
    },
  ]);

  const [filters, setFilters] = useState({ title: '', rating: 0 });

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const filteredMovies = movies.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(filters.title.toLowerCase()) &&
      movie.rating >= filters.rating
    );
  });

  const handleAddMovie = () => {
    const title = prompt('Titre ?');
    const description = prompt('Description ?');
    const posterURL = prompt('URL du poster ?');
    const rating = parseFloat(prompt('Note ?'));

    if (title && !isNaN(rating)) {
      const newMovie = { title, description, posterURL, rating };
      setMovies([...movies, newMovie]);
    }
  };

  return (
    <div className="App">
      <h1>🎬 Mes Films Préférés</h1>
      <Filter onFilterChange={handleFilterChange} />
      <button onClick={handleAddMovie}>Ajouter un film</button>
      <MovieList movies={filteredMovies} />
    </div>
  );
}

export default App;
