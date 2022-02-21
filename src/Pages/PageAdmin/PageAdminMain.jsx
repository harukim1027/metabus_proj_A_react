import AdminMain from 'Components/Main/AdminMain';
import { useNavigate } from 'react-router-dom';

function PageAdminMain() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center my-20"></div>
      <div className="flex justify-center">
        <AdminMain />
      </div>
      <div className="flex justify-center">
        <button
          className="mt-10 mb-10 p-2 text-xl font-semibold hover:bg-gray-700 hover:text-white rounded-xl"
          onClick={() => navigate('/')}
        >
          메인화면으로
        </button>
      </div>
    </>
  );
}

export default PageAdminMain;
