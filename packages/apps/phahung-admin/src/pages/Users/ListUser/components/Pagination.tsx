import React, { useCallback, useEffect, useState } from 'react';
import { PageBox } from '@chan-chala/uikit';
import { userApiCall } from '../../../../api';
import { User, IUsersResponse } from '../types';
import config from './config';

type PaginationProps = {
  usersHandler: {
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    setTotalAdmin: React.Dispatch<React.SetStateAction<number>>;
  };
  fetchHandler: {
    didFetchUsers: boolean;
    setDidFetchUsers: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

const Pagination: React.FC<PaginationProps> = ({
  usersHandler,
  fetchHandler,
}) => {
  const [startPage, setStartPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const { didFetchUsers, setDidFetchUsers } = fetchHandler;
  const [configPage, setConfigPage] = useState<number>(config.page);
  const [nextPage, setNextPage] = useState<boolean>(false);

  const roundToNextConfigPage = (pageNum: number): number => {
    for (let i = 0; i <= config.page; i += 1) {
      if ((pageNum + i) % config.page === 0) return i;
    }
    return -1;
  };

  useEffect(() => {
    if (!didFetchUsers) {
      userApiCall
        .getAdmin(currentPage, config.perPage)
        .then((res) => {
          if (res.status === 200) {
            const responseData = res.data as IUsersResponse;
            setMaxPage(responseData.admins.totalPages);
            usersHandler.setUsers(responseData.admins.docs);
            usersHandler.setTotalAdmin(responseData.admins.totalDocs);
            setNextPage(responseData.admins.hasNextPage);
            setDidFetchUsers(true);
          }
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.error(error.responseData.data.Error));
    }
  }, [didFetchUsers, currentPage, usersHandler, setDidFetchUsers]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    event.preventDefault();
    const id = parseInt(event.currentTarget.id, 10);
    setCurrentPage(id);
    setDidFetchUsers(false);
  };

  const handleNext = useCallback(() => {
    if (
      currentPage + config.page - 1 <=
      maxPage + roundToNextConfigPage(maxPage)
    ) {
      setDidFetchUsers(false);
      setCurrentPage(configPage + 1);
      setStartPage(configPage + 1);
      setConfigPage((page) => page + config.page);
    }
  }, [currentPage, configPage, setDidFetchUsers, maxPage]);

  const handlePrev = useCallback(() => {
    setDidFetchUsers(false);
    if (currentPage - config.page > 0) {
      setCurrentPage(startPage - config.page);
      setStartPage(startPage - config.page);
      setConfigPage((page) => page - config.page);
    } else {
      setCurrentPage(1);
      setStartPage(1);
      setConfigPage(config.page);
    }
  }, [currentPage, setConfigPage, setDidFetchUsers, startPage]);

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
      {nextPage && (
        <PageBox className="cursor-pointer" clickHandler={handleNext}>
          Next
        </PageBox>
      )}
    </div>
  );
};

export default Pagination;
