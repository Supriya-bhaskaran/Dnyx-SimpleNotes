const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let cached = false;

async function connectDB() {
    if (cached) return;

    await mongoose.connect(process.env.MONGO_URI);
    cached = true;
}

app.get("/", (req, res) => {
    res.send("API Working");
});

app.get("/notes", async (req, res) => {
    await connectDB();
    const Note = require("../models/Note");
    const notes = await Note.find();
    res.json(notes);
});

app.post("/notes", async (req, res) => {
    await connectDB();
    const Note = require("../models/Note");
    const note = await Note.create(req.body);
    res.json(note);
});

module.exports = app;