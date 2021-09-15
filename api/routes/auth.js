const router = require("express").Router();

const User = require("../models/User");


//sign up
router.post("/register", async (req, res) => {
    try {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

//log in
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(400).json("User doesnt exist");
        
        if(user.password === req.body.password){
            const { password, ...others } = user._doc;
            res.status(200).json(others);
        }else{
            res.status(404).json("Wrong password");
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;