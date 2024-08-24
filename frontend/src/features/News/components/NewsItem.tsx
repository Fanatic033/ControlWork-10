import React from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import imageNotFound from '@/assets/images/image-not-found.png';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../../../app/hooks.ts';
import { deleteNews } from '../newsThunks.ts';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  id: string;
  title: string;
  image: string | null;
}


const newsItem: React.FC<Props> = ({id, title, image}) => {
  const dispatch = useAppDispatch();
  let cardImage = imageNotFound;

  const handleDelete = () => {
    dispatch(deleteNews(id));
  };

  if (image) {
    cardImage = `http://localhost:8000/images/${image}`;
  }

  return (
    <Grid item sx={{width: '300px'}}>
      <Card sx={{height: '100%'}}>
        <CardHeader title={title}/>
        <ImageCardMedia image={cardImage} title={title}/>
        <CardContent>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={`/news/${id}`} sx={{marginRight: '120px'}}>
            <ArrowForwardIcon/>
          </IconButton>
          <Button onClick={handleDelete} startIcon={<DeleteIcon/>} color="error">
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default newsItem;
