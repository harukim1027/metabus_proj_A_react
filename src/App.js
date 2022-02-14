import './App.css';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from 'contexts/AuthContext';
// main
import PageMainScreen from 'Pages/PageMainScreen';
// accounts
import PageLoginForm from 'Pages/PageAccounts/PageLoginForm';
import PageProfile from 'Pages/PageAccounts/PageProfile';
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
import PageUserManagementForm from 'Pages/PageUserManagement/PageUserManagementForm';
// user/Assignment
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

function App() {
  return (
    <>
      <AuthProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<PageMainScreen />} />
            {/* accounts */}
            <Route path="/accounts/login/" element={<PageLoginForm />} />
            <Route path="/accounts/profile/" element={<PageProfile />} />
            <Route path="/accounts/signup/" element={<PageSignupForm />} />
            <Route
              path="/accounts/checksignup/"
              element={<PageCheckSignup />}
            />

            {/* ------------admin------------ */}
            <Route path="/admin/main/" element={<PageAdminMain />} />

            {/* admin/Animal */}
            <Route path="/streetanimal/" element={<PageAnimalList />} />
            <Route path="/streetanimal/new/" element={<PageAnimalForm />} />
            <Route
              path="/streetanimal/:animalId/"
              element={<PageAnimalDetail />}
            />
            <Route
              path="/streetanimal/:animalId/edit/"
              element={<PageAnimalForm />}
            />

            {/* admin/UserManagement */}
            <Route path="/management/" element={<PageUserManagementIndex />} />
            <Route
              path="/management/:managementId/"
              element={<PageUserManagementDetail />}
            />
            <Route
              path="/management/:managementId/edit/"
              element={<PageUserManagementForm />}
            />

            {/* Assignment */}
            <Route
              path="/adoptassignment/new/"
              element={<PageAssignmentform />}
            />
            <Route
              path="/adoptassignment/complite/:assignId/"
              element={<PageAssignComp />}
            />

            {/* inquiry */}
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
            <Route path="/admin/main/inquiry/" element={<PageInquiryIndex />} />

            {/* notice */}
            <Route path="/notice/" element={<PageNoticeList />} />
            <Route path="/notice/new/" element={<PageNoticeForm />} />
            <Route path="/notice/:noticeId/" element={<PageNoticeDetail />} />
            <Route
              path="/notice/:noticeId/edit/"
              element={<PageNoticeForm />}
            />

            {/* review */}
            <Route path="/review/" element={<PageReviewIndex />} />
            <Route path="/review/:reviewId/" element={<PageReviewDetail />} />
            <Route path="/review/new/" element={<PageReviewForm />} />
            <Route
              path="/review/:reviewId/edit/"
              element={<PageReviewForm />}
            />
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
