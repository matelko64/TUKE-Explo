import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box } from '@mui/material';

function Register() {
    const [player, setPlayer] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const res = await axios.post("https://tuke-explo-2.onrender.com/api/register", {
                player,
                password
            });
            if (res.status === 200) {
                alert("Registration successful!");
                navigate("/login");
            } else {
                alert("Registration failed.");
            }
        } catch (err) {
            console.error("Error during registration:", err);
            alert("Server error.");
        }
    };

    return (
        <form
            onSubmit={(e) => { e.preventDefault(); handleRegister(); }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh'
            }}>
            <h2>Registrácia</h2>
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
            <Button type="submit" variant="contained" color="primary">Registrovať sa</Button>
        </form>
    );
}

export default Register;
