import { useState } from 'react';
import styles from '@/app.module.css';
import type { Comment } from '@/comment.type';
import { findAndRemoveCommentById } from '@/helpers/find-and-remove-comment-by-id';
import { CommentBlock } from '@/components/comment-block';
import { CommentInput } from '@/components/comment-input';

const initialComments: Array<Comment> = [
  {
    id: '1',
    author: 'John Doe',
    text: 'first comment',
    timestamp: 1692362593000,
    vote: true,
    replies: [
      {
        id: '3',
        author: 'John Doe',
        timestamp: 1692366193000,
        text: 'nested comment of the first comment',
        vote: null,
      },
    ],
  },
  {
    id: '2',
    author: 'John Doe',
    text: 'second comment',
    timestamp: 1692369763844,
    vote: false,
  },
];

export const App = () => {
  const [comments, setComments] = useState(initialComments);

  const addComment = (comment: Comment) => {
    setComments([...comments, comment]);
  };

  const updateComment = (updatedComment: Comment) => {
    setComments((prev) => prev.map((c) => (c.id === updatedComment.id ? updatedComment : c)));
  };

  const deleteComment = (commentToDelete: Comment) => {
    setComments(findAndRemoveCommentById(comments, commentToDelete.id));
  };

  return (
    <div className={styles.container}>
      <CommentInput onSubmit={addComment} />
      <div>
        {comments.map((comment) => (
          <CommentBlock
            isRoot
            key={comment.id}
            comment={comment}
            onChange={updateComment}
            onDelete={deleteComment}
          />
        ))}
      </div>
    </div>
  );
};
