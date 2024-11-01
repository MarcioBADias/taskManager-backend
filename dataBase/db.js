const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose.connect('mongodb+srv://taskmanagerUser:taskmanagerUser@taskmanager-cluster.oopqc.mongodb.net/?retryWrites=true&w=majority&appName=taskmanager-cluster')
    .then(() => console.log('Mongo DB Atlas Connected'))
    .catch((error) => console.log(error))
}

module.exports = connectDatabase