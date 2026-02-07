import { Link } from 'react-router';
import { useSubscription } from '@apollo/client/react';
import { useState } from 'react';
import LoginForm from './components/LoginForm.jsx';
import Layout from './components/Layout.jsx';
import { BOOK_ADDED, ALL_BOOKS } from './graphql/queries.js';

const App = () => {
  const [token, setToken] = useState(null);

  useSubscription(BOOK_ADDED, {
    onData: ({ client, data }) => {
      const addedBook = data.data.bookAdded;
      const dataInStore = client.readQuery({ query: ALL_BOOKS });

      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          allBooks: [...dataInStore.allBooks, addedBook],
        },
      });

      window.alert(`${addedBook.title} added`);
    },
  });

  if (!token) {
    return (
      <>
        <LoginForm setToken={setToken}></LoginForm>
      </>
    );
  }

  return (
    <div>
      <nav>
        {/* <button onClick={() => setPage('authors')}>authors</button> */}
        <Link to={'/authors'}>authors</Link>
        {/* <button onClick={() => setPage('books')}>books</button> */}
        <Link to={'/books'}>books</Link>
        {/* <button onClick={() => setPage('add')}>add book</button> */}
        <Link to={'/add'}>add book</Link>
        <Link to={'/recommendations'}>recommended</Link>

        <button>logout</button>
      </nav>

      <Layout />
    </div>
  );
};

export default App;
