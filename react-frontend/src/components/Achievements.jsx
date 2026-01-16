import React from 'react';
import { Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

function Achievements() {
    const a = (id, name, description) => ({id, name, description});
    const achievements = [
        a(0, "Malý krok pre človeka, malý krok pre ľudstvo", "Splň jednu úlohu."),
        a(1, "...sedem osem, devať desať", "Splň desať úloh")
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