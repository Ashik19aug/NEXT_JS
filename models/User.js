
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        maxlength: [40, 'Name cannot be more than 40 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add a email'],
        unique: true,
        maxlength: [40, 'Email cannot be more than 40 characters']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        unique: true,
        maxlength: [40, 'Password cannot be more than 40 characters']
    }
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);