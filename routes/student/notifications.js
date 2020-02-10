const router = require("express").Router();
const noti = require("../../models/collegesmetadata");

router.get('/', async (req, res) => {
    try {
        var data = await noti.find({ clgid: req.query.clgid }, {
            noti: 1
        });
        console.log(data+"kajdakjdlkajsldkja;ldk");
        if (data.length!= 0) {
            res.send(data);
        }else
        res.send("error"+data);
    }
    catch (err) {
        console.log(err);
        res.end(err);
    }

});

module.exports = router;