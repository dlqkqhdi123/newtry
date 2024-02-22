import ENFJ2 from "../assets/dogbti/ENFJ2.png";
import ENFP2 from "../assets/dogbti/ENFP2.png";
import ENTJ2 from "../assets/dogbti/ENTJ2.png";
import ENTP2 from "../assets/dogbti/ENTP2.png";
import ESFJ2 from "../assets/dogbti/ESFJ2.png";
import ESFP2 from "../assets/dogbti/ESFP2.png";
import ESTJ2 from "../assets/dogbti/ESTJ2.png";
import ESTP2 from "../assets/dogbti/ESTP2.png";
import INFJ2 from "../assets/dogbti/INFJ2.png";
import INFP2 from "../assets/dogbti/INFP2.png";
import INTJ2 from "../assets/dogbti/INTJ2.png";
import INTP2 from "../assets/dogbti/INTP2.png";
import ISFJ2 from "../assets/dogbti/ISFJ2.png";
import ISFP2 from "../assets/dogbti/ISFP2.png";
import ISTJ2 from "../assets/dogbti/ISTJ2.png";
import ISTP2 from "../assets/dogbti/ISTP2.png";

const petbtiApi = [
  {
    INTJ: {
      id: "INTJ",
      subhead: "독립적이고 시크한 차도멍",
      subject: "호기심 덩어리 고집불통 대마왕",
      feature1: "#내주인지켜",
      feature2: "#산책 척척",
      feature3: "#자신감 뿜뿜",
      nickname: "과학자형",
      img: INTJ2,
      description: [
        {
          des: "집사의 간섭은 NO! 혼자 있는 게 제일 좋다, 멍!",
        },
        {
          des: "혼자라도 매우 바쁘게 보낸단 말씀.",
        },
        {
          des: "어떤 것이든 킁킁 분석하는 게 재미있어.",
        },
        {
          des: "매일 새로운 장난감을 사주라, 멍!",
        },
        {
          des: "산책 길이든 밥이든 내 맘에 안 들면 싫다,",
        },
        {
          des: "한 번 가진 신념은 절대 바꾸지 않는다.",
        },
      ],
      duo: [
        {
          img: ENTP2,
          subhead: "ENTP",
          des: "모든 것이 궁금한 괴짜 사색가멍",
        },
      ],
      counter: [
        {
          img: ESFP2,
          subhead: "ESFP",
          des: "강아지 사이에서 인기스타 멍",
        },
      ],
    },
    INTP: {
      id: "INTP",
      subhead: "하나부터 열까지 탐색하는 똑똑멍",
      subject: "지식에 대한 끝없는 욕망",
      feature1: "#전문가가 될래",
      feature2: "#팩트 체크",
      feature3: "#지식 집착왕!",
      nickname: "아이디어뱅크형",
      img: INTP2,
      description: [
        {
          des: "TMI는 그만!",
        },
        {
          des: "관심사에 빠지면 전문가가 될 만큼 파고든다!",
        },
        {
          des: "산책 중에 혼자만의 시간이 매우 중요한 타입이야.",
        },
        {
          des: "나는야 지식 집착왕 나에게 팩트만 알려줘~",
        },
        {
          des: "창의적 지능과 직관력 통찰멍.",
        },
        {
          des: "논리적인 부분에 관심이 많다멍, 집사의 영양가 없는 수다는 싫어.",
        },
      ],
      duo: [
        {
          img: ENTJ2,
          subhead: "ENTJ",
          des: "단호하고 철저한 단호박멍",
        },
      ],
      counter: [
        {
          img: ESFJ2,
          subhead: "ESFJ ",
          des: "모두에게 친절한 신사 숙녀 멍",
        },
      ],
    },
    INFJ: {
      id: INFJ2,
      subhead: "멍멍계의 평화주의 멍",
      subject: "싸움은 싫어! 평화로운게 좋아",
      feature1: "#사이좋게지내",
      feature2: "#견생철학",
      feature3: "#경고는10번",
      nickname: "예언가형",
      img: "#",
      description: [
        {
          des: "남을 위해 사는 견생 나만의 시간을 존중해줘.",
        },
        {
          des: "불편한 상황과 어색한 상황 no!",
        },
        {
          des: "상대방을 배려하는 척하며 본인이 원하는 방향으로 잘 유도한답니다.",
        },
        {
          des: "싸우지 말고 친하게 지내자!",
        },
        {
          des: "나보다 다른 친구 멍멍을 먼저 생각하며 우선적으로 배려하는게 편하다멍!",
        },
        {
          des: "집사도 좋지만 혼자 있는 시간이 필요해 견생에 대한 생각할 시간을 줘.",
        },
      ],
      duo: [
        {
          img: ENFP2,
          subhead: "ENFP",
          des: "분위기 메이커 멍",
        },
      ],
      counter: [
        {
          img: ESTP2,
          subhead: "ESTP",
          des: "개그 DNA 자동 탑재 멍",
        },
      ],
    },
    INFP: {
      id: "INFP",
      subhead: "공감능력킹왕짱 멍",
      subject: "상상의 나라로 풍덩!",
      feature1: "#분위기메이커",
      feature2: "#행복하자",
      feature3: "#우리는짱이야!",
      nickname: "열정적인 중재자",
      img: INFP2,
      description: [
        {
          des: "너지금거짓말하고 있지?!",
        },
        {
          des: "내면의 세계 속으로 떠나자.",
        },
        {
          des: "집사의 기분을 제일 먼저 알아차릴 거야.",
        },
        {
          des: "집사가 울면 나도 울고 웃으면 나도 HAPPY :)",
        },
        {
          des: "나와의 약속을 소중하게 생각해줘 산책 & 간식으로 나를 놀리면 화낸다 멍.",
        },
      ],
      duo: [
        {
          img: ENFJ2,
          subhead: "ENFJ",
          des: "모두에게 최고의 연예인 멍!",
        },
      ],
      counter: [
        {
          img: ESFJ2,
          subhead: "ESFJ",
          des: "모두에게 친절한 신사 숙녀 멍",
        },
      ],
    },
    ISTJ: {
      id: "ISTJ",
      subhead: "안전을 지키는 보디가드 멍",
      subject: "실수따위 용납할 수 없는 원칙주의자",
      feature1: "#목표달성",
      feature2: "#독특한취미",
      feature3: "#정리왕",
      nickname: "세상의 소금형",
      img: ISTJ2,
      description: [
        {
          des: "즉흥적 산책 NO! 계획적 산책 YES!",
        },
        {
          des: "집사의 집과 신변의 안전을 밤 낮 가지리 않고 돌보며 지킨다.",
        },
        {
          des: "배변 활동은 무조건 애견 패드에 다른곳에 실수할 일은 절대 없다.",
        },
        {
          des: "갑자기 가야하는 병원은 싫다, 멍!",
        },
        {
          des: "계획적으로 나를 완벽하게 에스코트해라.",
        },
        {
          des: "잘 맞는 집사와 가겠다 멍!",
        },
      ],
      duo: [
        {
          img: ESTP2,
          subhead: "ESTP",
          des: "개그 DNA 자동 탑재 멍",
        },
      ],
      counter: [
        {
          img: ENFP2,
          subhead: "ENFP",
          des: "분위기 메이커 멍",
        },
      ],
    },
    ISFJ: {
      id: "ISFJ",
      subhead: "따뜻한 우리집 수호자 멍",
      subject: "혼자 있는 게 좋지만 싫어",
      feature1: "#거리두기",
      feature2: "#아싸중인싸",
      feature3: "#소심해요",
      nickname: "임금뒷편의 권력형",
      img: ISFJ2,
      description: [
        {
          des: "쉬고 있어도 쉬는 게 아니야.",
        },
        {
          des: "집사든 친구든 누구에게나 진심.",
        },
        {
          des: "집사가 있으면 혼자 있고 싶고 없으면 보고 싶어.",
        },
        {
          des: "이랬다저랬다 하는 나는야 변덕쟁이 멍!",
        },
        {
          des: "밥->잠자기->산책->밥->잠자기 똑같은 패턴이지만 계획적이고 바쁘게 살아가.",
        },
        {
          des: "나는 내가 사랑하는 존재라면 언제나 최선을 다해! 불러만 줘! 멍!",
        },
      ],
      duo: [
        {
          img: ESFP2,
          subhead: "ESFP",
          des: "강아지 사이에서 인기스타 멍",
        },
      ],
      counter: [
        {
          img: ENTP2,
          subhead: "ENTP",
          des: "모든 것이 궁금한 괴짜 사색가멍",
        },
      ],
    },
    ISTP: {
      id: "ISTP",
      subhead: "눈치 100단 멍",
      subject: "조용하지만 적응력이 강한 가랑비",
      feature1: "#변덕댕댕",
      feature2: "#실용주의",
      feature3: "#차갑게보이는순둥이",
      nickname: "백과사전형",
      img: ISTP2,
      description: [
        {
          des: "개견주의",
        },
        {
          des: "한 번에 해치운다!",
        },
        {
          des: "분석적이고 논리적인 성격으로 분위기 파악 완료!",
        },
        {
          des: "누구보다 발빠르게 행동하지.",
        },
        {
          des: "다른 일에는 관심 없어! 내가 싫으면 안 하고 좋으면 할 거야.",
        },
        {
          des: "게으를 때는 끝없이 게으르고 집중할 때는 딱 집중하는 만능 재주꾼.",
        },
      ],
      duo: [
        {
          img: ESTJ2,
          subhead: "ESTJ",
          des: "어려운 문제를 해결하는 똑똑멍",
        },
      ],
      counter: [
        {
          img: ENFJ2,
          subhead: "ENFJ",
          des: "모두에게 최고의 연예인 멍!",
        },
      ],
    },
    ISFP: {
      id: "ISFP",
      subhead: "새로운 것을 찾아다니는 모험가멍",
      subject: "나는야 얼리어답터",
      feature1: "#고집 짱짱",
      feature2: "#낙천 주의",
      feature3: "#충성심은 나",
      nickname: "성인군자형",
      img: ISFP2,
      description: [
        {
          des: "규칙과 틀 NO 자유로운 삶 YES",
        },
        {
          des: "스킨십이 좋아! 멍멍!",
        },
        {
          des: "틀에 박힌 견생보다는 자유롭게 새로운 것을 경험하면서 살거다, 멍!",
        },
        {
          des: "새로운 산책이 좋아! 새로운 옷이 좋아!",
        },
        {
          des: "나에게 늘 새롭고 좋은걸 경험시켜줘!",
        },
        {
          des: "집사와 애정을 나누고 감정을 주고 받으며 스킨십을 통해 안정감을 느낀다구!",
        },
      ],
      duo: [
        {
          img: ESFJ2,
          subhead: "ESFJ",
          des: "모두에게 친절한 신사 숙녀 멍",
        },
      ],
      counter: [
        {
          img: ENTJ2,
          subhead: "ENTJ",
          des: "단호하고 철저한 단호박멍",
        },
      ],
    },
    ESTP: {
      id: "ESTP",
      subhead: "개그 DNA 자동 탑재 멍",
      subject: "한번 내 친구는 영원한 내 친구",
      feature1: "#임기응변",
      feature2: "#반항도 최고!",
      feature3: "#스스로 산책",
      nickname: "인싸형",
      img: ESTP2,
      description: [
        {
          des: "강아지 사이에서 인기스타",
        },
        {
          des: "열정열정열정!!",
        },
        {
          des: "외향적인 성격으로 어디서든 적응을 잘하지!",
        },
        {
          des: "다른 멍들과 어울리며 즐기는 것이 좋아.",
        },
        {
          des: "몸개그는 내 특기 나는 집사를 웃기는 뼈그맨.",
        },
        {
          des: "열정적인 성격으로 에너지가 흘러넘친다 몸으로 직접 경험하고 부딪히며 문제해결완료.",
        },
      ],
      duo: [
        {
          img: ISTJ2,
          subhead: "ISTJ",
          des: "안전을 지키는 보디가드멍",
        },
      ],
      counter: [
        {
          img: INFJ2,
          subhead: "INFJ",
          des: "멍멍계의 평화주의 멍",
        },
      ],
    },
    ESFP: {
      id: "ESFP",
      subhead: "강아지 사이에서 인기스타 멍",
      subject: "새로운 모험 새로운 산책! 좋아요!",
      feature1: "#사교적",
      feature2: "#오지라퍼",
      feature3: "#도전정신!!",
      nickname: "인맥왕",
      img: ESFP2,
      description: [
        {
          des: "기회는 오직 지금뿐.",
        },
        {
          des: "추상적인 논의보다는 직접 경험을 통해 행복감을 느끼는 나는야 모험가멍.",
        },
        {
          des: "기회는 언제까지나 있을 수 없는 일.",
        },
        {
          des: "산책 중 제일 설레는 시간은 산책 가기 전!",
        },
        {
          des: "즐거워 보이는 일은 고민 없이 바로 하자!",
        },
        {
          des: "자발적으로 여러 곳을 다니면서 새로운 것에 매료되어 감동하고 흥분하지.",
        },
      ],
      duo: [
        {
          img: ISFJ2,
          subhead: "ISFJ",
          des: "헌신적이고 따뜻한 우리집 수호자멍",
        },
      ],
      counter: [
        {
          img: INTJ2,
          subhead: "INTJ",
          des: "독립적이고 시크한 차도멍",
        },
      ],
    },

    ENTJ: {
      id: "ENTJ",
      subhead: "단호하고 철저한 단호박멍",
      subject: "너는 짖어라 나는 몰라",
      feature1: "#카리스마댕",
      feature2: "#자기애",
      feature3: "#불도저!!",
      nickname: "지도자형",
      img: ENTJ2,
      description: [
        {
          des: "소속감보다는 본질을.",
        },
        {
          des: "나중이란 단어는 없다.",
        },
        {
          des: "집사의 교육이 아닌 내 성격에 맞게 체계적으로 살아갈 거야!",
        },
        {
          des: "빠른 추진력으로 계획한 일을 해치우자.",
        },
        {
          des: "1등으로 먹고 제일 먼저 놀거야",
        },
        {
          des: "집사나 친구가 불러도 심드렁~~멍!",
        },
        {
          des: "다른 친구 멍보다 감정 표현이 적지.",
        },
      ],
      duo: [
        {
          img: INTP2,
          subhead: "INTP",
          des: "하나부터 열까지 탐색하는 똑똑멍",
        },
      ],
      counter: [
        {
          img: ISFP2,
          subhead: "ISFP",
          des: "새로운 것을 찾아다니는 모험가멍",
        },
      ],
    },
    ENTP: {
      id: "ENTP",
      subhead: "모든 것이 궁금한 괴짜 사색가멍",
      subject: "다른 사람의 말은 한 귀로 흘리기",
      feature1: "#마이웨이",
      feature2: "#도전적 댕댕",
      feature3: "#상상력 풍부!",
      nickname: "발명가형",
      img: ENTP2,
      description: [
        {
          des: "새롭고 재미있는 것을 줘.",
        },
        {
          des: "남들이 하는 것을 똑같이 하기 싫어.",
        },
        {
          des: "일상적이고 똑같은 경험은 관심 없어! 새로운 놀이!",
        },
        {
          des: "대화의 주제는 오직 나야 나! 멍멍 나를 봐!",
        },
        {
          des: "산책 할 시간이다 멍멍! 시간 지켜!",
        },
        {
          des: "개인주의 멍! 독립적인 멍!",
        },
        {
          des: "가끔 하나의 장난감으로 종일 놀 수 있는 나는야 집착멍!",
        },
      ],
      duo: [
        {
          img: INTJ2,
          subhead: "INTJ",
          des: "독립적이고 시크한 차도멍",
        },
      ],
      counter: [
        {
          img: ISFJ2,
          subhead: "ISFJ",
          des: "헌신적이고 따뜻한 우리집 수호자",
        },
      ],
    },
    ENFJ: {
      id: "ENFJ",
      subhead: "모두에게 최고의 연예인 멍!",
      subject: "리액션 부자! 엄살도 최고!",
      feature1: "#핵인싸 댕",
      feature2: "#정이 넘쳐",
      feature3: "#활동 좋아",
      nickname: "언변능숙형",
      img: ENFJ2,
      description: [
        {
          des: "사회적지위1등 매력적인 인기스타.",
        },
        {
          des: "다른 멍의 이야기에 관심이 많지.",
        },
        {
          des: "힘찬 왈왈과 냄새 킁킁으로 반응하자.",
        },
        {
          des: "나보다 작은 멍은 내가 지켜줄게! 큰 멍도 내가 지켜줄게!",
        },
        {
          des: "어느 모임에 가도 모두를 나를 찾지!",
        },
        {
          des: "멍들 사이의 연예인.",
        },
      ],
      duo: [
        {
          img: INFP2,
          subhead: "INFP",
          des: "공감능력킹왕짱멍",
        },
      ],
      counter: [
        {
          img: ISTP2,
          subhead: "ISTP",
          des: "눈치 100단 멍",
        },
      ],
    },
    ENFP: {
      id: "ENFP",
      subhead: "분위기 메이커 멍",
      subject: "활발하고 순발력 뛰어난 멍",
      feature1: "#귀여움은 나!",
      feature2: "#매력덩어리",
      feature3: "#잘 까먹어!",
      nickname: "스파크형",
      img: ENFP2,
      description: [
        {
          des: "눈치 빠른 관찰자 핵인싸 중에 최고 핵인싸",
        },
        {
          des: "친구 멍과 깊은 유대 관계를 가져요.",
        },
        {
          des: "어느 모임을 가든 반려동물이 가면 분위기 UP!",
        },
        {
          des: "집사의 산책 준비를 누구보다 빠르게 알아차리는 눈치 100단!",
        },
        {
          des: "어떤 멍 모임이라도 적극적으로 참여하는 모임의 주인공 핵인싸.",
        },
        {
          des: "가끔 고집스러운 면이 있지만, 그렇다고 심하게 고집을 부리지는 않아요!",
        },
      ],
      duo: [
        {
          img: INFJ2,
          subhead: "INFJ",
          des: "멍멍계의 평화주의 멍",
        },
      ],
      counter: [
        {
          img: ISTJ2,
          subhead: "ISTJ",
          des: "안전을 지키는 보디가드멍",
        },
      ],
    },
    ESTJ: {
      id: "ESTJ",
      subhead: "어려운 공부 잘해요! 똑똑멍",
      subject: "인정받고 싶은 똑똑 멍멍이!",
      feature1: "#빈틈없댕!",
      feature2: "#외롭지만 괜찮아",
      feature3: "#모범댕댕",
      nickname: "사업가형",
      img: ESTJ2,
      description: [
        {
          des: "계획적이고 체계적인 성격으로 밥먹거나 똥 싸는 시간이 매우 규칙적이라구!",
        },
        {
          des: "내 삶의 룰을 존중해줘.",
        },
        {
          des: "땅파기든 장난감 숨기기든 어떤 일이라도 내가 제일 잘해!",
        },
        {
          des: "호불호가 확실해 때로는 사료를 고를 때 편한 점도 있어요.",
        },
        {
          des: "위로보다는 해결방안을 알려주지.",
        },
        {
          des: "슬프면 땅을 파거나 장난감을 갖고 놀아봐 멍!",
        },
      ],
      duo: [
        {
          img: ISTP2,
          subhead: "ISTP",
          des: "눈치 100단 멍",
        },
      ],
      counter: [
        {
          img: INFP2,
          subhead: "INFP",
          des: "공감능력킹왕짱멍",
        },
      ],
    },
    ESFJ: {
      id: "ESFJ",
      subhead: "모두에게 친절한 신사 숙녀 멍",
      subject: "매력적인 인기스타!",
      feature1: "#친선도모",
      feature2: "#무관심 싫어!",
      feature3: "#생각 많아",
      nickname: "친선도모형",
      img: ESFJ2,
      description: [
        {
          des: "다른 멍의 이야기에 관심이 많지.",
        },
        {
          des: "힘찬 왈왈과 냄새 킁킁으로 반응하자.",
        },
        {
          des: "나보다 작은 멍과 사람을 잘 도와주는 나는 친절한 신사숙녀멍",
        },
        {
          des: "어느 모임에 가도 모두를 나를 찾지!",
        },
        {
          des: "멍들 사이의 최고 인기스타!",
        },
        {
          des: "리액션 최고! 엄살 최고!",
        },
      ],
      duo: [
        {
          img: ISFP2,
          subhead: "ISFP",
          des: "새로운 것을 찾아다니는 모험가멍",
        },
      ],
      counter: [
        {
          img: INTP2,
          subhead: "INTP",
          des: "하나부터 열까지 탐색하는 똑똑멍",
        },
      ],
    },
  },
];

export default petbtiApi;
