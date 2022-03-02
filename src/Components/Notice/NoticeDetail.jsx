import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import LoadingIndicator from 'LoadingIndicator';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import './Notice.css';

function NoticeDetail({ noticeId }) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [{ data: notice, loading, error }, refetch] = useApiAxios(
    `/notice/api/notices/${noticeId}/`,
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  const [{ loading: deleteLoading, error: deleteError }, deleteNotice] =
    useApiAxios(
      {
        url: `/notice/api/notices/${noticeId}/`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.access}`,
        },
      },
      { manual: true },
    );

  const handleDelete = () => {
    if (window.confirm('정말 삭제 할까요?')) {
      deleteNotice().then(() => {
        navigate('/notice/');
        window.location.reload();
      });
    }
  };

  // 스크롤 기능
  const [topLocation, setTopLocation] = useState(0);
  console.log('topLocation: ', topLocation);
  useEffect(() => {
    setTopLocation(document.querySelector('#topLoc').offsetTop);
  }, [notice]);

  const gotoTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: topLocation,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    gotoTop();
  }, [notice]);

  //-------------

  return (
    <>
      <div className="header flex flex-wrap justify-center" id="topLoc">
        <div className="notice_header rounded-xl shadow-md overflow-hidden pt-5 pb-10 my-10  lg:w-2/3 md:w-5/6 sm:w-full xs:w-full">
          <blockquote class="mt-5 text-6xl font-semibold italic text-center text-slate-900">
            <span class="mt-3 mb-10 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-green-400 relative inline-block">
              <span class="relative text-white">" 공지사항 "</span>
            </span>
          </blockquote>

          {loading && <LoadingIndicator>로딩 중 ...</LoadingIndicator>}
          {error && (
            <>
              <p className="text-red-400">
                &nbsp;&nbsp; ! 로딩 중 에러가 발생했습니다. !
              </p>
            </>
          )}

          <div className="flex justify-center">
            <div className="px-4 py-5 xs:w-full sm:w-2/3">
              {notice && (
                <>
                  <h2
                    className={
                      notice.title.length > 20
                        ? 'text-xl leading-6 font-bold text-gray-900 tracking-wide'
                        : 'text-3xl leading-6 font-bold text-gray-900 tracking-wide'
                    }
                  >
                    {notice.title}
                  </h2>
                  <hr className="mt-3 mb-3" />

                  <div className="w-full flex justify-center">
                    <img src={notice.image1} alt="" />
                  </div>
                  <div className="w-full flex justify-center">
                    <img src={notice.image2} alt="" />
                  </div>
                  <div className="w-full flex justify-center">
                    <img src={notice.image3} alt="" />
                  </div>
                  <div className="w-full flex justify-center">
                    <img src={notice.image4} alt="" />
                  </div>
                  <div className="w-full flex justify-center">
                    <img src={notice.image5} alt="" />
                  </div>

                  <h4 className="sm:mt-0 sm:col-span-2 mt-2 mb-3 max-w-2xl text-lg text-gray-500 whitespace-pre-wrap ">
                    {notice.content}
                  </h4>
                  <hr className="mt-3 mb-3" />
                  <span className="mt-3 text-base font-bold text-gray-500">
                    첨부파일
                  </span>
                  <div className="bg-white px-4 py-5 sm:grid sm:gap-4 sm:px-6">
                    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                      <li className="pl-3 pr-4 py-3 flex justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">
                          <svg
                            class="flex-shrink-0 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                              clip-rule="evenodd"
                            />
                          </svg>

                          {notice.file1 && (
                            <>
                              <span className="ml-2 flex-1 w-0 truncate">
                                첨부파일1
                              </span>

                              <div className="ml-4 flex-shrink-0">
                                <a
                                  href={notice.file1}
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Download
                                </a>
                              </div>
                            </>
                          )}
                        </div>
                      </li>
                      <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">
                          <svg
                            class="flex-shrink-0 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          {notice.file2 && (
                            <>
                              <span className="ml-2 flex-1 w-0 truncate">
                                첨부파일2
                              </span>

                              <div className="ml-4 flex-shrink-0">
                                <a
                                  href={notice.file2}
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Download
                                </a>
                              </div>
                            </>
                          )}
                        </div>
                      </li>
                      <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">
                          <svg
                            class="flex-shrink-0 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          {notice.file3 && (
                            <>
                              <span className="ml-2 flex-1 w-0 truncate">
                                첨부파일3
                              </span>

                              <div className="ml-4 flex-shrink-0">
                                <a
                                  href={notice.file3}
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Download
                                </a>
                              </div>
                            </>
                          )}
                        </div>
                      </li>
                    </ul>
                  </div>
                </>
              )}
              <div className="my-5 text-right">
                {auth.is_staff && (
                  <button
                    onClick={() => handleDelete()}
                    className="ml-3 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                  >
                    삭제
                  </button>
                )}
                {auth.is_staff && (
                  <button
                    onClick={() => {
                      navigate(`/admin/notice/${noticeId}/edit/`);
                      window.location.reload();
                    }}
                    className="ml-3 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                  >
                    수정
                  </button>
                )}
                <button
                  className="ml-3 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                  onClick={() => navigate('/notice/')}
                >
                  목록
                </button>
              </div>
              <div>
                {loading && <LoadingIndicator>저장 중 ...</LoadingIndicator>}
                {error && `저장 중 에러가 발생했습니다.`}

                {deleteError && `삭제 요청 중 에러가 발생했습니다.`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoticeDetail;
