const express = require("express");
const cors = require("cors");

const chatRoutes = require("./routes/chat");
// const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
    res.send("Jarvis Backend Running");
});

// Routes
// app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});