import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { ROUTE_ARTICLE_LIST } from '../../constants';
import { getArticle } from '../../services/articles';
import {
  KeyValueTable,
  Row,
} from '../../components/keyValueTable/keyValueTable';

function ArticleViewEach(props) {
  const history = useHistory();
  const { articleId } = useParams();
  const [article, setArticle] = useState('');
  let regionList = [];

  useEffect(() => {
    const fetchArticle = async () => {
      const data = await getArticle(articleId);
      setArticle(data);
    };
    fetchArticle();
  }, [articleId]);

  const handleBack = async () => {
    history.push(ROUTE_ARTICLE_LIST);
  };
  function getRegions(article) {
    if (article.regions.length > 0) {
      article.regions.map((region, index) => {
        const regionRecord =
          article.regions.length === index + 1
            ? `${region.name}`
            : `${region.name}, `;

        regionList.push(regionRecord);
      });
      return regionList;
    } else {
      return '-';
    }
  }

  return (
    <div className="ArticleViewEach">
      {article && (
        <KeyValueTable title={`View Each Article`}>
          <Row label="Title:">{article.title}</Row>
          <Row label="Content:">{article.content}</Row>
          <Row label="Regions:">{getRegions(article)}</Row>
          <Row label="Author:">
            {article.author
              ? `${article.author.firstName} ${article.author.lastName}`
              : '-'}
          </Row>
        </KeyValueTable>
      )}
      <div className="row">
        <div className="col-12 rightSide">
          <Button variant="info" onClick={handleBack}>
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ArticleViewEach;
