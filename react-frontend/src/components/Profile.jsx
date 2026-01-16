import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

function Profile() {
    // Placeholder for profile data
    const player = localStorage.getItem("player") || "Unknown Player";

    return (
        <Box sx={{ p: 3, height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper sx={{ p: 3, width: 400, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>Môj profil</Typography>
                <Typography variant="body1">Prezývka: {player}</Typography>
                {/* Add more profile info here */}
            </Paper>
        </Box>
    );
}

export default Profile;