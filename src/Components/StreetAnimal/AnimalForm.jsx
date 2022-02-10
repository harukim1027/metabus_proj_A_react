import { useApiAxios } from 'api/base';
import TopNav from 'Components/Main/TopNavi';
import useFieldValues from 'hooks/useFieldValues';
import { useAuth } from 'contexts/AuthContext';
import DebugStates from 'DebugStates';
import Button from 'Button';

const INIT_FIELD_VALUES = {
  size: '',
  sex: '',
  age: '',
  date_of_discovery: '',
  place_of_discovery: '',
  physical_condition: '',
  start_date: '',
  end_date: '',
  protection_status: '',
  image: '',
};

function AnimalForm({ animal_no, handleDidSave }) {
  const [auth] = useAuth();

  const [{ data: Animal, loading: getLoading, error: getError }] = useApiAxios(
    {
      url: `/streetanimal/api/animal/${animal_no}/`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: !animal_no },
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
      url: !animal_no
        ? '/streetanimal/api/animal/'
        : `/streetanimal/api/animal/${animal_no}/`,
      method: !animal_no ? 'POST' : 'PUT',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const { fieldValues, handleFieldChange } = useFieldValues(
    Animal || INIT_FIELD_VALUES,
  );

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
    <div>
      <TopNav />
      <h2>AnimalForm</h2>

      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <input
            name="size"
            value={fieldValues.size}
            onChange={handleFieldChange}
            type="text"
          />
        </div>

        <div className="my-3">
          <input
            name="sex"
            value={fieldValues.sex}
            onChange={handleFieldChange}
            type="text"
          />
        </div>

        <div className="my-3">
          <input
            name="age"
            value={fieldValues.age}
            onChange={handleFieldChange}
            type="text"
          />
        </div>

        <div className="my-3">
          <input
            name="date_of_discovery"
            value={fieldValues.date_of_discovery}
            onChange={handleFieldChange}
            type="datetime-local"
          />
        </div>

        <div className="my-3">
          <input
            name="place_of_discovery"
            value={fieldValues.place_of_discovery}
            onChange={handleFieldChange}
            type="text"
          />
        </div>

        <div className="my-3">
          <textarea
            name="physical_condition"
            value={fieldValues.physical_condition}
            onChange={handleFieldChange}
            type="text"
          />
        </div>

        <div className="my-3">
          <input
            name="start_date"
            value={fieldValues.start_date}
            onChange={handleFieldChange}
            type="date"
          />
        </div>

        <div className="my-3">
          <input
            name="end_date"
            value={fieldValues.end_date}
            onChange={handleFieldChange}
            type="date"
          />
        </div>

        <div className="my-3">
          <input
            name="protection_status"
            value={fieldValues.protection_status}
            onChange={handleFieldChange}
            type="text"
          />
        </div>

        <div className="my-3">
          <input
            name="image"
            accept=".png, .jpg, .jpeg"
            onChange={handleFieldChange}
            type="file"
          />
        </div>

        <div className="my-3">
          <Button>저장하기</Button>
        </div>
      </form>

      <DebugStates
        animal_no={animal_no}
        getLoading={getLoading}
        getError={getError}
        saveErrorMessages={saveErrorMessages}
        fieldValues={fieldValues}
      />
    </div>
  );
}

export default AnimalForm;
