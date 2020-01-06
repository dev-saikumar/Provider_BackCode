const router = require('express').Router();
const eventmodel = require('../../models/events');

router.get('/clgevelist', async (req, res) => {
    try {
        const result = await eventmodel.find({
            'clgid': req.query.clgid
        }).limit(5).lean();
        if (result.length < 1) {
            res.status(404).send("not found invalid input");
        } else {
            res.send(result).status(200).end();
        }
    } catch (error) {
        res.status(400).send("something went wrong try again").end();
    }
});

router.get('/nearesteves', async (req, res) => {
    try {
        const result = await eventmodel.find({
            loc: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [req.query.longitude, req.query.latitude]
                    },
                    $maxdistance: parseInt(req.query.distance)*1000
                }
            }
        }).limit(5).lean();
        if(result.length<1){
            res.status(404).send('nothing found invalid input');
        }else{
            res.status(200).send(result).end();        }
    } catch (error) {
        res.status(400).send('Something went wrong').end();
    }
});
