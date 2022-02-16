import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import useFieldValues from 'hooks/useFieldValues';

const INIT_VALUES = {
  status: '',
};

function AssignStatus({ assignId, handleDidSave, assignData }) {
  const { auth } = useAuth();
  const { fieldValues, handleFieldChange } = useFieldValues(INIT_VALUES);
  INIT_VALUES.status = assignData.status;
  // ---------------------------
  const [
    {
      loading: saveLoading,
      error: saveError,
      errorMessages: saveErrorMessages,
    },
    patchRequest,
  ] = useApiAxios(
    {
      url: `/adopt_assignment/api/assignment/${assignId}/`,
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  // 신청 저장
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
    patchRequest({
      data: formData,
    }).then((response) => {
      const savedPost = response.data;
      console.log(savedPost);
      if (handleDidSave) handleDidSave(savedPost);
    });
  };

  //-----------------------------------------

  return (
    <form onSubmit={handleSubmit}>
      <select
        name="status"
        value={fieldValues.status}
        onChange={handleFieldChange}
        className="border-2 border-sky-400 rounded p-1 ml-2"
        defaultValue="신청"
      >
        <option value="신청">신청</option>
        <option value="심사 중">심사 중</option>
        <option value="수락">수락</option>
        <option value="교육 중">교육 중</option>
        <option value="입양 완료">입양 완료</option>
        <option value="거절">거절</option>
      </select>
      <button className="bg-blue-300 rounded-lg p-2">저장</button>
    </form>
  );
}

export default AssignStatus;
