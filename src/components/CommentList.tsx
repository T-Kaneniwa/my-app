import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteComment, getComments, handleAccount } from '../db/CommentDb';
import styles from './CommentList.module.css';

/** コメントフォーマット */
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
    <div className={styles.commentList}>
      <h1 className={styles.header}>掲示板 うpよろしくンゴ</h1>
      <h1>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              // Reactのリスト表示には一意な `key` が必要です
              <li key={comment.id} className={styles.commentItem}>
                <p style={{ fontSize: '20px' }}>{comment.content}</p>
                <p style={{ fontSize: '15px' }}>{comment.date}</p>
                <button
                  onClick={() => {
                    deleteComment(comment.id);
                    fetchComments();
                  }}
                  className={styles.deleteButton}
                >
                  削除する
                </button>
                <button
                  onClick={() => {
                    handleAccount();
                  }}
                >
                  アカウント登録
                </button>
              </li>
            ))}
          </ul>
        ) : (
          '何も投稿がありません。。。(´・ω・｀)'
        )}
      </h1>
      <Link to='/commentform' className={styles.newPostLink}>
        ☆新規投稿はこちら☆
      </Link>
    </div>
  );
};

export default CommentList;
