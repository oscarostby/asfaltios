const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  credentials: true,
}));

const connectionString = process.env.MONGODB_URI;
console.log('Connecting to MongoDB with URI:', connectionString.replace(/\/\/.*@/, '//****:****@'));

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
  profilePictureUrl: { type: String, default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Osama_bin_Laden_portrait.jpg/250px-Osama_bin_Laden_portrait.jpg' },
  admin: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  mainText: { type: String, required: true },
  fileUrl: { type: String },
  iconImageUrl: { type: String, required: true },
});

const Item = mongoose.model('Item', itemSchema);

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
    const newUser = new User({ 
      username, 
      password: hashedPassword,
      admin: false
    });
    const savedUser = await newUser.save();
    console.log('User saved:', savedUser);
    res.cookie('isLoggedIn', true, { httpOnly: true, sameSite: 'strict' });
    res.cookie('userId', savedUser._id, { httpOnly: true, sameSite: 'strict' });
    res.status(200).json({ message: 'User registered successfully', userId: savedUser._id });
  } catch (error) {
    console.error('Error saving user:', error);
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
    res.status(200).json({
      username: user.username,
      profilePictureUrl: user.profilePictureUrl,
      admin: user.admin
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the user' });
  }
});

app.post('/api/users/:userId/updateProfilePicture', async (req, res) => {
  const { userId } = req.params;
  const { profilePictureUrl } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.profilePictureUrl = profilePictureUrl;
    await user.save();
    res.status(200).json({ message: 'Profile picture updated successfully', profilePictureUrl });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the profile picture' });
  }
});

app.post('/upload', async (req, res) => {
  try {
    const { title, mainText, fileUrl, iconImageUrl } = req.body;
    if (!iconImageUrl) {
      return res.status(400).json({ error: 'iconImageUrl is required' });
    }
    const newItem = new Item({ title, mainText, fileUrl, iconImageUrl });
    await newItem.save();
    res.status(200).json({ message: 'Item uploaded successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

app.get('/list/:searchTerm', async (req, res) => {
  const { searchTerm } = req.params;
  const { sort, category } = req.query;
  try {
    const query = { title: { $regex: searchTerm, $options: 'i' } };
    if (category) {
      query.category = category;
    }
    const items = await Item.find(query).sort(sort ? { downloads: sort === 'desc' ? -1 : 1 } : {});
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the items' });
  }
});

let message = '';

app.post('/api/message', async (req, res) => {
  const { newMessage } = req.body;
  if (!newMessage) {
    return res.status(400).json({ error: 'Message content is required' });
  }
  message = newMessage;
  res.status(200).json({ message: 'Message saved successfully' });
});

app.get('/api/message', (req, res) => {
  res.status(200).json({ message });
});

app.get('/test-users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
