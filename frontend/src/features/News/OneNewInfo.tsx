import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { CardMedia, CircularProgress, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectOneFetching, selectTiding } from './newsSlice.ts';
import { fetchOneNew } from './newsThunks.ts';
import dayjs from 'dayjs';
import CommentsList from '../Comments/CommentList.tsx';
import { fetchCommentsByNewsId } from '../Comments/commentThunks.ts';
import CommentForm from '../Comments/components/CommentForm.tsx';
import { selectIsCreatingCom } from '../Comments/commentSlice.ts';

const OneProduct = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const tiding = useAppSelector(selectTiding);
  const isFetching = useAppSelector(selectOneFetching);
  const isCreating = useAppSelector(selectIsCreatingCom);

  useEffect(() => {
    dispatch(fetchOneNew(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchCommentsByNewsId(id));
  }, [dispatch, id]);

  return (
    <Grid container direction="column" spacing={2}>
      {isFetching && (
        <Grid item>
          <CircularProgress/>
        </Grid>
      )}
      {tiding && (
        <>
          <Grid item component={Typography} variant="h4">
            {tiding.title}
          </Grid>
          {tiding.image && (
            <Grid item>
              <CardMedia
                component="img"
                image={`http://localhost:8000/images/${tiding.image}`}
                alt={tiding.title}
                sx={{height: 200, width: 200,}}
              />
            </Grid>
          )}
          <Grid item component={Typography} variant="body1">
            {tiding.describe}
          </Grid>
          <Typography>
            {tiding.created_at && dayjs(tiding.created_at).format('DD MMM YYYY, HH:mm')}
          </Typography>

          <Grid item>
            <Typography variant="h5" gutterBottom>
              Comments
            </Typography>
            <CommentsList id_news={parseInt(id)}/>
          </Grid>

          <Grid item>
            <CommentForm id_news={parseInt(id)} isLoading={isCreating}/>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default OneProduct;
