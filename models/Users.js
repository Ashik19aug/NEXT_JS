
const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
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
    email_verified_at: {
        type: String,
        required: [true, 'Please add']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        unique: true,
        maxlength: [40, 'Password cannot be more than 40 characters']
    },
    remember_token: {
        type: String,
        required: [true, 'Please add a remember_token'],
    },
    created_at: {
        type: String,
        required: [true, 'Please add created time'],
    },
    updated_at: {
        type: String,
        required: [true, 'Please add updated time '],
    }
})

module.exports = mongoose.models.Users || mongoose.model('Users', UsersSchema);