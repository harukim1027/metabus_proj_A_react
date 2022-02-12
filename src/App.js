import './App.css';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { AuthProvider } from 'contexts/AuthContext';
// main
import PageMainScreen from 'Pages/PageMainScreen';
// accounts
import PageLoginForm from 'Pages/PageAccounts/PageLoginForm';
import PageProfile from 'Pages/PageAccounts/PageProfile';
import PageSignupForm from 'Pages/PageAccounts/PageSignupForm';
import PageCheckSignup from 'Pages/PageAccounts/PageCheckSignup';
// animal
import PageAnimalList from 'Pages/PageStreetanimal/PageAnimalList';
import PageAnimalDetail from 'Pages/PageStreetanimal/PageAnimalDetail';
import PageAnimalForm from 'Pages/PageStreetanimal/PageAnimalForm';
// review
import PageReviewIndex from 'Pages/PageReview/PageReviewIndex';
import PageReviewDetail from 'Pages/PageReview/PageReviewDetail';
import PageReviewForm from 'Pages/PageReview/PageReviewForm';
// notice
import PageNoticeList from 'Pages/PageNotice/PageNoticeList';
import PageNoticeDetail from 'Pages/PageNotice/PageNoticeDetail';
import PageNoticeForm from 'Pages/PageNotice/PageNoticeForm';
// assignment
import PageAssignmentList from 'Pages/PageAssignment/PageAssignmentList';
import PageAssignmentform from 'Pages/PageAssignment/PageAssignmentForm';
// user management
import PageUserManagementIndex from 'Pages/PageUserManagement/PageUserManagementIndex';
import PageUserManagementDetail from 'Pages/PageUserManagement/PageUserManagementDetail';
import PageUserManagementForm from 'Pages/PageUserManagement/PageUserManagementForm';
// admin
import PageAdminMain from 'Pages/PageAdmin/PageAdminMain';
//inquiry
import PageInquiryIndex from 'Pages/PageInquiry/PageInquiryIndex';
import PageInquiryDetail from 'Pages/PageInquiry/PageInquiryDetail';
import PageInquiryForm from 'Pages/PageInquiry/PageInquiryForm';

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

            {/* notice */}
            <Route path="/notice/" element={<PageNoticeList />} />
            <Route path="/notice/new/" element={<PageNoticeForm />} />
            <Route path="/notice/:noticeId/" element={<PageNoticeDetail />} />
            <Route
              path="/notice/:noticeId/edit/"
              element={<PageNoticeForm />}
            />

            {/* assignment */}
            <Route path="/adoptassignment/" element={<PageAssignmentList />} />
            <Route
              path="/adoptassignment/new/"
              element={<PageAssignmentform />}
            />

            {/* StreetAnimal */}
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

            {/* review */}
            <Route path="/review/" element={<PageReviewIndex />} />
            <Route path="/review/:reviewId/" element={<PageReviewDetail />} />
            <Route path="/review/new/" element={<PageReviewForm />} />
            <Route
              path="/review/:reviewId/edit/"
              element={<PageReviewForm />}
            />

            {/* inquiry */}
            <Route path="/inquiry/" element={<PageInquiryIndex />} />
            <Route
              path="/inquiry/:inquiryId/"
              element={<PageInquiryDetail />}
            />
            <Route path="/inquiry/new/" element={<PageInquiryForm />} />

            {/* ------------admin------------ */}
            <Route path="/admin/main/" element={<PageAdminMain />} />

            {/* UserManagement */}
            <Route path="/management/" element={<PageUserManagementIndex />} />
            <Route
              path="/management/:managementId/"
              element={<PageUserManagementDetail />}
            />
            <Route
              path="/management/:managementId/edit/"
              element={<PageUserManagementForm />}
            />
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
