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
import ReviewListDog from 'Components/review/ReviewListDog';
import ReviewListCat from 'Components/review/ReviewListCat';
// mypage
import PageMyinfo from 'Pages/PageMypage/PageMyinfo';
import PageMyPageReview from 'Pages/PageMypage/PageMyPageReview';
import PageMyInquiry from 'Pages/PageMypage/PageMyInquiry';

function App() {
  const { auth } = useAuth();
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<PageMainScreen />} />
          {/* accounts */}
          <Route path="/accounts/login/" element={<PageLoginForm />} />
          <Route path="/accounts/signup/" element={<PageSignupForm />} />
          <Route path="/accounts/checksignup/" element={<PageCheckSignup />} />

          {/* ------------admin------------ */}
          {auth?.isLoggedIn && auth?.is_staff && (
            <>
              <Route path="/admin/main/" element={<PageAdminMain />} />

              {/* admin/Animal */}
              <Route path="/admin/animal/" element={<PageAnimalList />} />
              <Route path="/admin/animal/new/" element={<PageAnimalForm />} />
              <Route
                path="/admin/animal/:animalId/"
                element={<PageAnimalDetail />}
              />
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
          {/* ----------------------------------------- */}

          {/* Assignment */}
          <Route path="/assignment/check/" element={<PageAssignCheck />} />
          <Route path="/assignment/new/" element={<PageAssignmentform />} />
          <Route
            path="/assignment/complite/:assignId/"
            element={<PageAssignComp />}
          />

          {/* inquiry */}
          {auth?.isLoggedIn && (
            <>
              <Route path="/inquiry/" element={<PageInquiryIndex />} />
              <Route
                path="/inquiry/:inquiryId/"
                element={<PageInquiryDetail />}
              />
              <Route path="/inquiry/new/" element={<PageInquiryForm />} />
              <Route
                path="/inquiry/:inquiryId/edit/"
                element={<PageInquiryForm />}
              />
            </>
          )}

          {/* notice */}
          <Route path="/notice/" element={<PageNoticeList />} />

          <Route path="/notice/:noticeId/" element={<PageNoticeDetail />} />

          {/* review */}
          <Route path="/review/" element={<PageReviewIndex />} />
          <Route path="/review/:reviewId/" element={<PageReviewDetail />} />
          {auth?.isLoggedIn && (
            <>
              <Route path="/review/new/" element={<PageReviewForm />} />
              <Route
                path="/review/:reviewId/edit/"
                element={<PageReviewForm />}
              />
            </>
          )}
          <Route path="/review/dog/" element={<ReviewListDog />} />
          <Route path="/review/cat/" element={<ReviewListCat />} />

          {/* mypage */}
          {auth?.isLoggedIn && (
            <>
              <Route path="/mypage/userinfo/" element={<PageMyinfo />} />
              <Route path="/mypage/assigninfo/" element={''} />
              <Route path="/mypage/myposts/" element={<PageMyPageReview />} />
              <Route path="/mypage/myinquiry/" element={<PageInquiryIndex />} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;
