import styled from "styled-components";
import styles from "./Profile.module.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MypageButton from "../../components/MypageButton";
import {
  setDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  db,
  storage,
  uploadImages,
} from "../../api/firebase";
import FileInput from "./FileInput";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";

const Button1 = styled.button`
  border: 2px solid #d9d9d9;
  color: #d9d9d9;
  background-color: #fff;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7.5rem;
  height: 2.3rem;
  margin: 0;
`;

const SDatePicker = styled(DatePicker)`
  border: 1px solid #d9d9d9;
  outline: none;
  background-color: #fff;
  padding: 0.5rem;
  color: #000;
  width: 100%;
  margin-right: 0.5rem;
`;

function Profile() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [formValues, setFormValues] = useState({
    petNumber: "",
    petName: "",
    petType: "",
    petKind: "",
    petGender: "",
    weight: "",
    petBirth: null,
    withdrawal: "",
    inoculation1: "",
    inoculation2: "",
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const handleFileChange = (file) => {
    setFormValues({
      ...formValues,
      file: file,
    });
  };

  const handleButtonClick = (value) => {
    setFormValues({
      ...formValues,
      withdrawal: value,
    });
    setSelectedButton(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const member = JSON.parse(localStorage.getItem("member"));
      const memberId = member?.memberId;

      const q = query(
        collection(db, "member"),
        where("memberId", "==", memberId)
      );

      const querySnapshot = await getDocs(q);
      let docId;

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          docId = doc.id;
        });
      } else {
        console.error("No matching documents.");
        return;
      }

      const imageUrls = await uploadImages([formValues.file]);

      querySnapshot.forEach((docSnapshot) => {
        const petDoc = doc(
          db,
          "member",
          docSnapshot.id,
          "Pet",
          formValues.petNumber || "defaultId"
        );

        setDoc(
          petDoc,
          {
            petNumber: formValues.petNumber || "defaultNumber",
            petName: formValues.petName || "defaultName",
            petType: formValues.petType || "defaultType",
            petKind: formValues.petKind || "defaultKind",
            petGender: formValues.petGender || "defaultGender",
            weight: formValues.weight || "defaultWeight",
            petBirth: formValues.petBirth || "defaultBirth",
            withdrawal: formValues.withdrawal || "defaultWithdrawal",
            inoculation1: formValues.inoculation1 || "defaultInoculation1",
            inoculation2: formValues.inoculation2 || "defaultInoculation2",
            inoculation3: formValues.inoculation3 || "defaultInoculation3",
            inoculation4: formValues.inoculation4 || "defaultInoculation4",
            fileUrl: imageUrls[0],
          },
          { merge: true }
        )
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      });
      alert("등록이 완료되었습니다!");
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  return (
    <div className="profilList">
      <form className={styles.infoBox} onSubmit={handleSubmit}>
        <FileInput
          onFileChange={(file) => {
            formValues.file = file;
          }}
        />
        <div className={styles.container2}>
          <label className={styles.label} htmlFor="petNumber">
            동물 등록번호
          </label>
          <input
            className={styles.input}
            type="number"
            id="petNumber"
            placeholder="아이의 등록번호를 입력해주세요."
            onChange={handleChange}
          />
        </div>

        <div className={styles.container2}>
          <label className={styles.label} htmlFor="petName">
            펫이름
          </label>
          <input
            className={styles.input}
            type="text"
            id="petName"
            placeholder="아이의 이름을 입력해주세요."
            onChange={handleChange}
          />
        </div>

        <div className={styles.container2}>
          <label className={styles.label} htmlFor="petType">
            펫종류
          </label>
          <select
            className={styles.select}
            name=""
            id=""
            onChange={handleChange}
          >
            <option value="None">선택하세요</option>
            <option value="Dog">강아지</option>
            <option value="Cat">고양이</option>
            <option value="Other">기타</option>
          </select>
        </div>

        <div className={styles.container2}>
          <label className={styles.label} htmlFor="kind">
            품종
          </label>
          <input
            className={styles.input}
            type="text"
            id="petKind"
            placeholder="아이의 품종을 입력해주세요."
            onChange={handleChange}
          />
        </div>

        <div className={styles.container2}>
          <label className={styles.label} htmlFor="gender">
            성별
          </label>
          <select
            className={styles.select}
            name=""
            id="petGender"
            onChange={handleChange}
          >
            <option value="">선택하세요</option>
            <option value="male">수컷</option>
            <option value="female">암컷</option>
          </select>
        </div>

        <div className={styles.container2}>
          <label className={styles.label} htmlFor="weight">
            몸무게
          </label>
          <div>
            <input
              className={styles.input2}
              type="number"
              id="weight"
              placeholder="아이의 몸무게를 입력해주세요."
              onChange={handleChange}
            />
            <strong>kg</strong>
          </div>
        </div>

        <div className={styles.container2}>
          <label className={styles.label} htmlFor="birthDate">
            생년월일
          </label>
          <div className={styles.choice}>
            <SDatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              id="petBirth"
            />
          </div>
        </div>

        <div className={styles.container2}>
          <label className={styles.label} htmlFor="withdrawal">
            중성화 여부
          </label>
          <div className={styles.choice}>
            <Button1
              type="button"
              style={
                selectedButton === "completed"
                  ? {
                      backgroundColor: "#ff9b50",
                      color: "#fff",
                      border: "none",
                    }
                  : {}
              }
              onClick={() => handleButtonClick("completed")}
            >
              완료
            </Button1>

            <Button1
              type="button"
              style={
                selectedButton === "incomplete"
                  ? {
                      backgroundColor: "#ff9b50",
                      color: "#fff",
                      border: "none",
                    }
                  : {}
              }
              onClick={() => handleButtonClick("incomplete")}
            >
              미완료
            </Button1>
          </div>
        </div>

        <div className={styles.container3}>
          <label className={styles.label} htmlFor="birthDate">
            기초 접종 여부
          </label>
          <div className={styles.inoculation}>
            <div className={styles.choice2}>
              <select
                className={styles.select2}
                name=""
                id="
inoculation1"
              >
                <option value="1">선택</option>
                <option value="2">기초</option>
                <option value="3">백혈병</option>
                <option value="4">간염</option>
                <option value="5">사상충</option>
              </select>{" "}
              <div>-</div>
              <input
                className={styles.input2}
                type="birthDate"
                id="
                inoculation1"
                placeholder=""
              />
            </div>
            <div className={styles.choice2}>
              <select
                className={styles.select2}
                name=""
                id="
inoculation2"
              >
                <option value="1">선택</option>
                <option value="2">기초</option>
                <option value="3">백혈병</option>
                <option value="4">간염</option>
                <option value="5">사상충</option>
              </select>{" "}
              <div>-</div>
              <input
                className={styles.input2}
                type="birthDate"
                id="
                inoculation2"
                placeholder=""
              />
            </div>
            <div className={styles.choice2}>
              <select
                className={styles.select2}
                name=""
                id="
inoculation3"
              >
                <option value="1">선택</option>
                <option value="2">기초</option>
                <option value="3">백혈병</option>
                <option value="4">간염</option>
                <option value="5">사상충</option>
              </select>{" "}
              <div>-</div>
              <input
                className={styles.input2}
                type="birthDate"
                id="
                inoculation3"
                placeholder=""
              />
            </div>
            <div className={styles.choice2}>
              <select
                className={styles.select2}
                name=""
                id="
inoculation4"
              >
                <option value="1">선택</option>
                <option value="2">기초</option>
                <option value="3">백혈병</option>
                <option value="4">간염</option>
                <option value="5">사상충</option>
              </select>{" "}
              <div>-</div>
              <input
                className={styles.input2}
                type=""
                id="
inoculation4"
                placeholder=""
              />
            </div>
          </div>
        </div>
        <div className={styles.retouch}>
          <MypageButton
            type="submit"
            className={styles.correction}
            onClick={handleSubmit}
          >
            등록하기
          </MypageButton>
        </div>
      </form>
    </div>
  );
}

export default Profile;
