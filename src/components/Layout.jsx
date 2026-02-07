import { Routes, Route } from 'react-router';
import Authors from './Authors.jsx';
import Books from './Books.jsx';
import NewBook from './NewBook.jsx';
import Recomendations from './Recomendations.jsx';

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/recommendations" element={<Recomendations />} />
      </Routes>
    </>
  );
};

export default Layout;
