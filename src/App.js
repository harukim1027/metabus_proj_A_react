import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageMainScreen from 'Pages/PageMainScreen';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<PageMainScreen />} />
        {/* <Route path="" element={} /> */}
      </Routes>
      {/* <hr />
        윈도우 가로크기 : {windowWidth}px */}
    </div>
  );
}

export default App;
