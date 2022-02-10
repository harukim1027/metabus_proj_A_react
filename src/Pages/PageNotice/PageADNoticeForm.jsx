import TopNav from 'Components/Main/TopNavi';
import NoticeForm from 'Components/Notice/NoticeForm';
import { useNavigate, useParams } from 'react-router-dom';

function PageADNoticeForm() {
  const { noticeId } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <TopNav />
      <h2>Notice Form</h2>
      <NoticeForm
        noticeId={noticeId}
        handleDidSave={(savedPost) =>
          navigate(`/notice/${savedPost.notice_no}/`)
        }
      />
    </>
  );
}

export default PageADNoticeForm;
