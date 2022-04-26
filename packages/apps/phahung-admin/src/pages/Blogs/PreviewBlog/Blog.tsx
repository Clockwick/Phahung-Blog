import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Blocks from 'components/Blocks/Blocks';
import moment from 'moment';
import feedApiCall from 'api/feedApiCall';
import 'moment/dist/locale/th';
import { AxiosResponse } from 'axios';
import { DataProp } from 'editorjs-blocks-react-renderer';
import styleBlog from './config';

moment.locale('th');

interface IAuthor {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
}
interface IBlogsResponse {
  success: number;
  blog: IBlog;
}
export interface IBlog {
  author: IAuthor;
  content: DataProp;
}

const Blog: React.FC = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [blogData, setBlogData] = useState<IBlog>();
  const fetchDataBlog = useCallback(async (): Promise<void> => {
    const jsonResponse: AxiosResponse = await feedApiCall.getBlog(blogId);
    const data = jsonResponse.data as IBlog;
    setBlogData(data);
  }, [setBlogData, blogId]);

  useEffect(() => {
    fetchDataBlog();
  }, [fetchDataBlog]);

  return (
    <div className="w-full min-h-screen">
      <div className="flex justify-center w-full">
        <div className="mt-3 sm:mt-5 w-11/12 break-words">
          <div className="flex justify-between mb-5 text-xl sm:mt-2 ">
            <div>
              <div className="font-bold">วันที่เขียน </div>
              {blogData &&
                moment(blogData.content.time)
                  .add(543, 'year')
                  .locale('th')
                  .format('ll')}{' '}
              <div className="font-bold">
                เขียนโดย {blogData && blogData.author}
              </div>
            </div>
          </div>
          <div className="lg:w-3/4 m-auto 2xl:w-1/2">
            {blogData && <Blocks data={blogData.content} config={styleBlog} />}
          </div>
        </div>
      </div>
      <div className="h-[92px]" />
    </div>
  );
};

export default Blog;
