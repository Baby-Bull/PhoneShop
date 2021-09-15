const router = require("express").Router();

router.get("/", async (req, res) => {
    res.send("ok ok comment");
})

module.exports = router;