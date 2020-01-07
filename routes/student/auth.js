const router = require("express").Router();
const M = require("../../models/about");
const crypto=require('crypto'),algorithm='aes-256-ctr',password = 'd6Fkjh2j3hk';
var Model;
router.get("/signin", async (req, res) => {
    try {
        Model = M.exp(req.query.clgid + "users");
        var response = await Model.findOne({
            _id: req.query.gid
        }, {
            attendance: 0,
            results: 0,
        }).lean();
        if (response!=null) {
            if (response.gid == req.query.gid)
                res.status(200).json(response).end();
            else
            res.status(404).send("wrong credentials or someone registed already").end();
        } else {
            res.status(404).send("not_found").end();
            console.log("here");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error).end();
    }
});

function encrypt(text){
    var cipher = crypto.createCipher(algorithm,password);
    var crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
  }

function decrypt(text) {
    var decipher=crypto.createDecipher(algorithm,password);
    var decrypt=decipher.update(text,'hex','utf8');
    decrypt+=decipher.final('utf8');
    return decrypt;
}

router.get("/signup", async (req, res) => {
    Model = M.exp(req.query.clgid + "users");
    try {
        const encstring=encrypt(req.query.uid);
        if(encstring.substring(0,7)==req.body.pin){
       const user = await Model.findOne({
            _id: req.query.uid
        }, {
            _id: 1,
            gid: 1,
            email: 1
        }).lean();
        if (user == null){ 
            res.status(404).send("user data not found").end();
        }
        else if (user.gid == undefined&&user.email==undefined) {
            var response = await Model.findOneAndUpdate({
                _id: req.query.uid
            }, {
                $set: {
                    gid: req.query.gid,
                    email: req.query.email,
                }
            }, {
                fields:{attendance:0,results:0,fee:0},
                new: true,
                upsert: true,
                useFindAndModify: true
            });
            res.status(200).send(response).end();
        } else {
            res.status(404).send("someone registered").end();
        }}
        else
          res.status(404).send("uniq id and pin are wrong").end();
    } catch (error) {
        res.status(400).send("something went wrong" + error).end();
    }
});



 router.get("/create", async (req, res) => {
//     Model = M.exp(req.query.clg_id + "users");
//     try {
//         let user = Model({
//             _id: "u17cs006",
//             busno: "0",
//             photourl: "http://loyaltybook.com/wp-content/uploads/2014/11/user.png",
//             name: "saikumar",
//             address: "Mig 156 aphb colony guntur",
//             mobno: "9989139063",
//             guardian: "father",
//             clsid: "12",
//             rollno: 15,
//             clgname: "biher",
//     });
//      const result= await user.save();
       const result= encrypt(req.query.text);
       const response=decrypt(result);
        res.send(result+response).status(200).end();
//     } catch (error) {
//        res.send("something went wrong").status(404).end();
//     }
 });

module.exports = router;