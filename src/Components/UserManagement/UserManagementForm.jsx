import { useApiAxios } from 'api/base';
import Button from 'Button';
import { useAuth } from 'contexts/AuthContext';
import DebugStates from 'DebugStates';
import useFieldValues from 'hooks/useFieldValues';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const INIT_FIELD_VALUES = {
  userID: '',
  name: '',
  nickname: '',
  phone_number: '',
  email: '',
  region: '',
};

function UserManagementForm({ handleDidSave }) {
  const { auth } = useAuth();
  const { managementId } = useParams();

  // 조회
  const [{ data: management, loading: getLoading, error: getError }, refetch] =
    useApiAxios(
      {
        url: `/accounts/api/users/${managementId}/`,
        method: 'GET',
      },
      { manual: !managementId },
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
      url: !managementId
        ? `/accounts/api/users/`
        : `/accounts/api/users/${managementId}/`,
      method: !managementId ? 'POST' : 'PUT',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange, setFieldValues } = useFieldValues(
    management || INIT_FIELD_VALUES,
  );

  useEffect(() => {
    refetch();
  }, []);

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
      <h2>UserManagementForm</h2>

      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <span>아이디 입력</span>
          <input
            name="userID"
            value={fieldValues.userID}
            onChange={handleFieldChange}
            type="text"
            className="border-2 border-sky-400 rounded p-1 ml-2"
          />
        </div>

        <div className="my-3">
          <span>이름 입력</span>
          <input
            name="name"
            value={fieldValues.name}
            onChange={handleFieldChange}
            type="text"
            className="border-2 border-sky-400 rounded p-1 ml-2"
          />
        </div>

        <div className="my-3">
          <span>닉네임 입력</span>
          <input
            name="nickname"
            value={fieldValues.nickname}
            onChange={handleFieldChange}
            type="text"
            className="border-2 border-sky-400 rounded p-1 ml-2"
          />
        </div>

        <div className="my-3">
          <span>연락처 입력</span>
          <input
            name="phone_number"
            value={fieldValues.phone_number}
            onChange={handleFieldChange}
            type="tel"
            className="border-2 border-sky-400 rounded p-1 ml-2"
          />
        </div>

        <div className="my-3">
          <span>이메일 입력</span>
          <input
            name="email"
            value={fieldValues.email}
            onChange={handleFieldChange}
            type="email"
            className="border-2 border-sky-400 rounded p-1 ml-2"
          />
        </div>

        <div className="my-3">
          <span>거주지역 입력</span>
          <select
            name="region"
            value={fieldValues.region}
            onChange={handleFieldChange}
            type="text"
            className="border-2 border-sky-400 rounded p-1 ml-2"
          >
            <option value="1">Seoul</option>
            <option value="2">Busan</option>
            <option value="3">Daegu</option>
            <option value="4">Incheon</option>
            <option value="5">Daejeon</option>
            <option value="6">Sejong</option>
            <option value="7">Gwangju</option>
            <option value="8">Ulsan</option>
            <option value="9">Jeju</option>
            <option value="10">Gangwon</option>
          </select>
        </div>

        <div className="my-3">
          <Button>저장</Button>
        </div>
      </form>

      <DebugStates
        management={management}
        getLoading={getLoading}
        getError={getError}
        saveErrorMessages={saveErrorMessages}
        fieldValues={fieldValues}
      />
    </>
  );
}

export default UserManagementForm;
