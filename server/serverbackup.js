const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'https://api.asfaltios.com/', // Replace with your client-side URL
  credentials: true, // Allow sending cookies
}));

const connectionString = process.env.MONGODB_URI;
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Failed to connect to MongoDB:', error);
});
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  mainText: { type: String, required: true },
  fileUrl: { type: String, required: true },
  iconImageUrl: { type: String, required: true },
});

const Item = mongoose.model('Item', itemSchema);

const upload = multer({ dest: 'uploads/' }); // Configure multer for file uploads

app.post('/register', async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  if (!username || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    // Set cookies on the client-side
    res.cookie('isLoggedIn', true, { httpOnly: true, sameSite: 'strict' });
    res.cookie('userId', newUser._id, { httpOnly: true, sameSite: 'strict' });
    res.status(200).json({ message: 'User registered successfully', userId: newUser._id });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Username not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Incorrect password' });
    }
    // Set cookies on the client-side
    res.cookie('isLoggedIn', true, { httpOnly: true, sameSite: 'strict' });
    res.cookie('userId', user._id, { httpOnly: true, sameSite: 'strict' });
    res.status(200).json({ message: 'User logged in successfully', userId: user._id });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

app.get('/api/users/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ username: user.username });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the user' });
  }
});

////////////////////////////////////////////////////////////////////////

app.post('/api/upload', upload.fields([{ name: 'file' }, { name: 'iconImage' }]), async (req, res) => {
  const { title, mainText } = req.body;
  const file = req.files['file'][0];
  const iconImage = req.files['iconImage'][0];

  // Save the uploaded data to the database
  try {
    const newItem = new Item({
      title,
      mainText,
      fileUrl: file.path,
      iconImageUrl: iconImage.path,
    });
    await newItem.save();
    res.status(200).json({ message: 'Upload successful' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while uploading data' });
  }
});

// Route for fetching items based on search term
app.get('/api/items', async (req, res) => {
  const { searchTerm } = req.query;

  try {
    const regex = new RegExp(searchTerm, 'i'); // Create a case-insensitive regular expression
    const items = await Item.find({ $or: [{ title: regex }, { mainText: regex }] });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching items' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});