import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteComment, getComments } from '../db/CommentDb';

type commentType = {
  id: number;
  content: string;
  date: string;
};

const CommentList = () => {
  const [comments, setComments] = useState<commentType[]>([]);

  const fetchComments = async () => {
    const result = await getComments();
    setComments(result);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div style={{ backgroundColor: 'white' }}>
      <h1>掲示板 うpよろしくンゴ</h1>
      <h1>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              // Reactのリスト表示には一意な `key` が必要です
              <li key={comment.id}>
                <p>{comment.content}</p>
                <small>{comment.date}</small>
                <button
                  onClick={() => {
                    deleteComment(comment.id);
                    fetchComments();
                  }}
                >
                  削除する
                </button>
              </li>
            ))}
          </ul>
        ) : (
          '何も投稿がありません。。。(´・ω・｀)'
        )}
      </h1>
      <Link to='/commentform'>☆新規投稿はこちら☆</Link>
    </div>
  );
};

export default CommentList;
