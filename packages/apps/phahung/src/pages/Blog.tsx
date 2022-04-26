/* eslint-disable import/order */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line import/no-unresolved
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
// import Comment from 'components/Comment/v1';
import {
  Button,
  Stack,
  Typography,
  CircularProgress as Loading,
  Box,
} from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
// import Blocks from 'editorjs-blocks-react-renderer';
import Blocks from 'components/Blocks/Blocks';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
import Comments from 'components/Comments';
import feedApiCall from '../api/feedApiCall';
import type { Blog as BlogType } from '../types/blog';
import { useUser } from 'store/hooks/userHook';
import 'moment/dist/locale/th';

interface IComment {
  hide: boolean;
  id: string;
  content: string;
  likes: number;
}
const useStyles = makeStyles(() => ({
  header: {
    fontSize: '2.5rem',
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
    fontSize: '1.3rem',
  },
  list: {
    paddingLeft: '45px',
  },
  delimiter: { borderColor: '#fafafa' },
  code: {
    color: 'red',
    backgroundColor: '#e5e7eb',
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
    }
  }, [didFetchData, fetchData]);
  return (
    <Box
      sx={{
        paddingY: '4vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
      }}
    >
      <Stack spacing={3}>
        {!didFetchData && (
          <Box className="ErrorBox">
            <Loading />
          </Box>
        )}
        <Typography
          sx={{
            width: '60vw',
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row">
              วันที่เขียน{' '}
              {blogContent &&
                moment(blogContent.createdAt)
                  .add(543, 'year')
                  .locale('th')
                  .format('ll')}{' '}
            </Stack>
            <Typography className="font-bold">
              เขียนโดย {blogContent && blogContent.author}
            </Typography>
          </Stack>
          {blogContent && (
            <Blocks
              data={blogContent.content}
              config={{
                header: { className: classes.header },
                image: {
                  className: classes.image,
                },
                paragraph: { className: classes.paragraph },

                list: {
                  className: classes.list,
                },
                delimiter: {
                  className: classes.delimiter,
                },
                code: {
                  className: classes.code,
                },
              }}
            />
          )}
        </Typography>
        {user && (
          <Button
            variant={isContained ? 'contained' : 'outlined'}
            startIcon={<ThumbUpOutlinedIcon />}
            sx={{ whiteSpace: 'nowrap', width: '230px', mt: 4 }}
            onClick={handleLikeBlog}
          >
            ถูกใจบทความนี้
          </Button>
        )}
        <Comments />
      </Stack>
    </Box>
  );
};

export default Blog;
