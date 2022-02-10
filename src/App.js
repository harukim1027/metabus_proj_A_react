import './App.css';
import { Route, Routes } from 'react-router-dom';
import PageMainScreen from 'Pages/PageMainScreen';
import PageADNoticeList from 'Pages/PageNotice/PageADNoticeList';
import PageLoginForm from 'Pages/accounts/PageLoginForm';
import PageProfile from 'Pages/accounts/PageProfile';
import PageSignupForm from 'Pages/accounts/PageSignupForm';
import PageAnimalList from 'Pages/StreetAnimal/PageAnimalList';
import PageAnimalDetail from 'Pages/StreetAnimal/PageAnimalDetail';
import PageAnimalForm from 'Pages/StreetAnimal/PageAnimalForm';
import PageReviewIndex from 'Pages/review/PageReviewIndex';
import PageReviewDetail from 'Pages/review/PageReviewDetail';
import PageReviewForm from 'Pages/review/PageReviewForm';
import { AuthProvider } from 'contexts/AuthContext';
import PageADNoticeDetail from 'Pages/PageNotice/PageADNoticeDetail';
import PageADNoticeForm from 'Pages/PageNotice/PageADNoticeForm';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={<PageMainScreen />} />
          {/* accounts */}
          <Route path="/accounts/login/" element={<PageLoginForm />} />
          <Route path="/accounts/profile/" element={<PageProfile />} />
          <Route path="/accounts/signup/" element={<PageSignupForm />} />

          {/* notice */}
          <Route path="/notice/" element={<PageADNoticeList />} />
          <Route path="/notice/:noticeId/" element={<PageADNoticeDetail />} />
          <Route path="/notice/new/" element={<PageADNoticeForm />} />

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

          <Route path="/review/" element={<PageReviewIndex />} />
          <Route path="/review/:reviewId/" element={<PageReviewDetail />} />
          <Route path="/review/new/" element={<PageReviewForm />} />
          {/* <Route path="" element={} /> */}
        </Routes>
        {/* <hr />
        윈도우 가로크기 : {windowWidth}px */}
      </div>
    </AuthProvider>
  );
}

export default App;
