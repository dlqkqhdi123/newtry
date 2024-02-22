import style from "./SlideList.module.css";
import { ReactComponent as PrevArrow } from "../../assets/icon/chevron_right_w_1.svg";
import { ReactComponent as NextArrow } from "../../assets/icon/chevron_right_w.svg";
import { useEffect, useState } from "react";
import { getDocs, query, collection, where, db } from "../../api/firebase";

function SlideList() {
  const [current, setCurrent] = useState(0);
  const [pets, setPets] = useState([]);
  const [roundPets, setRoundPets] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      const member = JSON.parse(localStorage.getItem("member"));
      const memberId = member?.memberId;

      const q = query(
        collection(db, "member"),
        where("memberId", "==", memberId)
      );

      const querySnapshot = await getDocs(q);
      let petsData = [];

      if (!querySnapshot.empty) {
        for (const doc of querySnapshot.docs) {
          const petCollectionRef = collection(db, "member", doc.id, "Pet");
          const petQuerySnapshot = await getDocs(petCollectionRef);

          for (const petDoc of petQuerySnapshot.docs) {
            petsData.push(petDoc.data());
          }
        }
      } else {
        console.error("No matching documents.");
        return;
      }

      setPets(petsData);
      if (petsData.length > 1) {
        let roundPetsData = [...petsData, petsData[0]];
        setRoundPets(roundPetsData);
      } else {
        setRoundPets([...petsData]);
      }
    };

    fetchPets();
  }, []);

  const prevHandler = () => {
    if (current === 0) {
      setIsTransitioning(false);
      setCurrent(roundPets.length - 2);
      setTimeout(() => setIsTransitioning(true), 0);
    } else {
      setCurrent(current - 1);
    }
  };

  const nextHandler = () => {
    if (current === roundPets.length - 1) {
      setIsTransitioning(false);
      setCurrent(1);
      setTimeout(() => setIsTransitioning(true), 0);
    } else {
      setCurrent(current + 1);
    }
  };

  const translateXValue = -current * 290;

  const slideStyle = {
    transform: `translateX(${translateXValue}px)`,
    transition: isTransitioning ? "all 0.5s ease" : "none",
  };

  return (
    <div className={style.popol}>
      <div className={style.carousel}>
        <div className={style.slide} style={slideStyle}>
          {roundPets.length > 0 &&
            roundPets.map((pet, index) => {
              return (
                <div className={style.petPopol} key={`pet${index + 1}`}>
                  <div className={style.petfile}>
                    <h2 style={{ margin: "0px", color: "#000" }}>
                      {pet.petName}
                    </h2>
                    <p style={{ margin: "3px" }}>
                      <strong>
                        {pets[current]?.age} {pets[current]?.petKind}
                      </strong>
                    </p>
                    <p style={{ margin: "3px" }}>
                      <strong>{pet.petGender}</strong>
                    </p>
                  </div>
                  <div className={style.Enrol}>
                    <img
                      style={{ width: "210px", height: "160px" }}
                      src={pet.fileUrl}
                    />
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
      </div>
    </div>
  );
}

export default SlideList;
