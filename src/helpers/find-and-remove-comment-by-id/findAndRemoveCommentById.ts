import type { Comment } from '@/comment.type';

export function findAndRemoveCommentById(comments: Comment[], idToRemove: string): Comment[] {
  return comments
    .filter(({ id }) => id !== idToRemove) // Item to be removed
    .map((comment) => {
      if (comment.replies) {
        return { ...comment, replies: findAndRemoveCommentById(comment.replies, idToRemove) };
      }
      return comment;
    }) as Comment[];
}
