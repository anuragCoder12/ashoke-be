const User = require("../models/user")
const jwt = require('jsonwebtoken')
// error handling
const handleErrors = (err) => {
    let errors = { email: "", password: "" };
    
    if (err.message === "incorrect email") { 
        errors.email = "Incorrect email"
        return errors
    }
    if (err.message === "incorrect password") {
      errors.password = "Incorrect password";
      return errors;
    }
    if (err.code === 11000) {
        errors.email = "Email already exist"
        return errors
    }
  // duplicate errors
  console.log(err.code);
    // validation errors
    if (err.message.includes("User validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
          errors[properties.path] = properties.message
        });
        return errors
    }
    return errors
}

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: maxAge,
    });

}

const handleSignUp = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = new User({ email, password })
        await user.save()
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user: user._id })
    } catch (error) {
        const errors = handleErrors(error)
        res.status(500).json({ errors});
    }
}

const handleLogIn = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
         const token = createToken(user._id);
          res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
          res.status(201).json({ user: user._id, token });
    } catch (error) {
        const errors = handleErrors(error)
        res.status(500).json({ errors });
    }
}

module.exports = {
    handleSignUp,
    handleLogIn
}