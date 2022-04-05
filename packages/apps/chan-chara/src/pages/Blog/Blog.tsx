import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ShareSocial from 'components/Sharesocial';
import Blocks from 'components/Blocks/Blocks';
import moment from 'moment';
import { HelmetContext } from 'src/contexts/HelmetContext';
import feedApiCall from 'api/feedApiCall';
import 'moment/dist/locale/th';
import { AxiosResponse } from 'axios';
import { DataProp } from 'editorjs-blocks-react-renderer';
import type { Block } from 'editorjs-blocks-react-renderer';
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
  const blogURL = useParams<{ id: string }>();
  const substring = blogURL.id.substring(0, blogURL.id.length - 6);
  const id = substring.split('-').pop();
  const [blogData, setBlogData] = useState<IBlog>();
  const { setTitle, setDescription, setImage } = useContext(HelmetContext);
  const fetchDataBlog = useCallback(async (): Promise<void> => {
    /* eslint-disable-next-line */
    const jsonResponse: AxiosResponse = await feedApiCall.getBlog(id!);
    const data = jsonResponse.data as IBlogsResponse;
    setBlogData(data.blog);
    const filterFirstTitle = (): void => {
      const titleBlock: Block = data.blog.content.blocks.filter(
        (item) => item.type === 'header',
      )[0];
      if (titleBlock) setTitle(titleBlock.data.text);
    };
    const filterFirstDescription = (): void => {
      const despBlock: Block = data.blog.content.blocks.filter(
        (item) => item.type === 'paragraph',
      )[0];
      if (despBlock) setDescription(despBlock.data.text);
    };
    const filterFirstImage = (): void => {
      const imageBlock: Block = data.blog.content.blocks.filter(
        (item) => item.type === 'image',
      )[0];
      if (imageBlock) setImage(imageBlock.data.file.url);
    };

    // const filterFirstVideo = (): void => {
    //   const imageBlock: Block = data.blog.content.blocks.filter(
    //     (item) => item.type === 'image',
    //   )[0];
    //   if (imageBlock) setImage(imageBlock.data.file.url);
    // };
    filterFirstTitle();
    filterFirstDescription();
    filterFirstImage();
  }, [setTitle, setDescription, setImage, id]);

  useEffect(() => {
    fetchDataBlog();
  }, [fetchDataBlog]);

  return (
    <div className="w-full min-h-screen">
      <div className="h-[92px]" />
      <div className="flex justify-center w-full">
        <div className="mt-3 sm:mt-5 w-11/12 break-words ">
          <div className="flex justify-between mb-5 text-xl sm:mt-2 ">
            <div>
              วันที่เขียน{' '}
              {blogData &&
                moment(blogData.content.time)
                  .add(543, 'year')
                  .locale('th')
                  .format('ll')}{' '}
              <div className="font-bold">
                เขียนโดย {blogData && blogData.author}
              </div>
            </div>
            <div className="text-right">
              <ShareSocial />
            </div>
          </div>
          <div className="lg:w-3/4 m-auto 2xl:w-1/2">
            {blogData && <Blocks data={blogData.content} config={styleBlog} />}
          </div>
          <div className="mt-14 text-right">
            <ShareSocial />
          </div>
        </div>
      </div>
      <div className="h-[92px]" />
    </div>
  );
};

export default Blog;
