import TopNav from 'Components/Main/TopNavi';
import UserManagementDetail from 'Components/UserManagement/UserManagementDetail';
import { useParams } from 'react-router-dom';

function PageUserManagementDetail() {
  const { usermanagementId } = useParams();

  return (
    <div>
      <TopNav />
      <UserManagementDetail usermanagementId={usermanagementId} />
    </div>
  );
}

export default PageUserManagementDetail;
