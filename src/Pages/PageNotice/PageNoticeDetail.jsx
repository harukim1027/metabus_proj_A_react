import TopNav from 'Components/Main/TopNavi';
import NoticeDetail from 'Components/Notice/NoticeDetail';
import { useParams } from 'react-router-dom';

function PageNoticeDetail() {
  const { noticeId } = useParams();

  return (
    <>
      <TopNav />

      <NoticeDetail noticeId={noticeId} />
    </>
  );
}

export default PageNoticeDetail;
