/* eslint-disable no-console */
/* eslint-disable  */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useUser } from 'store/hooks/userHook';

const Signin = () => {
  // use state constants for the the form inputs
  const history = useHistory();
  const { fetchSessionHandler, isLoggedIn } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const loginToApp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchSessionHandler();
  };
  const register = () => {
    console.log('register');
  };
  // A quick check on the name field to make it mandatory

  console.log(isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) history.push('/');
  }, [isLoggedIn, history]);
  return (
    <div>
      <div className="login">
        <form>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name (required for registering)"
            type="text"
          />

          <input
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
            placeholder="Profile picture URL (optional)"
            type="text"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
          <button type="submit" onClick={loginToApp}>
            Sign In
          </button>
        </form>

        <p>
          Not a member?{' '}
          <span className="login__register" onClick={register}>
            Register Now
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signin;
