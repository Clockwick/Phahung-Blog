import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Stack,
  Avatar,
  Divider,
} from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';

interface AnnoucementCardProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

const AnnoucementCard: React.FC<AnnoucementCardProps> = ({
  id,
  title,
  description,
  createdAt,
}) => {
  return (
    <>
      <Stack direction="row" spacing={10}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <CampaignIcon />
              <Typography variant="h5">{title}</Typography>
            </Stack>
            <Typography variant="subtitle1">{description}</Typography>
          </Stack>
        </Stack>
        <Stack
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <Typography variant="h6" sx={{ mt: 'auto' }}>
            Posted on Pim
          </Typography>
          <Typography variant="subtitle1">{createdAt}</Typography>
        </Stack>
      </Stack>
      <Divider sx={{ borderBottom: '1.5px solid #bdbdbd', py: 1 }} />
    </>
  );
};

export default AnnoucementCard;
