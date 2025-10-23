import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getComments } from '../db/CommentDb';

const CommentList = () => {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const result = await getComments();
      setComments(result);
    };
    fetchComments();
  }, []);

  return (
    <div>
      <h1>掲示板だお～～ん</h1>
      <h1>{comments.length > 0 ? JSON.stringify(comments) : '投稿なし'}</h1>
      <h2>何も投稿がありません。。</h2>
      <Link to='/commentform'>☆新規投稿はこちら☆</Link>
    </div>
  );
};

export default CommentList;
