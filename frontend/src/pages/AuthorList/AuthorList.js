import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

import { ROUTE_AUTHOR_PREFIX, ROUTE_AUTHOR_CREATE } from '../../constants';
import { listAuthors } from '../../services/authors';
import { Pagination } from '../../components/pagination/index';

function AuthorList() {
  const history = useHistory();
  const [authors, setAuthors] = useState([]);
  const recordPerPage = 5;
  const [pageNumber, setPageNumber] = useState(0);
  const pageVisited = pageNumber * recordPerPage;
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const fetchAuthors = async () => {
      const data = await listAuthors();
      setPageCount(Math.ceil(data.length / recordPerPage));
      setAuthors(data);
    };

    fetchAuthors();
  }, []);

  function editRecord(id) {
    history.push(`${ROUTE_AUTHOR_PREFIX}/${id}`);
  }
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const renderAuthors = () =>
    authors.slice(pageVisited, pageVisited + recordPerPage).map((author) => {
      const { id, firstName, lastName } = author;

      return (
        <tr key={id}>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td className="colSpan">
            <Button onClick={() => editRecord(id)}>Edit</Button>
          </td>
        </tr>
      );
    });

  return (
    <div className="AuthorList">
      <h1>Authors</h1>
      <Link className="d-block mb-3" to={ROUTE_AUTHOR_CREATE}>
        Create a new author
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th className="colSpan">Action</th>
          </tr>
        </thead>
        <tbody>{renderAuthors()}</tbody>
      </Table>
      <Pagination pageCount={pageCount} changePage={changePage} />
    </div>
  );
}

export default AuthorList;
