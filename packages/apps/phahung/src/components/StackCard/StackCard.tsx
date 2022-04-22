import React from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Stack } from '@mui/material';
import 'styles/stackCard.css';
import type { BlogPreview } from '../../types/blog';
/* referent code from https://codepen.io/natthakiat-khunkaew/pen/dyORgee */
interface StackCardProp {
  Blogs: BlogPreview[];
}

const StackCard: React.FC<StackCardProp> = ({ Blogs }) => {
  const history = useHistory();
  return (
    <div className="container">
      <section className="card-list">
        {Blogs ? (
          Blogs.map((blog, index) => {
            const { id, title, author, likes, createdAt, tag } = blog;
            const createdDate = () => {
              const month = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ];
              const time = new Date(createdAt * 1000);
              return time
                .getDate()
                .toString()
                .concat(
                  ' ',
                  month[time.getMonth()],
                  ' ',
                  time.getFullYear().toString(),
                );
            };

            return (
              <Box
                key={id.concat(index.toString())}
                className="card"
                sx={{
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
                onClick={() => {
                  // history.push(`blog/${id}`);
                  history.push(`blog/1`);
                }}
              >
                <header className="card-header">
                  <p>{createdDate}</p>
                  <h2>{title}</h2>
                  <p>{tag.name}</p>
                </header>
                <div className="card-footer">
                  <Stack direction="column" spacing={1}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <img
                        src="../../../public/assets/images/buddha_color.png"
                        width="20px"
                        height="20px"
                        alt="buddha"
                      />
                      <p>{likes} </p>
                    </Stack>
                    <p>by {author}</p>
                  </Stack>
                </div>
              </Box>
            );
          })
        ) : (
          <Box>
            <Typography>คุณยังไม่ได้กดสาธุบล๊อคไหน</Typography>
          </Box>
        )}
      </section>
    </div>
  );
};

export default StackCard;
