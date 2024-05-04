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
    let flag=true;
    if ((!email.includes('@')) || (!email) || (!password || password.length < 5)) {
        flag=false;
    }
    if (flag)
        {
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
        }
    else{
        res.send(`wrong email or pass !`)
    }
    
   
});
//validation
app.post('/signUP', async (req, res) => {
    const { email, password } = req.body;
    console.log('Received login credientials are >> : ', email, password);

    let flag=true;
    if ((!email.includes('@')) || (!email) || (!password || password.length < 5)) {
        flag=false;
    }
    if(flag){
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    }
    else{
        res.send(`wrong email or pass !`)
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
