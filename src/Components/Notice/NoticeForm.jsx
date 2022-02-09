import { createRef } from 'react';
import UploadFiles from 'UploadFiles';
import { useAuth } from 'contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useApiAxios } from 'api/base';
import useFieldValues from 'hooks/useFieldValues';
import produce from 'immer';
import { useEffect } from 'react';
import LoadingIndicator from 'LoadingIndicator';

const INIT_FIELD_VALUES = {
  title: '',
  content: '',
};

function NoticeForm({ noticeId, handleDidSave }) {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [{ data: noticeData, loading: getLoading, error: getError }] =
    useApiAxios(
      {
        url: `/notice/api/notices/${noticeId}/`,
        method: 'GET',
      },
      { manual: !noticeId },
    );

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
      }),
    );
  }, [noticeData]);

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

  // 여기부터 파일 업로드 기능
  const uploadReferenece = createRef();

  async function onClickSearch() {
    await uploadReferenece.current
      .upload()
      .then(function (result) {
        const files = result;
        alert('저장 완료');
      })
      .catch(function (err) {});
  }

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
          <UploadFiles ref={uploadReferenece} />
        </div>
        <button className="p-2 rounded bg-sky-300">저장하기</button>
      </form>
    </>
  );
}

export default NoticeForm;
