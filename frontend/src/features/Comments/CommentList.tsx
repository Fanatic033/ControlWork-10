import React, { useEffect } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchCommentsByNewsId } from './commentThunks.ts';
import { selectComments, selectIsLoading } from './commentSlice.ts';
import CommentItem from './components/CommentItem.tsx';

interface CommentsListProps {
  id_news: number;
}

const CommentsList: React.FC<CommentsListProps> = ({id_news}) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    console.log(`Fetching comments for news ID: ${id_news}`);
    dispatch(fetchCommentsByNewsId(id_news.toString()));
  }, [dispatch, id_news]);

  return (
    <Grid container direction="column" spacing={2}>
      {isLoading && (
        <Grid item>
          <CircularProgress/>
        </Grid>
      )}
      {!isLoading && comments.length === 0 && (
        <Grid item>
          <Typography variant="body1">No comments available.</Typography>
        </Grid>
      )}
      {comments.map((comment) => (
        <Grid item key={comment.id}>
          <CommentItem comment={comment}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default CommentsList;
