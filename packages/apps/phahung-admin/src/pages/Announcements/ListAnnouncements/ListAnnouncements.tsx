import React from 'react';
import { Box, Button } from '@chan-chala/uikit';
import { useHistory } from 'react-router-dom';
// import { Pagination } from './components';
import mockAnnouncements from 'mock/announcements';
import moment from 'moment';

const ListAnnouncements: React.FC = () => {
  const history = useHistory();

  return (
    <div className="w-full h-full">
      <div className="relative">
        <div className="flex mb-4 space-x-4">
          <div className="text-4xl font-bold">รายการประกาศ</div>
        </div>
        <span className="absolute top-0 right-4 space-x-2">
          <>
            <Button
              onClick={() => {
                history.push('announcements/new');
              }}
            >
              สร้างประกาศ
            </Button>
          </>
        </span>
      </div>
      <div className="h-[670px]">
        <div className="flex flex-col space-y-4">
          {mockAnnouncements && mockAnnouncements.length > 0 ? (
            mockAnnouncements.map((annoucement) => {
              return (
                <Box className="h-full" key={annoucement.id}>
                  <div className="flex justify-between items-center 4xl:justify-start">
                    <div className="ml-6 line-clamp-1 lg:w-[200px] 2xl:w-[450px] 4xl:w-[700px]">
                      {annoucement.title &&
                        annoucement.title.replace(/<[^>]+>/g, '')}
                    </div>

                    <div className="flex justify-between items-center 4xl:justify-start">
                      <div className="flex flex-row space-x-2">
                        <div className="flex flex-row items-center w-[500px]">
                          <div className="mx-4 text-gray-700 ">
                            แก้ไขล่าสุดเมื่อ
                          </div>
                          <div className="mr-4 font-bold">
                            <div>{`${moment(annoucement.createdAt).format(
                              'LLLL',
                            )} น.`}</div>
                            <div>
                              ({`${moment(annoucement.createdAt).fromNow()}`})
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={() => {
                            history.push(
                              `announcements/edit/${annoucement.id}`,
                            );
                          }}
                        >
                          แก้ไขประกาศ
                        </Button>
                        <Button
                          color="red"
                          // onClick={() => setDeleteBlogId(bannoucementlog.id)}
                        >
                          ลบประกาศ
                        </Button>
                      </div>
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
      {/* <Pagination
        blogsHandler={setBlogs}
        fetchHandler={{ isFetchingDocs, setIsFetchingDocs }}
        searchVal={searchVal}
      /> */}
    </div>
  );
};

export default ListAnnouncements;
