import AssignDetail from 'Components/AssignManagement/AssignDetail';
import TopNav from 'Components/Main/TopNavi';
import { useParams } from 'react-router-dom';

function PageAssignDetail() {
  const { assignId } = useParams();
  return (
    <>
      <TopNav />
      <AssignDetail assignId={assignId} />
    </>
  );
}
export default PageAssignDetail;
