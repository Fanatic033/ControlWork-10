import React from 'react';
import { Grid, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Comments } from '../../../types';
import { useAppDispatch } from '../../../app/hooks.ts';
import { deleteComment } from '../commentThunks.ts';


interface CommentItemProps {
  comment: Comments;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteComment(comment.id))
  };

  return (
    <Grid container direction="column" spacing={1} sx={{ borderBottom: '1px solid #ccc', paddingBottom: 1, marginBottom: 1 }}>
      <Grid item container alignItems="center" justifyContent="space-between">
        <Typography variant="h6">{comment.author}</Typography>
        <IconButton onClick={handleDelete} size="small" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography variant="body1">{comment.message}</Typography>
      </Grid>
    </Grid>
  );
};

export default CommentItem;
