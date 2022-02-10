import { useApiAxios } from 'api/base';
import { useAuth, auth } from 'contexts/AuthContext';
import DebugStates from 'DebugStates';
import useFieldValues from 'hooks/useFieldValues';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const INIT_FIELD_VALUES = {
  title: '',
  content: '',
};

function InquiryForm({ inquiryId, handleDidSave }) {
  const navigate = useNavigate();
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

  const [{ loading: saveLoading, error: saveError }, saveRequest] = useApiAxios(
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

  INIT_FIELD_VALUES.userID = auth.userID;

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
      navigate('/inquiry/');
      window.location.reload();

      if (handleDidSave) handleDidSave(savedPost);
    });
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <h2>제목을 입력</h2>
            <input
              name="title"
              value={fieldValues.title}
              onChange={handleFieldChange}
              type="text"
              className="border-2 border-gray-300"
            />
          </div>

          <div className="my-3">
            <h2>내용을 입력</h2>
            <textarea
              name="content"
              value={fieldValues.content}
              onChange={handleFieldChange}
              className="border-2 border-gray-300"
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-100 my-3"
              onClick={(e) => handleSubmit(e)}
            >
              저장하기
            </button>
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
