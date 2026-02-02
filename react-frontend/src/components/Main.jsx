import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Paper, Typography } from '@mui/material';

function Main() {
    const aq = (id, quests, name, description) => ({id, quests, name, description});
    const ax = (id, xp, name, description) => ({id, xp, name, description});
    const q = (id, requirement, image, xp, phrase) =>({id, requirement, image, xp, phrase});
    const questAchievements = [
        aq(0, 1, "Malý krok pre človeka, malý krok pre ľudstvo", "Splň prvú úlohu."),
        aq(1, 5, "A idemeeee!", "Splň päť úloh."),
        aq(2, 10, "Čože je to desiatka?", "Splň desať úloh."),
        aq(3, 20, "Som myslel, že to skončí na 15", "Splň dvadsať úloh."),
        aq(4, 28, "P nad filipom", "Splň všetky úlohy.")
    ];
    const xpAchievements = [
        ax(0, 13, "Trinásť, Pán Boh pri násť", "Získaj 13 XP."),
        ax(1, 50, "Materská škola života", "Získaj 50 XP."),
        ax(2, 100, "100 ľudí, 100 skúseností", "Získaj 100 XP."),
        ax(3, 250, "Skúseňák", "Získaj 250 XP."),
        ax(4, 500, "Senior TUKE explorer", "Získaj 500 XP."),
        ax(5, 1000, "Všechno vidím, všechno vím", "Získaj 1000 XP."),
        ax(6, 2000, "Ultimátny filip explorer", "Získaj všetky XP sveta.")
    ];
    const quests = [
        q(0, "1. Aká trojpísmenová skratka je rovno nad tebou?", true, 10, "ard"),
        q(1, "2. Nájdi miestnosť L9-B126 a zadaj jej riadny názov.", false, 15, "auditórium a5"),
        q(2, "3. Ako sa volá budova, na ktorej je tento streetart?", true, 15, "centrum vodíkových technológií strojnícka fakulta"),
        q(3, "4. Nájdi miestnosť V4-259 a zadaj jej riadny slovenský názov.", false, 20, "zasadacia miestnosť"),
        q(4, "5. Čo je napísané priamo pred tebou?", true, 15, "1952 - 2022 strojnícka fakulta"),
        q(5, "6. Nájdi pravý vchod do Auly Volkswagen Slovakia a zadaj aký Comic Sans oznam tam je vylepený.", false, 25, "ani doma by ťa nenapadlo, hádzať smetie pod sedačku"),
        q(6, "7. Akej značky je produkt nad tvojou hlavou?", true, 25, "bosch"),
        q(7, "8. Nájdi miestnosť PK19-PC1 a zadaj číslo jej dverí.", false, 20, "103"),
        q(8, "9. Aký veľký kovový nápis je napravo od teba?", true, 50, "deutsche telekom it solutions slovakia"),
        q(9, "10. Nájdi miestnosť PK6-PC6 a zadaj číslo jej dverí.", false, 20, "s09"),
        q(10, "11. Na fotke je značka rezervovaného parkoviska, aké EČV tam má práve teraz rezervované miesto?", true, 35, "ke706iz"),
        q(11, "12. Nájdi miestnosť CAPRICA a zadaj číslo jej dverí.", false, 50, "b527"),
        q(12, "13. Aký nápis je za tebou na dopravnej značke?", true, 50, "okrem vozidiel s platnou parkovacou kartou"),
        q(13, "14. Čo je napísané v druhom riadku pod sklom?", true, 50, "parameters"),
        q(14, "15. Aký je oficiálny názov značky rovno za tebou?", true, 60, "zákaz vjazdu všetkých vozidiel"),
        q(15, "16. Aký nápis je na skle na pravo od teba?", true, 75, "010 prezentačné centrum"),
        q(16, "17. STOP rýchlo-komu?", true, 50, "rýchlo-kurčatám"),
        q(17, "18. Aké bolo krstné meno tohto pána?", true, 80, "krištof"),
        q(18, "19. Aký nápis je na značke rovno pri tebe?", true, 45, "pešia zóna"),
        q(19, "20. Aký nápis je rovno za tebou?", true, 65, "stavebná fakulta centrum výskumu a inovácií v stavebníctve"),
        q(20, "21. Čo je napísané v treťom riadku na ľavej nálepke na elektrickej búdke?", true, 90, "elektrických zariadení!"),
        q(21, "22. Ako sa volá budova priamo za tebou?", true, 65, "krčma letná"),
        q(22, "23. Vľavo za tebou je viacero značiek, čo je napísané v celkovo druhom riadku zhora?", true, 100, "akademická pôda"),
        q(23, "24. Aké je číslo najbližšej lampy?", true, 120, "2 2036"),
        q(24, "25. Napravo od teba je busta, čo je napísané v najspodnejšom riadku?", true, 150, "spisovateľ"),
        q(25, "26. Akej značky je auto?", true, 60, "mh2"),
        q(26, "27. Stojíš na priamke medzi touto lampou a značkou ktorá je za tebou. Čo je na značke napísané?", true, 200, "priestor je chránený kamerovým systémom"),
        q(27, "28. Posledná výzva: Čo je napísané nad kameňom filip?", false, 500, "p"),
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
                    {quest.image && (
                        <img
                            src={`/${quest.id + 1}.jpg`}
                            width={250}
                            style={{ padding: "12px" }}
                        />
                    )}
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
                    mt: 10,
                    width: 300,
                    textAlign: 'center'
                }}>
                    <Typography variant="h5" gutterBottom>Blahoželáme!</Typography>
                    <Typography variant="body1">Všetky úlohy si splnil!</Typography>
                </Paper>
            )}
        </form>
    );
}

export default Main;
