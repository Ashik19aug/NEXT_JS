const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        maxlength: [40, 'Name cannot be more than 40 characters']
    },
    language: {
        type: String,
        required: [true, 'Please add a language'],
        maxlength: [20, 'language cannot be more than 20 characters']
    },
    technology: {
        type: String,
        required: [true, 'Please add a technology'],
        maxlength: [200, 'technology cannot be more than 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    }
})

module.exports = mongoose.models.Project || mongoose.model('Project', ProjectSchema);