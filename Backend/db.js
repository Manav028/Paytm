const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://manavpateluk:Manav123@cluster0.mbyqjix.mongodb.net/Paytm");

const User = mongoose.model('User',{
    email : {type:String,required:true,unique:true},
    password : {type:String,required:true},
    firstname : {type:String,required:true},
    lastname: {type:String,required:true}
});

const Account = mongoose.model('Account',{
    userid : {type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    balance : {type: Number,required:true}
})

module.exports = {
    User,
    Account
};
