import "./RatingHospital.css";

const RATINGS = [1, 2, 3, 4, 5];

function Star({
  selected = false,
  rating,
  onSelect,
  onHover,
  shouldShowRating,
}) {
  const className = `RatingStar ${selected ? "selected" : ""}`;

  const handleClick = onSelect ? () => onSelect(rating) : undefined;
  const handleMouseOver = onHover ? () => onHover(rating) : undefined;

  return shouldShowRating ? (
    <span
      className={className}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
    >
      ★
    </span>
  ) : null;
}

function Rating({
  className,
  hoverRating = 0,
  onSelect,
  onHover,
  onMouseOut,
  actualRating,
}) {
  const shouldShowRating =
    hoverRating !== 0 || (actualRating !== undefined && actualRating !== 0);

  return (
    <div className={className} onMouseOut={onMouseOut}>
      {shouldShowRating &&
        RATINGS.map((arrNum) => (
          <Star
            key={arrNum}
            selected={hoverRating >= arrNum}
            rating={arrNum}
            onSelect={onSelect}
            onHover={onHover}
            shouldShowRating={actualRating === undefined}
            // actualRating이 없을 때만 Star 컴포넌트 보이기
          />
        ))}
      {actualRating !== undefined && actualRating !== 0 && (
        <span>{actualRating}</span>
      )}
    </div>
  );
}

export default Rating;
