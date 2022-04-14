import React, { useState, useEffect } from 'react';
import { Container, Grid, CircularProgress as Loading } from '@mui/material';
import BlogCard from 'components/BlogCard/BlogCard';
import type { BlogPreview } from 'types/blog';
import { BlogPreview as mockBlogPreview } from 'mocks/BlogPreview';

type GridLayout = '4-4-4' | '6-6' | '12' | '8-4' | '4-8';

const Blogs = () => {
  const [didFetchBlogsData, setDidFetchBlogsData] = useState(false);
  const [blogs, setBlogs] = useState<BlogPreview[]>([]);

  console.log('Blogs : ', blogs);

  /// SEND GET TO BACKEND
  const fetchBlogsData = async (): Promise<void> => {
    // using axios naja
    await setTimeout(() => {
      setBlogs(mockBlogPreview);
      setDidFetchBlogsData(true);
    }, 250);
  };

  useEffect(() => {
    if (!didFetchBlogsData) {
      fetchBlogsData();
    }
  }, [didFetchBlogsData, fetchBlogsData]);

  const renderLayout = (
    gridLayout: GridLayout,
    receivedBlogs: BlogPreview[],
  ): React.ReactNode => {
    switch (gridLayout) {
      case '4-4-4': {
        const {
          image: image6,
          title: title6,
          author: author6,
          likes: likes6,
        } = receivedBlogs[6];
        const {
          image: image7,
          title: title7,
          author: author7,
          likes: likes7,
        } = receivedBlogs[7];
        const {
          image: image8,
          title: title8,
          author: author8,
          likes: likes8,
        } = receivedBlogs[8];
        return (
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <BlogCard
                image={image6}
                title={title6}
                author={author6}
                likes={likes6}
              />
            </Grid>
            <Grid item xs={4}>
              <BlogCard
                image={image7}
                title={title7}
                author={author7}
                likes={likes7}
              />
            </Grid>
            <Grid item xs={4}>
              <BlogCard
                image={image8}
                title={title8}
                author={author8}
                likes={likes8}
              />
            </Grid>
          </Grid>
        );
      }
      case '6-6': {
        const {
          image: image0,
          title: title0,
          author: author0,
          likes: likes0,
        } = receivedBlogs[0];
        const {
          image: image1,
          title: title1,
          author: author1,
          likes: likes1,
        } = receivedBlogs[1];
        return (
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <BlogCard
                image={image0}
                title={title0}
                author={author0}
                likes={likes0}
              />
            </Grid>
            <Grid item xs={6}>
              <BlogCard
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
        const {
          image: image9,
          title: title9,
          author: author9,
          likes: likes9,
        } = receivedBlogs[9];
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <BlogCard
                image={image9}
                title={title9}
                author={author9}
                likes={likes9}
              />
            </Grid>
          </Grid>
        );
      }
      case '8-4': {
        const {
          image: image2,
          title: title2,
          author: author2,
          likes: likes2,
        } = receivedBlogs[2];
        const {
          image: image3,
          title: title3,
          author: author3,
          likes: likes3,
        } = receivedBlogs[3];
        return (
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <BlogCard
                image={image2}
                title={title2}
                author={author2}
                likes={likes2}
              />
            </Grid>
            <Grid item xs={4}>
              <BlogCard
                image={image3}
                title={title3}
                author={author3}
                likes={likes3}
              />
            </Grid>
          </Grid>
        );
      }
      case '4-8': {
        const {
          image: image4,
          title: title4,
          author: author4,
          likes: likes4,
        } = receivedBlogs[4];
        const {
          image: image5,
          title: title5,
          author: author5,
          likes: likes5,
        } = receivedBlogs[5];
        return (
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <BlogCard
                image={image4}
                title={title4}
                author={author4}
                likes={likes4}
              />
            </Grid>
            <Grid item xs={8}>
              <BlogCard
                image={image5}
                title={title5}
                author={author5}
                likes={likes5}
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
      (layouts[chunkBlogs.length - 1] as GridLayout[]).map((layout) =>
        allEle.push(renderLayout(layout, chunkBlogs)),
      );
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
      <Grid container direction="row" alignItems="center">
        {/* {blogs && didFetchBlogsData ? (
          (['6-6', '8-4', '4-8', '4-4-4', '12'] as GridLayout[]).map((layout) =>
            renderLayout(layout, blogs),
          )
        ) : (
          <Loading />
        )} */}
        {blogs && didFetchBlogsData ? getBlogs(blogs) : <Loading />}
      </Grid>
    </Container>
  );
};

export default Blogs;
