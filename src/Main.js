import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App";
import About from "./components/About";
import LoginPage from "./components/login/LoginPage";
import Logout from "./components/Logout";
import Join from "./components/Join";
import CustomerService from "./components/CustomerService";
import TermsOfUse from "./components/TermsOfUse";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Article from "./components/Article";
import ScrollToTop from "./components/ScrollTop";
import Home from "./components/home/home";
import Petbti from "./components/petbti/petbti";
import Petbti2 from "./components/petbti/petbti2";
import Options from "./components/options/option";
import Options2 from "./components/options/option2";
import ChoiceAccount from "./components/Account/ChoiceAccount";
import FindId from "./components/login/FindId";
import Terms from "./components/Account/Terms";
import SignUp from "./components/Account/SignUp";
import FindPass from "./components/login/FindPass";
import Disease from "./pages/Disease";
import Dog from "./components/disease/Dog";
import Disease2 from "./pages/Disease2";
import Cat from "./components/disease/Cat";
import HospitalListPage from "./pages/HospitalListPage";
import HospitalPage from "./pages/HospitalPage";
import PharmacyListPage from "./pages/PharmacyListPage";
import PharmacyPage from "./pages/PharmacyPage";
import SignUpHos from "./components/Account/SignUpHos";
import SignUpPh from "./components/Account/SignUpPh";
import Search from "./components/adress/Search";
import TermsHos from "./components/Account/TermsHos";
import SocialName from "./components/Account/SocialName";
import SocialNameComplete from "./components/Account/SocialNameComplete";
import OwnerJoinComplete from "./components/Account/OwnerJoinComplete";
import PartnerJoinComplete from "./components/Account/PartnerJoinComplete";
import MyPage from "./mypages/MyPage";
import Guardian from "./mypages/1.Guardian-List/Guardian";
import MyPet from "./mypages/2.MyPet-List/MyPet";
import Reservation from "./mypages/3.Reservation-List/Reservation";
import Writing from "./mypages/4.Posting-List/Writing/Writing";
import Review from "./mypages/4.Posting-List/Review/Review";
import Inquiry from "./mypages/4.Posting-List/Inquiry";
import MessageReceived from "./mypages/5.Message-List/Received/MessageReceived";
import SentMessage from "./mypages/5.Message-List/Sent/SentMessage";
import Point from "./mypages/6.Point-List/Point";
import NotFoundCat from "./notfoundpage/NotFoundCat";
import NotFoundDog from "./notfoundpage/NotFoundDog";
import Spinner from "./components/Spinner";
import { useEffect, useState } from "react";
import AboutPage from "./pages/AboutPage";
import Homepage from "./pages/Homepage";
import MaPage from "./pages/MaPage";
import CompanyInformation1 from "./components/CompanyInformation1";
import ReservationList from "./components/LgReservationList";
import BoardManagement from "./components/BoardManagement";

function Main() {
  const [showSpinner, setShowSpinner] = useState(true);

  const closeModal = () => {
    setShowSpinner(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      closeModal();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Homepage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/hospital">
            <Route index element={<HospitalListPage />} />
            <Route path=":hospitalTitle" element={<HospitalPage />} />
          </Route>
          <Route path="/pharmacy">
            <Route index element={<PharmacyListPage />} />
            <Route path=":pharmacyTitle" element={<PharmacyPage />} />
          </Route>
          <Route path="/customerservice" element={<CustomerService />} />
          <Route path="/myPage" element={<MyPage />}>
            <Route path="guardian" element={<Guardian />} />
            <Route path="myPet" element={<MyPet />} />
            <Route path="reservation" element={<Reservation />} />
            <Route path="post1">
              <Route index element={<Writing />} />
              <Route path="writing" element={<Writing />} />
              <Route path="review" element={<Review />} />
              <Route path="inquiry" element={<Inquiry />} />
            </Route>
            <Route path="message1">
              <Route index element={<MessageReceived />} />
              <Route path="MessageReceived" element={<MessageReceived />} />
              <Route path="SentMessage" element={<SentMessage />} />
            </Route>
            <Route path="point" element={<Point />} />
          </Route>
          <Route path="/myPagePartner" element={<MaPage />}>
            <Route index element={<CompanyInformation1 />} />
            <Route path=":reservationList" element={<ReservationList />} />
            <Route path="BoardManagement" element={<BoardManagement />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/join" element={<Join />} />
          <Route path="/termsofuse" element={<TermsOfUse />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/article" element={<Article />} />
          <Route path="/Account/ChoiceAccount" element={<ChoiceAccount />} />
          <Route path="/TermsHos" element={<TermsHos />} />
          <Route path="/SignUpHos" element={<SignUpHos />} />
          <Route path="/SignUpPh" element={<SignUpPh />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/findId" element={<FindId />} />
          <Route path="/Terms" element={<Terms />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/OwnerJoinComplete" element={<OwnerJoinComplete />} />
          <Route
            path="/PartnerJoinComplete"
            element={<PartnerJoinComplete />}
          />
          <Route path="/SocialName" element={<SocialName />} />
          <Route path="/SocialNameComplete" element={<SocialNameComplete />} />
          <Route path="/findPass" element={<FindPass />} />
          <Route path=":disease">
            <Route index element={<Disease />} />
            <Route path=":code" element={<Dog />} />
          </Route>
          <Route path="disease2">
            <Route index element={<Disease2 />} />
            <Route path=":id" element={<Cat />} />
          </Route>
          <Route path="/mbti" element={<Home />} />
          <Route path="petBTI" element={<Options />} />
          <Route path="petBTI2" element={<Options2 />} />
          <Route path="result/:petbtiName" element={<Petbti />} />
          <Route path="result2/:petbtiName" element={<Petbti2 />} />
          <Route path="/notFoundCat" element={<NotFoundCat />} />
          <Route path="/notFoundDog" element={<NotFoundDog />} />
        </Route>
      </Routes>
      {showSpinner && (
        <div>
          <Spinner closeModal={closeModal} />
        </div>
      )}
    </BrowserRouter>
  );
}

export default Main;
