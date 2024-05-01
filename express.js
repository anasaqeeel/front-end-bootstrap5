const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all domains

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
    console.log('Received login request:', email, password);

    try {
        const user = await User.findOne({ email }).exec(); // Use exec() to ensure a proper promise is returned
        console.log('MongoDB Query:', { email }); // Log the query to see what is being searched
        console.log('User found in database:', user); // This will show the user object or null

        if (!user) {
            console.log('No user found with email:', email);
            return res.status(404).json({ message: 'User not found' });
        }

        if (password === user.password) {
            console.log('Password match, login successful');
            return res.json({ message: 'Login successful' });
        } else {
            console.log('Password mismatch');
            return res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
