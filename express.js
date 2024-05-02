const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT=3000; 

const app = express();
app.use(bodyParser.json());
app.use(cors()); //enable cors


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/front_end')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model('login', UserSchema,'login');
 
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received login credientials are >> : ', email, password);
    const user = await User.findOne({ email }).exec(); 
    console.log('User found in database:', user); // This will show the user object or null

    if (!user) {
        console.log('No user found with this email >> :', email);
        return res.status(404).json({ message: 'User not found' });
    }

    if (password === user.password) {
        console.log('Password match, login successful');
        return res.json({ message: 'Login successful :) ' });
    } else {
        console.log('Password mismatch');
        return res.status(400).json({ message: 'Invalid credentials :( ' });
    }
});

app.post('/signUP', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        console.log('Received signup credentials:', email, password);

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Create new user and save to database
        const newUser = new User({ email, password });
        await newUser.save();
        
        // Respond with success if new user is created
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
