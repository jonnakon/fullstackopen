require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person.jsx')

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('content', (request) =>
  request.method === 'POST' && request.body.name
    ? JSON.stringify(request.body)
    : null
)

app.get('/api/persons', (req,res) => {
    Person.find({}).then(persons=>{
        res.json(persons)
    })
})
    
app.get('/info', (req,res) => {
    let contacts = persons.length
    let timestamp = new Date();
    res.send(`Phonebook has info for ${contacts} people <br>${timestamp}`)
})

app.get('/api/persons/:id', (req,res) =>{
    Person.findById(req.params.id).then(person =>{
        res.json(person)
    })
})
    
app.delete('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})
    
 const generateId = () => {
    return Math.floor(Math.random() * (100 - 1) + 1);
}
    
const personExists = (name) => {
    return persons.some(person => person.name === name)
}

app.post('/api/persons', (req,res) =>{
    const body = req.body

    if(body.name === undefined){
        return res.status(400).json({error: 'name missing'})
    }
    if(body.number === undefined){
        return res.status(400).json({error: 'number missing'})
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson =>{
        res.json(savedPerson)
    })
})


app.put('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const body = req.body

    const personIdx = persons.find(person => person.id ===id)

    if(personIdx !== -1){
        persons[personIdx] ={
            ...persons[personIdx],
            name:body.name,
            number:body.number,
            id:id
            }
        res.json(persons[personIdx]);
    } else {
         // Person not found
        res.status(404).json({ error: 'Person not found' });
    }
})
    
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
    