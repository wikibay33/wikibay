import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  budget: {
    type: String,
    required: true,
  },
  ready: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  how: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  countryFlagCode: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const User = mongoose.models?.User || mongoose.model('User', userSchema);

export default User;