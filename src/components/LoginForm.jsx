import { useMutation } from '@apollo/client/react';
import { LOGIN } from '../graphql/queries.js';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, { loading, error }] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const submit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({ variables: { username, password } });
      localStorage.setItem('library-user-token', data.login.value);
      setToken(data.login.value);

      setUsername('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  return (
    <>
      <h2>Login</h2>
      <form action="" onSubmit={submit}>
        <div>
          <label htmlFor="">Name:</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
