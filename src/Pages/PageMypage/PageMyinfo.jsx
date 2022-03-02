import Myinfo from 'Components/Mypage/Myinfo';
import TopNav from 'Components/Main/TopNavi';
import Sidebar from 'Components/Mypage/Sidebar';

function PageMyinfo() {
  return (
    <>
      <TopNav />
      <div>
        <div className="">
          <Sidebar />
        </div>

        <div>
          <Myinfo />
        </div>
      </div>
    </>
  );
}

export default PageMyinfo;
