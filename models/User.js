const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

//Init User Model from UserSchema
const User = module.exports = mongoose.model('User', UserSchema);

//User model methods
module.exports.getUserById = (id, callback) => {
  User.findById(id, '-password -__v')
    .exec(callback);
}

module.exports.getUserByEmail = (email, callback) => {
  let query = {
    email: email
  };
  User.findOne(query)
    .exec(callback);
}

module.exports.registerUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        return console.error(`Error hashing newUser password:... ${err}`);
      }

      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.comparePassword = (candidatePassword, userPassword, callback) => {
  bcrypt.compare(candidatePassword, userPassword, (err, isMatched) => {
    if (err) {
      return console.error(`Error comparing password ${err}`);
    }

    callback(null, isMatched);
  });
}