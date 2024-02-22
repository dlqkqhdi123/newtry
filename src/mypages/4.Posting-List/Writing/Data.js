const postList = [
  {
    checkbox: "checkbox",
    no: 1,
    witer: "강자자",
    title: "저희 집 주인 땡이를 소개합니다!",
    content: "첫번째 게시글 내용입니다.",
    property:"갤러리",
    createDate: "2020-10-25",
  },
  {
    checkbox: "checkbox",
    no: 2,
    witer: "동동",
    title: "냥이들 츄르 나눔합니다!!",
    content: "며칠 전에 구매한 냥이들 츄르말인데요. <br />    최근에 또 냥이 츄르를 선물 받았는데 유통기한은 정해져 있고 ㅠㅜ     해서 츄르 몇분께 나눔할려고 합니다!    <br />    <br />    댓글 남겨주세요!!",
    property:"나눔분양",
    createDate: "2020-11-25",
  },

];

// const getPostByNo = (no) => {
//   const array = postList.filter((x) => x.no == no);
//   if (array.length == 1) {
//     return array[0];
//   }
//   return null;
// };

export { postList, 
  // getPostByNo
 };
