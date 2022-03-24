import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { ROUTE_ARTICLE_LIST } from '../../constants';
import { getArticle, editArticle } from '../../services/articles';
import RegionDropdown from '../../components/RegionDropdown/RegionDropdown';
import { Select } from '../../components/Select/Select';
import { listAuthors } from '../../services/authors';

function ArticleEdit(props) {
  const history = useHistory();
  const { articleId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [regions, setRegions] = useState([]);
  const [author, setAuthor] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      const data = await getArticle(articleId);
      setAuthor(data.author || '');
      setTitle(data.title);
      setContent(data.content);
      setRegions(data.regions);
    };
    const fetchAuthors = async () => {
      const data = await listAuthors();
      setAuthors(data);
    };

    fetchAuthors();
    fetchArticle();
  }, [articleId]);

  const handleSave = async () => {
    if (!title || !content) {
      if (!title) {
        setTitleError('Title field is required');
      } else {
        setTitleError('');
      }
      if (!content) {
        setContentError('Content field is required');
      } else {
        setContentError('');
      }
      return;
    } else {
      let authorId = null;
      if (typeof author === 'object') {
        authorId = author.id;
      } else if (author) {
        authorId = author;
        console.log(typeof author);
      }
      const payload = { title, content, regions, authorId };
      console.log(payload);
      await editArticle(articleId, payload);
      history.push(ROUTE_ARTICLE_LIST);
    }
  };

  const handleCancel = async () => {
    history.push(ROUTE_ARTICLE_LIST);
  };

  return (
    <div className="ArticleEdit">
      <h1>Edit Article</h1>
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          {titleError ? (
            <span className="errorMessage">{titleError}</span>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Content"
            rows="5"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          {contentError ? (
            <span className="errorMessage">{contentError}</span>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label>Regions</Form.Label>
          <RegionDropdown
            value={regions}
            onChange={(regions) => setRegions(regions)}
          />
        </Form.Group>
        <Form.Group>
          <Select
            name={author}
            label={'Author'}
            onChange={(author) => setAuthor(author.target.value)}
            edit={true}
            editValue={(author && author.id) || ''}
            editLabel={`${(author && author.firstName) || ''} ${
              (author && author.lastName) || ''
            }`}
            options={authors.map((option) => ({
              label: `${option.firstName} ${option.lastName}`,
              value: option.id,
            }))}
          />
        </Form.Group>
        <div className="row">
          <div className="col-6">
            <Button variant="primary" onClick={handleSave}>
              Save Article
            </Button>
          </div>
          <div className="col-6 rightSide">
            <Button variant="danger" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default ArticleEdit;
