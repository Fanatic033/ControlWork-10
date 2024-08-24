import React, { useState } from 'react';
import { Grid, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch } from '../../../app/hooks.ts';
import { CommentMutation } from '../../../types.ts';
import { createComment } from '../commentThunks.ts';

interface Props {
  id_news: number;
  isLoading: boolean;
}

const CommentForm: React.FC<Props> = ({ id_news, isLoading }) => {
  const dispatch = useAppDispatch();

  const [state, setState] = useState<CommentMutation>({
    id_news,
    author: '',
    message: '',
  });

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(createComment(state));
    setState({ ...state, message: '' });
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
      <Grid item>
        <TextField
          label="Anonymous"
          id="author"
          name="author"
          value={state.author}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid item>
        <TextField
          required
          multiline
          minRows={3}
          label="Message"
          id="message"
          name="message"
          value={state.message}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid item>
        <LoadingButton
          type="submit"
          loading={isLoading}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          <span>Submit</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default CommentForm;
