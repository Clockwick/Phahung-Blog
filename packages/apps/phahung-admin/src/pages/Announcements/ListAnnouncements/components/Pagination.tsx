/* eslint-disable import/no-unresolved */
import React, { useCallback, useEffect, useState } from 'react';
import { PageBox } from '@chan-chala/uikit';
import announcementApiCall from 'api/Announcement/announcement';
import { Announcement, IAnnouncementsResponse } from '../types';
import config from './config';

type PaginationProps = {
  announcementsHandler: {
    setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>;
  };
  fetchHandler: {
    isFetchingDocs: boolean;
    setIsFetchingDocs: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

const Pagination: React.FC<PaginationProps> = ({
  announcementsHandler,
  fetchHandler,
}) => {
  const [startPage, setStartPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const { isFetchingDocs, setIsFetchingDocs } = fetchHandler;
  const [configPage, setConfigPage] = useState<number>(config.page);

  useEffect(() => {
    if (!isFetchingDocs) {
      announcementApiCall
        .getAnnouncements(currentPage, config.perPage)
        .then((res) => {
          // console.log('res', res);
          if (res.status === 200) {
            const responseData = res.data as Announcement[];
            announcementsHandler.setAnnouncements(responseData);
            setIsFetchingDocs(true);
          }
        });
    }
  }, [isFetchingDocs, currentPage, announcementsHandler, setIsFetchingDocs]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    event.preventDefault();
    const id = parseInt(event.currentTarget.id, 10);
    setCurrentPage(id);
    setIsFetchingDocs(false);
  };

  return (
    <div className="flex justify-center items-center my-8 space-x-4">
      <div className="flex space-x-4">
        {Array.from(Array(configPage)).map(
          (_, i) =>
            i + 1 >= startPage && (
              <PageBox
                key={(i + 1).toString()}
                id={(i + 1).toString()}
                className={`cursor-pointer ${
                  currentPage === i + 1 ? 'bg-gray-300' : ''
                }`}
                clickHandler={handleChangePage}
              >
                {i + 1}
              </PageBox>
            ),
        )}
      </div>
    </div>
  );
};

export default Pagination;
