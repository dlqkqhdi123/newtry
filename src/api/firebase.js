import { uploadString } from "firebase/storage";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
  arrayUnion,
  arrayRemove,
  increment,
  onSnapshot,
  serverTimestamp,
  where,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

//  메인 config
const firebaseConfig = {
  apiKey: "AIzaSyARawYxbOyLKnEWMlPSatqIULiZhn5ZDN0",
  authDomain: "hospetal-f595a.firebaseapp.com",
  projectId: "hospetal-f595a",
  storageBucket: "hospetal-f595a.appspot.com",
  messagingSenderId: "41843789723",
  appId: "1:41843789723:web:07d3d1aaf16f0bd24b9b3e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

// 이미지 업로드 김원상
const uploadImages = async (images) => {
  const imageUrls = [];

  for (const image of images) {
    const storageRef = ref(storage, `images/${image.name}`);
    const profileImageRef = ref(storage, `profileImages/${image.name}`);
    const snapshot = await uploadBytes(profileImageRef, image);
    const base64String = await convertToBase64(image);
    await uploadString(storageRef, base64String, "base64");
    const imageUrl = await getDownloadURL(storageRef);
    imageUrls.push(imageUrl);
  }

  return imageUrls;
};
// 이미지 업로드 - url 64진수 변환 김원상
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// 컬렉션 이름 가져오기
async function getDatas(collectionName, options) {
  let docQuery;
  if (options === undefined) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const result = querySnapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }));
    return result;
  } else if (options.lq === undefined) {
    docQuery = query(
      collection(db, collectionName),
      orderBy(options.order, "desc"),
      limit(options.limit)
    );
  } else {
    docQuery = query(
      collection(db, collectionName),
      orderBy(options.order, "desc"),
      startAfter(options.lq),
      limit(options.limit)
    );
  }

  const querySnapshot = await getDocs(docQuery);

  const result = querySnapshot.docs;
  const lastQuery = result[result.length - 1];

  const reviews = result.map((doc) => ({ docId: doc.id, ...doc.data() }));

  return { reviews, lastQuery };
}

// 게시글 올린 시간 확인 김원상
async function getData(collectionName, fieldName, condition, value) {
  const docQuery = query(
    collection(db, collectionName),
    where(fieldName, condition, value)
  );

  const querySnapshot = await getDocs(docQuery);
  const data = querySnapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
    uploadTime: doc.data().uploadTime ? doc.data().uploadTime.toDate() : null,
  }));

  return data.length === 1 ? data[0] : data;
}

// 아이디찾기 박진현
export const getLastId = async () => {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "member"), orderBy("id", "desc"), limit(1))
    );
    const lastDoc = querySnapshot.docs[0];

    return lastDoc.data().id;
  } catch (error) {
    console.error("Error in getLastId:", error);
    throw error;
  }
};

// 회원가입 박진현
const addDatas = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
  Object.keys(data).forEach((field) => {
    console.log(`${field}: ${data[field]}`);
  });
  console.log("전달된 데이터:", data);
};

async function idDatas(collectionName, checkId) {
  const Snapshot = await getDocs(
    query(collection(db, collectionName), where("memberId", "==", checkId))
  );
  return Snapshot.size;
}

// 닉네임 중복확인 박진현
async function nickDatas(collectionName, nickName) {
  const Snapshot = await getDocs(
    query(collection(db, collectionName), where("nickname", "==", nickName))
  );

  if (Snapshot.empty) {
    const MemberSnapshot = await getDocs(
      query(
        collection(db, collectionName),
        where("memberNickName", "==", nickName)
      )
    );

    return MemberSnapshot.size;
  }

  return Snapshot.size;
}

async function getMemberNickName(memberId) {
  try {
    const memberData = await nickDatas("member", memberId);

    if (memberData) {
      const memberNickName = memberData.memberNickName;
      return memberNickName;
    } else {
      console.log("Member not found for the given memberId.");
      return null;
    }
  } catch (error) {
    console.error("Error getting memberNickName by memberId:", error);
    throw error;
  }
}

