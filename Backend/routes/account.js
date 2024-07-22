const express = require("express")
const router = express.Router();
const mongoose = require("mongoose")
const z = require("zod")
const { Account } = require("../db")
const JWT_PASS = require("../config")
const {authmiddleware} = require("../middleware");

router.get("/",(req,res)=>{
    res.json({msg:"Account api working properly"})
})

router.get("/balance",authmiddleware,async(req,res)=>{
    const userbalance = await Account.findOne({userid:req.userID})
    res.json({Balance:userbalance.balance})
})

module.exports = router;