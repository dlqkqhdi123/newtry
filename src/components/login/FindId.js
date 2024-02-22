import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { findId } from "../../api/firebase";
import Modal from "../Account/ModalId";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 16px;
  flex-direction: column;
  background-color: #f8ebd8;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Table = styled.table`
  border-top: 3px solid #ff9b50;
  border-bottom: 3px solid #ff9b50;
`;

const Input = styled.input`
  border: 1px solid #d9d9d9;
  &:focus {
    background-color: #f9f9f9;
    border: 1.5px solid #666;
  }
`;

const MailInput = styled(Input)`
  width: 25%;
`;

const Select = styled.select`
  border: 1px solid #d9d9d9;
`;

const BtnWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const FindIdBtn = styled.button`
  border: none;
  background-color: #000;
  color: #fff;
  padding: 8px 32px;
  margin-top: 32px;
  cursor: pointer;
  &:hover {
    font-weight: bold;
    background-color: #ff9b50;
  }
`;

function FindId() {
  const [mail2, setMail2] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const email2Ref = useRef(null);
  const phoneRef = useRef();
  const [memberName, setMemberName] = useState("");
  const [memberIdModalOpen, setMemberIdModalOpen] = useState(false);
  const [memberId, setMemberId] = useState("");
  const [isError, setIsError] = useState(false);

  const handleMailChange = (e) => {
    const selectedValue = e.target.value;

    setMail2(selectedValue);

    const self = email2Ref.current;

    if (selectedValue === "other") {
      if (self) {
        self.disabled = false;
        self.value = "";
      }
    } else {
      if (self) {
        self.value = e.target.value;
        self.disabled = true;
      }
    }
  };

  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
  };

  const handlePhone = (e) => {
    const value = phoneRef.current.value.replace(/\D+/g, "");
    const numberLength = 11;

    let result = "";
    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 3:
        case 7:
          result += "-";
          break;
        default:
          break;
      }
      result += value[i];
    }

    phoneRef.current.value = result;

    setPhone(e.target.value);
  };

  const handleFindId = async () => {
    if (
      memberName.trim() === "" ||
      email.trim() === "" ||
      mail2.trim() === "" ||
      phone.trim() === ""
    ) {
      alert("빈 칸을 모두 입력해주세요!");
      return;
    }

    try {
      const memberId = await findId(
        memberName,
        email,
        mail2 === "other" ? email2Ref.current.value : mail2,
        phone
      );
      console.log("찾은 회원 ID:", memberId);

      if (memberId === "일치하는 회원 정보가 없습니다.") {
        setIsError(true);
        setMemberId("");
      } else {
        setIsError(false);
        setMemberId(memberId);
      }

      setMemberIdModalOpen(true);
    } catch (error) {
      console.error("회원 ID 찾기 오류:", error);
    }
  };

  const closeModal = () => {
    setMemberIdModalOpen(false);
  };

  return (
    <Container>
      <div>
        <h2 style={{ margin: "30px", fontSize: "42px" }}>Forgot your ID?</h2>
        <p style={{ marginBottom: "50px", textAlign: "center" }}>
          회원 가입 시 입력한 정보를 입력해주세요.
        </p>
      </div>
      <div>
        <Table className="join-area">
          <colgroup>
            <col data-member-form="th" style={{ width: "20%" }} />
            <col data-member-form="td" style={{ width: "80%" }} />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
                <label htmlFor="name">이름</label>
              </th>
              <td>
                <Input
                  type="text"
                  id="name"
                  title="이름"
                  className="required"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="email">이메일</label>
              </th>
              <td>
                <MailInput
                  type="text"
                  name="email"
                  id="email"
                  title="이메일아이디 "
                  onChange={onChangeEmail}
                />
                @
                <MailInput
                  type="text"
                  name="email2"
                  id="email2"
                  title="이메일 주소 직접입력"
                  disabled={mail2 !== "other"}
                  ref={email2Ref}
                />
                <Select
                  name="tmp_mail"
                  id="tmp_mail"
                  onChange={handleMailChange}
                  style={{ width: "25%" }}
                >
                  <option value="">선택하세요</option>
                  <option value="naver.com">naver.com</option>
                  <option value="daum.net">daum.net</option>
                  <option value="hanmail.net">hanmail.net</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="other">직접입력</option>
                </Select>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="phone">연락처</label>
              </th>
              <td>
                <Input
                  id="phone"
                  name="phone"
                  value={phone}
                  ref={phoneRef}
                  onChange={handlePhone}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <Modal
        open={memberIdModalOpen}
        onClose={closeModal}
        memberId={memberId}
        isError={isError}
      />
      <BtnWrapper>
        <FindIdBtn onClick={handleFindId}>아이디 찾기</FindIdBtn>
        <Link to="/findPass">
          <FindIdBtn>비밀번호 찾기</FindIdBtn>
        </Link>
      </BtnWrapper>
    </Container>
  );
}

export default FindId;
