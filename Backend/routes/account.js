const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const z = require("zod");
const { User, Account } = require("../db");
const JWT_PASS = require("../config");
const { authmiddleware } = require("../middleware");
const Decimal = require("decimal.js");

router.get("/", (req, res) => {
    res.json({ msg: "Account API working properly" });
});

router.get("/balance", authmiddleware, async (req, res) => {
    const userbalance = await Account.findOne({ userid: req.userID });
    res.json({ Balance: userbalance.balance });
});

router.post("/transfer", authmiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { amount, to } = req.body;
    console.log(to,amount)
    const fromaccount = await Account.findOne({ userid: req.userID }).session(session);

    if (!fromaccount) {
        await session.abortTransaction();
        return res.json({ msg: "Invalid account" });
    }

    const fromBalance = new Decimal(fromaccount.balance);
    const transferAmount = new Decimal(amount);

    if (fromBalance.lessThan(transferAmount)) {
        await session.abortTransaction();
        return res.json({ msg: "User has insufficient balance" });
    }

    const toaccount = await Account.findOne({ userid: to }).session(session);
    if (!toaccount) {
        await session.abortTransaction();
        return res.json({ msg: "Invalid account" });
    }

    const newFromBalance = fromBalance.minus(transferAmount).toFixed(2);
    const newToBalance = new Decimal(toaccount.balance).plus(transferAmount).toFixed(2);

    await Account.updateOne({ userid: req.userID }, { balance: newFromBalance }).session(session);
    await Account.updateOne({ userid: to }, { balance: newToBalance }).session(session);

    await session.commitTransaction();
    session.endSession();

    res.json({ msg: "Transfer Successfully" });
});

module.exports = router;
