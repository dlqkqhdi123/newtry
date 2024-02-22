import React, { useState, useRef } from "react";
import Rating from "./Rating";

function CheckStars({ name, value, onChange }) {

  const [rating, setRating] = useState(value);

  // 실제 values.rating 을 바꾸는 함수는 onChange이고,
  // 이 함수를 실행하는 시기는 Star컴포넌트의 onClick 시점이다.
  const handleSelect = (nextValue) => onChange(name, nextValue);
  const handleMouseOut = () => setRating(value);

  return (
    <div className="checkStars">
      <Rating
        className="CheckStars"
        hoverRating={rating}
        onSelect={handleSelect}
        onHover={setRating}
        onMouseOut={handleMouseOut}
      />
    </div>
  );
}

export default CheckStars;
