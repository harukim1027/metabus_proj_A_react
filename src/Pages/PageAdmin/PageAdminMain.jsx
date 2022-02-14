import AdminMain from 'Components/Main/AdminMain';
import { useNavigate } from 'react-router-dom';

function PageAdminMain() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center my-20">
        <h2 className="text-4xl font-semibold">관리자 메인페이지</h2>
      </div>
      <div className="flex justify-center">
        <AdminMain />
      </div>
      <div className="flex justify-center">
        <button
          className="mt-10 p-2 text-xl font-semibold bg-slate-400 hover:bg-slate-700 hover:text-white rounded-xl"
          onClick={() => navigate('/')}
        >
          메인화면으로
        </button>
      </div>
    </>
  );
}

export default PageAdminMain;
