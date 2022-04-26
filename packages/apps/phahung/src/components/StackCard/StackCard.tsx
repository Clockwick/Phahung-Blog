import React from 'react';
import { useHistory } from 'react-router-dom';
import 'styles/stackCard.css';
import moment from 'moment';
import { Box, Typography, Stack } from '@mui/material';
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
            const { id, title, author, likes, createAt, tags } = blog;

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
                  history.push(`blog/${id}`);
                  // history.push(`blog/1`);
                }}
              >
                <header className="card-header">
                  <p>{moment(createAt).fromNow()}</p>
                  <h2>{title}</h2>
                  <p>{tags.join(',')}</p>
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
