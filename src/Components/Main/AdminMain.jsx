import { useNavigate } from 'react-router-dom';

import '../../App.css';
import './AdminMain.css';

function AdminMain() {
  const navigate = useNavigate();

  return (
    <>
      <div className="">
        <div className="header">
          <div className="flex flex-wrap justify-center  overflow-x-auto  relative mx-20">
            <div className="admin_header shadow-md mb-10 rounded-xl pb-5 py-2 align-middle inline-block ">
              {/* 메인 글씨 */}
              <blockquote class="mt-5 text-6xl font-semibold italic text-center text-slate-900">
                <span class="mt-3 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-gray-400 relative inline-block">
                  <span class="relative text-white">" 관리 페이지 "</span>
                </span>
              </blockquote>
              <hr className="mt-5 mb-5 " />
              {/* 버튼 부분 - grid 사용 */}

              <div className="grid grid-cols-3 mx-4 mb-10 mt-10">
                <div className="justify-center mx-5 ml-1">
                  <button
                    className="g-gray-100py-2.5 leading-5  rounded-lg  w-full p-7 text-3xl m-3 hover:bg-yellow-700 bg-gray-100 shadow-md font-bold text-blue-900 hover:text-blue-700 hover:bg-white/[0.12]  mb-3 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60  "
                    onClick={() => navigate('/admin/usermanage/')}
                  >
                    회원 관리
                  </button>
                </div>
                <div className="justify-center mx-5">
                  <button
                    className="g-gray-100py-2.5 leading-5  rounded-lg  w-full p-7 text-3xl m-3 hover:bg-yellow-700 bg-gray-100 shadow-md font-bold text-blue-900 hover:text-blue-700 hover:bg-white/[0.12]  mb-3 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60  "
                    onClick={() => navigate('/admin/animal/')}
                  >
                    유기동물 관리
                  </button>
                </div>
                <div className="justify-center mx-5">
                  <button
                    className="g-gray-100py-2.5 leading-5  rounded-lg  w-full p-7 text-3xl m-3 hover:bg-yellow-700 bg-gray-100 shadow-md font-bold text-blue-900 hover:text-blue-700 hover:bg-white/[0.12]  mb-3 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60  "
                    onClick={() => navigate('/admin/assignmanage/')}
                  >
                    입양신청 관리
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminMain;
