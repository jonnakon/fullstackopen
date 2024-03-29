const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const morgan = require('morgan')

const Person = require('./models/person.jsx')

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}

const errorHandler = (error, req, res,next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError'){
    return res.status(400).json({ error: error.message })}
  next(error)
}

const unknownEndpoint = (req,res) => {
  res.status(404).send({ error:'unknown endpoint' })
}
app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(express.static('dist'))

morgan.token('content', (req) =>
  req.method === 'POST' && req.body.name
    ? JSON.stringify(req.body)
    : null
)

app.get('/api/persons', (req,res, next) => {
  Person
    .find({})
    .then(persons => {
      res.json(persons)
    })
    .catch(error => next(error))
})

app.get('/info', (req,res, next) => {
  let timestamp = new Date()

  Person
    .find({})
    .then(persons => {res.send(`Phonebook has info for ${persons.length} people <br>${timestamp}`)})
    .catch(error => next(error))

})

app.get('/api/persons/:id', (req,res, next) => {
  Person
    .findById(req.params.id)
    .then(person => {
      if(person){
        res.json(person)
      }else{
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id',(req,res,next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.post('/api/persons', (req,res,next) => {
  const body = req.body

  if(!body.name || !body.number){
    return res.status(400).json({ error: 'name or number missing' })
  }else{

    const person = new Person({
      name: body.name,
      number: body.number
    })

    person.save().then(savedPerson => {
      res.json(savedPerson)
    })
      .catch(error => next(error))}
})


app.put('/api/persons/:id', (req,res,next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }
  Person
    .findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
