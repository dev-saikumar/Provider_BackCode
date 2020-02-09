const router = require('express').Router();
const eventmodel = require('../../models/events');

//List of events in a clg
router.get('/', async (req, res) => {
    console.timeLog
    try {
        const clg_id = req.query.clg_id;
        const branch = req.query.branch;
        eventmodel("events").find({
            clgid: "biher",
            block: false,
            // access: req.query.access
        }
        ).then((data) => {
            console.log(`Events list : ${data}`);
            res.send(data);
        });
    }
    catch{
        console.log("Please check the connection buddy");
        res.send("Smtng went wrong");
    }
});

//Search event with unique id
router.get("/search", async (req, res) => {
    try {
        const id = req.query.id;
        const clgid = req.query.clgid
        await eventmodel("events").find({
            // $or: [{
            //     visibility: true
            // }, {
            //     clgid: "biher"
            // }],
            clgid: clgid,
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

//Near events list
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
    const clg_id = req.query.clgid;
    const _id = req.query.id;
    // const _id = Math.floor(Math.random() * 90000) + 10000;
    try {
        eventmodel("events").create({
            _id: _id,
            clgid: "biher",
            createdby: "12121",
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
            // access: ["cse-a"]
        }).then((doc) => {
            console.log(doc);
            res.send(`Event created successfully : ${doc}`);
        }).catch((err) => {
            console.log(err);
            res.send(err);
        });
    }
    catch (err) {
        console.log("Creation failed at init stage");
        res.send("Thusss..." + err + " is error ");
    }
})

//Update event
router.get("/update", (req, res) => {
    var id = req.query.id;
    eventmodel(clg_id + "events").updateOne({ _id: id }, {
        _id: _id,
        clgid: "biher",
        createdby: "12121",
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
        // access: ["cse-a"]
    }).then((data) => {
        console.log("Updated successfully");
        res.send(data);
    }).catch((err) => {
        console.log("failed to update" + err);
        res.end(err);
    })
})

//Delete event
router.get("/delete", (req, res) => {
    var id = req.query.id;
    eventmodel("events").deleteOne({ _id: id }).then((data) => res.end(data)).catch((err) => res.end(err));
})
module.exports = router;