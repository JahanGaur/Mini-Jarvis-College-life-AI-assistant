const express = require("express");
const cors = require("cors");

const app = express();

// Allow frontend requests
app.use(cors());

// Parse JSON
app.use(express.json());

// Test GET route
app.get("/api/hello", (req, res) => {
    res.json({
        message: "Hello from backend!"
    });
});

// Test POST route
app.post("/api/chat", (req, res) => {
    const { prompt } = req.body;

    console.log(prompt);

    res.json({
        reply: `You said: ${prompt}`
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});