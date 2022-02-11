import { useAuth } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useApiAxios } from 'api/base';
import useFieldValues from 'hooks/useFieldValues';
import produce from 'immer';
import { useEffect } from 'react';
import LoadingIndicator from 'LoadingIndicator';
import DebugStates from 'DebugStates';

const INIT_FIELD_VALUES = {
  title: '',
  content: '',
};

function NoticeForm({ noticeId, handleDidSave }) {
  const { auth } = useAuth();
  const navigate = useNavigate();

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

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h2>제목을 입력해주세요.</h2>
          <input
            type="text"
            name="title"
            value={fieldValues.title}
            onChange={handleFieldChange}
            className="border-2 border-sky-400 rounded p-2"
          />
        </div>
        <div>
          <h2>내용을 입력해주세요.</h2>
          <textarea
            name="content"
            value={fieldValues.content}
            onChange={handleFieldChange}
            placeholder="내용을 입력해주세요."
            className="border-2 border-sky-400 rounded p-2 w-full"
          />
        </div>
        <div>
          <h2>최대 5개까지 이미지를 등록할 수 있습니다.</h2>
          <input
            type="file"
            accept=".png, .jpg, .jpeg, .jfif"
            name="image1"
            onChange={handleFieldChange}
          />
          <input
            type="file"
            accept=".png, .jpg, .jpeg, .jfif"
            name="image2"
            onChange={handleFieldChange}
          />
          <input
            type="file"
            accept=".png, .jpg, .jpeg, .jfif"
            name="image3"
            onChange={handleFieldChange}
          />
          <input
            type="file"
            accept=".png, .jpg, .jpeg, .jfif"
            name="image4"
            onChange={handleFieldChange}
          />
          <input
            type="file"
            accept=".png, .jpg, .jpeg, .jfif"
            name="image5"
            onChange={handleFieldChange}
          />
        </div>

        {/* 파일업로드 */}
        <div>
          <h2>파일 최대 3개까지 업로드 할 수 있습니다.</h2>
          <input
            type="file"
            accept=".docx, .hwp, .xlsx, .pdf"
            name="file1"
            onChange={handleFieldChange}
          />
          <input
            type="file"
            accept=".docx, .hwp, .xlsx, .pdf"
            name="file2"
            onChange={handleFieldChange}
          />
          <input
            type="file"
            accept=".docx, .hwp, .xlsx, .pdf"
            name="file3"
            onChange={handleFieldChange}
          />
        </div>
        <button className="p-2 rounded bg-sky-300">저장하기</button>
      </form>
      <DebugStates
        noticeData={noticeData}
        getLoading={getLoading}
        getError={getError}
        fieldValues={fieldValues}
      />
    </>
  );
}

export default NoticeForm;
