import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, useModal } from '@chan-chala/uikit';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { Pagination } from './components';
import { DeleteAnnouncementModal } from '../AnnouncementModal';
import { Announcement } from './types';

const ListAnnouncements: React.FC = () => {
  const history = useHistory();
  const [deleteAnnouncementId, setDeleteAnnouncementId] = useState<string>('');
  const [isFetchingDocs, setIsFetchingDocs] = useState<boolean>(false);
  const [announcements, setAnnouncements] = useState<Array<Announcement>>([]);
  const [handleDeleteAnnouncementPresent] = useModal(
    <DeleteAnnouncementModal
      announcementHandler={{ deleteAnnouncementId, setIsFetchingDocs }}
    />,
  );
  useEffect(() => {
    if (deleteAnnouncementId.length > 0) {
      setDeleteAnnouncementId('');
      handleDeleteAnnouncementPresent();
    }
  }, [deleteAnnouncementId]);

  const renderedAnnouncements = useMemo(
    () => announcements,
    [isFetchingDocs, setIsFetchingDocs, announcements],
  );

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
          {renderedAnnouncements && renderedAnnouncements.length > 0 ? (
            renderedAnnouncements.map((annoucement) => {
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
                          onClick={() =>
                            setDeleteAnnouncementId(annoucement.id)
                          }
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
      <Pagination
        announcementsHandler={{ setAnnouncements }}
        fetchHandler={{ isFetchingDocs, setIsFetchingDocs }}
      />
    </div>
  );
};

export default ListAnnouncements;
