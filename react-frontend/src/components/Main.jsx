import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Paper, Typography, Box } from '@mui/material';

function Main() {
    const q = (id, requirement, xp, phrase) =>({id, requirement, xp, phrase});
    const [quests] = useState([
        q(0, "úloha 1", 100, "odpoved"),
        q(1, "úloha 2", 200, "odpoved"),
        q(2, "úloha 3", 300, "odpoved"),
        q(3, "úloha 4", 400, "odpoved"),
        q(4, "úloha 5", 500, "odpoved"),
        q(5, "úloha 6", 600, "odpoved")
    ]);
    const [currentQuestLine, setCurrentQuestLine] = useState(0);
    const [loading, setLoading] = useState(true);
    const [phraseInput, setPhraseInput] = useState("");

    useEffect(() => {
        const fetchQuestLine = async () => {
            const player = localStorage.getItem("player");
            if (player) {
                try {
                    const res = await axios.get(`http://localhost:8080/api/register/questLine/${player}`);
                    setCurrentQuestLine(res.data);
                } catch (err) {
                    console.error("Error fetching quest line:", err);
                }
            }
            setLoading(false);
        };
        fetchQuestLine();
    }, []);

    const completeQuest = async () => {
        const player = localStorage.getItem("player");
        const quest = quests[currentQuestLine];
        console.log("Attempting to complete quest:", { player, quest, currentQuestLine, phraseInput });
        if (!quest || !player) {
            console.error("Quest or player not found:", { quest, player });
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

            console.log("Moving quest line...");
            await axios.post("http://localhost:8080/api/register/moveQuestLine", {
                player
            });
            console.log("Quest line moved successfully");

            setCurrentQuestLine(prev => prev + 1);
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

    if (loading) return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh' }}>
            <div>Načítava sa...</div>
        </Box>
    );

    const currentQuest = quests[currentQuestLine];

    return (
        <Box sx={{ position: 'relative', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {currentQuest ? (
                <Paper sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    p: 3,
                    width: 300,
                    textAlign: 'center'
                }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>{currentQuest.requirement}</Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>{currentQuest.xp} XP</Typography>
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