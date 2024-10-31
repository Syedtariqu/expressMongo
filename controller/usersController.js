const User = require('../model/userModel');
const CustomError = require('../util/customError');
const jwt = require('jsonwebtoken')
const signInToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECTRE, {
        expiresIn: '1h'
    })
}
exports.signup = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        //check all the fields are filled or not
        if (!name || !email || !password || !confirmPassword) {
            const err = new CustomError("please fill all the fields !", 400);
            next(err);
        }
        // Validate email format using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            const err = new CustomError("Invalid email format !", 400);
            return next(err);
        }

        if (password !== confirmPassword) {
            const err = new CustomError("Password doesn't matched !", 400);
            return next(err);
        }

        //Chcek the user is exist or not
        const isAlreadyExist = await User.findOne({ email });
        if (isAlreadyExist) {
            const err = new CustomError("User already Exist !", 400);
            next(err);
        }
        const user = await User.create({
            name,
            email,
            password,
            confirmPassword
        });
        res.status(201).json({
            status: "success",
            message: "User has been created successfully",
            user
        });
    } catch (error) {
        const err = new CustomError(error.message, 400);
        next(err);
    }

}
exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //check all the fields are filled or not
        if (!email || !password) {
            const err = new CustomError("Please fill all the fields !", 400);
            next(err);
        }
        // Validate email format using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            const err = new CustomError("Invalid email format !", 400);
            return next(err);
        }

        //check the user exist or not
        const user = await User.findOne({ email });
        if (!user) {
            const err = new CustomError("User Doesn't exist !", 400);
            next(err);
        }
        const isMatched = await user.comparePassword(password, user.password)
        if (!isMatched) {
            const err = new CustomError("Incorrect Password !", 400);
            return next(err);
        }
        // Exclude the password field before sending the response
        user.password = undefined;
        const token = await signInToken(user._id);
        res.status(200).json({
            status: 'success',
            token,
            user
        })
    } catch (error) {
        const err = new CustomError(error.message, 400);
        next(err);
    }

}

exports.protected = async (req, res, next) => {
  try {
    const testToken = req.headers.authorization;

    // Check if authorization header exists and starts with 'Bearer'
    if (!testToken || !testToken.startsWith('bearer')) {
      return next(new CustomError('You are not logged in!', 401));
    }

    // Extract token from 'Bearer <token>'
    const token = testToken.split(" ")[1];
    if (!token) {
      return next(new CustomError('You are not logged in!', 401));
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECTRE);


    // Attach decoded information to the request
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return next(new CustomError('Invalid token. Please log in again!', 401));
    }
    console.error("Error retrieving authorization header:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
