const postList = [
  {
    checkbox: "checkbox",
    no: 1,
    reservationNumber: "00-000-000",
    condition: "예약완료",
    petName: "댕댕이",
    hospital: "동의보감 병원",
    reservationDate: "2024-01-16",
  },
  {
    checkbox: "checkbox",
    no: 2,
    reservationNumber: "00-000-000",
    condition: "예약중",
    petName: "냥냥이",
    hospital: "란 병원",
    reservationDate: "2024-01-16",
  },

];

const getPostByNo = (no) => {
  const array = postList.filter((x) => x.no == no);
  if (array.length == 1) {
    return array[0];
  }
  return null;
};

export { postList, getPostByNo };
