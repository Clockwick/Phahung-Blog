import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';

const tempData = {
  image: 'https://food.mthai.com/app/uploads/2019/04/Marble-Cafe-2.jpg',
  image2:
    'https://images.unsplash.com/photo-1544526226-d4568090ffb8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGQlMjBpbWFnZXxlbnwwfHwwfHw%3D&w=1000&q=80',
  title: 'Marble Cafe คาเฟ่ลายหินอ่อน ย่านพระราม 9 ศรีนครินทร์',
  author: 'Traveler',
};

interface BlogCardProps {
  image: string;
  title: string;
  author: string;
  likes: number;
}
const BlogCard: React.FC<BlogCardProps> = ({ image, title, author, likes }) => {
  return (
    <Box
      sx={{
        // // backgroundColor: 'primary.dark',
        // '&:hover': {
        //   backgroundColor: 'primary.main',
        //   opacity: [0.9, 0.8, 0.7],
        // },
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '1%',
      }}
    >
      <img
        height="80%"
        width="100%"
        src={image}
        alt="Logo"
        style={{
          borderRadius: '15px',
          zIndex: -1,
          objectFit: 'cover',
          overflow: 'hidden',
        }}
      />

      <Card
        sx={{
          maxWidth: '70%',
          borderRadius: 5,
          position: 'relative',
          top: '-10%',
          textShadow: '2px 2px 4px #000000',
        }}
      >
        <CardContent style={{ textAlign: 'center' }}>
          <Typography style={{ fontWeight: 'bold' }}>{title}</Typography>
          <Divider style={{ margin: '3% 0%' }} />
          <Typography>author: {author}</Typography>
        </CardContent>
      </Card>
    </Box>boxShadow: '2px 2px 4px #000000';
  );
};

export default BlogCard;
