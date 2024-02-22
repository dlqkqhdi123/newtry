const postList = [
  {
    checkbox: "checkbox",
    no: 1,
    witer: "강자자",
    title: "가다랑어포 무료나눔 하시는 글 보고 연락드립니다.",
    content: "첫번째 게시글 내용입니다.",
    createDate: "2020-10-25",
  },
  {
    checkbox: "checkbox",
    no: 2,
    witer: "한우축제",
    title: "혹시 가다랑어포 소도 먹을 수 있을까요?",
    content: "두번째 게시글 내용입니다.",
    createDate: "2020-11-25",
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
