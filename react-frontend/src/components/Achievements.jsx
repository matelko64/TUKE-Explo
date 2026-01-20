import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

function Achievements() {
    const achievements = JSON.parse(localStorage.getItem("achievements"));

    return (
        <Box sx={{ p: 3, mt:5, display: 'flex', justifyContent: 'center'}}>
            <Paper sx={{ p: 3, width: 400, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>Míľniky</Typography>
                <List>
                    {achievements.map((achievement, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={achievement[0]} secondary={achievement[1]} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
}

export default Achievements;