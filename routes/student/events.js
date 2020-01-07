const router = require('express').Router();
const eventmodel = require('../../models/events');

//List of events in a clg
router.get('/', async (req, res) => {
    try {
        const clg_id = req.query.clg_id;
        const branch = req.query.branch;
        const year = req.query.year;
        var data =
            await eventmodel(clg_id + "events").find({
                clgid: "biher",
                block: false,
                // access : req.query.access
            }
            ).then((data) => {
                console.log(`Events list : ${data}`);
                res.send(data);
            })
    }
    catch{
        console.log("Please check the connection buddy");
        res.send("Smtng went wrong");
    }
});

//Search event with unique id
router.get("/search", (req, res) => {
    try {
        const id = req.query.id;
        var data =
            await eventmodel("biher" + "events").find({
                $or: [{
                    visibility: true
                }, {
                    clgid: "biher"
                }],
                _id: id,

                block: false,
            }
            ).then((data) => {
                console.log(`Events list : ${data}`);
                res.send(data);
            })
    }
    catch{
        console.log("Please check the connection buddy");
        res.send("Smtng went wrong");
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
                    $maxdistance: parseInt(req.query.distance) * 1000
                }
            }
        }).limit(5).lean();
        if (result.length < 1) {
            res.status(404).send('nothing found invalid input');
        } else {
            res.status(200).send(result).end();
        }
    } catch (error) {
        res.status(400).send('Something went wrong').end();
    }
});

//Creating Event by passing 8 parameters
router.get('/create', async (req, res) => {
    const clg_id = "biher";
    const _id = Math.floor(Math.random() * 90000) + 10000;
    try {
        var data = await eventmodel(clg_id + "events").create({
            _id: _id,
            clgid: "biher",
            title: "Test Title",
            description: "Temp Description",
            image: "http://varunvorld.ml/v.jpg",
            host: "Linda Medam",
            place: "Hungama hall",
            time: "Jan 20, 2020",
            fee: "Free",
            visibility: true,
            block: false,
            mobile: "9515792944",
            email: "contact@dummyevent.com",
            access: ["cse-a"]
        }).then((doc) => {
            console.log(doc);
            res.send(`Event created successfully : ${doc}`);
        }).catch((err) => {
            console.log(err);
            res.send(err);
        });
        res.send(data);
    }
    catch (err) {
        console.log("Creation failed at init stage");
        res.send("Thusss..." + err + " is error ");
    }
})

module.exports = router;