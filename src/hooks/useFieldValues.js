import { useEffect, useState, useCallback } from 'react';

function useFieldValues(initialValues) {
  const [fieldValues, setFieldValues] = useState(initialValues);
  const [formData, setFormData] = useState(new FormData());

  // 함수 객체를 생성할 때, 의존성이 걸린 값이 변경시에만 함수를 재생성
  const handleFieldChange = useCallback((e) => {
    const { type, name, value, files, checked } = e.target;
    let newValue;
    if (type === 'file') {
      newValue = Array.from(files);
    } else if (type === 'checkbox') {
      newValue = checked;
    } else {
      newValue = value;
    }
    setFieldValues((prevFieldValues) => {
      return {
        ...prevFieldValues,
        [name]: newValue,
      };
    });
  }, []);

  const clearFieldValues = useCallback(() => {
    setFieldValues(initialValues);
  }, [initialValues]);

  // fieldValues 변경 시마다 formData를 갱신합니다.
  useEffect(() => {
    setFormData(
      Object.entries(fieldValues).reduce((_formData, [name, value]) => {
        if (Array.isArray(value)) {
          const fileList = value;
          fileList.forEach((file) => _formData.append(name, file));
        } else {
          _formData.append(name, value);
        }
        return _formData;
      }, new FormData()),
    );
  }, [fieldValues]);

  // initialValues 속성값이 변경되면 fieldValues를 초기화합니다.
  useEffect(() => {
    setFieldValues(initialValues);
  }, [initialValues]);

  return {
    fieldValues,
    handleFieldChange,
    clearFieldValues,
    setFieldValues,
    formData,
  };
}

export default useFieldValues;
