const express = require("express");
const router = express.Router();    
const z = require("zod");
const { User , Account } = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_PASS} = require("../config");
const { authmiddleware } = require("../middleware");

const userzod = z.object({
    email: z.string({ required_error: "Email is required" }).email({ message: "Email is Invalid" }),
    password: z.string({ required_error: "Password is required" }).min(5, { message: "Password must be of at least 5 letters" }),
    firstname: z.string({ required_error: "FirstName is required" }).min(5, { message: "FirstName must be of at least 5 letters" }),
    lastname: z.string({ required_error: "LastName is required" }).min(5, { message: "LastName must be of at least 5 letters" }),
});

const siginzod = z.object({
    email : z.string({required_error:"Email is required"}).email({message:"Email is not valid"}),
    password: z.string({ required_error: "Password is required" }).min(5, { message: "Password must be of at least 5 letters" })
})

const updatebody = z.object({
    password : z.string().optional(),
    firstname : z.string().optional(),
    lastname : z.string().optional()
})

router.post("/signup",async(req,res)=>{
    const user = req.body.user
    const userdata = userzod.safeParse(user);
    if(userdata.success){
        const userexist = await User.findOne({email:userdata.data.email})
        if(userexist){
            return res.json({msg:"User has already register please sign in"})
        }
        else{
            const newuser = await User.create({
                email : userdata.data.email,
                password : userdata.data.password,
                firstname : userdata.data.firstname,
                lastname : userdata.data.lastname
            })
            const userid = newuser._id;

            const newAccount = await Account.create({
                userid,
                balance : Math.round((Math.random()*10000)*100) / 100
            })

            const token = jwt.sign({userid:userid},JWT_PASS);
            return res.json({msg:"User created succesfully Token : "+token});
        }
    }else{
        res.json({msg:"Data is incorrect"});
    }
})

router.post("/signin",async(req,res)=>{
    const user = req.body.user; 
    const userdata = siginzod.safeParse(user)
    console.log(userdata)
    if(userdata.success){
        const existuser = await User.findOne({ email: userdata.data.email, password: userdata.data.password });
        console.log(existuser)
        if(existuser){
            const token = jwt.sign({userid:existuser._id},JWT_PASS)
            return res.json({msg:"User Sign in Succesfully Token : "+token})
        }else{
            return res.json({msg:"User Need to create a Account / Check Email and password again"})
        }
    }else{
        return res.json({msg:"User email and password is not proper"})
    }
})

router.put("/",authmiddleware,async(req,res)=>{
    const { success } = updatebody.safeParse(req.body)
    if(success){
        console.log(req.body)
        await User.updateOne({_id:req.userID},req.body)
        res.json({message:"Update succesfully"})
    }else{
        res.status(411).json({message:"Error while updating information"})
    }
})

router.get("/search",async(req,res)=>{
    const filter = req.query.filter || "";
    const editfilter = filter[0].toLowerCase() + filter.slice(1)
    const editfilter2 = filter[0].toUpperCase() + filter.slice(1);
    console.log(filter,editfilter,editfilter2)
    const users = await User.find({$or:
        [{firstname:{"$regex":editfilter}},{lastname:{"$regex":editfilter}},
        {firstname:{"$regex":editfilter2}},{lastname:{"$regex":editfilter2}}
    ]})
    res.json({
        user : users.map((userr)=>({
            username : userr.email,
            firstname : userr.firstname,
            lastname : userr.lastname
        }))
    })
})  

router.get("/", (req, res) => {
    res.send("Welcome to the user registration API");
});

module.exports = router;


// {
//     "user": {
//         "email": "jeet.uk@gmail.com",
//         "password": "456789",
//         "firstname": "jeett",
//         "lastname": "noticewala"
//     }
// }


// {
//     "authoriztion" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NjlkNmQ2ZmM3ODBmNzFlYzUxMmVlNDgiLCJpYXQiOjE3MjE1OTUwODh9.7rHC3vkVVQdzhW_pRlB9WjXHBLazT-8qDH_NMQIODX0",
//     "firstname": "jeetssss",
//     "lastname" : "noticewalaaaa",
//     "password" : "jeet123"
// }