/* eslint-disable import/no-unresolved */
import React from 'react';
import { Container } from '@mui/material';
import AnnoucementCard from 'components/AnnoucementCard';
import mockAnnoucement from '../mocks/Annoucement';

const Annoucement: React.FC = () => {
  return (
    <Container>
      {mockAnnoucement?.map((annoucement: any) => (
        <AnnoucementCard
          id={annoucement.id}
          title={annoucement.title}
          description={annoucement.description}
          createdAt={annoucement.createdAt}
        />
      ))}
    </Container>
  );
};

export default Annoucement;
