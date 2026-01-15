import React, { useState, useEffect } from "react";
import axios from "axios";

function Welcome() {
    const [quests] = useState([
        { id: 0, requirement: "Complete 5 assignments", xp: 100, phrase: "test" },
        { id: 1, requirement: "Attend 3 lectures", xp: 200, phrase: "test" },
        { id: 2, requirement: "Submit a project proposal", xp: 150, phrase: "test" },
        { id: 3, requirement: "Participate in a group discussion", xp: 75, phrase: "test" },
        { id: 4, requirement: "Read 2 research papers", xp: 125, phrase: "test" },
        { id: 5, requirement: "Read 2 research papers", xp: 125, phrase: "test" }
    ]);

    const [currentQuestLine, setCurrentQuestLine] = useState(0);
    const [loading, setLoading] = useState(true);
    const [phraseInput, setPhraseInput] = useState("");

    useEffect(() => {
        const fetchQuestLine = async () => {
            const player = localStorage.getItem("player");
            if (player) {
                try {
                    const res = await axios.get(`http://localhost:8080/api/register/questLine/${player}`);
                    setCurrentQuestLine(res.data);
                } catch (err) {
                    console.error("Error fetching quest line:", err);
                }
            }
            setLoading(false);
        };
        fetchQuestLine();
    }, []);

    const completeQuest = async () => {
        const player = localStorage.getItem("player");
        const quest = quests[currentQuestLine];
        console.log("Attempting to complete quest:", { player, quest, currentQuestLine, phraseInput });
        if (!quest || !player) {
            console.error("Quest or player not found:", { quest, player });
            return;
        }

        if (phraseInput.trim().toLowerCase() !== quest.phrase.toLowerCase()) {
            alert("Incorrect phrase. Try again.");
            return;
        }

        try {
            console.log("Adding XP...");
            // Add XP
            await axios.post("http://localhost:8080/api/register/addXp", {
                player,
                amount: quest.xp
            });
            console.log("XP added successfully");

            console.log("Moving quest line...");
            // Move quest line
            await axios.post("http://localhost:8080/api/register/moveQuestLine", {
                player
            });
            console.log("Quest line moved successfully");

            setCurrentQuestLine(prev => prev + 1);
            setPhraseInput(""); // Clear input
            alert(`Quest completed! Gained ${quest.xp} XP.`);
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

    if (loading) return <div>Loading...</div>;

    const currentQuest = quests[currentQuestLine];

    return (
        <div style={{ position: 'relative', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h2>Welcome, you are logged in!</h2>
            {currentQuest ? (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: '2px solid #333',
                    borderRadius: '10px',
                    padding: '20px',
                    backgroundColor: '#f9f9f9',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    width: '300px',
                    textAlign: 'center'
                }}>
                    <h3>Current Quest</h3>
                    <p><strong>{currentQuest.requirement}</strong></p>
                    <p>Reward: {currentQuest.xp} XP</p>
                    <input
                        type="text"
                        value={phraseInput}
                        onChange={(e) => setPhraseInput(e.target.value)}
                        placeholder="Enter completion phrase"
                        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                    />
                    <button onClick={completeQuest}>Complete Quest</button>
                </div>
            ) : (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: '2px solid #333',
                    borderRadius: '10px',
                    padding: '20px',
                    backgroundColor: '#f9f9f9',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    width: '300px',
                    textAlign: 'center'
                }}>
                    <h3>All Quests Completed!</h3>
                    <p>Congratulations!</p>
                </div>
            )}
        </div>
    );
}

export default Welcome;