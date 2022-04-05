/* eslint no-underscore-dangle: 0 */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import TagComponent from 'components/Tag';
import Card from 'components/Card';
import { SearchContext } from 'src/contexts/SearchContext';
import { useInfiniteScroll } from '@chan-chala/uikit';
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

const Tag: React.FC = () => {
  const { inputSearch } = useContext(SearchContext);
  const [tagsData, setTagsData] = useState<Array<tag>>([]);
  const [blogData, setBlogData] = useState<Array<blog>>([]);
  const [page, setPage] = useState(1);
  const [end, setEnd] = useState(false);
  const [didFetchTags, setDidFetchTags] = useState(false);
  const perPage = 5;
  const tagObject = useParams<{ name: string }>();
  const tagName = tagObject.name;

  const mapNametoId = (name: string): string => {
    return tagsData.filter((tagNameInList) => tagNameInList.tag === name)[0]
      ._id;
  };

  const fetchTagsData = async (): Promise<void> => {
    // try catch
    const responseFromTags: AxiosResponse = await feedApiCall.getTags();
    const data: tagResponses = responseFromTags.data as tagResponses;
    const newTagsData: Array<tag> = data.tags;

    setTagsData(newTagsData);
    setDidFetchTags(true);
  };
  const fetchBlogsData = async (): Promise<void> => {
    // try catch
    const responseFromBlogs: AxiosResponse = await feedApiCall.getBlogsByTag(
      page,
      perPage,
      inputSearch,
      mapNametoId(tagName),
    );
    const data: blogResponses = responseFromBlogs.data as blogResponses;
    const newBlogData: Array<blog> = data.blogs.docs;

    setBlogData(newBlogData);
  };
  /*eslint-disable*/
  const moreData = async (): Promise<void> => {
    // ไม่ fetch เมื่อความสูงเป็น 0 หรือยังไม่เลื่อน
    if (end || document.documentElement.scrollTop === 0) {
      return;
    }
    const responseFromBlogsMoreData: AxiosResponse =
      await feedApiCall.getBlogsByTag(
        page + 1,
        perPage,
        inputSearch,
        mapNametoId(tagName),
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
  useEffect(() => {
    fetchTagsData();
  }, []);
  useEffect(() => {
    if (didFetchTags) {
      fetchBlogsData();
      setPage(1);
    }
  }, [tagsData, didFetchTags, inputSearch, tagName]);

  return (
    <div className="w-full min-h-screen">
      <div className="h-[100px] sm:h-[120px] " />
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
        <div className="mb-4 lg:fixed lg:right-0 lg:mb-0 lg:w-2/6 lg:h-full lg:border-l-2">
          <TagComponent tagsData={tagsData} />
        </div>
      </div>
      <div className="bg-transparent h-[50px]" />
    </div>
  );
};

export default Tag;
