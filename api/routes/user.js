const router = require("express").Router();

const User = require("../models/User");

//get a user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            const { password, ...others } = user._doc;
            res.status(200).json(others);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});

//update an user
router.put("/:id", async (req, res) => {
    try {
        if (req.body.userId === req.params.id) {
            try {
                const updatedUser = await User.findByIdAndUpdate(req.body.userId, {
                    $set: req.body
                }, { new: true });
                res.status(200).json(updatedUser);
            } catch (error) {
                res.status(400).json(error);
            }
        } else {
            res.status(403).json("you can't modify here");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;