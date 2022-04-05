import React, { useContext, useEffect, useState } from 'react';
import Tag from 'components/Tag';
import Card from 'components/Card';
import { SearchContext } from 'src/contexts/SearchContext';
import { useInfiniteScroll } from '@chan-chala/uikit';
import { AxiosResponse } from 'axios';
import { HelmetContext } from 'src/contexts/HelmetContext';
import { SearchNoResult } from 'components/Search';
import feedApiCall from '../../../api/feedApiCall';
import { tag } from '../../../types/tag';
import { blog } from '../../../types/blog';

interface tagResponses {
  tags: Array<tag>;
}
interface blogResponses {
  blogs: {
    docs: Array<blog>;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number | null;
    page: number;
    pagingCounter: number;
    prevPage: number | null;
    totalDocs: number;
    totalPages: number;
  };
}

const Feed: React.FC = () => {
  const { inputSearch } = useContext(SearchContext);
  const { resetHelmet } = useContext(HelmetContext);
  const [tagsData, setTagsData] = useState<Array<tag>>([]);
  const [blogData, setBlogData] = useState<Array<blog>>([]);
  const [page, setPage] = useState(1);
  const [end, setEnd] = useState(false);
  const perPage = 5;

  const fetchTagsData = async (): Promise<void> => {
    const responseFromTags: AxiosResponse = await feedApiCall.getTags();

    const data: tagResponses = responseFromTags.data as tagResponses;
    const newTagsData: Array<tag> = data.tags;

    setTagsData(newTagsData);
  };
  const fetchBlogsData = async (): Promise<void> => {
    // try catch
    const responseFromBlogs: AxiosResponse = await feedApiCall.getBlogs(
      page,
      perPage,
      inputSearch,
    );
    const data: blogResponses = responseFromBlogs.data as blogResponses;
    const newBlogData: Array<blog> = data.blogs.docs;
    setBlogData(newBlogData);
  };

  /*eslint-disable*/
  useEffect(() => {
    resetHelmet();
    fetchTagsData();
    fetchBlogsData();
    setPage(1);
  }, [inputSearch]);

  const moreData = async (): Promise<void> => {
    // ไม่ fetch เมื่อความสูงเป็น 0 หรือยังไม่เลื่อน
    if (end || document.documentElement.scrollTop === 0) {
      return;
    }
    const responseFromBlogsMoreData: AxiosResponse = await feedApiCall.getBlogs(
      page + 1,
      perPage,
      inputSearch,
    );

    const data: blogResponses = responseFromBlogsMoreData.data as blogResponses;
    const blogDataFromMoreData: Array<blog> = data.blogs.docs;
    if (blogDataFromMoreData.length === 0) {
      setEnd(true);
    } else {
      setPage(page + 1);
      setBlogData((prevBlogData) => [...prevBlogData, ...blogDataFromMoreData]);
      setIsFetching(false);
    }
  };
  const [, setIsFetching] = useInfiniteScroll(moreData);

  return (
    <div className="w-full min-h-screen">
      <div className=" h-[100px] sm:h-[120px] " />
      <div className="flex flex-col-reverse items-center lg:flex-row lg:items-start lg:my-2">
        <div className="space-y-10 w-4/6 lg:flex lg:flex-col lg:items-center">
          {blogData && blogData.length > 0
            ? blogData.map((newblogData: blog) => {
                const { title, description, image, time, id } = newblogData;
                return (
                  <Card
                    key={id}
                    title={title}
                    description={description}
                    id={id}
                    image={image}
                    time={time}
                  />
                );
              })
            : blogData && inputSearch && <SearchNoResult />}
        </div>
        <div className="mb-4 lg:fixed lg:right-0 lg:mb-0 lg:w-2/6 lg:h-full lg:border-l-2 ">
          <Tag tagsData={tagsData} />
        </div>
      </div>
      <div className="bg-transparent h-[50px] " />
    </div>
  );
};

export default Feed;
