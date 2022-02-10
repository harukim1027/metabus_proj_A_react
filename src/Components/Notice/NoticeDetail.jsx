import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NoticeDetail({ noticeId }) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [{ data: notice, loading, error }, refetch] = useApiAxios(
    `/notice/api/notices/${noticeId}/`,
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <div className="mb-5">
        {notice && (
          <>
            <h1>{notice.title}</h1>
            <h4>{notice.content}</h4>
            <div className="mb-4">
              <img src={notice.image1} alt="" />
              <img src={notice.image2} alt="" />
              <img src={notice.image3} alt="" />
              <img src={notice.image4} alt="" />
              <img src={notice.image5} alt="" />
            </div>
            <span className="p-1 text-center bg-green-300 rounded mb-4 border-2">
              {notice.file1 && <a href={notice.file1}>첨부파일1</a>}
            </span>
            <span className="p-1 text-center bg-green-300 rounded mb-4 border-2">
              {notice.file2 && <a href={notice.file2}>첨부파일2</a>}
            </span>
            <span className="p-1 text-center bg-green-300 rounded mb-4 border-2">
              {notice.file3 && <a href={notice.file3}>첨부파일3</a>}
            </span>
          </>
        )}
        <div className="my-5">
          {auth.is_staff && (
            <button onClick={() => navigate(`/notice/${noticeId}/edit/`)}>
              수정하기
            </button>
          )}
          {auth.is_staff && (
            <button onClick={() => navigate(`/notice/${noticeId}/edit/`)}>
              삭제하기
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default NoticeDetail;