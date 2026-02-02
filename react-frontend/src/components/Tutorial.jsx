import React from "react";
import { Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Tutorial() {
    const navigate = useNavigate();

    const tips = [
        "Hra je jednoduchá, dostaneš indíciu, nájdi dané miesto a zadaj z toho miesta správnu odpoveď.",
        "Cieľom hry je zabaviť sa a zlepšiť sa v orientovaní po priestoroch TUKE.",
        "Obtiažnosť úloh sa postupne zvyšuje.",
        "Niektoré úlohy obsahujú obrázok, v takom prípade sa snaž postaviť presne na miesto odkiaľ bola fotka spravená.",
        "Odpoveď vždy zadávaj s diakritikou tak ako je uvedené v nápovede.",
        <>
            Pomôcť si môžeš{" "}
            <a
                href="https://api.prod.tuke.sk/smb/medias/2025/08/mapa_arealu.jpg?workSpaceId=12"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1976d2" }}
            >
                touto mapou
            </a>.
        </>
    ];

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
            padding: 20
        }}>
            <Paper sx={{ p: 4, maxWidth: 500, textAlign: "center", position: "relative" }}>
                <Typography variant="h4" gutterBottom>
                    Ako hra funguje
                </Typography>

                {tips.map((t, i) => (
                    <Typography key={i} variant="body1" sx={{ mb: 2 }}>
                        • {t}
                    </Typography>
                ))}

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/main")}
                    sx={{
                        position: "absolute",
                        bottom: 20,
                        right: 20
                    }}
                >Ďalej</Button>
            </Paper>
        </div>
    );
}

export default Tutorial;
