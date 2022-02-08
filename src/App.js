import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageMainScreen from 'Pages/PageMainScreen';
import PageADNoticeList from 'Pages/PageNotice/PageADNoticeList';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<PageMainScreen />} />
        <Route path="/admin/notice/" element={<PageADNoticeList />} />
      </Routes>
      {/* <hr />
        윈도우 가로크기 : {windowWidth}px */}
    </div>
  );
}

export default App;
