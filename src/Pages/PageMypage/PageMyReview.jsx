import TopNav from 'Components/Main/TopNavi';
import MyReview from 'Components/Mypage/MyReview';
import Sidebar from 'Components/Mypage/Sidebar';

function PageMyPageReview() {
  return (
    <>
      <TopNav />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <MyReview />
        </div>
      </div>
    </>
  );
}

export default PageMyPageReview;
