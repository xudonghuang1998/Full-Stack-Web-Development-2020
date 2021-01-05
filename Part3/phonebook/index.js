require('dotenv').config()
const express = require('express')
const morgan = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')
const app = express()

const password = process.argv[2]
app.use(express.json())
morgan.token("data", (req, res) => {
    const { body } = req;
    return JSON.stringify(body);
});
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms :data")
);
app.use(cors())
app.use(express.static('build'))

const url = `mongodb+srv://fullstack:${password}@cluster0.dtl4x.mongodb.net/phonebook-app?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.get('/info', (req, res) => {
    Person.find({}).then(persons => {
        res.send(`<p>Phonebook has info for ${persons.length} people</p>`+ `<p>${new Date()}</p>`)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.post('/api/persons', (request, response,next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
        response.json(savedPerson)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if(person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put("/api/persons/:id", (req, res, next) => {
    const { number } = req.body
    const opts = { runValidators: true }
    Person.findByIdAndUpdate(req.params.id, { number }, opts )
        .then((updatedPerson) => {
            res.json(updatedPerson)
        })
        .catch((err) => next(err))
})


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})