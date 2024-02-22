import "./Rating.css";

const RATINGS = [ 1, 2, 3,  4,  5];

function Star({ selected = false, rating, onSelect, onHover }) {
  const className = `Rating-star ${selected ? "selected" : ""}`;

  const handleClick = onSelect ? () => onSelect(rating) : undefined;
  const handleMouseOver = onHover ? () => onHover(rating) : undefined;

  return (
    <span
      className={className}
      onClick={handleClick}
      onMouseOver={handleMouseOver}      
    >
      ★
    </span>
  );
}

function Rating({ className, hoverRating = 0, onSelect, onHover, onMouseOut }) {
  return (
    <div className={className} onMouseOut={onMouseOut}>
      {RATINGS.map((arrNum) => (
        <Star
          key={arrNum}
          selected={hoverRating >= arrNum}
          rating={arrNum}
          onSelect={onSelect}
          onHover={onHover}
        />
      ))}
    </div>
  );
}

export default Rating;
