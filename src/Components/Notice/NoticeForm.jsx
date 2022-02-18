import { useAuth } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useApiAxios } from 'api/base';
import useFieldValues from 'hooks/useFieldValues';
import produce from 'immer';
import { useEffect, useState } from 'react';
import LoadingIndicator from 'LoadingIndicator';
import DebugStates from 'DebugStates';

import './Notice.css';
import '../../App.css';

const INIT_FIELD_VALUES = {
  title: '',
  content: '',
};

function NoticeForm({ noticeId, handleDidSave }) {
  const { auth } = useAuth();
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [image5, setImage5] = useState('');
  const navigate = useNavigate();

  // 사진 등록시
  const imgpreview1 = (e, fileData) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage1(reader.result);
        resolve();
        handleFieldChange(e);
      };
    });
  };

  const imgpreview2 = (e, fileData) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage2(reader.result);
        resolve();
        handleFieldChange(e);
      };
    });
  };

  const imgpreview3 = (e, fileData) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage3(reader.result);
        resolve();
        handleFieldChange(e);
      };
    });
  };

  const imgpreview4 = (e, fileData) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage4(reader.result);
        resolve();
        handleFieldChange(e);
      };
    });
  };

  const imgpreview5 = (e, fileData) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage5(reader.result);
        resolve();
        handleFieldChange(e);
      };
    });
  };

  // 조회
  const [{ data: noticeData, loading: getLoading, error: getError }] =
    useApiAxios(
      {
        url: `/notice/api/notices/${noticeId}/`,
        method: 'GET',
      },
      { manual: !noticeId },
    );

  // 저장
  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    saveRequest,
  ] = useApiAxios(
    {
      url: !noticeId
        ? `/notice/api/notices/`
        : `/notice/api/notices/${noticeId}/`,
      method: !noticeId ? 'POST' : 'PUT',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    noticeData || INIT_FIELD_VALUES,
  );

  useEffect(() => {
    setFieldValues(
      produce((draft) => {
        draft.image1 = '';
        draft.image2 = '';
        draft.image3 = '';
        draft.image4 = '';
        draft.image5 = '';
        draft.file1 = '';
        draft.file2 = '';
        draft.file3 = '';
        draft.user = auth.userID;
      }),
    );
  }, [noticeData]);

  // 저장 버튼 기능
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(fieldValues).forEach(([name, value]) => {
      if (Array.isArray(value)) {
        const fileList = value;
        fileList.forEach((file) => formData.append(name, file));
      } else {
        formData.append(name, value);
      }
    });
    saveRequest({
      data: formData,
    }).then((response) => {
      const savedPost = response.data;
      if (handleDidSave) handleDidSave(savedPost);
    });
  };

  return (
    <>
      {saveLoading && <LoadingIndicator>저장 중...</LoadingIndicator>}
      {saveError &&
        `저장 중 에러가 발생했습니다.(${saveError.response.status} ${saveError.response.statusText})`}

      <div className="header ">
        <div className="flex flex-wrap justify-center max-w-m">
          {/* 폼 작성 시작부분 */}
          <div className="mt-5 mb-7 notice_header">
            <blockquote class="mt-3 mb-10 text-2xl font-semibold italic text-center text-slate-900">
              <span class="mt-7 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-green-500 relative inline-block text-3xl font-extrabold">
                <span class="relative text-white">" 공지사항 작성 "</span>
              </span>
            </blockquote>
            <hr />
            <div className="flex flex-wrap justify-center max-w-m">
              <form
                onSubmit={handleSubmit}
                className="notice_header shadow-md  rounded px-20 pt-6 pb-8"
              >
                {/* 제목 입력 인풋박스 */}
                <div className="ml-3 -mx-3 mb-6">
                  <div className="ml-3 mb-3 w-full">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block uppercase tracking-wide text-gray-700 text-m font-bold mb-2">
                      제목
                    </span>
                    <input
                      type="text"
                      name="title"
                      value={fieldValues.title}
                      onChange={handleFieldChange}
                      placeholder="제목을 입력해주세요."
                      className="border-2 border-sky-400  rounded p-3 text-sm  bg-gray-100 focus:outline-none focus:border focus:border-gray-400  w-full px-3 mb-6 "
                    />
                  </div>
                </div>
                {/* 내용 입력 인풋박스 */}
                <div className="ml-3 -mx-3 mb-6">
                  <div className="ml-3 mb-3 w-full ">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block uppercase tracking-wide text-gray-700 text-m font-bold mb-2">
                      내용
                    </span>
                    <textarea
                      name="content"
                      value={fieldValues.content}
                      onChange={handleFieldChange}
                      rows="7" // textarea의 행 설정으로 늘릴 수 있음
                      placeholder="내용을 입력해주세요."
                      className="border-2 border-sky-400  rounded p-3 text-sm  bg-gray-100 focus:outline-none focus:border focus:border-gray-400  w-full px-3 mb-6 "
                    />
                  </div>
                  <hr />

                  {/* 이미지 첨부 인풋박스 */}
                  <div className="mt-3 ml-3 mb-3 w-full">
                    <span className=" block uppercase tracking-wide text-blue-900 text-m font-bold mb-2 ">
                      * 이미지 첨부
                    </span>
                    <h2 className="text-gray-500 text-xs">
                      ( 최대 5개까지 이미지를 등록할 수 있습니다. )
                    </h2>

                    <div className="bg-white px-4 py-5 sm:grid  sm:gap-4 sm:px-6">
                      {/* 이미지 첨부 인풋박스 ul태그 시작 부분*/}
                      <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                        {/* 개별 이미지 input 박스 1*/}
                        <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <input
                            type="file"
                            accept=".png, .jpg, .jpeg, .jfif"
                            name="image1"
                            onChange={(e) => {
                              imgpreview1(e, e.target.files[0]);
                            }}
                          />
                          <div>
                            <img src={noticeData?.image1} alt="" />
                          </div>

                          <div>
                            <img src={image1} alt="" />
                          </div>
                        </li>

                        {/* 개별 이미지 input 박스 2*/}
                        <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <input
                            type="file"
                            accept=".png, .jpg, .jpeg, .jfif"
                            name="image2"
                            onChange={(e) => {
                              imgpreview2(e, e.target.files[0]);
                            }}
                          />
                          <div>
                            <img src={noticeData?.image2} alt="" />
                          </div>
                          <div>
                            <img src={image2} alt="" />
                          </div>
                        </li>

                        {/* 개별 이미지 input 박스 3*/}
                        <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <input
                            type="file"
                            accept=".png, .jpg, .jpeg, .jfif"
                            name="image3"
                            onChange={(e) => {
                              imgpreview3(e, e.target.files[0]);
                            }}
                          />
                          <div>
                            <img src={noticeData?.image3} alt="" />
                          </div>
                          <div>
                            <img src={image3} alt="" />
                          </div>
                        </li>

                        {/* 개별 이미지 input 박스 4*/}
                        <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <input
                            type="file"
                            accept=".png, .jpg, .jpeg, .jfif"
                            name="image4"
                            onChange={(e) => {
                              imgpreview4(e, e.target.files[0]);
                            }}
                          />
                          <div>
                            <img src={noticeData?.image4} alt="" />
                          </div>
                          <div>
                            <img src={image4} alt="" />
                          </div>
                        </li>
                        {/* 개별 이미지 input 박스 5*/}
                        <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <input
                            type="file"
                            accept=".png, .jpg, .jpeg, .jfif"
                            name="image5"
                            onChange={(e) => {
                              imgpreview5(e, e.target.files[0]);
                            }}
                          />
                          <div>
                            <img src={noticeData?.image5} alt="" />
                          </div>
                          <div>
                            <img src={image5} alt="" />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <hr />
                  {/* 파일 첨부 인풋박스 시작 부분 */}
                  <div className="mt-3 ml-3 mb-3 w-full">
                    <span className=" block uppercase tracking-wide text-blue-900 text-m font-bold mb-2 ">
                      * 파일 첨부
                    </span>
                    <h2 className="text-gray-500 text-xs">
                      ( 최대 3개까지 첨부파일을 등록할 수 있습니다. )
                    </h2>

                    {/* 개별 파일 input 박스 1*/}
                    <div className="bg-white px-4 py-5 sm:grid  sm:gap-4 sm:px-6">
                      {/* 이미지 첨부 인풋박스 ul태그 시작 부분*/}
                      <ul className="border border-gray-300 rounded-md divide-y divide-gray-200">
                        {/* 개별 이미지 input 박스 1*/}
                        <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <input
                            type="file"
                            accept=".docx, .hwp, .xlsx, .pdf"
                            name="file1"
                            className="text-gray-800 "
                            onChange={handleFieldChange}
                          />
                          <div>
                            {(noticeData?.file1 || fieldValues.file1) &&
                              '파일1이 존재합니다.'}
                          </div>
                        </li>
                        {/* 개별 파일 input 박스 2*/}
                        <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <input
                            type="file"
                            accept=".docx, .hwp, .xlsx, .pdf"
                            name="file2"
                            className="text-gray-800 "
                            onChange={handleFieldChange}
                          />
                        </li>
                        {/* 개별 파일 input 박스 3*/}
                        <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                          <input
                            type="file"
                            accept=".docx, .hwp, .xlsx, .pdf"
                            name="file3"
                            placeholder="선택된 파일 없음"
                            className="text-gray-800 "
                            onChange={handleFieldChange}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button className=" bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
                    저장하기
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoticeForm;
