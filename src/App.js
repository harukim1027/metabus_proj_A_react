import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
// main
import PageMainScreen from 'Pages/PageMainScreen';
// accounts
import PageLoginForm from 'Pages/PageAccounts/PageLoginForm';
import PageSignupForm from 'Pages/PageAccounts/PageSignupForm';
import PageCheckSignup from 'Pages/PageAccounts/PageCheckSignup';
// admin
import PageAdminMain from 'Pages/PageAdmin/PageAdminMain';
// admin/Animal
import PageAnimalList from 'Pages/PageStreetanimal/PageAnimalList';
import PageAnimalDetail from 'Pages/PageStreetanimal/PageAnimalDetail';
import PageAnimalForm from 'Pages/PageStreetanimal/PageAnimalForm';
// admin/UserManagement
import PageUserManagementIndex from 'Pages/PageUserManagement/PageUserManagementIndex';
import PageUserManagementDetail from 'Pages/PageUserManagement/PageUserManagementDetail';
import PageUserAssignList from 'Pages/PageUserManagement/PageUserAssignList';
import PageUserReviewList from 'Pages/PageUserManagement/PageUserReviewList';
import PageUserInquiryList from 'Pages/PageUserManagement/PageUserInquiryList';
// admin/assignment
import PageAssignList from 'Pages/PageAssignManagement/PageAssignList';
import PageAssignDetail from 'Pages/PageAssignManagement/PageAssignDetail';
// user/Assignment
import PageAssignCheck from 'Pages/PageAssignment/PageAssignCheck';
import PageAssignmentform from 'Pages/PageAssignment/PageAssignmentForm';
import PageAssignComp from 'Pages/PageAssignment/PageAssignComp';
// inquiry
import PageInquiryIndex from 'Pages/PageInquiry/PageInquiryIndex';
import PageInquiryDetail from 'Pages/PageInquiry/PageInquiryDetail';
import PageInquiryForm from 'Pages/PageInquiry/PageInquiryForm';
// notice
import PageNoticeList from 'Pages/PageNotice/PageNoticeList';
import PageNoticeDetail from 'Pages/PageNotice/PageNoticeDetail';
import PageNoticeForm from 'Pages/PageNotice/PageNoticeForm';
// review
import PageReviewIndex from 'Pages/PageReview/PageReviewIndex';
import PageReviewDetail from 'Pages/PageReview/PageReviewDetail';
import PageReviewForm from 'Pages/PageReview/PageReviewForm';
import PageReviewIndexDog from 'Pages/PageReview/PageReviewIndexDog';
import PageReviewIndexCat from 'Pages/PageReview/PageReviewIndexCat';
// mypage
import PageMyinfo from 'Pages/PageMypage/PageMyinfo';
import PageMyAssignInfo from 'Pages/PageMypage/PageMyAssignInfo';
import PageMyReview from 'Pages/PageMypage/PageMyReview';
import PageMyInquiry from 'Pages/PageMypage/PageMyInquiry';
import PageFindId from 'Pages/PageAccounts/PageFindId';
import PageChangePassword from 'Pages/PageAccounts/PageChangePassword';
import PageIntroduceMain from 'Pages/PageIntroduce/PageIntroduceMain';
// errorpage
import NotFound from 'Components/ErrorPage/NotFound404';
import Forbidden from 'Components/ErrorPage/Forbidden403';

