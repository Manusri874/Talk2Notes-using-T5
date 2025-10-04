const express = require("express");
const multer = require("multer");
const upload = multer();
const app = express();
const port = 4000;

app.use((req, res, next) => {
    // Allow CORS for dev (if frontend runs on a different port)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post("/api/transcribe", upload.single("file"), async (req, res) => {
    console.log("Received file:", req.file?.originalname, req.file?.mimetype);
    // Simulate processing time:
    await new Promise((r) => setTimeout(r, 2000));

    // Return a mocked transcript/summary/action items:
    const transcript = This is a sample transcript of the uploaded audio(mock).Speaker 1: Hello everyone.Speaker 2: Welcome to the meeting.;
    const summary = Meeting started with welcome.Discussed project goals and next steps.;
    const action_items = [
        "Share project timeline by Friday",
        "Assign tasks for sprint 1",
        "Set up follow-up meeting next Wednesday"
    ];

    res.json({ transcript, summary, action_items });
});

app.listen(port, () => {
    console.log(Mock backend listening at http://localhost:${port});
});