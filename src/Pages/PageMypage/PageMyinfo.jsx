import Myinfo from 'Components/Mypage/Myinfo';
import TopNav from 'Components/Main/TopNavi';
import Sidebar from 'Components/Mypage/Sidebar';

function PageMyinfo() {
  return (
    <>
      <TopNav />
      <div className="flex">
        <div className="flex-1/4 bg-sky-100">
          <Sidebar />
        </div>
        <div className="flex-1">
          <Myinfo />
        </div>
      </div>
    </>
  );
}

export default PageMyinfo;
