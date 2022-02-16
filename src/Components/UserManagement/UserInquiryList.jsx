import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useParams } from 'react-router-dom';

function UserInquiryList() {
  const { auth } = useAuth();
  const { userId } = useParams();

  const [{ data: UserInquiryData }, refetch] = useApiAxios();
  return (
    <div>
      <h2>문의 글 현황 페이지</h2>
    </div>
  );
}

export default UserInquiryList;
