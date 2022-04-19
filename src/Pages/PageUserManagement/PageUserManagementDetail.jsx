import TopNav from 'Components/Main/TopNavi';
import UserManagementDetail from 'Components/UserManagement/UserManagementDetail';
import UserManageSidebar from 'Components/UserManagement/UserManageSidebar';
import { useParams } from 'react-router-dom';

function PageUserManagementDetail() {
  const { userId } = useParams();

  return (
    <>
      <TopNav />
      <div className="flex">
        <div className="flex-none">
          <UserManageSidebar userId={userId} />
        </div>
        <div className="flex-1">
          <UserManagementDetail userId={userId} />
        </div>
      </div>
    </>
  );
}

export default PageUserManagementDetail;