// 로그인 박진현
async function getMember(values) {
  const { input_id: id, input_pw: password } = values;
  const docQuery = query(collection(db, "member"), where("memberId", "==", id));
  let message = "";
  let memberObj = null;

  const querySnapshot = await getDocs(docQuery);
  if (!querySnapshot.empty && querySnapshot.docs[0]) {
    const memberData = querySnapshot.docs[0].data();
    if (
      memberData &&
      memberData.hasOwnProperty("memberId") &&
      memberData.hasOwnProperty("memberPass") &&
      memberData.memberId === id &&
      memberData.memberPass === password
    ) {
      memberObj = memberData;
      message = null;
    }
    console.log(memberData);
  }
  return { memberObj, message };
}

// 소셜로그인 박진현
async function getSocialMember(nickname) {
  const docQuery = query(
    collection(db, "member"),
    where("memberType", "==", "social"),
    where("memberNickName", "==", nickname)
  );
  let memberObj = null;

  const querySnapshot = await getDocs(docQuery);
  if (!querySnapshot.empty && querySnapshot.docs[0]) {
    const memberData = querySnapshot.docs[0].data();
    if (memberData && memberData.memberType === "social") {
      memberObj = memberData;
    }
    console.log(memberData);
  }
  return memberObj;
}
// 아이디찾기 박진현
async function findId(memberName, memberMail, memberMail2, memberPhone) {
  const docQuery = query(
    collection(db, "member"),
    where("memberName", "==", memberName),
    where("memberMail", "==", memberMail),
    where("memberMail2", "==", memberMail2),
    where("memberPhone", "==", memberPhone)
  );
  const querySnapshot = await getDocs(docQuery);
  const memberData = querySnapshot.docs.map((doc) => doc.data());

  if (memberData.length > 0) {
    const memberId = memberData[0].memberId;
    return memberId;
  } else {
    return "일치하는 회원 정보가 없습니다.";
  }
}

// 비밀번호 변경 박진현
async function changePassword(memberId, newMemberPass) {
  const docQuery = collection(db, "member");
  const queryRef = query(docQuery, where("memberId", "==", memberId));

  const querySnapshot = await getDocs(queryRef);
  const memberDocs = querySnapshot.docs;

  if (memberDocs.length > 0) {
    const memberDoc = memberDocs[0];
    const memberRef = doc(db, "member", memberDoc.id);
    await updateDoc(memberRef, { memberPass: newMemberPass });
    return "회원 비밀번호가 변경되었습니다.";
  } else {
    return "일치하는 회원 정보가 없습니다.";
  }
}

// 비밀번호 모달띄우기 조회 박진현
async function findPass(
  memberId,
  memberName,
  memberMail,
  memberMail2,
  memberPhone,
  newMemberPass
) {
  const docQuery = collection(db, "member");
  let queryRef = docQuery;

  if (memberId !== undefined) {
    queryRef = query(queryRef, where("memberId", "==", memberId));
  }
  if (memberName !== undefined) {
    queryRef = query(queryRef, where("memberName", "==", memberName));
  }
  if (memberMail !== undefined) {
    queryRef = query(queryRef, where("memberMail", "==", memberMail));
  }
  if (memberMail2 !== undefined) {
    queryRef = query(queryRef, where("memberMail2", "==", memberMail2));
  }
  if (memberPhone !== undefined) {
    queryRef = query(queryRef, where("memberPhone", "==", memberPhone));
  }

  const querySnapshot = await getDocs(queryRef);
  const memberData = querySnapshot.docs.map((doc) => doc.data());
  console.log(memberData);

  if (memberData.length > 0) {
    const foundMemberId = memberData[0].memberId;
    console.log(foundMemberId);

    if (newMemberPass !== undefined) {
      // 변경된 비밀번호를 changePassword 함수로 전달하여 비밀번호를 업데이트합니다.
      const result = await changePassword(foundMemberId, newMemberPass);
      return result;
    } else {
      return foundMemberId;
    }
  } else {
    return "일치하는 회원 정보가 없습니다.";
  }
}
// 구분선

