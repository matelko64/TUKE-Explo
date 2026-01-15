import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        <div>
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Player"
                value={player}
                onChange={(e) => setPlayer(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
}

export default Register;
