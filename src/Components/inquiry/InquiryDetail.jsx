import { useApiAxios } from 'api/base';
import { useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function InquiryDetail({ inquiryId }) {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [{ data: inquiry }, refetch] = useApiAxios(
    `/inquiry_board/api/inquiry/${inquiryId}/`,
    { manual: true },
  );

  const [{}, deleteInquiry] = useApiAxios(
    {
      url: `/inquiry_board/api/inquiry/${inquiryId}/`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const handleDelete = () => {
    if (window.confirm('정말 삭제 할까요?')) {
      deleteInquiry().then(() => {
        (auth.is_staff && navigate('/inquiry/')) ||
          (!auth.is_staff && navigate('/mypage/myinquiry/'));
      });
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <div className="header flex flex-wrap justify-center">
        <div className="notice_header rounded-xl shadow-md overflow-hidden px-20 pt-5 pb-10 my-10 w-2/3">
          <blockquote class="mt-5 text-6xl font-semibold italic text-center text-slate-900">
            <span class="mt-3 mb-10 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow-300 relative inline-block">
              <span class="relative text-white">" 1:1 문의 "</span>
            </span>
          </blockquote>
          <div className="flex justify-center">
            <div className="px-4 py-5 w-2/3">
              {inquiry && (
                <>
                  <h1
                    className={
                      inquiry.title.length > 20
                        ? 'text-xl leading-6 font-bold text-gray-900 tracking-wide'
                        : 'text-3xl leading-6 font-bold text-gray-900 tracking-wide'
                    }
                  >
                    {inquiry.title}
                  </h1>
                  <hr className="mt-3 mb-3" />

                  <h2 className="sm:mt-0 sm:col-span-2 mt-2 mb-3 max-w-2xl text-lg text-gray-500">
                    문의 내용
                  </h2>
                  <h2 className="sm:mt-0 sm:col-span-2 mt-2 mb-3 max-w-2xl text-2xl text-gray-500">
                    {inquiry.content}
                  </h2>
                  <hr className="my-3 border border-gray-400" />

                  <h2 className="sm:mt-0 sm:col-span-2 mt-2 mb-3 max-w-2xl text-lg text-gray-500">
                    답변
                  </h2>
                  <h2 className="sm:mt-0 sm:col-span-2 mt-2 mb-3 max-w-2xl text-2xl text-gray-500">
                    {inquiry.admin_answer}
                  </h2>
                </>
              )}
            </div>
          </div>
          <div>
            <div className="my-5 text-right">
              <div>
                {auth.is_staff ? (
                  <Link
                    to="/inquiry/"
                    className="ml-3 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                  >
                    목록으로
                  </Link>
                ) : (
                  <Link
                    to="/mypage/myinquiry/"
                    className="ml-3 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                  >
                    목록으로
                  </Link>
                )}
                {!auth.is_staff && (
                  <Link
                    to={`/inquiry/${inquiryId}/edit/`}
                    className="ml-3 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                  >
                    수정하기
                  </Link>
                )}

                {auth.isLoggedIn && auth.is_staff && (
                  <Link
                    to={`/admin/inquiry/${inquiryId}/edit/`}
                    className="ml-3 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                  >
                    답변하기
                  </Link>
                )}
                <button
                  onClick={() => handleDelete()}
                  className="ml-3 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded mr-5"
                >
                  삭제하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InquiryDetail;