async function updateDatas(collectionName, docId, upadateData, options) {
  const docRef = doc(db, collectionName, docId);
  try {
    if (options) {
      if (options.type == "ADD") {
        await updateDoc(docRef, {
          [options.fieldName]: arrayUnion(upadateData),
        });
      } else if (options.type === "DELETE") {
        await updateDoc(docRef, {
          [options.fieldName]: arrayRemove(upadateData),
        });
      }
    } else {
      await updateDoc(docRef, upadateData);
    }
    return true;
  } catch (error) {
    return false;
  }
}

// 댓글 달기 - 김원상
async function renderArticleContent(articleId) {
  const articleRef = collection(db, "ArticleContent", articleId);
  const articleSnapshot = await getDocs(articleRef);
  const articleData = articleSnapshot.data();

  const commentIds = articleData.comments;

  const comments = [];

  for (const commentId of commentIds) {
    const commentRef = collection(db, "Comments");
    const commentQuery = query(commentRef, where("commentId", "==", commentId));
    const commentSnapshot = await getDocs(commentQuery);
    const commentData = commentSnapshot.data();
    comments.push(commentData);
  }

  const commentCount = comments.length;

  const articleListItemRef = doc(db, "ArticleListItem", articleId);
  await updateDoc(articleListItemRef, { commentCount });

  const articleContentRef = doc(db, "ArticleContent", articleId);
  await updateDoc(articleContentRef, { commentCount });
}

async function updateCommentCount(articleId) {
  const articleRef = doc(db, "ArticleContent", articleId);
  const articleSnapshot = await getDoc(articleRef);
  if (articleSnapshot.exists()) {
    const currentCount = articleSnapshot.data().commentCount || 0;
    await updateDoc(articleRef, { commentCount: currentCount + 1 });
  } else {
    console.error(`Article with ID ${articleId} not found.`);
  }
}

// 게시글 삭제
const deleteArticle = async (articleId) => {
  try {
    const articleRef = doc(db, "articles", articleId);
    await deleteDoc(articleRef);
  } catch (error) {
    throw new Error("Error deleting article:", error);
  }
};

const addReviewDatas = async (hospitalDocId, reviewData) => {
  try {
    // 병원의 docId를 이용하여 해당 병원의 리뷰 컬렉션에 데이터 추가
    const hospitalRef = doc(db, "hospital", hospitalDocId);

    // 리뷰 컬렉션에 새로운 리뷰 데이터를 추가
    await updateDoc(hospitalRef, {
      reviews: arrayUnion({
        user: reviewData.user || "",
        comment: reviewData.comment || "",
        rating: reviewData.rating || 0,
      }),
    });

    // 추가된 리뷰를 포함한 업데이트된 병원 정보를 다시 가져옴
    const updatedHospital = await getDoc(hospitalRef);
    return updatedHospital.data();
  } catch (error) {
    console.error("리뷰 추가 중 에러:", error);
    throw new Error("리뷰 추가에 실패했습니다.");
  }
};

// 약국 리뷰추가 남지수
const addPharReviewDatas = async (pharmacyDocId, reviewData) => {
  try {
    // 병원의 docId를 이용하여 해당 병원의 리뷰 컬렉션에 데이터 추가
    const pharmacyRef = doc(db, "pharmacy", pharmacyDocId);

    // 리뷰 컬렉션에 새로운 리뷰 데이터를 추가
    await updateDoc(pharmacyRef, {
      reviews: arrayUnion({
        user: reviewData.user || "",
        comment: reviewData.comment || "",
        rating: reviewData.rating || 0,
      }),
    });

    // 추가된 리뷰를 포함한 업데이트된 병원 정보를 다시 가져옴
    const updatedHospital = await getDoc(pharmacyRef);
    return updatedHospital.data();
  } catch (error) {
    console.error("리뷰 추가 중 에러:", error);
    throw new Error("리뷰 추가에 실패했습니다.");
  }
};

