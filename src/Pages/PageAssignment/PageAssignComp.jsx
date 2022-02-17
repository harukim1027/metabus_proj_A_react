import { useApiAxios } from 'api/base';
import AssignComp from 'Components/Assignment/AssignComp';
import TopNav from 'Components/Main/TopNavi';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PageAssignComp() {
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
      <TopNav />
      {assignData?.user.userID === auth.userID && (
        <AssignComp assginId={assignId} assignData={assignData} />
      )}
    </>
  );
}

export default PageAssignComp;
