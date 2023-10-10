const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

console.log('conecting to', url)

mongoose.connect(url)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch(error => {
		console.log('error connecting to MongoDB: ', error.message)
	})

const phonebookSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true
	},
	number: {
		type: String,
		required: true,
		minLength: 8,
		validate: {
			validator: (v) => {
				return /^(\d{2,3})-(\d+)$/.test(v)
			},
			message: props => `${props.value} is not a valid phone number!`
		}
	}
})

phonebookSchema.set('toJSON', {
	transform: (doc, returnedObj) => {
		returnedObj.id = returnedObj._id.toString()
		delete returnedObj._id
		delete returnedObj.__v
	}
})

module.exports = mongoose.model('Phonebook', phonebookSchema)