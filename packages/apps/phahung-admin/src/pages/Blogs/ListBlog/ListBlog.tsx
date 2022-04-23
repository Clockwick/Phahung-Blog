/* eslint-disable import/no-unresolved */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Button, useModal } from '@chan-chala/uikit';
import moment from 'moment';
import 'moment/dist/locale/th';
import { SearchBar } from 'components/SearchBar';
import { Switch, useToast } from '@chakra-ui/react';
import HelpButton from 'components/Button/HelpButton';
import { ToastTrigger } from 'components/Toasts';
import { blogApiCall } from '../../../api';
import { DeleteBlogModal } from '../BlogModal';
import { Pagination } from './components';
import { Blog, BlogStatusResponse, IBlogStatus } from './types';
import config from './config';

moment.locale('th');

/* eslint-disable */
const ListBlog: React.FC = () => {
  const history = useHistory();
  const toast = useToast();
  const [deleteBlogId, setDeleteBlogId] = useState<string>('');
  const [isFetchingDocs, setIsFetchingDocs] = useState<boolean>(false);
  const [handleDeleteBlogPresent] = useModal(
    <DeleteBlogModal blogHandler={{ deleteBlogId, setIsFetchingDocs }} />,
  );

  const [blogs, setBlogs] = useState<Array<Blog>>([]);
  const [blogStatus, setBlogStatus] = useState<Array<IBlogStatus>>([]);
  const [searchVal, setSearchVal] = useState<string>('');

  const updateBlogStatusById = (blogId: string, checked: boolean): void => {
    const targetBlogStatus = blogStatus.filter(
      (childBlog) => childBlog.id === blogId,
    )[0];
    const newBlogStatus = blogStatus.filter(
      (childBlog) => childBlog.id !== blogId,
    );
    targetBlogStatus.checked = checked;
    setBlogStatus([...newBlogStatus, targetBlogStatus]);
  };

  const handleChange = (checked: boolean, id: string): void => {
    const status = checked ? 'draft' : 'publish';

    blogApiCall
      .updateBlogStatus(id, status)
      .then((res) => {
        if (res.status === 200) {
          const responseData = res.data as BlogStatusResponse;
          updateBlogStatusById(id, responseData.status === 'draft');
          if (responseData.success === 1) {
            if (responseData.status === 'draft') {
              toast(ToastTrigger.publishBlogStatus());
            } else if (responseData.status === 'publish') {
              toast(ToastTrigger.draftBlogStatus());
            }
          } else {
            toast(ToastTrigger.changeBlogStatusFail());
          }
        }
      })
      .catch(() => toast(ToastTrigger.changeBlogStatusFail()));
  };

  const mapBlogToBlogStatus = (newBlogs: Blog[]): IBlogStatus[] => {
    const tmpArr = [] as IBlogStatus[];
    newBlogs.forEach((blog) => {
      const { id, status } = blog;
      const checked = status === 'publish';
      tmpArr.push({ id, checked });
    });
    return tmpArr;
  };

  const updateBlogStatus = useCallback(() => {
    setBlogStatus(mapBlogToBlogStatus(blogs));
  }, [blogStatus, blogs]);

  useEffect(() => {
    if (deleteBlogId.length > 0) {
      setDeleteBlogId('');
      handleDeleteBlogPresent();
    }
  }, [deleteBlogId]);

  useEffect(() => {
    if (blogs.length > 0) {
      updateBlogStatus();
    }
  }, [blogs]);

  const renderedBlogs = useMemo(
    () => blogs,
    [isFetchingDocs, setIsFetchingDocs],
  );

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGSVGElement>,
  ): void => {
    e.preventDefault();
    setIsFetchingDocs(false);
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setSearchVal(e.currentTarget.value);
  };

  return (
    <div className="w-full h-full">
      <div className="relative">
        <div className="flex mb-4 space-x-4">
          <div className="text-4xl font-bold">รายการบทความ</div>
          <SearchBar
            searchInputHandler={handleInputChange}
            submitHandler={handleSubmit}
          />
        </div>
        <span className="absolute top-0 right-4 space-x-2">
          <>
            <Button
              onClick={() => {
                history.push('blogs/new');
              }}
            >
              สร้างบทความ
            </Button>
          </>
        </span>
      </div>
      <div className="h-[670px]">
        <div className="flex flex-col space-y-4">
          {renderedBlogs && renderedBlogs.length > 0 ? (
            renderedBlogs.map((blog) => {
              return (
                <Box className="h-full" key={blog.id}>
                  <div className="flex justify-between items-center 4xl:justify-start">
                    <Switch
                      size="lg"
                      colorScheme="green"
                      isChecked={
                        blog.title
                          ? blogStatus.filter(
                              (childBlog) => childBlog.id === blog.id,
                            )[0]?.checked
                          : false
                      }
                      onChange={() =>
                        handleChange(
                          blogStatus.filter(
                            (childBlog) => childBlog.id === blog.id,
                          )[0]?.checked,
                          blog.id,
                        )
                      }
                    />
                    <div className="ml-6 line-clamp-1 lg:w-[200px] 2xl:w-[450px] 4xl:w-[700px]">
                      {blog.title ? (
                        blog.title.replace(/<[^>]+>/g, '')
                      ) : (
                        <div className="flex items-center space-x-2">
                          <div className="text-red-600">
                            {config.errorTitle}
                          </div>
                          <HelpButton
                            value={config.errorDescription}
                            color="crimson"
                            id="title-error-description"
                            place="top"
                            tooltipColor="error"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row space-x-2">
                      <div className="flex flex-row items-center m-1 w-[250px]">
                        <div className="mx-4 text-gray-700">เขียนโดย</div>
                        <div className="font-bold line-clamp-1">
                          {blog.author}
                        </div>
                      </div>
                      <div className="flex flex-row items-center w-[420px]">
                        <div className="mx-4 text-gray-700">
                          แก้ไขล่าสุดเมื่อ
                        </div>
                        <div className="mr-4 font-bold">
                          <div>{`${moment(blog.time).format('LLLL')} น.`}</div>
                          <div>({`${moment(blog.time).fromNow()}`})</div>
                        </div>
                      </div>

                      <Button
                        onClick={() => {
                          history.push(`blogs/edit/${blog.id}`);
                        }}
                      >
                        แก้ไขบทความ
                      </Button>
                      <Button
                        color="red"
                        onClick={() => setDeleteBlogId(blog.id)}
                      >
                        ลบบทความ
                      </Button>
                    </div>
                  </div>
                </Box>
              );
            })
          ) : (
            <div>ไม่มีข้อมูล</div>
          )}
        </div>
      </div>
      <Pagination
        blogsHandler={setBlogs}
        fetchHandler={{ isFetchingDocs, setIsFetchingDocs }}
        searchVal={searchVal}
      />
    </div>
  );
};

export default ListBlog;
