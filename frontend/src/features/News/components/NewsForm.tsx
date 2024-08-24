import React, { useEffect, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch } from '../../../app/hooks.ts';
import { NewsMutation } from '../../../types.ts';
import { fetchNewsThunks } from '../newsThunks.ts';
import FileInput from '../../../UI/FileInput/FileInput.tsx';

interface Props {
  onSubmit: (news: NewsMutation) => void;
  isLoading: boolean;
}

const NewsForm: React.FC<Props> = ({onSubmit, isLoading}) => {
  const dispatch = useAppDispatch();

  const [state, setState] = useState<NewsMutation>({
    title: '',
    describe: '',
    image: null,
  });

  useEffect(() => {
    dispatch(fetchNewsThunks());
  }, [dispatch]);

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({...state});
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
      <Grid item>
        <TextField required label="Title" id="title" name="title" value={state.title} onChange={inputChangeHandler}/>
      </Grid>
      <Grid item>
        <TextField
          required
          multiline
          minRows={3}
          label="Describe"
          id="describe"
          name="describe"
          value={state.describe}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid item>
        <FileInput label="Image" name="image" onChange={fileInputChangeHandler}/>
      </Grid>
      <Grid item>
        <LoadingButton
          type="submit"
          loading={isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon/>}
          variant="contained"
        >
          <span>Save</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default NewsForm;
