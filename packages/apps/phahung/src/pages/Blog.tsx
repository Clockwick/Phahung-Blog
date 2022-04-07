import React, { useEffect, useState } from 'react';
import Comment from 'components/Comment';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Button, Container, Stack, Typography } from '@mui/material';

interface IComment {
  id: string;
  data: string;
}

const Blog: React.FC = () => {
  // const mockComments = [
  //   {
  //     id: '1',
  //     data: 'สวัสดีฉันคิอ ความคิดเห็นที่ 1 ',
  //   },
  //   {
  //     id: '2',
  //     data: 'สวัสดีฉันคิอ ความคิดเห็นที่ 2 ',
  //   },
  // ];
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  // const [didFetchComment, setDidFetchComment] = useState(false);
  const handleOnClick = () => {
    // setDidFetchComment(true);
    // await axios.post
    setComments([...comments, { id: '3', data: newComment }]);
    setNewComment('');
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
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          แสดงความคิดเห็น
        </Typography>
        <Stack alignItems="end" spacing={3}>
          <TextareaAutosize
            maxRows={10}
            minRows={10}
            aria-label="maximum height"
            placeholder="Maximum 4 rows"
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
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          รีวิวจากผู้อ่าน
        </Typography>
        {comments &&
          comments.map((comment) => {
            return (
              <Comment key={comment.id} id={comment.id} data={comment.data} />
            );
          })}
      </Stack>
    </Container>
  );
};

export default Blog;
