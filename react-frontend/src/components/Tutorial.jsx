import React from "react";
import { Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Tutorial() {
    const navigate = useNavigate();

    const tips = [
        "Hra je založená na plnení úloh po kampuse TUKE.",
        "Cieľom hry je nadobudnúť lepšiu orientačnú schopnosť na TUKE",
        "Obtiažnosť úloh sa stupňuje od najjednoduchšej po najťažšiu.",
        "Každá úloha ti dá určitý počet XP.",
        "Za XP aj za počet splnených úloh získavaš achievementy.",
        "Niektoré úlohy obsahujú obrázok, ktorý ti pomôže nájsť správnu odpoveď.",
        "Odpoveď vždy zadávaj presne tak, ako je uvedené v nápovede."
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
                >
                    Preskočiť
                </Button>
            </Paper>
        </div>
    );
}

export default Tutorial;
