import React, { useCallback, useEffect, useState } from 'react';
import { PageBox } from '@chan-chala/uikit';
import { userApiCall } from '../../../../api';
import { User } from '../types';
import config from './config';

type PaginationProps = {
  usersHandler: {
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    setTotalUser: React.Dispatch<React.SetStateAction<number>>;
  };
  fetchHandler: {
    didFetchUsers: boolean;
    setDidFetchUsers: React.Dispatch<React.SetStateAction<boolean>>;
  };
  q: string;
};

const Pagination: React.FC<PaginationProps> = ({
  usersHandler,
  fetchHandler,
  q,
}) => {
  const [startPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { didFetchUsers, setDidFetchUsers } = fetchHandler;
  const [configPage] = useState<number>(config.page);

  useEffect(() => {
    if (!didFetchUsers) {
      userApiCall
        .getUser(currentPage, config.perPage, q)
        .then((res) => {
          if (res.status === 200) {
            const responseData = res.data as User[];
            usersHandler.setUsers(responseData);
            console.log('responseData', responseData);

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
