import React, { useEffect, useState } from 'react';
import { PageBox } from '@chan-chala/uikit';
import { blogApiCall } from '../../../../api';
import { Blog } from '../types';
import config from './config';

type PaginationProps = {
  blogsHandler: React.Dispatch<React.SetStateAction<Blog[]>>;
  fetchHandler: {
    isFetchingDocs: boolean;
    setIsFetchingDocs: React.Dispatch<React.SetStateAction<boolean>>;
  };
  searchVal: string;
};

const Pagination: React.FC<PaginationProps> = ({
  blogsHandler,
  fetchHandler,
  searchVal,
}) => {
  const [startPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { isFetchingDocs, setIsFetchingDocs } = fetchHandler;
  const [configPage] = useState<number>(config.page);

  useEffect(() => {
    if (!isFetchingDocs) {
      blogApiCall
        .getBlogs(currentPage, config.perPage, searchVal)
        .then((res) => {
          if (res.status === 200) {
            const responseData = res.data as Blog[];
            blogsHandler(responseData);
            setIsFetchingDocs(true);
          }
        });
    }
  }, [isFetchingDocs, currentPage, blogsHandler, searchVal, setIsFetchingDocs]);

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
