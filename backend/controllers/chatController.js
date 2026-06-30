const db = require("../database/db");

// Chat History
exports.getHistory = (req, res) => {

    const userId = 1;

    db.all(
        `SELECT role, content, created_at
        FROM messages
        WHERE user_id = ?
        ORDER BY created_at`,
        [userId],
        (err, rows) => {

            if (err)
                return res.status(500).json({
                    error: err.message
                });

            res.json(rows);

        }
    );

};


exports.sendMessage = async (req, res) => {
    const userId = 1;
    const { message } = req.body;

    const reply = `You said: ${message}`;

    // Save user's message
    db.run(
        `INSERT INTO messages (user_id, role, content)
         VALUES (?, ?, ?)`,
        [userId, "user", message],
        (err) => {
            if (err) {
                return res.status(500).json({
                    error: err.message,
                });
            }

            // Save assistant's reply
            db.run(
                `INSERT INTO messages (user_id, role, content)
                 VALUES (?, ?, ?)`,
                [userId, "assistant", reply],
                (err) => {
                    if (err) {
                        return res.status(500).json({
                            error: err.message,
                        });
                    }

                    res.json({
                        reply,
                    });
                }
            );
        }
    );
};