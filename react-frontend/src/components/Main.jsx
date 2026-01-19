import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Paper, Typography, Box } from '@mui/material';

function Main() {
    const q = (id, requirement, xp, phrase) =>({id, requirement, xp, phrase});
    const [quests] = [
        q(0, "úloha 1", 100, "odpoved"),
        q(1, "úloha 2", 200, "odpoved"),
        q(2, "úloha 3", 300, "odpoved"),
        q(3, "úloha 4", 400, "odpoved"),
        q(4, "úloha 5", 500, "odpoved"),
        q(5, "úloha 6", 600, "odpoved")
    ];
    const [randomQuests] = [
        q(0, "Nájdi miestnosť L9-B514 a zisti posledných 9 cifier vpravo dole na rozvrhu hodín.", 100, "123456789")
    ];
    const [phraseInput, setPhraseInput] = useState("");
    const player = localStorage.getItem("player");

    const completeQuest = async () => {
        const questline = parseInt(localStorage.getItem("questline"));
        const quest = quests[questline];
        
        console.log("Attempting to complete quest:", {player, quest, questline, phraseInput});
        if (!quest || !player) {
            console.error("Quest or player not found:", {quest, player});
            return;
        }

        if (phraseInput.trim().toLowerCase() !== quest.phrase.toLowerCase()) {
            alert("Nesprávna odpoveď.");
            return;
        }

        try {
            console.log("Adding XP...");
            await axios.post("http://localhost:8080/api/register/addXp", {
                player,
                amount: quest.xp
            });
            console.log("XP added successfully");

            console.log("Moving questline...");
            await axios.post("http://localhost:8080/api/register/moveQuestline", {
                player
            });
            console.log("Questline moved successfully");
            questline++;
            localStorage.setItem("questline", questline)
            setPhraseInput("");
            alert(`Úloha splnená! Získal si ${quest.xp} XP.`);
        } catch (err) {
            console.error("Error completing quest:", err);
            console.error("Error details:", {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
                config: err.config
            });
            alert("Failed to complete quest.");
        }
    };

    const quest = quests[parseInt(localStorage.getItem("questline"))];
    console.log(quest);
    console.log(parseInt(localStorage.getItem("questline")));

    return (
        <Box sx={{ position: 'relative', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {quest ? (
                <Paper sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    p: 3,
                    width: 300,
                    textAlign: 'center'
                }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>{quest.requirement}</Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>{quest.xp} XP</Typography>
                    <TextField
                        fullWidth
                        label="Správna odpoveď"
                        value={phraseInput}
                        onChange={(e) => setPhraseInput(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={completeQuest}>Potvrdiť</Button>
                </Paper>
            ) : (
                <Paper sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    p: 3,
                    width: 300,
                    textAlign: 'center'
                }}>
                    <Typography variant="h5" gutterBottom>Blahoželáme!</Typography>
                    <Typography variant="body1">Všetky hlavné úlohy si splnil!</Typography>
                </Paper>
            )}
        </Box>
    );
}

export default Main;