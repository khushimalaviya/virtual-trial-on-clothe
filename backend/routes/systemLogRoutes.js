const express = require("express");
const router = express.Router();
const SystemLog = require("../models/SystemLog");

// Add a new system log entry
router.post("/", async (req, res) => {
    try {
        const { event, user_id, status, details } = req.body;
        const newLog = new SystemLog({
            event,
            user_id,
            status,
            details,
            timestamp: new Date()
        });

        await newLog.save();
        res.status(201).json({ message: "System log added successfully", log: newLog });
    } catch (error) {
        res.status(500).json({ message: "Error adding system log", error });
    }
});

// Get all system logs
router.get("/", async (req, res) => {
    try {
        const logs = await SystemLog.find().sort({ timestamp: -1 });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving system logs", error });
    }
});

// Get system logs by user ID
router.get("/user/:user_id", async (req, res) => {
    try {
        const logs = await SystemLog.find({ user_id: req.params.user_id }).sort({ timestamp: -1 });
        if (logs.length === 0) {
            return res.status(404).json({ message: "No logs found for this user" });
        }
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving system logs", error });
    }
});

// Get system logs by status
router.get("/status/:status", async (req, res) => {
    try {
        const logs = await SystemLog.find({ status: req.params.status }).sort({ timestamp: -1 });
        if (logs.length === 0) {
            return res.status(404).json({ message: `No logs found with status: ${req.params.status}` });
        }
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving system logs", error });
    }
});

// Delete a system log entry by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedLog = await SystemLog.findByIdAndDelete(req.params.id);
        if (!deletedLog) {
            return res.status(404).json({ message: "System log not found" });
        }
        res.json({ message: "System log deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting system log", error });
    }
});

module.exports = router;
