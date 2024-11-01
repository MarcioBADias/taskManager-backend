const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    cost: {
        type: Number,
        require: true
    },
    deadline: {
        type: Date,
        require:true
    },
    order: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('Task', taskSchema)