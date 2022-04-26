/* eslint-disable import/order */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable */
import React, { useContext, useState, useEffect } from 'react';
import {
  Container,
  Typography,
  CircularProgress as Loading,
  Box,
} from '@mui/material';
import AnnouncementCard from 'components/AnnouncementCard';
import announcementApiCall from '../../api/Announcement/announcement';
import { SearchContext } from 'src/contexts/SearchContext';
import { announcement } from '../../types/announcement';

const ListAnnouncement: React.FC = () => {
  const { inputSearch } = useContext(SearchContext);
  const [didFetchData, setDidFetchData] = useState(false);
  const [announcements, setAnnouncements] = React.useState<announcement[]>([]);
  useEffect(() => {
    announcementApiCall.getAnnouncements().then((res) => {
      if (res.status === 200) {
        const responseData = res.data as announcement[];
        setAnnouncements(responseData);
        setDidFetchData(true);
      }
    });
  }, [inputSearch, didFetchData]);
  // set localsetItem ('idToken') ไว้ใน api
  return didFetchData ? (
    <Container maxWidth="lg">
      {announcements.length > 0 && inputSearch ? (
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
      ) : announcements.length > 0 ? (
        announcements?.map((annoucement: announcement) => (
          <AnnouncementCard
            key={annoucement.id}
            id={annoucement.id}
            title={annoucement.title}
            description={annoucement.description}
            createdAt={annoucement.createdAt}
          />
        ))
      ) : (
        <Container
          maxWidth="lg"
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Typography>ยังไม่มีประกาศ</Typography>
        </Container>
      )}
    </Container>
  ) : (
    <Box className="ErrorBox">
      <Loading />
    </Box>
  );
};

export default ListAnnouncement;
