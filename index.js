const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Atlas connection
mongoose.connect(
  "mongodb+srv://guptaranu719_db_user:LTqAi83uTD2Wz12B@cluster0.dqkvg1w.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => {
  console.log("✅ MongoDB connected");
})
.catch((error) => {
  console.error("❌ MongoDB connection error:", error);
});

// Schema
const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Message = mongoose.model("Message", MessageSchema);

// Routes
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.json({ success: true, message: "Message saved!" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to save message" });
  }
});

app.listen(5000, () => console.log("🚀 Backend running at http://localhost:5000"));
