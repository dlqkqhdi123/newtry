import React, { useEffect, useRef } from "react";
import "./Map.css";
import { getUserLocation } from "../utills/geolocation";
const { kakao } = window;

const Map = ({ mapRef, userLocation }) => {
  const mapContainer = useRef(null);
  const position = new kakao.maps.LatLng(36.328724, 127.423033);
  const mapOptions = {
    center: position,
    level: 2,
  };

  useEffect(() => {
    const handleGetCurrentLocation = async () => {
      try {
        await getUserLocation();
        const currentPosition = new kakao.maps.LatLng(36.328724, 127.423033);
        if (mapRef.current) {
          mapRef.current.setCenter(currentPosition);
        }
      } catch (error) {
        console.error("사용자 위치를 가져오는 중 오류 발생:", error);
      }
    };
    handleGetCurrentLocation();

    const map = new kakao.maps.Map(mapContainer.current, mapOptions);
    mapRef.current = map;

    const imageSrc = "https://i.ibb.co/M9jmHYw/1.png",
      imageSize = new kakao.maps.Size(64, 69),
      imageOption = { offset: new kakao.maps.Point(20, 20) };

    const imageSrc2 = "https://i.ibb.co/VJ7nqHR/2.png",
      imageSize2 = new kakao.maps.Size(64, 69),
      imageOption2 = { offset: new kakao.maps.Point(20, 20) };

    const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      ),
      markerPosition = new kakao.maps.LatLng(37.586471, 126.974769);

    const PhMarkerImage = new kakao.maps.MarkerImage(
        imageSrc2,
        imageSize2,
        imageOption2
      ),
      PhmarkerPosition = new kakao.maps.LatLng(37.586471, 126.974769);

    const positions = [
      {
        title: "동물종합병원",
        address: "대전 중구 대종로 605",
        latlng: new kakao.maps.LatLng(36.3354935001554, 127.416887702802),
      },
      {
        title: "두근동물병원",
        address: "대전 중구 대종로594번길 18",
        latlng: new kakao.maps.LatLng(36.3353527622679, 127.41907059668),
      },
      {
        title: "동물 외상센터",
        address: "대전 중구 선화서로 76",
        latlng: new kakao.maps.LatLng(36.3303563292653, 127.4169436411),
      },
      {
        title: "동물 연구소",
        address: "대전 중구 목중로26번길 52",
        latlng: new kakao.maps.LatLng(36.3375878424054, 127.413330416181),
      },
      {
        title: "웰니스동물병원",
        address: "대전 중구 목중로 2",
        latlng: new kakao.maps.LatLng(36.3348796862194, 127.413209405363),
      },
      {
        title: "이빨튼튼동물병원",
        address: "대전 중구 대전천서로 529",
        latlng: new kakao.maps.LatLng(36.3339824781791, 127.422793819547),
      },
      {
        title: "정신 건강 동물병원",
        address: "대전 중구 대흥로111번길 30-18",
        latlng: new kakao.maps.LatLng(36.3246610525623, 127.424932485382),
      },
      {
        title: "암 동물병원",
        address: "대전 중구 중앙로 123",
        latlng: new kakao.maps.LatLng(36.3280388039107, 127.423572936651),
      },
      {
        title: "동물 전문 이비인후과",
        address: "대전 중구 중교로 9",
        latlng: new kakao.maps.LatLng(36.324479917011, 127.421010287951),
      },
      {
        title: "동물 재활 센터",
        address: "대전광역시 중구 중앙로 126",
        latlng: new kakao.maps.LatLng(36.3276960522504, 127.4241924206678),
      },
      {
        title: "환경 친화 약국",
        address: "대전 중구 중앙로109번길 10-2 ",
        latlng: new kakao.maps.LatLng(36.3279702603776, 127.422365855953),
      },
      {
        title: "온라인 약국",
        address: "대전 중구 중앙로129번길 27",
        latlng: new kakao.maps.LatLng(36.3291502985652, 127.423399642045),
      },
      {
        title: "비타민 약국",
        address: "대전 중구 중앙로121번길 37",
        latlng: new kakao.maps.LatLng(36.329272262945, 127.422319869478),
      },
      {
        title: "건강 약국",
        address: "대전 중구 중앙로137번길 5 ",
        latlng: new kakao.maps.LatLng(36.3286081901062, 127.424709343605),
      },
      {
        title: "동물 약국",
        address: "대전 중구 중앙로 116 ",
        latlng: new kakao.maps.LatLng(36.3272320184746, 127.422773051221),
      },
      {
        title: "녹십자 약국",
        address: "대전 중구 대종로 516 ",
        latlng: new kakao.maps.LatLng(36.3300842404546, 127.424604198183),
      },
      {
        title: "허브 약국",
        address: "대전 중구 대종로505번길 10",
        latlng: new kakao.maps.LatLng(36.329197936019, 127.424501937575),
      },
      {
        title: "약학 치료 센터",
        address: "대전 중구 대종로529번길 43",
        latlng: new kakao.maps.LatLng(36.3297469628087, 127.42102848834),
      },
      {
        title: "물리지료 약국",
        address: "대전 중구 대종로 471",
        latlng: new kakao.maps.LatLng(36.3269775622949, 127.426289633281),
      },
      {
        title: "구룡 약국",
        address: "대전 중구 선화동 236-2",
        latlng: new kakao.maps.LatLng(36.3291159191051, 127.421857607029),
      },
    ];

    const Phpositions = [
      {
        title: "dw",
        latlng: new kakao.maps.LatLng(36.328724, 127.423033),
      },
    ];

    const markers = [];

    for (let i = 0; i < positions.length; i++) {
      const marker = new kakao.maps.Marker({
        map: map,
        position: positions[i].latlng,
        title: positions[i].title,
        image: markerImage,
      });

      markers.push(marker);

      const infowindow = new kakao.maps.InfoWindow({
        content: `
          <div class="wrap">
            <div class="mapInfo">
              <div class="title">
                ${positions[i].title}
                <div class="close" title="닫기"></div>
              </div><br />
              <div class="body">
                <div class="desc">
                  <div class="ellipsis">
                    주소: ${positions[i].address}<br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        `,
      });

      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.open(map, marker);
        const closeButton = document.querySelector(".close");
        if (closeButton) {
          closeButton.addEventListener("click", function () {
            infowindow.close();
          });
        }
      });
    }
    const zoomInButton = document.getElementById("zoomInButton");
    const zoomOutButton = document.getElementById("zoomOutButton");

    zoomInButton.addEventListener("click", function () {
      map.setLevel(map.getLevel() - 1);
    });

    zoomOutButton.addEventListener("click", function () {
      map.setLevel(map.getLevel() + 1);
    });

    // 스크롤 이벤트 막기
    map.setZoomable(false);

    mapRef.current = map;

    const userMarker = new kakao.maps.Marker({
      map: map,
      position: position,
      title: "현위치",
      image: new kakao.maps.MarkerImage(
        "https://i.ibb.co/VJ7nqHR/2.png",
        new kakao.maps.Size(64, 69),
        { offset: new kakao.maps.Point(20, 20) }
      ),
    });
    kakao.maps.event.addListener(userMarker, "click", function () {
      const infowindow = new kakao.maps.InfoWindow({
        content: `
              <div style="background-color: white; color: balck; font-size: 14px; padding: 10px; border-radius: 5px; border:none;">
                <strong>현위치</strong><br>
              </div>
            `,
      });

      infowindow.open(map, userMarker);
    });
  }, [userLocation]);

  return (
    <div className="mapContainer">
      <div
        id="map"
        ref={mapContainer}
        style={{ width: "1120px", height: "560px", display: "block" }}
      ></div>
      <div className="mapBtnContainer">
        <button className="mapBtn" id="zoomInButton">
          +
        </button>
        <button className="mapBtn" id="zoomOutButton">
          -
        </button>
      </div>
    </div>
  );
};

export default Map;
