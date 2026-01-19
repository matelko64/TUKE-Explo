import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Paper, Typography } from '@mui/material';

function Main() {
    const aq = (id, name, description) => ({id, name, description});
    const ax = (id, xp, name, description) => ({id, xp, name, description});
    const q = (id, requirement, xp, phrase) =>({id, requirement, xp, phrase});
    const questAchievements = [
        aq(0, "Malý krok pre človeka, malý krok pre ľudstvo", "Splň jednu úlohu."),
        aq(1, "...sedem osem, devať desať", "Splň desať úloh.")
    ];
    const xpAchievements = [
        ax(0, 500, "Skúseňák", "Získaj 500 XP.")
    ];
    const quests = [
        q(0, "úloha 1", 100, "odpoved"),
        q(1, "úloha 2", 200, "odpoved"),
        q(2, "úloha 3", 300, "odpoved"),
        q(3, "úloha 4", 400, "odpoved"),
        q(4, "úloha 5", 500, "odpoved"),
        q(5, "úloha 6", 600, "odpoved")
    ];
    const randomQuests = [
        q(0, "Nájdi miestnosť L9-B514 a zisti posledných 9 cifier vpravo dole na rozvrhu hodín.", 100, "123456789")
    ];
    const [phraseInput, setPhraseInput] = useState("");
    const player = localStorage.getItem("player");
    var questline = parseInt(localStorage.getItem("questline"));
    var quest = quests[questline];
    var xp = parseInt(localStorage.getItem("xp"));
    console.log("xpos: ", xp);

    const completeQuest = async () => {
        if (!quest || !player) {
            console.error("Quest or player not found:", {quest, player});
            return;
        }
        if (phraseInput.trim().toLowerCase() !== quest.phrase.toLowerCase()) {
            alert("Nesprávna odpoveď.");
            return;
        }

        try {
            await axios.post("https://tuke-explo-2.onrender.com/api/register/addXp", {
                player,
                amount: quest.xp
            });
            await axios.post("https://tuke-explo-2.onrender.com/api/register/moveQuestline", {player});
            questline++;
            localStorage.setItem("questline", questline);
            const oldXp = xp;
            xp+=quest.xp;
            localStorage.setItem("xp", xp);
            for (let i=0; i<xpAchievements.length; i++){
                console.log("cycle: ", i);
                console.log("oldxp: ", oldXp);
                console.log("xpAchiev: ", xpAchievements[i].xp);
                console.log("xp: ", xp);
                if (oldXp<xpAchievements[i].xp && xpAchievements[i].xp<=xp){
                    console.log("sukses");
                    await axios.post("https://tuke-explo-2.onrender.com/api/register/addAchievement", {
                        player,
                        achievement: [xpAchievements[i].name, xpAchievements[i].description]
                    });
                }
            }
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await completeQuest();
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                position: 'relative',
                height: '60vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center' }}>
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
                    <Typography variant="h6" sx={{mb: 1}}>{quest.requirement}</Typography>
                    <Typography variant="body2" sx={{mb: 2}}>{quest.xp} XP</Typography>
                    <TextField
                        fullWidth
                        label="Správna odpoveď"
                        value={phraseInput}
                        onChange={(e) => setPhraseInput(e.target.value)}
                        sx={{mb: 2}}
                    />
                    <Button type="submit" variant="contained" color="primary">Potvrdiť</Button>
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
        </form>
    );
}

export default Main;