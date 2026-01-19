import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

function Profile() {
    const player = localStorage.getItem("player") || "Unknown Player";
    const xp = parseInt(localStorage.getItem("xp")) || 0;

    return (
        <Box sx={{ p: 3, height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper sx={{ p: 3, width: 400, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>Môj profil</Typography>
                <Typography variant="body1">Prezývka: {player}</Typography>
                <Typography variant="body1">XP: {xp}</Typography>
            </Paper>
        </Box>
    );
}

export default Profile;