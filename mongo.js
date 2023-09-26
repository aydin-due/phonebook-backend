const mongoose = require('mongoose')
var name = null
var phone = null
var pw = null

if (process.argv.length == 5) {
    pw = process.argv[2]
    name = process.argv[3]
    phone = process.argv[4]
} else if (process.argv.length < 5) {
    pw = process.argv[2]
} else {
    console.log('not enough arguments')
    process.exit(1)
}



const url = `mongodb+srv://aydin:${pw}@fso.kpdbrfn.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema(
    {
        name: String,
        phone: String
    }
)

const Person = mongoose.model('Person', personSchema)

if (name && phone) {
    const person = new Person(
        {
            name: name,
            phone: phone
        }
    )
    
    person.save().then(
        res => {
            console.log(`added ${name} number ${phone} to phonebook`)
            mongoose.connection.close()
        }
    )
} else {
    Person.find({}).then(res => {
        console.log('phonebook:')
        res.forEach(p => {
            console.log(`${p.name} ${p.phone}`)
        })
        mongoose.connection.close()
    })
}
