import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import DebugStates from 'DebugStates';
import useFieldValues from 'hooks/useFieldValues';
import { useEffect } from 'react';
import LoadingIndicator from 'LoadingIndicator';

const INIT_FIELD_VALUES = {
  title: '',
  content: '',
};

function InquiryForm({ inquiryId, handleDidSave }) {
  const { auth } = useAuth();

  const [{ data: inquiry, loading: getLoading, error: getError }] = useApiAxios(
    {
      url: `/inquiry_board/api/inquiry/${inquiryId}/`,
      method: 'GET',
    },
    {
      manual: !inquiryId,
    },
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
      url: !inquiryId
        ? '/inquiry_board/api/inquiry/'
        : `/inquiry_board/api/inquiry/${inquiryId}/`,
      method: !inquiryId ? 'POST' : 'PUT',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  INIT_FIELD_VALUES.user = auth.userID;

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    inquiry || INIT_FIELD_VALUES,
  );

  useEffect(() => {
    setFieldValues((prevFieldValues) => ({
      ...prevFieldValues,
    }));
  }, [inquiry]);

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
      <div>
        <form onSubmit={handleSubmit}>
          {auth.isLoggedIn && !auth.is_staff && (
            <>
              <div className="my-3">
                <h2>제목 입력</h2>
                <input
                  name="title"
                  value={fieldValues.title}
                  onChange={handleFieldChange}
                  type="text"
                  className="border-2 border-gray-300"
                />
                {saveErrorMessages.title?.map((message, index) => (
                  <p key={index} className="text-md text-red-400">
                    {message}
                  </p>
                ))}
              </div>

              <div className="my-3">
                <h2>내용 입력</h2>
                <textarea
                  name="content"
                  value={fieldValues.content}
                  onChange={handleFieldChange}
                  className="border-2 border-gray-300"
                />
                {saveErrorMessages.content?.map((message, index) => (
                  <p key={index} className="text-md text-red-400">
                    {message}
                  </p>
                ))}
              </div>
            </>
          )}
          {auth.isLoggedIn && auth.is_staff && inquiry && (
            <div className="my-3">
              <h1>{inquiry.title}</h1>
              <h2>{inquiry.content}</h2>
              <h3>답변 입력</h3>
              <textarea
                name="admin_answer"
                value={fieldValues.admin_answer}
                onChange={handleFieldChange}
                className="border-2 border-gray-300"
              />
              {saveErrorMessages.admin_answer?.map((message, index) => (
                <p key={index} className="text-md text-red-400">
                  {message}
                </p>
              ))}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="bg-blue-100 my-3"
              onClick={(e) => handleSubmit(e)}
            >
              저장하기
            </button>
            <div className="p-5">
              {saveLoading && <LoadingIndicator>저장 중...</LoadingIndicator>}
              {saveError &&
                `저장 중 에러가 발생했습니다. 메세지를 확인해주세요.`}
            </div>
          </div>
        </form>
      </div>
      <DebugStates
        inquiry={inquiry}
        getLoading={getLoading}
        getError={getError}
        fieldValues={fieldValues}
      />
    </>
  );
}

export default InquiryForm;
