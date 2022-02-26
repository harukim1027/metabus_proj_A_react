import TopNav from 'Components/Main/TopNavi';
import MyPageReview from 'Components/Mypage/MyPageReview';
import Sidebar from 'Components/Mypage/Sidebar';

function PageMyPageReview() {
  return (
    <>
      <TopNav />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <MyPageReview />
        </div>
      </div>
    </>
  );
}

export default PageMyPageReview;
