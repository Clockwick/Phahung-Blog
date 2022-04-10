import React from 'react';
import { Box, Stack, Container, Grid } from '@mui/material';
import BlogCard from '../components/BlogCard/BlogCard';
import Typography from '@mui/material/Typography';
import type { BlogPreview } from 'types/blog';
import { BlogPreview as mockBlogPreview } from 'mocks/BlogPreview';

interface BlogsProps {
  gridLayout: '4-4-4' | '6-6' | '12' | '8-4' | '4-8';
}

const Blogs = () => {
  const [didFetchBlogsData, setDidFetchBlogsData] = useState(false);
  const [blogs, setBlogs] = useState<BlogPreview[]>([]);

  console.log('Blogs : ', blogs);

  /// SEND GET TO BACKEND
  const fetchBlogsData = async (): Promise<BlogPreview[]> => {
    // using axios naja
    setDidFetchBlogsData(true);
    return setTimeout(() => mockBlogPreview, 250);
  };

  useEffect(() => {
    if (!didFetchBlogsData) {
      fetchBlogsData();
    }
  }, [didFetchBlogsData, fetchBlogsData]);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
      }}
      maxWidth="lg"
    >
      <Grid container direction="row" alignItems="center">
        {/* {splittedGrid.map()} /}
        {/ <Grid item></Grid> */}
      </Grid>
    </Container>
  );
};

export default Blogs;
