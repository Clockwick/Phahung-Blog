import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Stack, Divider, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

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
        '&:hover': {
          opacity: [0.9, 0.8, 0.7],
        },
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
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
          maxWidth: '80%',
          borderRadius: 5,
          position: 'relative',
          top: '-10%',
          boxShadow: '2px 2px 4px #EEEEEE',
        }}
      >
        <CardContent style={{ textAlign: 'center' }}>
          <Typography
            style={{
              fontWeight: 'bold',
              fontSize: '26px',
            }}
          >
            {title.length > 50 ? title.slice(0, 51).concat('...') : title}
          </Typography>
          {/* <Divider style={{ margin: '3% 0%' }} /> */}
          <Stack direction="row" justifyContent="center">
            <PersonIcon />
            <Typography>{author}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="center" alignItems="center">
            <img
              src="../../../public/assets/images/buddha_color.png"
              width="20px"
              height="20px"
              alt="buddha"
              style={{ margin: '0% 7px 0% 0%' }}
            />
            <Typography>{likes}</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BlogCard;
