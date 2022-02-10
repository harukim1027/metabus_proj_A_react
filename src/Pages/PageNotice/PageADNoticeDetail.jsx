import TopNav from 'Components/Main/TopNavi';
import NoticeDetail from 'Components/Notice/NoticeDetail';
import { useParams } from 'react-router-dom';

function PageADNoticeDetail() {
  const { noticeId } = useParams();

  return (
    <>
      <TopNav />
      <h2>admin noticeDetail</h2>
      <NoticeDetail noticeId={noticeId} />
    </>
  );
}

export default PageADNoticeDetail;
