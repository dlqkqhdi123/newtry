import React, { useEffect, useRef, useState } from "react";
import Warn from "../components/Warn";
import { getDatas } from "../api/firebase";
import HospetalButton from "../components/HospetalButton";
import { Link } from "react-router-dom";
import Map from "./../components/Map";
import { getUserLocation } from "../utills/geolocation";
import haversine from "haversine";
import styles from "./HospitalListPage.module.css";
import searchIcon from "../assets/icon/search_icon.svg";
import stylesBtn from "../components/HospetalButton.module.css";
import PharmacyItem from "./../components/PharmacyItem";

const PharmacyListPage = () => {
  const [hospitalItems, setHospitalItems] = useState([]);
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isInit, setIsInit] = useState(true);
  const [userLocation, setUserLocation] = useState({
    lat: 36.328724,
    lng: 127.423033,
  });
  const [sortBy, setSortBy] = useState("distance");
  const mapRef = useRef();

  // 검색기능
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchItems = items.filter(({ title }) => title.includes(keyword));
    setItems(searchItems);
  };

  // 약국데이터뿌리기
  const handleLoad = async () => {
    const fetchedHospitalItems = await getDatas("pharmacy");
    setHospitalItems(fetchedHospitalItems);

    console.log(fetchedHospitalItems);

    setItems(fetchedHospitalItems);
    setIsInit(false);
  };

  const sortHospitalList = async () => {
    const sortedItems = JSON.parse(JSON.stringify(items)); // Deep copy
    if (sortBy === "distance") {
      const fixedLocation = { lat: 36.328724, lng: 127.423033 }; // 고정된 위치 설정
      sortedItems.sort((a, b) => {
        const distanceA = haversine(
          { latitude: fixedLocation.lat, longitude: fixedLocation.lng },
          { latitude: a.latitude, longitude: a.longitude }
        );

        const distanceB = haversine(
          { latitude: fixedLocation.lat, longitude: fixedLocation.lng },
          { latitude: b.latitude, longitude: b.longitude }
        );

        return distanceA - distanceB;
      });
      setUserLocation(fixedLocation); // 사용자 위치를 고정된 위치로 업데이트
    } else if (sortBy === "rating") {
      sortedItems.sort((a, b) => {
        // 별점 순으로 정렬하는 로직 추가
        // 예: a와 b의 별점을 비교
        return b.rating - a.rating;
      });
    }
    setItems(sortedItems);
  };

  // 정렬 기준 변경 시 호출
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    sortHospitalList();
  };

  const handleResetLocation = () => {
    const fixedLocation = new window.kakao.maps.LatLng(36.328724, 127.423033);
    if (mapRef.current) {
      mapRef.current.setCenter(fixedLocation);
    }
  };
  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className={styles.hospitalListContainer}>
      <h1 className={styles.title}>동물병원&middot;약국찾기</h1>
      <div className={styles.btnFilter}>
        <HospetalButton className={stylesBtn.itemBtn}>
          <Link to="/hospital" className={styles.link}>
            병원
          </Link>
        </HospetalButton>
        <HospetalButton className={stylesBtn.itemBtnActive}>
          <Link to="/pharmacy" className={styles.link}>
            약국
          </Link>
        </HospetalButton>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.searchContainer}>
          <input
            className={styles.searchInput}
            name="keyword"
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="업체명을 입력해주세요"
          ></input>
          <button className={styles.searchBtn} type="submit">
            <img className={styles.searchIcon} src={searchIcon} alt="검색" />
          </button>
        </div>
      </form>
      <div className={styles.btnContainer}>
        <button className={styles.btn} onClick={handleResetLocation}>
          현위치
        </button>
        <div className={styles.btnFilter}>
          <button
            className={styles.btn}
            onClick={() => handleSortChange("distance")}
          >
            거리순
          </button>
          <button
            className={styles.btn}
            onClick={() => handleSortChange("rating")}
          >
            별점순
          </button>
        </div>
      </div>
      <Map userLocation={userLocation} mapRef={mapRef} />

      {items.length === 0 && !isInit ? (
        <Warn
          title="조건에 맞는 병원이나 약국이 없어요"
          description="올바른 검색어가 맞는지 다시 한 번 확인해 주세요"
        />
      ) : (
        <div className={styles.itemContainer}>
          {items &&
            items.map((item) => (
              <PharmacyItem key={item.docId} pharmacy={item} />
            ))}
        </div>
      )}
    </div>
  );
};

export default PharmacyListPage;
