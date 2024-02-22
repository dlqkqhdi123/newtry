import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import styles from "./LikeDislikeChart.module.css";
import likeIcon from "../assets/source/like.svg";
import badIcon from "../assets/source/bad.svg";

ChartJS.register(ArcElement, Tooltip, Legend);

const LikeDislikeChart = ({
  hospitalTitle,
  initialLikeCount,
  initialDislikeCount,
}) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount || 0);
  const [dislikeCount, setDislikeCount] = useState(initialDislikeCount || 0);

  useEffect(() => {
    const storedLikeCount = parseInt(
      localStorage.getItem(`${hospitalTitle}-likeCount`),
      10
    );
    const storedDislikeCount = parseInt(
      localStorage.getItem(`${hospitalTitle}-dislikeCount`),
      10
    );

    if (!isNaN(storedLikeCount)) {
      setLikeCount(storedLikeCount);
    } else {
      localStorage.setItem(`${hospitalTitle}-likeCount`, initialLikeCount || 0);
    }

    if (!isNaN(storedDislikeCount)) {
      setDislikeCount(storedDislikeCount);
    } else {
      localStorage.setItem(
        `${hospitalTitle}-dislikeCount`,
        initialDislikeCount || 0
      );
    }
  }, [hospitalTitle, initialLikeCount, initialDislikeCount]);

  const handleLikeClick = () => {
    const updatedLikeCount = likeCount + 1;
    setLikeCount(updatedLikeCount);
    localStorage.setItem(`${hospitalTitle}-likeCount`, updatedLikeCount);
  };

  const handleDislikeClick = () => {
    const updatedDislikeCount = dislikeCount + 1;
    setDislikeCount(updatedDislikeCount);
    localStorage.setItem(`${hospitalTitle}-dislikeCount`, updatedDislikeCount);
  };

  const data = {
    labels: ["좋아요", "싫어요"],
    datasets: [
      {
        data: [likeCount, dislikeCount],
        backgroundColor: ["#ff9b50", "#d9d9d9"],
        hoverBackgroundColor: ["#ff9b50", "#d9d9d9"],
      },
    ],
  };

  return (
    <div>
      <Pie data={data} />
      <div className={styles.btnWrapper}>
        <button onClick={handleLikeClick} className={styles.likeBtn}>
          <img className={styles.img} src={likeIcon} alt="Like" />
          좋아요
        </button>
        <button onClick={handleDislikeClick} className={styles.dislikeBtn}>
          <img className={styles.img} src={badIcon} alt="Dislike" />
          싫어요
        </button>
      </div>
    </div>
  );
};

export default LikeDislikeChart;