async function deleteDatas(collectionName, docId, imgUrl) {
  const storage = getStorage();

  try {
    const deleteRef = ref(storage, imgUrl);
    await deleteObject(deleteRef);
    await deleteDoc(doc(db, collectionName, docId));
  } catch (error) {
    return false;
  }
  return true;
}
async function fetchMessagesByMemberId() {
  const member = JSON.parse(localStorage.getItem("member"));
  const memberId = member.memberId;
  console.log(member);
  console.log(memberId);

  const q = query(collection(db, "member"), where("memberId", "==", memberId));
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot.empty);

  const memberDoc = querySnapshot.docs.find(
    (doc) => doc.data().memberId === memberId
  );

  if (memberDoc) {
    const q2 = query(collection(db, `member/${memberDoc.id}/receiveMessage`));
    const querySnapshot2 = await getDocs(q2);
    console.log(querySnapshot2.empty);
    const messages = querySnapshot2.docs.map((doc) => doc.data());
    return messages;
  } else {
    console.log(`'memberId'가 ${memberId}인 문서를 찾을 수 없습니다.`);
    return [];
  }
}

// 예약목록 뿌리기 박진현
async function fetchReservation() {
  const db = getFirestore();
  const member = JSON.parse(localStorage.getItem("member"));
  const memberId = member.memberId;

  const q = query(collection(db, "member"), where("memberId", "==", memberId));
  const querySnapshot = await getDocs(q);

  const memberDoc = querySnapshot.docs.find(
    (doc) => doc.data().memberId === memberId
  );

  if (memberDoc) {
    const q2 = query(collection(db, `member/${memberDoc.id}/Reservation`));
    const querySnapshot2 = await getDocs(q2);
    const reservations = querySnapshot2.docs.map((doc) => doc.data());
    return reservations;
  } else {
    console.log(`'memberId'가 ${memberId}인 문서를 찾을 수 없습니다.`);
    return [];
  }
}

// 업체 예약내역
async function getReservationByNumber(memberId, reservationNumber) {
  const reservationCollection = collection(
    db,
    "member",
    memberId,
    "Reservation"
  );
  const querySnapshot = await getDocs(reservationCollection);

  for (const doc of querySnapshot.docs) {
    if (doc.data().reservationNumber === reservationNumber) {
      console.log("Document data:", doc.data());
      return doc.data();
    }
  }

  console.log("No such document!");
  return null;
}

// 메시지 목록띄우기 박진현
async function fetchMessagesByMemberIdsend() {
  const member = JSON.parse(localStorage.getItem("member"));
  const memberId = member.memberId;
  console.log(member);
  console.log(memberId);
  const q = query(collection(db, "member"), where("memberId", "==", memberId));
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot.empty);
  const memberDoc = querySnapshot.docs.find(
    (doc) => doc.data().memberId === memberId
  );
  if (memberDoc) {
    const q2 = query(collection(db, `member/${memberDoc.id}/sendMessage`));
    const querySnapshot2 = await getDocs(q2);
    console.log(querySnapshot2.empty);
    const messages = querySnapshot2.docs.map((doc) => doc.data());
    return messages;
  } else {
    console.log(`'memberId'가 ${memberId}인 문서를 찾을 수 없습니다.`);
    return [];
  }
}

// 보내는 메세지 저장 박진현
async function sendMessageToMember(sendTitle, sendContent, date) {
  const memberNickName = localStorage.getItem("member");

  const memberQuery = query(
    collection(db, "member"),
    where("memberNickName", "==", memberNickName)
  );
  const querySnapshot = await getDocs(memberQuery);

  querySnapshot.forEach(async (document) => {
    const sendMessageCollection = collection(
      db,
      `member/${document.id}/sendMessage`
    );
    const sendMessageDoc = doc(sendMessageCollection);

    await setDoc(sendMessageDoc, {
      sendTitle: sendTitle,
      sendContent: sendContent,
      date: date,
      memberNickName: memberNickName,
    });
  });
}

// 받은 메세지 저장 박진현
async function receiveMessageToMember(
  specificString,
  receiveTitle,
  receiveContent,
  date
) {
  const memberQuery = query(
    collection(db, "member"),
    where("memberNickName", "==", specificString)
  );
  const querySnapshot = await getDocs(memberQuery);

  querySnapshot.forEach(async (document) => {
    const receiveMessageCollection = collection(
      db,
      `member/${document.id}/receiveMessage`
    );
    const receiveMessageDoc = doc(receiveMessageCollection);

    await setDoc(receiveMessageDoc, {
      receiveTitle: receiveTitle,
      receiveContent: receiveContent,
      date: date,
      memberNickName: specificString,
    });
  });
}

