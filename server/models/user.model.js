import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from "crypto"
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address.`,
      },
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid mobile number.`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [8,'Password must be at least 8 characters long.'],
    },
    avatar: {
      type: String,
      default: '',
    },
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    verified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: "",
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'deleted'],
      default: 'active',
    },
    addressDetails: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    }],
    shoppingcart:[ {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart',
    }],
    orderHistory: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    }],
    verficationToken:String,
    verificationtokenExpiry:Date,
    resetPasswordToken:String,
    resetPasswordTokenExpiry:Date
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateResetPasswordToken = async function(){
    const token = crypto.randomBytes(32).toString('hex');
    const resetToken = crypto.createHash('sha256').update(token).digest('hex');
    this.resetPasswordToken = resetToken;
    this.resetPasswordTokenExpiry = Date.now() + 30 * 60 * 1000; // 30 minutes
    return token;

}
const User = mongoose.model('User', userSchema);

export default User;
