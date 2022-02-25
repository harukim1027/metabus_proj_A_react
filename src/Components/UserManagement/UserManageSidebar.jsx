import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function UserManageSidebar({ userId }) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [{ data: userData }, refetch] = useApiAxios(
    {
      url: `/accounts/api/users/${userId}/`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center w-full">
        <div className="h-screen md:left-0 bg-sky-100 duration-300">
          <div className="flex-col">
            <div
              onClick={() => navigate(`/admin/usermanage/${userId}/`)}
              className="mt-2 text-center w-full inline-block font-extrabold cursor-pointer"
            >
              {userData?.userID}
            </div>

            <div className="flex flex-col">
              <hr className="my-4 min-w-full" />

              <ul>
                <li className="rounded-lg mb-4">
                  <li className="p-1 hover:bg-blue-300">
                    <div
                      onClick={() => navigate(`/admin/usermanage/${userId}/`)}
                      className="flex items-center gap-4 text-sm text-gray-700 font-semibold px-4 py-3 rounded-lg cursor-pointer"
                    >
                      회원정보
                    </div>
                  </li>
                </li>
                <li className="rounded-lg mb-2">
                  <li className="p-1 hover:bg-blue-300">
                    <div>
                      <div
                        onClick={() =>
                          navigate(`/admin/assignmanage/${userId}/`)
                        }
                        className="flex items-center gap-4 text-sm text-gray-700 font-semibold px-4 py-3 rounded-lg cursor-pointer"
                      >
                        입양신청
                      </div>
                    </div>
                  </li>
                </li>
                <li className="rounded-lg mb-2 ">
                  <li className="p-1 hover:bg-blue-300">
                    <div
                      onClick={() =>
                        navigate(`/admin/usermanage/${userId}/userreview/`)
                      }
                      className="flex items-center gap-4 text-sm text-gray-700 font-semibold px-4 py-3 rounded-lg cursor-pointer"
                    >
                      입양후기
                    </div>
                  </li>
                </li>
                <li className="rounded-lg mb-2 text-gray-700">
                  <li className="p-1 hover:bg-blue-300">
                    <div
                      onClick={() =>
                        navigate(`/admin/usermanage/${userId}/userinquiry/`)
                      }
                      className="flex items-center gap-4 text-sm text-gray-700 font-semibold px-4 py-3 rounded-lg cursor-pointer"
                    >
                      문의사항
                    </div>
                  </li>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserManageSidebar;
