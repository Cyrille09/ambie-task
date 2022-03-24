import '@testing-library/jest-dom';
import {
  listArticles,
  createArticle,
  editArticle,
  getArticle,
} from '../../services/articles';
import { listAuthors } from '../../services/authors';

describe('artciles', () => {
  it('return artciles list', async function () {
    const data = await listArticles();
    expect(data[0].title).toEqual('Premier league');
  });

  it('return each article list', async function () {
    const data = await getArticle(1);
    expect(data.id).toEqual(1);
  });

  it('create a new article', async function () {
    const payload = {
      title: 'Boxing',
      content:
        'Should Miguel Berchelt win this weekend in his return at 135, a fight I would like to see later this year is him vs Richard Commey. Here are two styles that will definitely make a fight.',
      authorId: 2,
    };
    const authors = await listAuthors();
    let data = '';
    const checkValidAuthorId = authors.findIndex(
      (element) => element.id === payload.authorId
    );
    if (checkValidAuthorId >= 0) {
      data = await createArticle(payload);
    }

    expect(data.title).toEqual('Jounal 2');
  });

  it('update an article', async function () {
    const payload = { title: 'Cyrille', content: 'Hounvio...', authorId: 2 };
    const authorId = 3;
    let data = '';
    const authors = await listAuthors();
    const checkValidAuthorId = authors.findIndex(
      (element) => element.id === payload.authorId
    );
    if (checkValidAuthorId >= 0) {
      data = await editArticle(authorId, payload);
    }
    // console.warn(data);
    expect(data.title).toEqual('Cyrille');
  });
});
