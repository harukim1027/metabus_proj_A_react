import { useApiAxios } from 'api/base';
import { useAuth } from 'contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import 'css/pagination_userManage.css';

function UserInquiryList() {
  const [query, setQuery] = useState(null);
  const { auth } = useAuth();
  const { userId } = useParams();

  // 페이징
  const [, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  const [{ data: UserInquiryData, loading, error }, refetch] = useApiAxios(
    {
      url: `/inquiry_board/api/inquiry/`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth.access}`,
      },
    },
    { manual: true },
  );

  const fetchNotices = useCallback(
    async (newPage, newQuery = query) => {
      const params = {
        page: newPage,
        query: newQuery,
      };
      const { data } = await refetch({ params });
      setPage(newPage);
      setPageCount(Math.ceil(data.count / itemsPerPage));
      setCurrentItems(data?.results);
    },
    [query],
  );

  useEffect(() => {
    fetchNotices(1);
  }, []);

  const handlePageClick = (event) => {
    fetchNotices(event.selected + 1);
  };

  // const getQuery = (e) => {
  //   setQuery(e.target.value);
  // };

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') {
  //     fetchNotices(1, query);
  //   }
  // };

  return (
    <div>
      <h2>문의 글 현황 페이지</h2>
      {loading && '로딩 중 ...'}
      {error && '로딩 중 에러가 발생했습니다.'}

      <table className="border-2">
        <thead className="border-2">
          <tr>
            <th className="border-2">번호</th>
            <th className="border-2">제목</th>
            <th className="border-2">등록 일시</th>
          </tr>
        </thead>

        <tbody>
          {UserInquiryData?.results.map((inquiry) => (
            <tr>
              <td>{inquiry.inquiry_no}</td>

              <td>
                <Link to={`/inquiry/${inquiry.inquiry_no}/`}>
                  {inquiry.title}
                </Link>
              </td>

              <td>{inquiry.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel="<"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={itemsPerPage}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        className="pagination_userManage"
      />
    </div>
  );
}

export default UserInquiryList;
