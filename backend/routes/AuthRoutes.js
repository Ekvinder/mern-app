const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router()
const User = require('../model/User');
const auth = require('../middleware/authMiddleware')
const {register,login} = require('../controllers/authcontroller')

router.post('/register', async (req,res) =>{
    const{name,email,password} = req.body;
    try{
        //check if user exists
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({msg: 'User already exists'});

        // hash password
        const hashedPassword = await bcrypt.hash(password,10);

        //create User
        const user = new User({name,email,password:hashedPassword});
        await user.save();
        
        res.status(201).json({ msg : 'User registered successfully'});
    }
    catch (err){
        res.status(500).json({msg: 'server error'});
    }

});


// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});






module.exports=router;