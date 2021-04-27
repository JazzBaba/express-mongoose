const { ObjectID } = require('bson');
const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

const UserSchema = mongoose.Schema({
    _id: {
        type: ObjectID,
        require: true,
        default: () => new ObjectID()
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})


// hash the password
UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema)

User.createIndexes({name: 'text', email: 'text'});


module.exports = User;