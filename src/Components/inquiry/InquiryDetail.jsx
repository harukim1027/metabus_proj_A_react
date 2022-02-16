import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function InquiryDetail({ inquiryId }) {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [{ data: inquiry }, refetch] = useApiAxios(
    `/inquiry_board/api/inquiry/${inquiryId}/`,
    { manual: true },
  );

  const [{}, deleteInquiry] = useApiAxios(
    {
      url: `/inquiry_board/api/inquiry/${inquiryId}/`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleDelete = () => {
    if (window.confirm('정말 삭제 할까요?')) {
      deleteInquiry().then(() => {
        navigate('/inquiry/');
        window.location.reload();
      });
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      {inquiry && (
        <>
          <h1>{inquiry.title}</h1>
          <h2>{inquiry.content}</h2>
          <h3>{inquiry.user}</h3>
          <h4>{inquiry.admin_answer}</h4>
        </>
      )}
      <Link to="/inquiry/">목록으로</Link>
      {!auth.is_staff && (
        <Link to={`/inquiry/${inquiryId}/edit/`}>수정하기</Link>
      )}

      {auth.isLoggedIn && auth.is_staff && (
        <Link to={`/admin/inquiry/${inquiryId}/edit/`}>답변하기</Link>
      )}
      <button onClick={handleDelete}>삭제하기</button>
    </div>
  );
}

export default InquiryDetail;
