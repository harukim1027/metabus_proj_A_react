import { useApiAxios } from 'api/base';
import { useEffect } from 'react';

function InquiryDetail({ inquiryId }) {
  const [{ data: inquiry }, refetch] = useApiAxios(
    `/inquiry_board/api/inquiry/${inquiryId}/`,
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      {inquiry && (
        <>
          <h1>{inquiry.title}</h1>
          <h2>{inquiry.content}</h2>
          <h3>{inquiry.user}</h3>
          <h4>{inquiry.admin_answer}</h4>
        </>
      )}
    </div>
  );
}

export default InquiryDetail;
