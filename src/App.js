import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageMainScreen from 'Pages/PageMainScreen';
import PageADNoticeList from 'Pages/PageNotice/PageADNoticeList';
import PageLoginForm from 'Pages/accounts/PageLoginForm';
import PageProfile from 'Pages/accounts/PageProfile';
import PageSignupForm from 'Pages/accounts/PageSignupForm';
import PageCheckSignup from 'Pages/accounts/PageCheckSignup';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<PageMainScreen />} />
        {/* accounts */}
        <Route path="/accounts/login/" element={<PageLoginForm />} />
        <Route path="/accounts/profile/" element={<PageProfile />} />
        <Route path="/accounts/signup/" element={<PageSignupForm />} />
        <Route path="/accounts/checksignup/" element={<PageCheckSignup />} />

        {/* notice */}
        <Route path="/admin/notice/" element={<PageADNoticeList />} />

        {/* <Route path="" element={} /> */}
      </Routes>
      {/* <hr />
        윈도우 가로크기 : {windowWidth}px */}
    </div>
  );
}

export default App;
