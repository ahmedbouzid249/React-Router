function Filter({ onFilterChange }) {
    return (
      <div className="filters">
        <input
          type="text"
          placeholder="Rechercher par titre"
          onChange={(e) => onFilterChange('title', e.target.value)}
        />
        <input
          type="number"
          placeholder="Note minimale"
          onChange={(e) => onFilterChange('rating', e.target.value)}
          min="0"
          max="10"
        />
      </div>
    );
  }
  
  export default Filter;
  