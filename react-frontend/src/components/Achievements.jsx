import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

function Achievements() {
    // Placeholder achievements
    const achievements = [
        { id: 1, name: "First Quest Completed", description: "Completed your first quest" },
        { id: 2, name: "XP Master", description: "Earned 500 XP" },
        // Add more achievements
    ];

    return (
        <Box sx={{ p: 3, height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper sx={{ p: 3, width: 400, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>Míľniky</Typography>
                <List>
                    {achievements.map(achievement => (
                        <ListItem key={achievement.id}>
                            <ListItemText primary={achievement.name} secondary={achievement.description} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
}

export default Achievements;