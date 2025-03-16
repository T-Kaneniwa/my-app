import SendIcon from '@mui/icons-material/Send';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const [content, setContent] = useState('');
const navigate = useNavigate();

const handleSubmit = () => {
  const newPost = {
    id: Date.now(),
    content: content,
  };
  localStorage.setItem('post', JSON.stringify(newPost));
  navigate('/');
};

const CommentForm = () => {
  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
    >
      <TextField
        id='content'
        label='コメント'
        multiline
        variant='outlined'
        fullWidth
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type='submit' color='success' endIcon={<SendIcon />}>
        投稿
      </Button>
      <Button type='button' color='secondary' component={Link} to='/'>
        キャンセル
      </Button>
    </Box>
  );
};

export default CommentForm;
