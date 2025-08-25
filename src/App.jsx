import { Link } from 'react-router';
import Layout from './components/Layout.jsx';

const App = () => {
  return (
    <div>
      <div>
        {/* <button onClick={() => setPage('authors')}>authors</button> */}
        <Link to={'/authors'}>authors</Link>
        {/* <button onClick={() => setPage('books')}>books</button> */}
        <Link to={'/books'}>books</Link>
        {/* <button onClick={() => setPage('add')}>add book</button> */}
        <Link to={'/add'}>add book</Link>
      </div>

      <Layout />
    </div>
  );
};

export default App;
