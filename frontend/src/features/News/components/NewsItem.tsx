import React from 'react';
import { Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import imageNotFound from '@/assets/images/image-not-found.png';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});

interface Props {
  id: string;
  title: string;
  image: string | null;
}

const newsItem: React.FC<Props> = ({ id, title, image }) => {
  let cardImage = imageNotFound;

  if (image) {
    cardImage = `http://localhost:8000/${image}`;
  }

  return (
    <Grid item sx={{ width: '300px' }}>
      <Card sx={{ height: '100%' }}>
        <CardHeader title={title} />
        <ImageCardMedia image={cardImage} title={title} />
        <CardContent>
        </CardContent>
        <CardActions>
          <IconButton component={Link} to={`/products/${id}`}>
            <ArrowForwardIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default newsItem;
