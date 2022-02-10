import { useApiAxios } from 'api/base';
import { useAuth, auth } from 'contexts/AuthContext';
import DebugStates from 'DebugStates';
import useFieldValues from 'hooks/useFieldValues';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// const INIT_FV = () => {
//   const [auth] = useAuth();
//   const [{ data: adass, loading, error }, refetch] = useApiAxios(
//     {
//       url: `/adopt_assignment/api/assignment/`,
//     },
//     { manual: true },
//   );

//   useEffect(() => {
//     refetch();
//   }, []);

//   const INIT_FIELD_VALUES = {
//     user: auth,
//     adopt_assignment: `${adass.map((ass) => ass.assignment_no)}`,
//   };
//   return INIT_FIELD_VALUES;
// };

const INIT_FIELD_VALUES = {
  title: '',
  content: '',
};

function ReviewForm({ reviewId, handleDidSave }) {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [{ data: review, loading: getLoading, error: getError }] = useApiAxios(
    {
      url: `/adopt_review/api/reviews/${reviewId}/`,
      method: 'GET',
    },
    {
      manual: !reviewId,
    },
  );

  const [{ loading: saveLoading, error: saveError }, saveRequest] = useApiAxios(
    {
      url: !reviewId
        ? '/adopt_review/api/reviews/'
        : `/adopt_review/api/reviews/${reviewId}/`,
      method: !reviewId ? 'POST' : 'PUT',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  INIT_FIELD_VALUES.userID = auth.userID;

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    review || INIT_FIELD_VALUES,
  );

  useEffect(() => {
    setFieldValues((prevFieldValues) => ({
      ...prevFieldValues,
      image1: '',
    }));
  }, [review]);

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
      navigate('/review/');
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

          <div className="my-3">
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="image1"
              onChange={handleFieldChange}
            />
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="image2"
              onChange={handleFieldChange}
            />
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="image3"
              onChange={handleFieldChange}
            />
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="image4"
              onChange={handleFieldChange}
            />
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="image5"
              onChange={handleFieldChange}
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
        review={review}
        getLoading={getLoading}
        getError={getError}
        fieldValues={fieldValues}
      />
    </>
  );
}

export default ReviewForm;
