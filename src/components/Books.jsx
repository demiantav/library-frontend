import { useQuery } from '@apollo/client/react';
import { ALL_BOOKS } from '../graphql/queries';
import { useState } from 'react';

const Books = () => {
  const { loading, data } = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState(null);

  const books = data ? data.allBooks : [];

  const genres = [...new Set(books.flatMap((book) => book.genres.map((b) => b.toLowerCase())))];

  if (loading) return <p>Loading...</p>;
  console.log(genre);
  return (
    <div>
      <h2>books</h2>

      <p>In genre {genre}</p>

      <table>
        <tbody>
          <tr>
            <th>book</th>
            <th>author</th>
            <th>published</th>
          </tr>

          {books
            .filter((book) =>
              genre === null || genre === 'all'
                ? true
                : book.genres.some((b) => b.toLowerCase() === genre.toLowerCase())
            )
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button onClick={() => setGenre(genre)} key={genre} value={genre}>
            {genre}
          </button>
        ))}
      </div>
      <button onClick={() => setGenre('all')}>all genres</button>
    </div>
  );
};

export default Books;
