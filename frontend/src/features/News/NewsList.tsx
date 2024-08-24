import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectNews } from './newsSlice.ts';
import NewsItem from './components/NewsItem.tsx';
import { fetchNewsThunks } from './newsThunks.ts';

const Products = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews);

  useEffect(() => {
    dispatch(fetchNewsThunks());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">News</Typography>
        </Grid>
        <Grid item>
          <Button color="primary" component={Link} to="/news/add">
           Add new Post
          </Button>
        </Grid>
      </Grid>
      <Grid item container spacing={1}>
        {news.map((tiding) => (
          <NewsItem
            key={tiding.id}
            id={tiding.id.toString()}
            title={tiding.title}
            image={tiding.image}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Products;