// 탈퇴하기 박진현
const deleteMemberDocument = async () => {
  const localData = JSON.parse(localStorage.getItem("member"));
  const q = query(
    collection(db, "member"),
    where("memberId", "==", localData.memberId)
  );
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
    console.log("문서 삭제 완료");
  } catch (error) {
    console.error("문서 삭제 실패:", error);
  }
};
// 회원정보 수정 박진현
const updateFirebaseDocument = async (guardianInfo) => {
  try {
    const member = JSON.parse(localStorage.getItem("member"));

    const q = query(
      collection(db, "member"),
      where("memberId", "==", member.memberId)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      console.log("문서 ID:", docSnapshot.id); // 문서 ID 로깅

      const emailParts = guardianInfo.email
        ? guardianInfo.email.split("@")
        : [];
      const updatedDoc = {
        memberName: guardianInfo.name || member.memberName,
        memberPhone: guardianInfo.phoneNumber || member.memberPhone,
        memberMail: emailParts[0] || member.memberMail,
        memberMail2: emailParts[1] || member.memberMail2,
        memberNickName: guardianInfo.nickname || member.memberNickName,
        point: guardianInfo.point, // 포인트 추가
      };

      const docRef = doc(db, "member", docSnapshot.id);
      await updateDoc(docRef, updatedDoc);
    }
  } catch (error) {
    console.error("파이어베이스 문서 업데이트 실패:", error);
  }
};

// 파트너용 마이페이지 수정 - 이건
// const updateFirebaseDocument = async (memberRef, lg) => {
//   try {
//     const member = JSON.parse(localStorage.getItem("member"));

//     const q = query(
//       collection(db, "member"),
//       where("memberId", "==", member.memberId)
//     );
//     const querySnapshot = await getDocs(q);

//     if (!querySnapshot.empty) {
//       const docSnapshot = querySnapshot.docs[0];
//       console.log("문서 ID:", docSnapshot.id);

//       // const emailParts = lg.email ? lg.email.split("@") : [];
//       const updatedDoc = {
//         hosName: lg.hosName || member.hosName,
//         phoneNumber: String(docSnapshot.data().memberPhone),
//         memberAdress: lg.memberAdress || member.memberAdress,
//       };

//       const docRef = doc(db, "member", docSnapshot.id);
//       await updateDoc(docRef, updatedDoc);
//     }
//   } catch (error) {
//     console.error("파이어베이스 문서 업데이트 실패:", error);
//   }
// };

// 마이페이지에 데이터 뿌리기 박진현
async function getFirebaseDocument(setGuardianInfo) {
  try {
    const member = JSON.parse(localStorage.getItem("member"));

    const q = query(
      collection(db, "member"),
      where("memberId", "==", member.memberId)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      console.log("문서 ID:", docSnapshot.id); // 문서 ID 로깅

      setGuardianInfo({
        name: docSnapshot.data().memberName,
        phoneNumber: docSnapshot.data().memberPhone,
        email: `${docSnapshot.data().memberMail}@${
          docSnapshot.data().memberMail2
        }`,
        nickname: docSnapshot.data().memberNickName,
        point: docSnapshot.data().point, // 보유 포인트 가져오기
      });
    } else {
    }
  } catch (error) {
    console.error("Error getting document:", error);
  }
}

// 파트너용 getFirebaseDocument - 이건
// async function getFirebaseDocument(setLg) {
//   try {
//     const member = JSON.parse(localStorage.getItem("member"));

//     const q = query(
//       collection(db, "member"),
//       where("memberId", "==", member.memberId)
//     );
//     const querySnapshot = await getDocs(q);

//     if (!querySnapshot.empty) {
//       const docSnapshot = querySnapshot.docs[0];
//       console.log("문서 ID:", docSnapshot.id);
//       setLg({
//         hosName: docSnapshot.data().hosName,
//         phoneNumber: docSnapshot.data().memberPhone,
//         memberAdress: docSnapshot.data().memberAdress,
//         businessHours: docSnapshot.data().businessHours,
//       });
//     } else {
//     }
//   } catch (error) {
//     console.error("Error getting document:", error);
//   }
// }

