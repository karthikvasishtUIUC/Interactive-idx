import React from 'react';
import { Button } from '@mui/material';

const ResetButton = ({ onReset }) => {
    return (
        <Button variant="contained" color="secondary" onClick={onReset} style={{ marginTop: '20px' }}>
            Reset Filters
        </Button>
    );
};

export default ResetButton;
