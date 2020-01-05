const router = require('express').Router();
const fee = require('../models/feestruct');
const userfee = require('../models/about');

router.get("/listfee", async (req, res) => {
    try {
        const userfeemodel = userfee.exp(req.query.clgid+'users');
        const feemodel=fee.exp(req.query.clgid+'fee');
        const userfeelist = userfeemodel.aggregate({
            $match: {
                '_id': req.query.uid
            }
        }, {
            $project: {
                fee: 1,
                'fee.logs': 0
            }
        }, {
            $unwind: "$fee"
        }, {
            $limit: 5
        });
    let arr;
    userfeelist[0].fee.forEach(element => {
        arr.push(element._id);
    });
    const feedetails=feemodel.find({_id:{$in:arr}}).lean();
    } catch (error) {

    }
});

module.exports = router;