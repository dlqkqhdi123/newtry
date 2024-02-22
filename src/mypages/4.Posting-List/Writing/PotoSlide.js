import style from "./PotoSlide.module.css";
import { ReactComponent as PrevArrow } from "../../../assets/icon/chevron_right_w_1.svg";
import { ReactComponent as NextArrow } from "../../../assets/icon/chevron_right_w.svg";
import { useState } from "react";

function PotoSlide() {
  const pets = [
    { name: " " },
    { name: " " },
    { name: " " },
  ];

  const [current, setCurrent] = useState(0);

  const prevHandler = () => {
    if (current === 0) {
      setCurrent(pets.length - 1);
    } else {
      setCurrent(current - 1);
    }
  };

  const nextHandler = () => {
    if (current === pets.length - 1) {
      setCurrent(0);
    } else {
      setCurrent(current + 1);
    }
  };

  const translateXValue = -current * 476;

  return (
    <div className={style.carousel}>
      <div
        className={style.slide}
        style={{ transform: `translateX(${translateXValue}px)` }}
      >
        {pets.map((pet, index) => {
          return (
            <div className={style.petPopol} key={`pet${index + 1}`}>
              <div className={style.petfile}>
                <h2 style={{ margin: "0px" }}>{pet.name}</h2>
              </div>
            </div>
          );
        })}
      </div>

      <button className={style.prevBtn} onClick={prevHandler}>
        <PrevArrow />
      </button>

      <button className={style.nextBtn} onClick={nextHandler}>
        <NextArrow />
      </button>

      <ul className={style.pagination}>
        {pets.map((_, idx) => (
          <li
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`${style.won}
            ${idx === current ? style.opacityA : style.opacityB}`}
          />
        ))}
      </ul>
    </div>
  );
}
export default PotoSlide;
