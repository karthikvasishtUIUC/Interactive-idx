import React from 'react';
import { Box, Typography } from '@mui/material';

const TrackCounter = ({ totalTracks }) => {
    return (
        <Box sx={{ padding: 2, backgroundColor: '#333', color: '#fff', width: 200, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
                Total Tracks
            </Typography>
            <Typography variant="h4">
                {totalTracks}
            </Typography>
        </Box>
    );
};

export default TrackCounter;
