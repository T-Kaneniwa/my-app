import './App.css';
import CommentForm from './components/CommentForm';
import CommentList from './components/CommentList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CommentList />}></Route>
        <Route path='/commentform' element={<CommentForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
