import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NewsForm from './components/NewsForm.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectIsCreating } from './newsSlice.ts';
import { createNews } from './newsThunks.ts';
import { NewsMutation } from '../../types.ts';

const NewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectIsCreating);

  const onFormSubmit = async (newsMutation: NewsMutation) => {
    await dispatch(createNews(newsMutation));
    navigate('/');
  };

  return (
    <>
      <Typography variant="h4" sx={{mb: 2}}>
        Add New tiding
      </Typography>
      <NewsForm onSubmit={onFormSubmit} isLoading={isCreating}/>
    </>
  );
};

export default NewProduct;
