import './App.css';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import PageMainScreen from 'Pages/PageMainScreen';
import PageLoginForm from 'Pages/accounts/PageLoginForm';
import PageProfile from 'Pages/accounts/PageProfile';
import PageSignupForm from 'Pages/accounts/PageSignupForm';
import PageReviewIndex from 'Pages/review/PageReviewIndex';
import PageReviewDetail from 'Pages/review/PageReviewDetail';
import PageReviewForm from 'Pages/review/PageReviewForm';
import { AuthProvider } from 'contexts/AuthContext';
import PageNoticeDetail from 'Pages/PageNotice/PageNoticeDetail';
import PageNoticeForm from 'Pages/PageNotice/PageNoticeForm';
import PageInquiryIndex from 'Pages/inquiry/PageInquiryIndex';
import PageInquiryDetail from 'Pages/inquiry/PageInquiryDetail';
import PageNoticeList from 'Pages/PageNotice/PageNoticeList';
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

            {/* inquiry */}
            <Route path="/inquiry/" element={<PageInquiryIndex />} />
            <Route
              path="/inquiry/:inquiryId/"
              element={<PageInquiryDetail />}
            />
            <Route path="/inquiry/new" element={<PageInquiryForm />} />
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