function App() {
  const { auth } = useAuth();
  return (
    <>
      <div className="app header">
        <Routes>
          <Route path="/" element={<PageMainScreen />} />
          {/* accounts */}
          <Route path="/accounts/login/" element={<PageLoginForm />} />
          <Route path="/accounts/signup/" element={<PageSignupForm />} />
          <Route path="/accounts/checksignup/" element={<PageCheckSignup />} />
          <Route path="/accounts/findid/" element={<PageFindId />} />
          <Route
            path="/accounts/changepassword/"
            element={<PageChangePassword />}
          />
          {/* introduce */}
          <Route path="/introduce/" element={<PageIntroduceMain />} />

          {/* notice */}
          <Route path="/notice/" element={<PageNoticeList />} />
          <Route path="/notice/:noticeId/" element={<PageNoticeDetail />} />

          {/* review */}
          <Route path="/review/" element={<PageReviewIndex />} />
          <Route path="/review/:reviewId/" element={<PageReviewDetail />} />
          <Route path="/review/dog/" element={<PageReviewIndexDog />} />
          <Route path="/review/cat/" element={<PageReviewIndexCat />} />

          {/* ------------admin------------ */}
          {auth?.isLoggedIn && auth?.is_staff && (
            <>
              <Route path="/admin/main/" element={<PageAdminMain />} />

              {/* admin/Animal */}
              <Route path="/admin/animal/" element={<PageAnimalList />} />
              <Route path="/admin/animal/new/" element={<PageAnimalForm />} />
              <Route
                path="/admin/animal/:animalId/edit/"
                element={<PageAnimalForm />}
              />

              {/* /admin/assignmanage/ */}
              <Route path="/admin/assignmanage/" element={<PageAssignList />} />
              <Route
                path="/admin/assignmanage/:assignId/"
                element={<PageAssignDetail />}
              />

              {/* admin/UserManagement */}
              <Route
                path="/admin/usermanage/"
                element={<PageUserManagementIndex />}
              />
              <Route
                path="/admin/usermanage/:userId/"
                element={<PageUserManagementDetail />}
              />
              <Route
                path="/admin/usermanage/:userId/userassign/"
                element={<PageUserAssignList />}
              />

              <Route
                path="/admin/usermanage/:userId/userreview/"
                element={<PageUserReviewList />}
              />

              <Route
                path="/admin/usermanage/:userId/userinquiry/"
                element={<PageUserInquiryList />}
              />

              {/* admin/inquiry */}
              <Route
                path="/admin/inquiry/:inquiryId/edit/"
                element={<PageInquiryForm />}
              />
              {/* admin/notice */}
              <Route path="/admin/notice/new/" element={<PageNoticeForm />} />
              <Route
                path="/admin/notice/:noticeId/edit/"
                element={<PageNoticeForm />}
              />
            </>
          )}

          {auth?.isLoggedIn && (
            <>
              {/* animalDetail */}
              <Route
                path="/admin/animal/:animalId/"
                element={<PageAnimalDetail />}
              />
              {/* Assignment */}
              <Route path="/assignment/check/" element={<PageAssignCheck />} />
              <Route path="/assignment/new/" element={<PageAssignmentform />} />
              <Route
                path="/assignment/complite/:assignId/"
                element={<PageAssignComp />}
              />
              <Route
                path="/assignment/:assignId/"
                element={<PageAssignDetail />}
              />

              {/* inquiry */}
              <Route path="/inquiry/" element={<PageInquiryIndex />} />
              <Route
                path="/inquiry/:inquiryId/"
                element={<PageInquiryDetail />}
              />
              <Route path="/inquiry/new/" element={<PageInquiryForm />} />

              {/* mypage */}
              <Route path="/mypage/userinfo/" element={<PageMyinfo />} />
              <Route
                path="/mypage/assigninfo/"
                element={<PageMyAssignInfo />}
              />
              <Route path="/mypage/myposts/" element={<PageMyReview />} />
              <Route path="/mypage/myinquiry/" element={<PageMyInquiry />} />

              {/* review */}
              <Route path="/review/new/" element={<PageReviewForm />} />
              <Route
                path="/review/:reviewId/edit/"
                element={<PageReviewForm />}
              />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <p className="header mt-10 text-center text-gray-500 text-xxs">
          &copy;2022 METABUS Corp. All rights reserved.
        </p>
      </div>
    </>
  );
}

export default App;
