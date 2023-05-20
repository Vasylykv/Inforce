import React from 'react';
import { IComment } from '../../models/IComment';
import Button from 'react-bootstrap/Button';
import './CommentItem.scss';

interface CommentProps {
  comment: IComment;
  onDelete: (commentId: number) => void;
}

const CommentItem: React.FC<CommentProps> = ({ comment, onDelete }) => {
  return (
    <div className="comment">
      <p>Date: {comment.date}</p>
      <p>{comment.description}</p>
      <Button variant="danger" onClick={() => onDelete(comment.id)}>
        Delete
      </Button>
    </div>
  );
};

export default CommentItem;
