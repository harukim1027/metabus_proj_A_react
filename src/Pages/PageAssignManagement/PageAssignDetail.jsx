import { useApiAxios } from 'api/base';
import AssignDetail from 'Components/AssignManagement/AssignDetail';
import TopNav from 'Components/Main/TopNavi';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Forbidden from 'Components/ErrorPage/Forbidden403';

function PageAssignDetail() {
  const { assignId } = useParams();
  const { auth } = useAuth();
  const [{ data: assignData }, refetch] = useApiAxios(
    {
      url: `/adopt_assignment/api/assignment/${assignId}/`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {assignData?.user.userID === auth.userID || auth.is_staff ? (
        <>
          <TopNav />
          {assignId && <AssignDetail assignId={assignId} />}
        </>
      ) : (
        <Forbidden />
      )}
    </>
  );
}
export default PageAssignDetail;
