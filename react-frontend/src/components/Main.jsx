import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Paper, Typography } from '@mui/material';

function Main() {
    const aq = (id, quests, name, description) => ({id, quests, name, description});
    const ax = (id, xp, name, description) => ({id, xp, name, description});
    const q = (id, requirement, xp, phrase) =>({id, requirement, xp, phrase});
    const questAchievements = [
        aq(0, 1, "Malý krok pre človeka, malý krok pre ľudstvo", "Splň prvú hlavnú úlohu."),
        aq(1, 5, "A idemeeee!", "Splň päť hlavných úloh."),
        aq(2, 10, "Akurát som sa začínal baviť :(", "Splň všetky hlavné úlohy.")
    ];
    const xpAchievements = [
        ax(0, 13, "Trinásť, Pán Boh pri násť", "Získaj 13 XP."),
        ax(1, 50, "Materská škola života", "Získaj 50 XP."),
        ax(2, 100, "100 ľudí, 100 skúseností", "Získaj 100 XP."),
        ax(3, 250, "Skúseňák", "Získaj 200 XP."),
        ax(4, 500, "Senior TUKE Explorer", "Získaj 500 XP."),
        ax(5, 750, "Všechno vidím, všechno vím", "Získaj všetky XP.")
    ];
    const quests = [
        q(0, "úloha 1", 10, "odpoved"),
        q(1, "úloha 2", 20, "odpoved"),
        q(2, "úloha 3", 25, "odpoved"),
        q(3, "úloha 4", 25, "odpoved"),
        q(4, "úloha 5", 30, "odpoved"),
        q(5, "úloha 6", 80, "odpoved"),
        q(6, "úloha 7", 35, "odpoved"),
        q(7, "úloha 8", 45, "odpoved"),
        q(8, "úloha 9", 50, "odpoved"),
        q(9, "úloha 10", 100, "odpoved")
    ];
    const randomQuests = [
        q(0, "Nájdi miestnosť L9-B514 a zisti posledných 9 cifier vpravo dole na rozvrhu hodín.", 100, "123456789")
    ];
    const [phraseInput, setPhraseInput] = useState("");
    const player = localStorage.getItem("player");
    var achievements = JSON.parse(localStorage.getItem("achievements"));
    var questline = parseInt(localStorage.getItem("questline"));
    var quest = quests[questline];
    var xp = parseInt(localStorage.getItem("xp"));

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
            await axios.post("https://tuke-explo-2.onrender.com/api/register/addXp", {player, amount: quest.xp});
            const oldXp = xp;
            xp+=quest.xp;
            localStorage.setItem("xp", xp);
            for (let i=0; i<xpAchievements.length; i++){
                if (oldXp<xpAchievements[i].xp && xpAchievements[i].xp<=xp){
                    achievements.push([xpAchievements[i].name, xpAchievements[i].description]);
                    localStorage.setItem("achievements", JSON.stringify(achievements));
                    await axios.post("https://tuke-explo-2.onrender.com/api/register/addAchievement", {
                        player,
                        achievement: [xpAchievements[i].name, xpAchievements[i].description]
                    });
                }
            }

            await axios.post("https://tuke-explo-2.onrender.com/api/register/moveQuestline", {player});
            const oldQuestline = questline;
            questline++;
            localStorage.setItem("questline", questline);
            for (let i=0; i<questAchievements.length; i++){
                if (oldQuestline<questAchievements[i].quests && questAchievements[i].quests<=questline){
                    achievements.push([questAchievements[i].name, questAchievements[i].description]);
                    localStorage.setItem("achievements", JSON.stringify(achievements));
                    await axios.post("https://tuke-explo-2.onrender.com/api/register/addAchievement", {
                        player,
                        achievement: [questAchievements[i].name, questAchievements[i].description]
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