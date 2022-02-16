import TopNav from 'Components/Main/TopNavi';
import Sidebar from 'Components/Mypage/Sidebar';

function PageProfile() {
  return (
    <>
      <TopNav />
      <div>
        <h2>Profile 페이지</h2>
        <Sidebar />
      </div>
    </>
  );
}

export default PageProfile;
