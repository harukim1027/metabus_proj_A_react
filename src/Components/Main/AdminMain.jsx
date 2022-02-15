import { useNavigate } from 'react-router-dom';

function AdminMain() {
  const navigate = useNavigate();
  return (
    <>
      <div className="grid grid-cols-3">
        <div className="justify-center mx-4">
          <button
            className="w-full p-5 text-2xl m-3 bg-green-400 hover:bg-green-700 hover:text-white rounded-2xl"
            onClick={() => navigate('/admin/usermanage/')}
          >
            회원 관리
          </button>
        </div>
        <div className="justify-center mx-4">
          <button
            className="w-full p-5 text-2xl m-3 bg-blue-400 hover:bg-blue-700 hover:text-white rounded-2xl"
            onClick={() => navigate('/admin/animal/')}
          >
            유기동물 관리
          </button>
        </div>
        <div className="justify-center mx-4">
          <button
            className="w-full p-5 text-2xl m-3 bg-yellow-400 hover:bg-yellow-700 hover:text-white rounded-2xl"
            onClick={() => navigate('/')}
          >
            입양신청 관리
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminMain;
