import React, { useState } from "react";
import { styled } from "styled-components";
import { useEffect } from "react";
import { getAddress } from "./../../utills/getAddress";
import DaumPostcode from "react-daum-postcode";

const Container = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
`;

const AddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostCodeAndButton = styled.div`
  display: flex;
`;

const Input = styled.input`
  width: 70%;
  padding: 8px;
  margin: 4px;
  outline: none;
  border-color: #d9d9d9;
`;

const InputButton = styled.button`
  width: 100%;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  background-color: #1c1b1f;
  color: #fff;
  margin-top: 4px;
  margin-left: 8px;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 500px;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

function Address() {
  const [detailAddress, setDetailAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleComplete = (data) => {
    const address = getAddress(data);
    setPostcode(data.zonecode);
    setAddress(address);
    closeModal();
  };

  const handleClose = () => {
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const authorizeCodeFromKakao = window.location.search.split("=")[1];
    if (authorizeCodeFromKakao !== undefined) {
      console.log(`authorizeCodeFromKakao : ${authorizeCodeFromKakao}`);
    } else {
      console.log("No AuthorizeCodeFromKakao");
    }
  }, []);

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit}>
          <AddressWrapper>
            <PostCodeAndButton>
              <Input
                m="3px"
                size="md"
                type="text"
                placeholder="우편번호"
                value={postcode}
                readOnly
              />
              <div>
                <InputButton onClick={openModal}>주소 찾기</InputButton>
                {isModalOpen && (
                  <Modal>
                    <DaumPostcode onComplete={handleComplete} />
                    <InputButton
                      onClick={handleClose}
                      style={{
                        width: "50%",
                        position: "absolute",
                        left: "25%",
                        bottom: "5%",
                      }}
                    >
                      닫기
                    </InputButton>
                  </Modal>
                )}
              </div>
            </PostCodeAndButton>
            <Input
              m="3px"
              size="md"
              type="text"
              placeholder="주소"
              value={address}
              readOnly
            />
            <Input
              m="3px"
              size="md"
              type="text"
              placeholder="상세주소"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
            />
          </AddressWrapper>
        </form>
      </Container>
    </>
  );
}

export default Address;
