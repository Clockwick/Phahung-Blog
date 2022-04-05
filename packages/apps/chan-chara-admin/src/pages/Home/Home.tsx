import React from 'react';

import Menu from 'components/Menu';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const history = useHistory();
  history.push('/blogs');
  return (
    <Menu>
      <></>
    </Menu>
  );
};

export default Home;
