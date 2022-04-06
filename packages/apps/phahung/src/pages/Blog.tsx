import React from 'react';
import Comment from 'components/Comment';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Button, Container, Stack, Typography } from '@mui/material';

const Blog: React.FC = () => {
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
            value="hello"
          />
          <Button variant="contained" sx={{ float: 'right' }}>
            เพิ่มความคิดเห็น
          </Button>
        </Stack>
        <Comment />
      </Stack>
    </Container>
  );
};

export default Blog;
