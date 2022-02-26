import Myinfo from 'Components/Mypage/Myinfo';
import TopNav from 'Components/Main/TopNavi';
import Sidebar from 'Components/Mypage/Sidebar';

function PageMyinfo() {
  return (
    <>
      <TopNav />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Myinfo />
        </div>
      </div>
    </>
  );
}

export default PageMyinfo;
