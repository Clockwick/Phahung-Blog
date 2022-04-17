import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import Comment from 'components/Comment';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Button, Container, Stack, Typography } from '@mui/material';
import Blocks from 'editorjs-blocks-react-renderer';
import { makeStyles } from '@mui/styles';
import BlogContent from '../mocks/BlogContent';

interface IComment {
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
  const mockComments = [
    {
      id: '1',
      content: 'สวัสดีฉันคิอ ความคิดเห็นที่ 1 ',
      likes: 1,
    },
    {
      id: '2',
      content: 'สวัสดีฉันคิอ ความคิดเห็นที่ 2 ',
      likes: 2,
    },
    {
      id: '3',
      content: 'สวัสดีฉันคิอ ความคิดเห็นที่ 3 ',
      likes: 3,
    },
    {
      id: '4',
      content: 'สวัสดีฉันคิอ ความคิดเห็นที่ 4 ',
      likes: 4,
    },
  ];

  // const [comments, setComments] = useState<IComment[]>([]);
  const [comments, setComments] = useState<IComment[]>(mockComments);
  const [newComment, setNewComment] = useState<string>('');
  // const [state, setState] = useState<boolean>(false);
  // const [didFetchComment, setDidFetchComment] = useState(false);
  const handleOnClick = () => {
    // setDidFetchComment(true);
    // await axios.post
    setComments([...comments, { id: '3', content: newComment, likes: 0 }]);
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

  // useEffect(() => {
  //   if (!didFetchComment) {
  //     //  await axios.get('/blog')
  //     setDidFetchComment(true);
  //     //first
  //     const data = 'frombackedn';
  //     setComments(data);
  //   }
  // }, [didFetchComment]);

  return (
    <Container>
      <Stack spacing={3}>
        {/* <Typography sx={{ maxWidth: '100%' }}>
          <Blocks
            data={BlogContent}
            config={{
              header: { className: classes.header },
              image: { className: classes.image },
              paragraph: { className: classes.paragraph },
            }}
          />
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
        </Stack> */}
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
              />
            );
          })}
      </Stack>
    </Container>
  );
};

export default Blog;
