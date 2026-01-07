import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [player, setPlayer] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // ✅ presunuté sem

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/register/login", {
                player,
                password
            });
            if (res.data === true) {
                navigate("/welcome");
            } else {
                alert("Login failed.");
            }
        } catch (err) {
            console.error("Error during login:", err);
            alert("Server error.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
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
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
