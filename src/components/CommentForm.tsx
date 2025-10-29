import SendIcon from '@mui/icons-material/Send';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentDate } from '../utils/UtilsFuncs';
import { addComment } from '../db/CommentDb';
import React from 'react';
import styles from './CommentForm.module.css';

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

  // margin: 'auto', // これで水平方向に中央寄せされます
  // marginTop: '40px', // 画面上部からの余白（お好みで調整）
  // padding: '24px', // フォームの内側の余白
  // borderRadius: '8px', // 角を少し丸くします
  // width: 'fit-content', // Boxの幅を中身のサイズに合わせます
  // boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // (オプション) 影を付けます

  return (
    <div className={styles.formItem}>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          '& > :not(style)': {
            m: 1,
            width: '25ch',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // (オプション) 影を付けます
            marginTop: '40px', // 画面上部からの余白（お好みで調整）
          },
        }}
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
          投稿一覧に戻る
        </Button>
      </Box>
    </div>
  );
};

export default CommentForm;
