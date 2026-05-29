const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Note = require("../models/Note");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.get("/notes", async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

app.post("/notes", async (req, res) => {
    const note = await Note.create(req.body);
    res.json(note);
});

module.exports = app;