import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from '@mui/material';

function Register() {
    const [player, setPlayer] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/register", {
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
        <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
            <h2>Registrácia</h2>
            <TextField
                label="Prezývka"
                variant="outlined"
                value={player}
                onChange={(e) => setPlayer(e.target.value)}
            /><br /><br />
            <TextField
                label="Heslo"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /><br /><br />
            <Button type="submit" variant="contained" color="primary">Registrovať sa</Button>
        </form>
    );
}

export default Register;
