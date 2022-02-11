import './App.css';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { AuthProvider } from 'contexts/AuthContext';
import PageMainScreen from 'Pages/PageMainScreen';
import PageLoginForm from 'Pages/accounts/PageLoginForm';
import PageProfile from 'Pages/accounts/PageProfile';
import PageSignupForm from 'Pages/accounts/PageSignupForm';
import PageCheckSignup from 'Pages/accounts/PageCheckSignup';
import PageAnimalList from 'Pages/StreetAnimal/PageAnimalList';
import PageAnimalDetail from 'Pages/StreetAnimal/PageAnimalDetail';
import PageAnimalForm from 'Pages/StreetAnimal/PageAnimalForm';
import PageReviewIndex from 'Pages/review/PageReviewIndex';
import PageReviewDetail from 'Pages/review/PageReviewDetail';
import PageReviewForm from 'Pages/review/PageReviewForm';
import PageNoticeList from 'Pages/PageNotice/PageNoticeList';
import PageNoticeDetail from 'Pages/PageNotice/PageNoticeDetail';
import PageNoticeForm from 'Pages/PageNotice/PageNoticeForm';
import PageAssignmentList from 'Pages/PageAssignment/PageAssignmentList';
import PageUserManagementIndex from 'Pages/PageUserManagement/PageUserManagementIndex';
import PageUserManagementDetail from 'Pages/PageUserManagement/PageUserManagementDetail';
import PageUserManagementForm from 'Pages/PageUserManagement/PageUserManagementForm';
import PageAdminMain from 'Pages/PageAdmin/PageAdminMain';
import PageInquiryIndex from 'Pages/inquiry/PageInquiryIndex';
import PageInquiryDetail from 'Pages/inquiry/PageInquiryDetail';
import PageInquiryForm from 'Pages/inquiry/PageInquiryForm';

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
