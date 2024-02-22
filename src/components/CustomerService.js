import "./CustomerService.css";
import { useState } from "react";
import Button from "./Button";
import CustomerServicefoot from "../assets/source/customer service.png";

const styles = {
  objectFit: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "100%",
  zIndex: 1,
};

function CustomerService() {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [isDirectInput, setIsDirectInput] = useState(false);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "직접입력") {
      setSelectedDomain("");
      setIsDirectInput(true);
    } else {
      setSelectedDomain(selectedValue);
      setIsDirectInput(false);
    }
  };

  const handleInputChange = (e) => {
    setSelectedDomain(e.target.value);
  };

  return (
    <div className="main-container">
      <div className="img-container">
        <img src={CustomerServicefoot} style={styles} />
      </div>
      <div className="content-container">
        <div className="content-head">
          <div className="content-title">Customer Service</div>
        </div>
        <div className="content-form">
          <div className="content-body">
            <div className="contents">
              <div className="content">
                <div className="column-header">
                  <span className="column-header-title">성명</span>
                  <div className="content-text">
                    <input
                      type="text"
                      placeholder="성함을 입력해 주세요."
                      className="input"
                    />
                  </div>
                </div>
              </div>
              <div className="content">
                <div className="column-header">
                  <span className="column-header-title">이메일</span>
                  <div className="content-text">
                    <div className="email">
                      <input type="text" className="input2" />
                      <span className="text">@</span>
                      <input
                        type="text"
                        className="input2"
                        value={selectedDomain}
                        readOnly={!isDirectInput ? false : true}
                        onChange={handleInputChange}
                      />
                      <select className="select" onChange={handleSelectChange}>
                        <option value="">직접입력</option>
                        <option value="naver.com">naver.com</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="hanmail.net">hanmail.net</option>
                        <option value="kakao.com">kakao.com</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content">
                <div className="column-header">
                  <span className="column-header-title">연락처</span>
                  <div className="content-text">
                    <input
                      type="text"
                      placeholder="010-0000-0000"
                      className="input"
                    />
                  </div>
                </div>
              </div>
              <div className="content">
                <div className="column-header">
                  <span className="column-header-title">문의유형</span>
                  <div className="content-text text-form">
                    <select
                      className="select2"
                      defaultValue="문의하실 유형을 선택해주세요."
                    >
                      <option
                        value="문의하실 유형을 선택해주세요."
                        disabled="disabled"
                      >
                        문의하실 유형을 선택해 주세요.
                      </option>
                      <option value="이용불편 및 서비스 개선">
                        이용불편 및 서비스 개선
                      </option>
                      <option value="제휴 및 제안 문의">
                        제휴 및 제안 문의
                      </option>
                      <option value="기타">기타</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="content">
                <div className="column-header" style={{ borderBottom: "none" }}>
                  <span className="column-header-title">
                    <p>문의내용</p>
                  </span>
                  <div className="content-text">
                    <textarea
                      type="textarea"
                      placeholder="자세한 내용을 입력해주세요."
                      className="textarea"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <Button children="보내기" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerService;
