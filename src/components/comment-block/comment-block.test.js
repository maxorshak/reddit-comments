import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CommentBlock } from './comment-block';

describe('CommentBlock component', () => {
  const comment = {
    id: '1',
    author: 'John Doe',
    timestamp: Date.now(),
    text: 'Test comment',
    vote: null,
    replies: [],
  };

  it('renders without errors', () => {
    const onChange = jest.fn();
    const onDelete = jest.fn();
    render(<CommentBlock comment={comment} onChange={onChange} onDelete={onDelete} />);
  });

  it('opens reply form when reply button is clicked', async () => {
    const onChange = jest.fn();
    const onDelete = jest.fn();
    void render(<CommentBlock comment={comment} onChange={onChange} onDelete={onDelete} />);

    const replyButton = screen.getByText('Reply');
    fireEvent.click(replyButton);

    await waitFor(() => {
      const replyForm = screen.getByText('Cancel');
      expect(replyForm).toBeInTheDocument();
    });
  });

  it('calls onDelete when delete button is clicked', async () => {
    const onChange = jest.fn();
    const onDelete = jest.fn();
    void render(<CommentBlock comment={comment} onChange={onChange} onDelete={onDelete} />);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(onDelete).toHaveBeenCalledWith(comment);
    });
  });
});
