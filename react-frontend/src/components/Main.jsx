import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Paper, Typography } from '@mui/material';

function Main() {
    const aq = (id, quests, name, description) => ({id, quests, name, description});
    const ax = (id, xp, name, description) => ({id, xp, name, description});
    const q = (id, requirement, image, xp, phrase) =>({id, requirement, image, xp, phrase});
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
        q(0, "Zadaj trojpísmenovú skratku, mala by byť rovno nad tebou.", "True", 10, "ard"),
        q(1, "Nájdi miestnosť L9-B126 a zadaj jej riadny názov.", "", 20, "auditórium a5"),
        q(2, "Ako sa volá budova, na ktorej je tento streetart?", "True", 25, "centrum vodíkových technológií strojnícka fakulta"),
        q(3, "Nájdi miestnosť V4-259 a zadaj jej riadny slovenský názov.", "", 25, "zasadacia miestnosť"),
        q(4, "Čo je napísané priamo pred tebou?", "True", 30, "1952 - 2022 strojnícka fakulta"),
        q(5, "Nájdi pravý vchod do Auly Volkswagen Slovakia a zadaj aký Comic Sans oznam tam je vylepený.", "", 80, "ani doma by ťa nenapadlo, hádzať smetie pod sedačku"),
        q(6, "Akej značky je produkt nad tvojou hlavou?", "True", 35, "bosch"),
        q(7, "Nájdi miestnosť PK19-PC1 a zadaj číslo jej dverí.", "", 45, "103"),
        q(8, "Aký veľký kovový nápis je napravo od teba?", "True", 50, "deutsche telekom it solutions slovakia"),
        q(9, "Nájdi miestnosť PK6-PC6 a zadaj číslo jej dverí.", "", 100, "s09"),
        q(10, "Na fotke je značka rezervovaného parkoviska, aké EČV tam má práve teraz rezervované miesto?", "True", 100, "ke706iz"),
        q(11, "Nájdi miestnosť CAPRICA a zadaj číslo jej dverí.", "", 100, "b527"),
        q(12, "Aký nápis je za tebou na dopravnej značke?", "True", 100, "okrem vozidiel s platnou parkovacou kartou"),
        q(13, "Čo je napísané v druhom riadku pod sklom?", "True", 100, "parameters"),
        q(14, "Aký je oficiálny názov značky rovno za tebou?", "True", 100, "zákaz vjazdu všetkých vozidiel"),
        q(15, "Aký nápis je na skle na pravo od teba?", "True", 100, "010 prezentačné centrum"),
        q(16, "STOP rýchlo-komu?", "True", 100, "rýchlo-kurčatám"),
        q(17, "Aké bolo krstné meno tohto pána?", "True", 100, "krištof"),
        q(18, "Aký nápis je na značke rovno pri tebe?", "True", 100, "pešia zóna"),
        q(19, "Aký nápis je rovno za tebou?", "True", 100, "stavebná fakulta centrum výskumu a inovácií v stavebníctve"),
        q(20, "Čo je napísané v treťom riadku na ľavej nálepke na elektrickej búdke?", "True", 100, "elektrických zariadení!"),
        q(21, "Ako sa volá budova priamo za tebou?", "True", 100, "krčma letná"),
        q(22, "Vľavo za tebou je viacero značiek, čo je napísané v druhom riadku zhora?", "True", 100, "akademická pôda"),
        q(23, "Aké je číslo najbližšej lampy?", "True", 100, "2 2036"),
        q(24, "Napravo od teba je busta, čo je napísané v najspodnejšom riadku?", "True", 100, "spisovateľ"),
        q(25, "Akej značky je auto?", "True", 100, "mh2"),
        q(26, "Stojíš na priamke medzi touto lampou a značkou ktorá je za tebou. Čo je na značke napísané?", "True", 100, "priestor je chránený kamerovým systémom"),
        q(27, "Čo je napísané nad kameňom filip?", "", 100, "p"),
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
                mt: 10,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'}}>
            {quest ? (
                <Paper sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    p: 3,
                    mt: 35,
                    width: 300,
                    textAlign: 'center'
                }}>
                    <Typography variant="h6" sx={{mb: 1}}>{quest.requirement}</Typography>
                    <Typography variant="body2" sx={{mb: 2}}>{quest.xp} XP</Typography>
                    {quest.image === "True" && (
                        <img
                            src={`/${quest.id + 1}.jpg`}
                            width={250}
                        />
                    )}
                    <br />
                    <br />
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