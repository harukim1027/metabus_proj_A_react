import useFieldValues from 'hooks/useFieldValues';

const INIT_FIELD_VALUES = {
  adopter_name: '',
  monthly_income: '',
};

function AssignmentForm() {
  const { fieldValues, handleFieldChange, setFieldValues } =
    useFieldValues(INIT_FIELD_VALUES);

  return (
    <>
      <h2>입양 신청 폼</h2>
      <h2>신청자 이름</h2>
      <input type="text" name="" />
    </>
  );
}

export default AssignmentForm;
