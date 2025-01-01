```javascript
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// User Model
const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    email: String,
    password: String
}));

// Route for homepage
app.get('/', (req, res) => {
    res.send('Welcome to Tribal Website Backend');
});
// Route for Signup
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).send('User already exists');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(200).send('User created successfully');
});

// Route for Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    req.session.userId = user._id;
    res.status(200).send('Logged in successfully');
});

// Route for Contact Form
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    // Save contact message to the database or send email
    console.log('Message from contact form:', { name, email, message });
    res.status(200).send('Message received');
});

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
```
```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/tribal-db?retryWrites=true&w=majority
SESSION_SECRET=your-secret-key
```
