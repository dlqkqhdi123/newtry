const questions = [
  {
    id: 1,
    option: "EI",
    question: "다른 강아지 친구들을 만났을 때, 반응은?",
    answers: [
      {
        type: "E",
        content: "새친구 좋다, 멍! ",
      },
      {
        type: "I",
        content: "근처도 오지 마라. 으르렁.",
      },
    ],
  },
  {
    id: 2,
    option: "EI",
    question: "집사가 쉬는 날! 집사와의 데이트 장소는?",
    answers: [
      {
        type: "E",

        content: "하루 전부터 두근두근! 나갈 준비 완료",
      },
      {
        type: "I",
        content: "나는 집, 집, 집! 집이 좋아!",
      },
    ],
  },
  {
    id: 3,
    option: "EI",
    question: "지나가는 인간이 나를 본다면?",
    answers: [
      {
        type: "E",
        content: "나 진짜 귀엽지?",
      },
      {
        type: "I",
        content: "저리가라 인간...",
      },
    ],
  },
  {
    id: 4,
    option: "SN",
    question: "눈 앞에서 집사가 사라진다면?",
    answers: [
      {
        type: "S",
        content: "어? 방금까지 있었는데... 나는 내 할 일 하련다!",
      },
      {
        type: "N",
        content: "또 시작이네, 여기저기 찾으러 가자!",
      },
    ],
  },
  {
    id: 5,
    which: "SN",
    question: "산책할 때의 나는?",
    answers: [
      {
        type: "S",
        content: "거참... 아는 길로 가자, 집사야.",
      },
      {
        type: "N",
        content: "저 나비를 쫓아가볼까? 왈왈 멍멍!",
      },
    ],
  },
  {
    id: 6,
    which: "SN",
    question: "새로운 장난감이 생긴다면?",
    answers: [
      {
        type: "S",
        content: "넌 뭐야! 정체를 밝혀라! 약 3초 관심 후 관심 끝!",
      },
      {
        type: "N",
        content: "나의 왕국에 온 것을 환영해. 너는 나의 베스트 장난감.",
      },
    ],
  },
  {
    id: 7,
    option: "TF",
    question: "집사가 간식을 들고 처음 보는 훈련을 시도한다?!",
    answers: [
      {
        type: "T",
        content: "뭐해? 뭐야?",
      },
      {
        type: "F",
        content: "킁킁 맛있는 냄새! 일단 따라하고 본다.",
      },
    ],
  },
  {
    id: 8,
    option: "TF",
    question: "집사와 간식 중에 선택해야 한다면?",
    answers: [
      {
        type: "T",
        content: "하찮은 간식 치워! 집사가 최고다!",
      },
      {
        type: "F",
        content: "미안! 나의 pick은 간식이야!",
      },
    ],
  },
  {
    id: 9,
    option: "TF",
    question: "산책 중 마음에 드는 강아지를 만났다!",
    answers: [
      {
        type: "T",
        content: "그치만 다가가지 않는다! 꼬리만 살랑살랑!",
      },
      {
        type: "F",
        content: "친구하자! 친구하자! 우리 친구해!",
      },
    ],
  },
  {
    id: 10,
    option: "JP",
    question: "집사가 외출한다면 나는?",
    answers: [
      {
        type: "J",
        content: "진짜 간거야? 확인하고 기다린다.",
      },
      {
        type: "P",
        content: "갔냐?! 왈왈! 내가 왕이다.",
      },
    ],
  },
  {
    id: 11,
    option: "JP",
    question: "산책 중 화장실이 급하다?",
    answers: [
      {
        type: "J",
        content: "마킹한 곳을 찾아 배변한다!",
      },
      {
        type: "P",
        content: "참지 않고 바로 쉬야...!",
      },
    ],
  },
  {
    id: 12,
    option: "JP",
    question: "자동 급식기를 집사가 사왔다.",
    answers: [
      {
        type: "J",
        content: "아침 점심 저녁! 정확하게 나눠 먹겠어.",
      },
      {
        type: "P",
        content: "뷔페가... 여기 있네?",
      },
    ],
  },
];

export default questions;
