import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const mongoURI = process.env.MONGO_URI;

let client;

const connectClient = async () => {
  if (!client) {
    client = new MongoClient(mongoURI);
    await client.connect();
  }
};

const getAllUsers = (req, res) => {
  res.send("All users fetched");
};

const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    await connectClient();
    const db = client.db("kodbase");
    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({ username });

    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = { username, email, password: hashedPassword };
    const result = await usersCollection.insertOne(user);

    const token = jwt.sign({ id: result.insertedId }, process.env.JWT_SECRET_KEY);

    res.json({ token });
  } catch (err) {
    console.error(err);
    console.error("Error during sign up:", err, err.message);
    res.status(500).json({ message: "Sign up failed" });
  }
};

const logIn = (req, res) => {
  res.send("Logging in");
};

const getUserProfile = (req, res) => {
  res.send("Profile fetched");
};

const updateUserProfile = (req, res) => {
  res.send("Profile updated");
};

const deleteUserProfile = (req, res) => {
  res.send("Profile deleted");
};

export default {
  getAllUsers,
  signUp,
  logIn,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
