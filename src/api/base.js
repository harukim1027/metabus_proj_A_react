import Axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { API_HOST } from 'Constants';
import { useEffect, useState } from 'react';

const axiosInstance = Axios.create({
  baseURL: API_HOST,
});

const useAxios = makeUseAxios({
  axios: axiosInstance,
});

function useApiAxios(config, options) {
  const [{ data, loading, error, response }, execute, manualCancel] = useAxios(
    config,
    options,
  );

  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    if (error?.response?.status === 400) {
      setErrorMessages(error.response.data);
    } else {
      setErrorMessages({});
    }
  }, [error]);

  return [
    { data, loading, error, response, errorMessages },
    execute,
    manualCancel,
  ];
}

export { axiosInstance, useApiAxios };
