import { findAndRemoveCommentById } from './findAndRemoveCommentById';

describe('findAndRemoveCommentById function', () => {
  const comment1 = {
    id: '1',
    author: 'John Doe',
    text: 'Comment 1',
    timestamp: 1692362593000,
    vote: true,
  };
  const comment2 = {
    id: '2',
    author: 'John Doe',
    text: 'Comment 2',
    timestamp: 1692369763844,
    vote: false,
  };
  const comment3 = {
    id: '3',
    author: 'John Doe',
    timestamp: 1692366193000,
    text: 'nested comment of the first comment',
    vote: null,
  };

  const comments = [{ comment1, replies: [comment3] }, comment2];

  it('removes a comment with the specified id', () => {
    const idToRemove = '2';
    const updatedComments = findAndRemoveCommentById(comments, idToRemove);

    expect(updatedComments).toHaveLength(1);
    expect(updatedComments).not.toContain(comment1);
  });

  it('recursively removes a comment and its replies', () => {
    const idToRemove = '1';
    const updatedComments = findAndRemoveCommentById(comments, idToRemove);

    expect(updatedComments).toHaveLength(2);
    expect(updatedComments).not.toContain(comment1);
    expect(updatedComments[0].replies).toHaveLength(1); // Make sure replies are also removed
  });

  it('does not modify the original comments array', () => {
    const idToRemove = '3';
    const updatedComments = findAndRemoveCommentById(comments, idToRemove);

    expect(comments).toHaveLength(2); // Original array length remains unchanged
    expect(updatedComments).toHaveLength(2);
  });
});
