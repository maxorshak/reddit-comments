import React, { useState, useId } from 'react';
import cn from 'classnames';
import type { Comment } from '@/comment.type';
import styles from './comment-input.module.css';

interface Props {
  onSubmit: (comment: Comment) => void;
  onCancel?: () => void;
  buttonText?: string;
}

export const CommentInput: React.FC<Props> = ({ onSubmit, onCancel, buttonText = 'Comment' }) => {
  const [text, setText] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const timestamp = Date.now();
    onSubmit({ id: timestamp.toString(), text, author: 'John Doe', vote: null, timestamp });
    setText('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        required
        autoFocus
        className={styles.input}
        placeholder="What are your thoughts?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && event.shiftKey === false) {
            event.preventDefault();
            handleSubmit(event);
          }
        }}
      />
      <footer className={styles.footer}>
        {!!onCancel && (
          <button className={cn(styles.button, styles.buttonCancel)} onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className={styles.button}>
          {buttonText}
        </button>
      </footer>
    </form>
  );
};
