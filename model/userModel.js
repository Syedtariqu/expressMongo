const mongoose = require('mongoose');
var validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Field Is required"],
    },
    email :{
        type: String,
        required: [true, "Email Field Is Required"],
        unique: true,
        lowercase: true,
        validate : [validator.isEmail, "plase enter valid email"]
    },
    password:{
    type: String,
    required: [true, "Password Field Is Required"],
    minlength: 8 
    },
    confirmPassword:{
        type: String,
        required: [true, "Confirm Password Field Is Required"],
        minlength: 8 
    }
   
},{timestamps:true});

// Encrypt password before saving and remove confirmPassword field
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    // Hash the password with a cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined; // Remove confirmPassword field
  
    next();
  });

userSchema.methods.comparePassword= async function (pswd , pswdDb) {
    return await bcrypt.compare(pswd,pswdDb);
}  
const User = mongoose.model('User',userSchema);

module.exports = User;