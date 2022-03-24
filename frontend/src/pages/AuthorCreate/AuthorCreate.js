import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { ROUTE_AUTHOR_LIST } from '../../constants';
import { createAuthor } from '../../services/authors';

function AuthorCreate() {
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');

  const handleSave = async () => {
    if (!firstName || !lastName) {
      if (!firstName) {
        setFirstNameError('First name field is required');
      } else {
        setFirstNameError('');
      }
      if (!lastName) {
        setLastNameError('Last name field is required');
      } else {
        setLastNameError('');
      }
      return;
    } else {
      const payload = { firstName, lastName };
      await createAuthor(payload);
      history.push(ROUTE_AUTHOR_LIST);
    }
  };

  const handleCancel = async () => {
    history.push(ROUTE_AUTHOR_LIST);
  };

  return (
    <div className="AuthorCreate">
      <h1>Create Author</h1>
      <Form>
        <Form.Group>
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
          {firstNameError ? (
            <span className="errorMessage">{firstNameError}</span>
          ) : null}
        </Form.Group>
        <Form.Group>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          {lastNameError ? (
            <span className="errorMessage">{lastNameError}</span>
          ) : null}
        </Form.Group>
        <div className="row">
          <div className="col-6">
            <Button variant="primary" onClick={handleSave}>
              Save Author
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

export default AuthorCreate;
