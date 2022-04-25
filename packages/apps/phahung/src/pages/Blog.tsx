/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line import/no-unresolved
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import Comment from 'components/Comment/v1';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {
  Button,
  Container,
  Stack,
  Typography,
  CircularProgress as Loading,
  Box,
} from '@mui/material';
import Blocks from 'editorjs-blocks-react-renderer';
import { makeStyles } from '@mui/styles';
import Comments from 'components/Comments';
import { Container, Stack, Typography } from '@mui/material';
import mockComments from '../mocks/Comments';
import BlogCard from '../components/BlogCard/BlogCard';
import feedApiCall from '../api/feedApiCall';
import type { Blog as BlogType } from '../types/blog';

interface IComment {
  hide: boolean;
  id: string;
  content: string;
  likes: number;
}
const useStyles = makeStyles(() => ({
  header: {
    fontSize: '1.5rem',
  },
  image: {
    display: 'flex',
    justifyContent: 'center',
    '& img': {
      maxHeight: '500px',
    },
  },
  paragraph: {
    color: 'black',
    fontFamily: 'Roboto',
  },
  figure: {
    width: '100px',
  },
}));

const Blog = () => {
  const classes = useStyles();
  const { id: blogId } = useParams<{ id: string }>();
  const [blogContent, setBlogContent] = useState<BlogType>();
  const [didFetchData, setDidFetchData] = useState(false);
  const fetchData = async (): Promise<void> => {
    feedApiCall.getBlogById(blogId).then((res) => {
      if (res.status === 200) {
        const responseData = res.data;
        setBlogContent(responseData);
        setDidFetchData(true);
      }
    });
  };
  useEffect(() => {
    if (!didFetchData) {
      fetchData();
    }
  }, [didFetchData, fetchData]);
  return (
    <Container sx={{ paddingY: '10vh' }}>
      <Stack spacing={3}>
        {/* {BlogContent && didFetchData ? (
          <BlogCard
            id={BlogContent.id}
            image={BlogContent.image}
            title={BlogContent.title}
            author={BlogContent.author}
            likes={BlogContent.likes}
          />
        ) : (
          <Loading />
        )} */}
        <Box className="ErrorBox">
          <Loading />
        </Box>

        {/* ----------------------------------------- read block content from local json file ------------------------ */}

        <Typography sx={{ maxWidth: '100%' }}>
          {blogContent && (
            <Blocks
              data={blogContent.content}
              config={{
                header: { className: classes.header },
                image: {
                  className: classes.image,
                },
                paragraph: { className: classes.paragraph },
              }}
            />
          )}
        </Typography>
        <Comments />
      </Stack>
    </Container>
  );
};

export default Blog;
