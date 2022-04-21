import React, { useCallback, useEffect, useState } from 'react';
import { PageBox } from '@chan-chala/uikit';
import { Announcement, IAnnouncementsResponse } from '../types';
import config from './config';
import announcementApiCall from 'api/Announcement/announcement';

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

  const roundToNextConfigPage = (pageNum: number): number => {
    for (let i = 0; i <= config.page; i += 1) {
      if ((pageNum + i) % config.page === 0) return i;
    }
    return -1;
  };

  const isNextEmpty =
    currentPage + config.page > maxPage + roundToNextConfigPage(maxPage);

  useEffect(() => {
    if (!isFetchingDocs) {
      announcementApiCall
        .getAnnouncements(currentPage, config.perPage)
        .then((res) => {
          console.log('res', res);
          if (res.status === 200) {
            const responseData = res.data as Announcement[];
            console.log('responseData', responseData);
            // setMaxPage(responseData.blogs.totalPages);
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

  const handleNext = useCallback(() => {
    if (
      currentPage + config.page - 1 <=
      maxPage + roundToNextConfigPage(maxPage)
    ) {
      setIsFetchingDocs(false);
      setCurrentPage(configPage + 1);
      setStartPage(configPage + 1);
      setConfigPage((page) => page + config.page);
    }
  }, [currentPage, configPage, maxPage, setIsFetchingDocs]);

  const handlePrev = useCallback(() => {
    setIsFetchingDocs(false);
    if (currentPage - config.page > 0) {
      setCurrentPage(startPage - config.page);
      setStartPage(startPage - config.page);
      setConfigPage((page) => page - config.page);
    } else {
      setCurrentPage(1);
      setStartPage(1);
      setConfigPage(config.page);
    }
  }, [currentPage, setConfigPage, startPage, setIsFetchingDocs]);

  return (
    <div className="flex justify-center items-center my-8 space-x-4">
      <PageBox
        className={`${currentPage === 1 ? 'cursor-default' : 'cursor-pointer'}`}
        clickHandler={handlePrev}
      >
        Prev
      </PageBox>
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
      {!isNextEmpty && (
        <PageBox className="cursor-pointer" clickHandler={handleNext}>
          Next
        </PageBox>
      )}
    </div>
  );
};

export default Pagination;
