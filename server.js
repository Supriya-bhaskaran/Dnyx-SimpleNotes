const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Note = require("./models/Note");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Backend Working");
});

app.post("/notes", async (req, res) => {

    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({
            message: "Title and description required"
        });
    }

    try {

        const newNote = new Note({
            title,
            description
        });

        await newNote.save();

        res.status(201).json(newNote);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});

app.get("/notes", async (req, res) => {

    try {

        const notes = await Note.find();

        res.json(notes);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});

app.delete("/notes/:id", async (req, res) => {

    try {

        await Note.findByIdAndDelete(req.params.id);

        res.json({
            message: "Note Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});

app.put("/notes/:id", async (req, res) => {

    const { title, description } = req.body;

    try {

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true }
        );

        res.json(updatedNote);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});