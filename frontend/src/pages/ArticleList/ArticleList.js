import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

import { ROUTE_ARTICLE_PREFIX, ROUTE_ARTICLE_CREATE } from '../../constants';
import { listArticles } from '../../services/articles';
import { Pagination } from '../../components/pagination/index';

function ArticleList() {
  const history = useHistory();
  const [articles, setArticles] = useState([]);
  const recordPerPage = 5;
  const [pageNumber, setPageNumber] = useState(0);
  const pageVisited = pageNumber * recordPerPage;
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await listArticles();
      setPageCount(Math.ceil(data.length / recordPerPage));
      setArticles(data);
    };

    fetchArticles();
  }, []);

  function editRecord(id) {
    history.push(`${ROUTE_ARTICLE_PREFIX}/${id}`);
  }
  function viewEcahRecord(id) {
    history.push(`${ROUTE_ARTICLE_PREFIX}/each/${id}`);
  }
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const renderArticles = () =>
    articles.slice(pageVisited, pageVisited + recordPerPage).map((article) => {
      const { id, title, content, author } = article;

      return (
        <tr key={id}>
          <td>{title}</td>
          <td>{content}</td>
          <td>
            {article.regions.map((region, index) => {
              const regionList =
                article.regions.length === index + 1
                  ? `${region.name}`
                  : `${region.name}, `;
              return regionList;
            })}
          </td>
          <td>{author ? `${author.firstName} ${author.lastName}` : ''}</td>
          <td className="colSpan">
            <Button onClick={() => editRecord(id)}>Edit</Button>
          </td>
          <td className="colSpan">
            <Button variant="success" onClick={() => viewEcahRecord(id)}>
              View
            </Button>
          </td>
        </tr>
      );
    });

  return (
    <div className="ArticleList">
      <h1>Articles</h1>
      <Link className="d-block mb-3" to={ROUTE_ARTICLE_CREATE}>
        Create a new Article
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Regions</th>
            <th>Author</th>
            <th colSpan={2} className="colSpan">
              Action
            </th>
          </tr>
        </thead>
        <tbody>{renderArticles()}</tbody>
      </Table>
      <Pagination pageCount={pageCount} changePage={changePage} />
    </div>
  );
}

export default ArticleList;
