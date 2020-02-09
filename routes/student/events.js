const app = require('express');
const router = app.Router();
const Eventmodel = require('../../models/events');

//List of events in a clg
router.get('/', async (req, res) => {
    try {
            const data=await Eventmodel.find({
                clgid: req.query.clgid,
                block: false,
            }
            );
            res.status(200).send(data).end();
    }
    catch{
        console.log("Please check the connection buddy");
        res.status(404).send("Smtng went wrong").end();
    }
});

//Search event with unique id
router.get("/search", async (req, res) => {
    try {
        const id = req.query.id;
        var data =
            await Eventmodel.find({
                $or: [{
                }, {
                    clgid: "biher"
                }],
                _id: id,
                block: false,
            }
            );
            res.status(200).send(data).end();
    }
    catch{
        console.log("Please check the connection buddy");
        res.status(404).send("Smtng went wrong").end();
    }
});

// router.get('/nearesteves', async (req, res) => {
//     try {
//         const result = await eventmodel.find({
//             loc: {
//                 $near: {
//                     $geometry: {
//                         type: 'Point',
//                         coordinates: [req.query.longitude, req.query.latitude]
//                     },
//                     $maxdistance: parseInt(req.query.distance) * 1000
//                 }
//             }
//         }).limit(5).lean();
//         if (result.length < 1) {
//             res.status(404).send('nothing found invalid input');
//         } else {
//             res.status(200).send(result).end();
//         }
//     } catch (error) {
//         res.status(400).send('Something went wrong').end();
//     }
// });

//Creating Event by passing 8 parameters
router.get('/create', async (req, res) => {
    const clg_id = "biher";
    const _id = Math.floor(Math.random() * 90000) + 10000;
    try {
        Eventmodel.init();
        const event = Eventmodel({
            _id: "flutter frame",
            clgid: "biher",
            createdby:"falksdjro",
            title: "Test Title",
            description: "Temp Description",
            image: "http://varunvorld.ml/v.jpg",
            host: "Linda Medam",
            place: "Hungama hall",
            loc: "12.9:12.8",
            time: "Jan 20, 2020",
            fee: "free",
            block: false,
            mobile: "9515792944",
            email: "contact@dummyevent.com",
        });
        const data= await event.save();
        res.status(200).send(data).end();
    }
    catch (err) {
        console.log("Creation failed at init stage");
        res.send(`Thusss... ${err} `);
    }
});

module.exports = router;