import TopNav from 'Components/Main/TopNavi';
import MyAssignInfo from 'Components/Mypage/MyAssignInfo';
import Sidebar from 'Components/Mypage/Sidebar';

function PageMyAssignInfo() {
  return (
    <>
      <TopNav />
      <div className="">
        <Sidebar />
        <div className="flex-1">
          <MyAssignInfo />
        </div>
      </div>
    </>
  );
}

export default PageMyAssignInfo;
