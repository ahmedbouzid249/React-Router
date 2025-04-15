function MovieCard({ movie }) {
    return (
      <div className="movie-card">
        <img src={movie.posterURL} alt={movie.title} />
        <h2>{movie.title}</h2>
        <p>{movie.description}</p>
        <p>Note : {movie.rating} / 10</p>
      </div>
    );
  }
  
  export default MovieCard;
  