async function handleLikeButtonClick(postId) {
  try {
    // 해당 게시물의 문서 참조 가져오기
    const postRef = doc(db, "posts", postId);

    // 해당 게시물의 "likeCount" 필드 업데이트
    await updateDoc(postRef, {
      likeCounts: increment(1), // 좋아요 수를 1 증가시킴
    });

    console.log("Like count updated successfully.");
  } catch (error) {
    console.error("Error updating like count:", error);
  }
}
// 예약하기 박진현
async function getReservation(memberId, reservationNumber) {
  try {
    const q = query(
      collection(db, "member", memberId, "Reservation"),
      where("reservationNumber", "==", reservationNumber)
    );

    const querySnapshot = await getDocs(q);

    let reservationData = null;

    querySnapshot.forEach((doc) => {
      reservationData = doc.data();
    });

    return reservationData;
  } catch (error) {
    console.error("Error getting reservation: ", error);
  }
}
// 이게 아마 데이터 불러오는 관련 내용이랍니다? 이주형 ^^
async function getDocumentsDescending(collectionName, fieldName, limitNumber) {
  const firestore = getFirestore();
  const colRef = collection(firestore, collectionName);
  const q = query(colRef, orderBy(fieldName, "desc"), limit(limitNumber));
  const querySnapshot = await getDocs(q);

  const documents = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  return documents;
}
// 업체예약하기 이건 변수명바꿈
async function LgGetReservation(memberId, reservationNumber) {
  try {
    const q = query(
      collection(db, "member", memberId, "Reservation"),
      where("reservationNumber", "==", reservationNumber)
    );

    const querySnapshot = await getDocs(q);

    let reservationData = null;

    querySnapshot.forEach((doc) => {
      reservationData = doc.data();
    });

    return reservationData;
  } catch (error) {
    console.error("Error getting reservation: ", error);
  }
}
//이건 업체예약 리스트
async function LgGetReservationsByMemberId(db, memberId) {
  const memberCol = collection(db, "member");
  const querySnapshot = await getDocs(
    query(memberCol, where("memberId", "==", memberId))
  );
  const memberDocs = querySnapshot.docs;
  const reservationsList = [];

  for (const memberDoc of memberDocs) {
    if (memberDoc && memberDoc.exists()) {
      const reservationCol = collection(memberDoc.ref, "Reservation");
      const reservationsSnapshot = await getDocs(reservationCol);
      const reservations = reservationsSnapshot.docs.map((doc) => doc.data());
      reservationsList.push(...reservations);
    }
  }

  return reservationsList;
}
//업체 예약내역 나중에 변수명 바까야할수도
async function LgGetReservationByNumber(memberId, reservationNumber) {
  console.log(reservationNumber);
  const reservationCollection = collection(
    db,
    "member",
    memberId,
    "Reservation"
  );
  const querySnapshot = await getDocs(reservationCollection);

  for (const doc of querySnapshot.docs) {
    if (doc.data().reservationNumber === reservationNumber) {
      console.log("Document data:", doc.data());
      return doc.data();
    }
  }

  console.log("No such document!");
  return null;
}

export {
  db,
  getDocs,
  getDoc,
  collection,
  getDatas,
  setDoc,
  addDatas,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  updateDatas,
  getMember,
  getData,
  idDatas,
  nickDatas,
  findId,
  findPass,
  uploadImages,
  uploadString,
  orderBy,
  getMemberNickName,
  onSnapshot,
  getSocialMember,
  where,
  serverTimestamp,
  deleteArticle,
  addPharReviewDatas,
  addReviewDatas,
  increment,
  arrayUnion,
  deleteDatas,
  fetchMessagesByMemberId,
  fetchMessagesByMemberIdsend,
  sendMessageToMember,
  receiveMessageToMember,
  deleteMemberDocument,
  updateFirebaseDocument,
  getFirebaseDocument,
  fetchReservation,
  getReservation,
  getDocumentsDescending,
  LgGetReservationsByMemberId,
  LgGetReservation,
  LgGetReservationByNumber,
};
