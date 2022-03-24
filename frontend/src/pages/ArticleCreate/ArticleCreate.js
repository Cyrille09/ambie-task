import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { ROUTE_ARTICLE_LIST } from '../../constants';
import { createArticle } from '../../services/articles';
import RegionDropdown from '../../components/RegionDropdown/RegionDropdown';
import { Select } from '../../components/Select/Select';
import { listAuthors } from '../../services/authors';

function ArticleCreate() {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [regions, setRegions] = useState([]);
  const [author, setAuthor] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const data = await listAuthors();
      setAuthors(data);
    };

    fetchAuthors();
  }, []);

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
      const authorId = author || null;
      const payload = { title, content, regions, authorId };
      await createArticle(payload);
      history.push(ROUTE_ARTICLE_LIST);
    }
  };

  const handleCancel = async () => {
    history.push(ROUTE_ARTICLE_LIST);
  };

  return (
    <div className="ArticleCreate">
      <h1>Create Article</h1>
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
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
          <Form.Label>Author</Form.Label>
          <Select
            name={author}
            onChange={(author) => setAuthor(author.target.value)}
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

export default ArticleCreate;
