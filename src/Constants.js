// 환경변수 값을 읽어와서, 세팅으로 저장/활용

const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:8000';

export { API_HOST };
