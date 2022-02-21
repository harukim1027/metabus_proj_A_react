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
      <div className="header">
        <div className="flex flex-wrap justify-center max-w-m">
          <div className="w-2/3 header justify-center px-20 pt-6 mb-3">
            <div className="review_header rounded-xl shadow-md overflow-hidden">
              <blockquote class="mt-5 text-3xl font-semibold italic text-center text-slate-900">
                <span class="mt-3 mb-3 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-green-400 relative inline-block">
                  <span class="relative text-white">" 1:1 문의 "</span>
                </span>
              </blockquote>

              <div>
                <div className="px-4 py-5 sm:px-6">
                  {inquiry && (
                    <>
                      <h1 className="text-lg leading-6 font-bold text-gray-900">
                        {inquiry.title}
                      </h1>
                      <hr className="mt-3 mb-3" />
                      <h2 className="sm:mt-0 sm:col-span-2 mt-2 mb-3 max-w-2xl text-sm text-gray-500">
                        질문 : {inquiry.content}
                      </h2>
                      <hr className="mt-3 mb-3" />

                      <h4 className="sm:mt-0 sm:col-span-2 mt-2 mb-3 max-w-2xl text-sm text-gray-500">
                        답변 : {inquiry.admin_answer}
                      </h4>
                    </>
                  )}
                </div>

                <div className="my-5 text-right">
                  <div></div>
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
        </div>
      </div>
    </>
  );
}

export default InquiryDetail;
