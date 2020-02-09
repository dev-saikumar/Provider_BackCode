const router = require('express').Router();
const mymodel = require('../../models/collegesmetadata');

router.get('/listcolleges', async (req, res) => {
    try {
        const result = await mymodel.find({}).limit(8).lean();
        res.status(200).json(result).end();
    } catch (error) {
        res.status(400).send("soemthing went wrong").end();
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await mymodel.findOne({ id: req.query.id }, {
            _id: 0,
        }).lean();
        res.status(200).json(result).end();
    } catch (error) {
        res.status(400).send("something went wrong" + error).end();
    }
});

module.exports = router;