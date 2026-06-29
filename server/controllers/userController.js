import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { MongoClient, ObjectId } from "mongodb";
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

const getAllUsers = async (req, res) => {
  try {
    await connectClient();
    const db = client.db("kodbase");
    const usersCollection = db.collection("users");

    const users = await usersCollection.find().toArray();

    res.json(users);
  } catch (err) {
    console.error("Error during fetching users:", err, err.message);
    res.status(500).json({ message: "Server error" });
  }
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

    const token = jwt.sign(
      { id: result.insertedId },
      process.env.JWT_SECRET_KEY,
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    console.error("Error during sign up:", err, err.message);
    res.status(500).json({ message: "Sign up failed" });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    await connectClient();
    const db = client.db("kodbase");
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Your password is incorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token, userId: user._id });
  } catch (err) {
    console.error("Error during log in:", err, err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserProfile = async (req, res) => {
  const { id } = req.params;

  try {
    await connectClient();
    const db = client.db("kodbase");
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error during fetching user profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUserProfile = async function (req, res) {
  const { id } = req.params;
  const { email, password } = req.body;

  let updateFields = { email };

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    updateFields.password = hashedPassword;
  }

  try {
    await connectClient();
    const db = client.db("github-clone");
    const usersCollection = db.collection("users");

    const result = await usersCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { returnDocument: "after" },
    );

    if (!result.value) {
      return res.status(404).json({ message: "User not found" });
    }

    res.send(result.value);
  } catch (err) {
    console.error("Error during updating:", err, err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUserProfile = async (req, res) => {
  const { id } = req.params;

  try {
    await connectClient();
    const db = client.db("kodbase");
    const usersCollection = db.collection("users");

    const user = await usersCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User profile deleted" });
  } catch (err) {
    console.error("Error during fetching user profile:", err);
    console.error("Error during deletion:", err, err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  getAllUsers,
  signUp,
  logIn,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};
