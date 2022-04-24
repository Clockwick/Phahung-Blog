import React, { useState, useContext, useEffect } from 'react';
import {
  Container,
  Grid,
  CircularProgress as Loading,
  Stack,
  Box,
} from '@mui/material';
import BlogCard from '../components/BlogCard/BlogCard';
import type { BlogPreview } from '../types/blog';
import { BlogPreview as mockBlogPreview } from '../mocks/BlogPreview';
import ListCategory from '../components/ListCategory';
import Slogan from '../components/Slogan';
import feedApiCall from '../api/feedApiCall';
import { SearchContext } from 'src/contexts/SearchContext';

type GridLayout = '4-4-4' | '6-6' | '12' | '8-4' | '4-8';

const Blogs = () => {
  const { inputSearch } = useContext(SearchContext);
  const [didFetchBlogsData, setDidFetchBlogsData] = useState(false);
  const [blogs, setBlogs] = useState<BlogPreview[]>([]);
  const [queryTag, setQueryTag] = useState<string>('');

  console.log('Blogs : ', blogs);

  /// SEND GET TO BACKEND
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchBlogsData = async (): Promise<void> => {
    await setTimeout(() => {
      feedApiCall.getBlogsByTag(queryTag, inputSearch).then((res) => {
        if (res.status === 200) {
          const responseData = res.data;
          console.log('responseDataTag', responseData);
          setBlogs(responseData);
          setDidFetchBlogsData(true);
        }
      });
    }, 250);
  };
  const changeQueryTag = (newTag: string) => {
    setQueryTag(newTag);
    setDidFetchBlogsData(false);
  };
  useEffect(() => {
    fetchBlogsData();
  }, [inputSearch]);
  useEffect(() => {
    if (!didFetchBlogsData) {
      fetchBlogsData();
    }
  }, [didFetchBlogsData, fetchBlogsData, changeQueryTag]);
  const renderLayout = (
    gridLayout: GridLayout,
    receivedBlogs: BlogPreview[],
  ): React.ReactNode => {
    const {
      id: id0,
      image: image0,
      title: title0,
      author: author0,
      likes: likes0,
    } = receivedBlogs[0];
    switch (gridLayout) {
      case '4-4-4': {
        const {
          id: id1,
          image: image1,
          title: title1,
          author: author1,
          likes: likes1,
        } = receivedBlogs[1];
        const {
          id: id2,
          image: image2,
          title: title2,
          author: author2,
          likes: likes2,
        } = receivedBlogs[2];
        return (
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <BlogCard
                id={id0}
                image={image0}
                title={title0}
                author={author0}
                likes={likes0}
              />
            </Grid>
            <Grid item xs={4}>
              <BlogCard
                id={id1}
                image={image1}
                title={title1}
                author={author1}
                likes={likes1}
              />
            </Grid>
            <Grid item xs={4}>
              <BlogCard
                id={id2}
                image={image2}
                title={title2}
                author={author2}
                likes={likes2}
              />
            </Grid>
          </Grid>
        );
      }
      case '6-6': {
        const {
          id: id1,
          image: image1,
          title: title1,
          author: author1,
          likes: likes1,
        } = receivedBlogs[1];
        return (
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <BlogCard
                id={id0}
                image={image0}
                title={title0}
                author={author0}
                likes={likes0}
              />
            </Grid>
            <Grid item xs={6}>
              <BlogCard
                id={id1}
                image={image1}
                title={title1}
                author={author1}
                likes={likes1}
              />
            </Grid>
          </Grid>
        );
      }
      case '12': {
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <BlogCard
                id={id0}
                image={image0}
                title={title0}
                author={author0}
                likes={likes0}
              />
            </Grid>
          </Grid>
        );
      }
      case '8-4': {
        const {
          id: id1,
          image: image1,
          title: title1,
          author: author1,
          likes: likes1,
        } = receivedBlogs[1];
        return (
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <BlogCard
                id={id0}
                image={image0}
                title={title0}
                author={author0}
                likes={likes0}
              />
            </Grid>
            <Grid item xs={4}>
              <BlogCard
                id={id1}
                image={image1}
                title={title1}
                author={author1}
                likes={likes1}
              />
            </Grid>
          </Grid>
        );
      }
      case '4-8': {
        const {
          id: id1,
          image: image1,
          title: title1,
          author: author1,
          likes: likes1,
        } = receivedBlogs[1];
        return (
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <BlogCard
                id={id0}
                image={image0}
                title={title0}
                author={author0}
                likes={likes0}
              />
            </Grid>
            <Grid item xs={8}>
              <BlogCard
                id={id1}
                image={image1}
                title={title1}
                author={author1}
                likes={likes1}
              />
            </Grid>
          </Grid>
        );
      }
      default:
        return null;
    }
  };

  const getBlogs = (receivedBlogs: BlogPreview[]) => {
    const layouts: any[] = [
      ['12'],
      ['6-6'],
      ['6-6', '12'],
      ['6-6', '4-8'],
      ['4-8', '4-4-4'],
      ['4-8', '4-4-4', '12'],
      ['6-6', '8-4', '4-4-4'],
      ['6-6', '8-4', '4-4-4', '12'],
      ['6-6', '8-4', '4-8', '4-4-4'],
      ['6-6', '8-4', '4-8', '4-4-4', '12'],
    ];

    const allEle: any[] = [];
    const chunkSize = 10;

    for (let i = 0; i < receivedBlogs.length; i += chunkSize) {
      const chunkBlogs: BlogPreview[] = receivedBlogs.slice(i, i + chunkSize);
      let currBlogs: BlogPreview[] = [];
      let pastBlogs = 0;

      (layouts[chunkBlogs.length - 1] as GridLayout[]).map((layout) => {
        const len = layout.split('-').length;
        currBlogs = chunkBlogs.slice(pastBlogs, pastBlogs + len);
        pastBlogs += len;

        return allEle.push(renderLayout(layout, currBlogs));
      });
    }

    return allEle;
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        marginBlockStart: '3%',
      }}
      maxWidth="lg"
    >
      <Slogan />
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ width: '100%', paddingBottom: 3 }}
      >
        <ListCategory changeQueryTag={changeQueryTag} />
      </Stack>
      <Grid container direction="row" alignItems="center">
        {blogs && didFetchBlogsData ? (
          getBlogs(blogs)
        ) : (
          <Box className="ErrorBox">
            <Loading />
          </Box>
        )}
      </Grid>
    </Container>
  );
};

export default Blogs;
