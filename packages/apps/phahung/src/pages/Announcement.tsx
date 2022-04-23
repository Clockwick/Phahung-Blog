/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import AnnouncementCard from 'components/AnnouncementCard';
import mockAnnoucement from '../mocks/Announcement';
import announcementApiCall from '../api/Announcement/announcement';

const Annoucement: React.FC = () => {
  const [announcements, setAnnouncements] = React.useState<any>([]);
  useEffect(() => {
    announcementApiCall.getAnnouncements().then((res) => {
      if (res.status === 200) {
        const responseData = res.data;
        setAnnouncements(responseData);
      }
    });
  }, []);
  // set localsetItem ('idToken') ไว้ใน api
  return (
    <Container maxWidth="lg">
      {announcements?.map((annoucement: any) => (
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
