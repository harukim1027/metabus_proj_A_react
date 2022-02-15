import TopNav from 'Components/Main/TopNavi';
import UserManagementDetail from 'Components/UserManagement/UserManagementDetail';
import { useParams } from 'react-router-dom';

function PageUserManagementDetail() {
  const { userId } = useParams();

  return (
    <div>
      <TopNav />
      <UserManagementDetail userId={userId} />
    </div>
  );
}

export default PageUserManagementDetail;
