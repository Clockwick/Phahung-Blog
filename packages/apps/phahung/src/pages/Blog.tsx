/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line import/no-unresolved
import React, { useEffect, useMemo, useState } from 'react';
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
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import Blocks from 'editorjs-blocks-react-renderer';
import { makeStyles } from '@mui/styles';
import Comments from 'components/Comments';
import BlogCard from '../components/BlogCard/BlogCard';
import feedApiCall from '../api/feedApiCall';
import type { Blog as BlogType } from '../types/blog';
import { useUser } from 'store/hooks/userHook';

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
  const { user, fetchSessionHandler } = useUser();
  const [blogContent, setBlogContent] = useState<BlogType>();
  const [didFetchData, setDidFetchData] = useState(false);

  const isLikeBlog = useMemo(() => {
    return !!user?.likedBlogs?.find((id) => id === blogId);
  }, [JSON.stringify(user?.likedBlogs), blogId]);

  const fetchData = async (): Promise<void> => {
    feedApiCall.getBlogById(blogId).then((res) => {
      if (res.status === 200) {
        const responseData = res.data;
        console.log('responData', responseData);
        setBlogContent(responseData);
        setDidFetchData(true);
      }
    });
  };
  const [isContained, setIsContained] = useState<boolean>(isLikeBlog);
  const handleLikeBlog = () => {
    if (user) {
      setIsContained(!isContained);
      if (!isLikeBlog) {
        feedApiCall.likeBlog(blogId).then((res) => {
          if (res.status === 200) {
            fetchSessionHandler();
          }
        });
      } else {
        feedApiCall.unlikeBlog(blogId).then((res) => {
          if (res.status === 200) {
            fetchSessionHandler();
          }
        });
      }
    }
  };

  useEffect(() => {
    if (!didFetchData) {
      fetchData();
      fetchSessionHandler();
    }
  }, [didFetchData, fetchData]);
  return (
    <Container sx={{ paddingY: '10vh' }}>
      <Stack spacing={3}>
        {!didFetchData && (
          <Box className="ErrorBox">
            <Loading />
          </Box>
        )}
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
        {/* {!didFetchData && ( */}
        {user && (
          <>
            <Button
              variant={isContained ? 'contained' : 'outlined'}
              startIcon={<ThumbUpOutlinedIcon />}
              sx={{ whiteSpace: 'nowrap', width: '230px', mt: 4 }}
              onClick={handleLikeBlog}
            >
              ถูกใจบทความนี้
            </Button>

            <Comments />
          </>
        )}
      </Stack>
    </Container>
  );
};

export default Blog;
