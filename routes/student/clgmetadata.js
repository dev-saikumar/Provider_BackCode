const router=require('express').Router();
const model=require('../models/clgmetadata');

router.get('/listcolleges',async(req,res)=>{
    try {
        const result= await model.find({}).limit(8).lean();
        res.status(200).json(result).end();
    } catch (error) {
        res.status(400).send("soemthing went wrong").end();
    }
});

router.get('/getclgdetails',async(req,res)=>{
try {
    const result= await model.findOne({_id:req.query.clg}).lean();
    res.status(200).json(result).end();
} catch (error) {
    res.status(400).send("something went wrong").end();
}
});

module.exports=router;