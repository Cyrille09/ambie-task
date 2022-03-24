import '@testing-library/jest-dom';
import {
  listAuthors,
  getAuthor,
  createAuthor,
  editAuthor,
} from '../../services/authors';

describe('authors', () => {
  it('return authors list', async function () {
    const data = await listAuthors();
    expect(data[0].firstName).toEqual('Cyrille');
  });

  it('return each author list', async function () {
    const data = await getAuthor(1);
    expect(data.id).toEqual(1);
  });

  it('create a new author', async function () {
    const payload = { firstName: 'Peter', lastName: 'Mills' };
    const data = await createAuthor(payload);
    expect(data.firstName).toEqual('Peter');
  });

  it('update an author', async function () {
    const payload = { firstName: 'Gloria', lastName: 'Hounvio' };
    const authorId = 3;
    const data = await editAuthor(authorId, payload);
    expect(data.firstName).toEqual('Gloria');
  });
});
