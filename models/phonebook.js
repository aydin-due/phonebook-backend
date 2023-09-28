const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

console.log('conecting to', url)

mongoose.connect(url)
.then(res => {
    console.log('connected to MongoDB')
})
.catch(error => {
    console.log('error connecting to MongoDB: ', error.message)
})

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
})

phonebookSchema.set('toJSON', {
    transform: (doc, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Phonebook', phonebookSchema)