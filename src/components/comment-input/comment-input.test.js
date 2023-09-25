import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CommentInput } from './comment-input';

describe('CommentInput component', () => {
  it('renders without errors', () => {
    const onSubmit = jest.fn();
    render(<CommentInput onSubmit={onSubmit} />);
  });

  it('handles text input and submission', async () => {
    const onSubmit = jest.fn();
    void render(<CommentInput onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText('What are your thoughts?');
    fireEvent.change(input, { target: { value: 'Test comment' } });

    const submitButton = screen.getByText('Comment');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ text: 'Test comment' }));
    });
  });

  it('handles cancellation', async () => {
    const onSubmit = jest.fn();
    const onCancel = jest.fn();
    void render(<CommentInput onSubmit={onSubmit} onCancel={onCancel} />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(onCancel).toHaveBeenCalled();
    });
  });
});
