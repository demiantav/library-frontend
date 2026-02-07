import { ME, ALL_BOOKS } from '../graphql/queries';
import { useQuery } from '@apollo/client/react';

const Recomendations = () => {
  const { data, loading, error } = useQuery(ME);
  const { data: allBooks } = useQuery(ALL_BOOKS);

  console.log(allBooks);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  return (
    <div>
      <h2>Recomendations</h2>
      <p>
        Books in your favorite genre <strong>{data.me.favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th>book</th>
            <th>author</th>
            <th>published</th>
          </tr>

          {allBooks.allBooks
            .filter((book) =>
              book.genres.some(
                (genre) => genre.toLowerCase() === data.me.favoriteGenre.toLowerCase()
              )
            )
            .map((b) => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
export default Recomendations;
