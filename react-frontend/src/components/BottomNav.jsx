import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper } from '@mui/material';

function BottomNav() {
    const navigate = useNavigate();

    return (
        <Paper sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            display: 'flex',
            justifyContent: 'space-around',
            zIndex: 1000
        }}>
            <Button variant="contained" onClick={() => navigate('/profile')}>
                Môj profil
            </Button>
            <Button variant="contained" onClick={() => navigate('/main')}>
                Úlohy
            </Button>
            <Button variant="contained" onClick={() => navigate('/achievements')}>
                Míľniky
            </Button>
        </Paper>
    );
}

export default BottomNav;