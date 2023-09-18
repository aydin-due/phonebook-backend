const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(express.json())
app.use(cors())

morgan.token('req-body', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :req-body')
)

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const person = {
        id: Math.floor(Math.random() * 1000000),
        name: req.body.name,
        number: req.body.number,
    }

    if (!person.name || !person.number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    }

    if (persons.find(p => p.name === person.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    persons = persons.concat(person)
    res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})