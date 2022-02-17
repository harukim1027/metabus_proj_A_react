import TopNav from 'Components/Main/TopNavi';
import NoticeForm from 'Components/Notice/NoticeForm';
import { useNavigate, useParams } from 'react-router-dom';

function PageNoticeForm() {
  const { noticeId } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <TopNav />

      <NoticeForm
        noticeId={noticeId}
        handleDidSave={(savedPost) =>
          navigate(`/notice/${savedPost.notice_no}/`)
        }
      />
    </>
  );
}

export default PageNoticeForm;
