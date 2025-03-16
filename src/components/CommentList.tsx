import { Link } from 'react-router-dom';

const CommentList = () => {
  return (
    <div>
      <h1>Comment List</h1>
      <Link to='/commentform'>新規投稿</Link>
    </div>
  );
};

export default CommentList;
