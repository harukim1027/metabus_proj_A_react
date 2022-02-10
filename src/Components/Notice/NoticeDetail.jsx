import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import UploadFiles from 'UploadFiles';

function NoticeDetail({ noticeId }) {
  const [{ data: notice, loading, error }, refetch] = useApiAxios(
    `/notice/api/notices/${noticeId}/`,
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <div>
        {notice && (
          <>
            <h1>{notice.title}</h1>
            <h4>{notice.content}</h4>
            <img src={notice.image1} alt="" />
            <img src={notice.image2} alt="" />
            <img src={notice.image3} alt="" />
            <img src={notice.image4} alt="" />
            <img src={notice.image5} alt="" />
          </>
        )}
      </div>
    </>
  );
}

export default NoticeDetail;
