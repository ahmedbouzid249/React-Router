import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css'; // Import du CSS

// Composants
function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.title}`, { state: { movie } });
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <img src={movie.posterURL} alt={movie.title} />
      <div className="card-content">
        <h2>{movie.title}</h2>
        <p>{movie.description}</p>
        <p className="rating">⭐ {movie.rating} / 10</p>
      </div>
    </div>
  );
}

function MovieList({ movies }) {
  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
}

function Filter({ onFilterChange }) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="🔍 Rechercher par titre"
        onChange={(e) => onFilterChange('title', e.target.value)}
      />
      <input
        type="number"
        placeholder="⭐ Note minimale"
        onChange={(e) => onFilterChange('rating', e.target.value)}
        min="0"
        max="10"
      />
    </div>
  );
}

function Home() {
  const [movies, setMovies] = useState([
    {
      title: 'Inception',
      description: 'Un film sur les rêves imbriqués.',
      posterURL: 'https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/img_20240813_134759.jpg',
      rating: 9,
      trailerURL: 'https://www.youtube.com/watch?v=8hP9D6kZseM',
    },
    {
      title: 'Interstellar',
      description: 'Voyage à travers l’espace et le temps.',
      posterURL: 'https://cdn.mos.cms.futurecdn.net/T8zD3XpYjWCaXuHdfFtF8V-320-80.jpg',
      rating: 8.5,
      trailerURL: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
    },
  ]);

  const [filters, setFilters] = useState({ title: '', rating: 0 });

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filters.title.toLowerCase()) &&
    movie.rating >= parseFloat(filters.rating || 0)
  );

  const handleAddMovie = () => {
    const title = prompt('Titre ?');
    const description = prompt('Description ?');
    const posterURL = prompt('URL du poster ?');
    const rating = parseFloat(prompt('Note ?'));
    const trailerURL = prompt('URL de la bande-annonce ?');

    if (title && !isNaN(rating)) {
      const newMovie = { title, description, posterURL, rating, trailerURL };
      setMovies([...movies, newMovie]);
    }
  };

  return (
    <div className="App">
      <h1>🎬 Mes Films</h1>
      <Filter onFilterChange={handleFilterChange} />
      <button className="add-btn" onClick={handleAddMovie}>➕ Ajouter un film</button>
      <MovieList movies={filteredMovies} />
    </div>
  );
}

function MovieDetail() {
  const navigate = useNavigate();
  const movie = window.history.state?.movie;

  if (!movie) {
    navigate('/');
    return null; // Redirige vers l'accueil si le film n'existe pas
  }

  return (
    <div className="movie-detail">
      <button onClick={() => navigate('/')}>Retour à l'accueil</button>
      <h2>{movie.title}</h2>
      <img src={movie.posterURL} alt={movie.title} />
      <p>{movie.description}</p>
      <p className="rating">⭐ {movie.rating} / 10</p>
      <a href={movie.trailerURL} target="_blank" rel="noopener noreferrer">Voir la bande-annonce</a>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:title" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
