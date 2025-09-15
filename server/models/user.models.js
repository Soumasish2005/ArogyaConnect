import mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "First Name must contains at least 3 characters"],
    },
    lastName: {
      type: String,
      minlength: [3, "First Name must contains at least 3 characters"],
    },
  },
  email: {
    type: String,
    required: true,
    minlength: [5, "Email Must Contains at least 5 chars"],
  },
  password: {
    type: String,
    required: true,
    select : false
  },

  socketId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}
userSchema.methods.comparePassword = async function(password){
    const isEqual = await bcrypt.compare(password, this.password);
    return isEqual;
}
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
}
const userModel = mongoose.model('user', userSchema);
export default userModel;