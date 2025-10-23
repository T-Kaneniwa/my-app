import SendIcon from '@mui/icons-material/Send';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentDate } from '../utils/UtilsFuncs';
import { addComment } from '../db/CommentDb';
import React from 'react';

/** コメント追加フォーム画面 */
const CommentForm = () => {
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  /** フォーム送信時の処理 */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPost = {
      date: getCurrentDate(),
      content: content,
    };
    try {
      await addComment(newPost);
      console.log('IndexedDBに保存しました', newPost);
      navigate('/');
    } catch (e) {
      console.error('IndexedDB error', e);
      // localStorage.setItem('comment', JSON.stringify(newPost));
    }
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      bgcolor='white'
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
