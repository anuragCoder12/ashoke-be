const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const { isEmail } = require("validator");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "please enter the email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "please enter the password"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
  },
  { timestamps: true }
);

// fire function after saving doc
// userSchema.post('save', function (doc, next) {
//     console.log("fired after save:", doc)
//     next()
// })

// fire function before saving doc
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = bcrypt.hashSync(this.password, salt)
    next()
})

// static login method 
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email })
  if (user) {
    const auth = await bcrypt.compare(password, user.password)
    if (auth) {
      return user
    }
    throw Error('incorrect password')
  }
  throw Error('incorrect email')
}
const User = mongoose.model("User", userSchema);
module.exports = User