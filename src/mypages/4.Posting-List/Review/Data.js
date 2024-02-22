const postList = [
  {
    checkbox: "checkbox",
    no: 1,
    company: "동의보감 동물병원",
    title: "좋습니다. 친절합니다. 설명잘합니다. 진료 좋습니다. 시설이 깨끗합니다.",
    content: "첫번째 게시글 내용입니다.",
    createDate: "2020-10-25",
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
