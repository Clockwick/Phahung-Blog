import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Box, Stack, Divider, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

type imageFit = 'cover' | 'contain';
interface BlogCardProps {
  id: string;
  image: string;
  title: string;
  author: string;
  likes: number;
}
const BlogCard: React.FC<BlogCardProps> = ({
  id,
  image,
  title,
  author,
  likes,
}) => {
  const history = useHistory();

  return (
    <Box
      sx={{
        '&:hover': {
          opacity: [0.9, 0.8, 0.7],
        },
        height: '50vh',
        cursor: 'pointer',
        margin: '10px 0px',
        // backgroundColor: 'yellow',
      }}
      onClick={() => {
        // history.push(`blog/${id}`);
        history.push(`blog/1`);
      }}
    >
      <Box
        id="frame"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '80%',
          width: '100%',
          maxHeight: '80%',
          maxWidth: '100%',
          // objectFit: 'cover',
          overflow: 'hidden',
          // zIndex: 0,
          borderRadius: '15px',
        }}
      >
        <img
          src={image}
          alt="Logo"
          style={{
            // height: '100%',
            minWidth: '100%',
            objectFit: 'cover',
            objectPosition: '50% 50%',
          }}
        />
      </Box>
      <Box
        sx={{
          position: 'relative',
          top: '-20%',
          height: '35%',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          // backgroundColor: 'blue',
        }}
      >
        <Card
          sx={{
            maxWidth: '60%',
            borderRadius: '15px',
            boxShadow: '2px 2px 7px #BBBBBB',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fffdf7',
            // border: '1px solid black'
          }}
        >
          <CardContent
            style={{
              textAlign: 'center',
            }}
          >
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
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: ['1rem', '1rem', '1.3rem', '1.3rem', '1.5rem'],
                lineHeight: ['1rem', '1rem', '1.3rem', '1.3rem', '1.5rem'],
                maxHeight: ['2rem', '2rem', '2.6rem', '2.6rem', '3rem'],
                overflow: 'clip',
                margin: 1,
              }}
            >
              {title}
            </Typography>
            {/* <Divider style={{ margin: '3% 0%' }} /> */}
            <Stack direction="row" justifyContent="center" alignItems="center">
              <PersonIcon />
              <Typography
                sx={{ lineHeight: '1rem', height: '1rem', overflow: 'clip' }}
              >
                {author}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default BlogCard;
