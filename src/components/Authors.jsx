import { useQuery } from '@apollo/client/react';
import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from '../graphql/queries';

const Authors = () => {
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const { loading, data } = useQuery(ALL_AUTHORS);

  const [editAuthor] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submitForm = (event) => {
    event.preventDefault();
    editAuthor({ variables: { name, birth: Number(birth) } });
    setName('');
    setBirth('');
  };

  if (loading) return <p>Loading...</p>;

  const authors = data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>

      <form onSubmit={submitForm}>
        <label htmlFor="name">name</label>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="born">born</label>
        <input
          type="number"
          name="born"
          value={birth}
          onChange={(e) => setBirth(e.target.value)}
        />
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
