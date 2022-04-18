/* eslint-disable import/no-unresolved */
import React from 'react';
import { Container } from '@mui/material';
import AnnouncementCard from 'components/AnnouncementCard';
import mockAnnoucement from '../mocks/Announcement';

const Annoucement: React.FC = () => {
  return (
    <Container>
      {mockAnnoucement?.map((annoucement: any) => (
        <AnnouncementCard
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
