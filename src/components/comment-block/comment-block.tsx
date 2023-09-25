import React, { useState, useCallback, useMemo } from 'react';
import cn from 'classnames';
import { IconArrowBigUp, IconArrowBigUpFilled, IconMessage } from '@tabler/icons-react';
import styles from './comment-block.module.css';
import avatar from '@/assets/avatar.png';
import type { Comment } from '@/comment.type';
import { getHumanTime } from '@/helpers/get-human-time';
import { CommentInput } from '@/components/comment-input';

interface Props {
  comment: Comment;
  onChange: (updatedComment: Comment) => void;
  onDelete: (commentToDelete: Comment) => void;
  isRoot?: boolean;
}

export const CommentBlock: React.FC<Props> = ({ comment, onChange, onDelete, isRoot }) => {
  const [isReplyFormShown, setIsReplyFormShown] = useState(false);

  const closeReplyForm = () => {
    setIsReplyFormShown(false);
  };

  const addReplyHandler = useCallback(
    (replyComment: Comment) => {
      /* Update the comment's replies array to include a new reply */
      const updatedComment = {
        ...comment,
        replies: [...(comment.replies || []), replyComment],
      };
      onChange(updatedComment);
      closeReplyForm();
    },
    [comment, onChange],
  );

  const replyChangeHandler = useCallback(
    (updatedChildComment: Comment) => {
      /* Update the comment's replies array with the modified nested comment */
      const updatedReplies = comment.replies?.map((c) =>
        c.id === updatedChildComment.id ? updatedChildComment : c,
      );
      onChange({ ...comment, replies: updatedReplies });
    },
    [comment, onChange],
  );

  const toggleVote = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const value = e.currentTarget.value === 'upvote';
      onChange({ ...comment, vote: comment.vote === value ? null : value });
    },
    [comment, onChange],
  );

  const voteRating = useMemo(() => {
    switch (comment.vote) {
      case true:
        return '1';
      case null:
        return '0';
      case false:
      default:
        return '-1';
    }
  }, [comment.vote]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.aside}>
        <img
          src={avatar}
          alt="Avatar"
          className={cn(styles.avatarImg, { [styles.avatarImgRoot]: isRoot })}
        />
        <div className={styles.divider} />
      </div>
      <div className={styles.content}>
        <header className={styles.header}>
          <p className={styles.name}>{comment.author}</p>
          <p className={styles.date}>{getHumanTime(comment.timestamp)}</p>
        </header>
        <p className={styles.comment}>{comment.text}</p>
        <footer className={styles.footer}>
          <div className={styles.vote}>
            <button className={styles.button} value={'upvote'} onClick={toggleVote}>
              {voteRating === '1' ? (
                <IconArrowBigUpFilled className={cn(styles.buttonIcon, styles.buttonIconActive)} />
              ) : (
                <IconArrowBigUp className={cn(styles.buttonIcon)} />
              )}
            </button>
            <p className={styles.voteCount}>{voteRating}</p>
            <button className={styles.button} value="downvote" onClick={toggleVote}>
              {voteRating === '-1' ? (
                <IconArrowBigUpFilled
                  className={cn(
                    styles.buttonIcon,
                    styles.buttonIconActive,
                    styles.buttonIconRotate,
                  )}
                />
              ) : (
                <IconArrowBigUp className={cn(styles.buttonIcon, styles.buttonIconRotate)} />
              )}
            </button>
          </div>
          <button className={cn(styles.button)} onClick={() => setIsReplyFormShown(true)}>
            <IconMessage className={styles.commentIcon} size={18} />
            <p>Reply</p>
          </button>
          <button className={styles.button} onClick={() => onDelete(comment)}>
            Delete
          </button>
        </footer>
        {isReplyFormShown && (
          <CommentInput onCancel={closeReplyForm} onSubmit={addReplyHandler} buttonText="Reply" />
        )}
        <div>
          {comment.replies?.map((reply) => (
            <CommentBlock
              key={reply.id}
              comment={reply}
              onChange={replyChangeHandler}
              onDelete={onDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
