/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line import/no-unresolved
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comment from 'components/Comment';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {
  Button,
  Container,
  Stack,
  Typography,
  CircularProgress as Loading,
} from '@mui/material';
import Blocks from 'editorjs-blocks-react-renderer';
import { makeStyles } from '@mui/styles';
import mockBlogContent from '../mocks/BlogContent';
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
    color: 'red',
  },
  image: {
    width: '100px',
  },
  paragraph: {
    color: 'black',
  },
  figure: {
    width: '100px',
  },
}));

const Blog = () => {
  const classes = useStyles();
  const { id: blogId } = useParams<{ id: string }>();
  // const [comments, setComments] = useState<IComment[]>([]);
  const [comments, setComments] = useState<IComment[]>(mockComments);
  const [newComment, setNewComment] = useState<string>('');
  // const [state, setState] = useState<boolean>(false);
  // const [didFetchComment, setDidFetchComment] = useState(false);

  const [BlogContent, setBlogContent] = useState<BlogType>();
  const [didFetchData, setDidFetchData] = useState(false);
  // const [content, setContent] = useState<any>();
  // console.log('BlogContent', BlossgContent);
  const fetchData = async (): Promise<void> => {
    feedApiCall.getBlogById(blogId).then((res) => {
      if (res.status === 200) {
        const responseData = res.data;
        // console.log('responseData', responseData);
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

  const handleOnClick = () => {
    // setDidFetchComment(true);
    // await axios.post
    setComments([
      ...comments,
      { id: '3', content: newComment, likes: 0, hide: false },
    ]);
    setNewComment('');
  };

  const handleDelete = (id: string) => {
    const newDataComments = comments.filter((comment) => comment.id !== id);
    setComments(newDataComments);
  };
  const incrementLikes = (id: string) => {
    const newDataComments = comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    });
    setComments(newDataComments);
  };
  const decrementLikes = (id: string) => {
    const newDataComments = comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, likes: comment.likes - 1 };
      }
      return comment;
    });
    setComments(newDataComments);
  };

  const handleHideComment = (id: string) => {
    const newDataComments = comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, hide: true };
      }
      return comment;
    });
    setComments(newDataComments);
  };
  // useEffect(() => {
  //   if (!didFetchComment) {
  //     //  await axios.get('/blog')
  //     setDidFetchComment(true);
  //     //first
  //     const data = 'frombackedn';
  //     setComments(data);
  //   }
  // }, [didFetchComment]);
  console.log('blogcontent', BlogContent?.content);
  return (
    <Container>
      <Stack spacing={3}>
        {BlogContent && didFetchData ? (
          <BlogCard
            id={BlogContent.id}
            image={BlogContent.image}
            title={BlogContent.title}
            author={BlogContent.author}
            likes={BlogContent.likes}
          />
        ) : (
          <Loading />
        )}
        {/* ----------------------------------------- read block content from local json file ------------------------ */}

        <Typography sx={{ maxWidth: '100%' }}>
          {BlogContent && (
            <Blocks
              data={BlogContent.content}
              config={{
                header: { className: classes.header },
                image: { className: classes.image },
                paragraph: { className: classes.paragraph },
              }}
            />
          )}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          แสดงความคิดเห็น
        </Typography>
        <Stack alignItems="end" spacing={3}>
          <TextareaAutosize
            maxRows={10}
            minRows={10}
            aria-label="maximum height"
            placeholder="ใส่ความคิดเห็นที่นี่"
            style={{ width: '100%', resize: 'none' }}
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
          <Button
            variant="contained"
            sx={{ float: 'right' }}
            onClick={handleOnClick}
          >
            เพิ่มความคิดเห็น
          </Button>
        </Stack>
        {/* ----------------------------------------- read block content from local json file ------------------------ */}
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          รีวิวจากผู้อ่าน
        </Typography>
        {comments &&
          comments.map((comment) => {
            return (
              <Comment
                handleDelete={handleDelete}
                key={comment.id}
                id={comment.id}
                content={comment.content}
                likes={comment.likes}
                decrementLikes={decrementLikes}
                incrementLikes={incrementLikes}
                handleHideComment={handleHideComment}
                hide={comment.hide}
              />
            );
          })}
      </Stack>
    </Container>
  );
};

export default Blog;
