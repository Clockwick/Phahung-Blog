/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useContext, useEffect } from 'react';
import { Container } from '@mui/material';
import AnnouncementCard from 'components/AnnouncementCard';
import mockAnnoucement from '../mocks/Announcement';
import announcementApiCall from '../api/Announcement/announcement';
import { SearchContext } from 'src/contexts/SearchContext';
import { announcement } from '../types/announcement';

const Annoucement: React.FC = () => {
  const { inputSearch } = useContext(SearchContext);
  const [announcements, setAnnouncements] = React.useState<announcement[]>([]);
  useEffect(() => {
    announcementApiCall.getAnnouncements().then((res) => {
      if (res.status === 200) {
        const responseData = res.data as announcement[];
        setAnnouncements(responseData);
        console.log('announcements ', announcements);
      }
    });
  }, [inputSearch]);
  // set localsetItem ('idToken') ไว้ใน api
  return (
    <Container maxWidth="lg">
      {announcements && inputSearch ? (
        <>
          {announcements
            .filter((announcementFilter) =>
              announcementFilter.title
                .toLowerCase()
                .includes(inputSearch.toLowerCase()),
            )
            .map((announcementFilter) => (
              <AnnouncementCard
                key={announcementFilter.id}
                id={announcementFilter.id}
                title={announcementFilter.title}
                description={announcementFilter.description}
                createdAt={announcementFilter.createdAt}
              />
            ))}
        </>
      ) : (
        announcements?.map((annoucement: announcement) => (
          <AnnouncementCard
            id={annoucement.id}
            title={annoucement.title}
            description={annoucement.description}
            createdAt={annoucement.createdAt}
          />
        ))
      )}
    </Container>
    // <Container maxWidth="lg">
    //   {announcements &&
    //     announcements?.map((annoucement: any) => (
    //       <AnnouncementCard
    //         id={annoucement.id}
    //         title={annoucement.title}
    //         description={annoucement.description}
    //         createdAt={annoucement.createdAt}
    //       />
    //     ))}
    // </Container>
  );
};

export default Annoucement;
