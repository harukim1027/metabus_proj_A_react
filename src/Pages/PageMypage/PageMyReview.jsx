import TopNav from 'Components/Main/TopNavi';
import MyReview from 'Components/Mypage/MyReview';
import Sidebar from 'Components/Mypage/Sidebar';

function PageMyPageReview() {
  return (
    <>
      <TopNav />
      <div>
        <Sidebar />
        <div>
          <MyReview />
        </div>
      </div>
    </>
  );
}

export default PageMyPageReview;
