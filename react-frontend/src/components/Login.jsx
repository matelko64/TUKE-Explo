import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";

function Login() {
    const [player, setPlayer] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post("https://tuke-explo-2.onrender.com/api/register/login", {
                player,
                password
            });
            if (res.data === true) {
                localStorage.setItem("player", player);
                if (player) {
                    try {
                        const res = await axios.get(`https://tuke-explo-2.onrender.com/api/register/questline/${player}`);
                        localStorage.setItem("questline", res.data);
                    } catch (err) {
                        console.error("Error fetching questline:", err);
                    }
                }
                if (player) {
                    try {
                        const res = await axios.get(`https://tuke-explo-2.onrender.com/api/register/xp/${player}`);
                        localStorage.setItem("xp", res.data);
                    } catch (err) {
                        console.error("Error fetching xp:", err);
                    }
                }
                if (player) {
                    try {
                        const res = await axios.get(`https://tuke-explo-2.onrender.com/api/register/achievements/${player}`);
                        localStorage.setItem("achievements", JSON.stringify(res.data));
                    } catch (err) {
                        console.error("Error fetching achievements:", err);
                    }
                }
                navigate("/main");
            } else {
                alert("Login failed.");
            }
        } catch (err) {
            console.error("Error during login:", err);
            alert("Server error.");
        }
    };

    return (
        <form
            onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh'
            }}>
            <h2>Prihlásenie</h2>
            <TextField
                label="Prezývka"
                variant="outlined"
                value={player}
                onChange={(e) => setPlayer(e.target.value)}
            /><br />
            <TextField
                label="Heslo"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /><br />
            <Button type="submit" variant="contained" color="primary">Prihlásiť sa</Button>
            <p>
                Nemáš účet? <Link to="/register">Zaregistruj sa</Link>
            </p>
        </form>
    );
}

export default Login;
