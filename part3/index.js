const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('content', (request) =>
  request.method === 'POST' && request.body.name
    ? JSON.stringify(request.body)
    : null
)

let persons =[
      { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      }
    ]


    app.get('/api/persons', (req,res) => {
        res.json(persons)
    })
    
    app.get('/info', (req,res) => {
        let contacts = persons.length
        let timestamp = new Date();
        res.send(`Phonebook has info for ${contacts} people <br>${timestamp}`)
        
    })
    
    app.get('/api/persons/:id', (req,res) =>{
        const id = Number(req.params.id)
        const person = persons.find(person => person.id === id)
        if (person){
            res.json(person)
        }
        else{
            res.status(404).end()
        }
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
    
    app.post('/api/persons',(req,res) => {
        const body = req.body

        if(!body.name && !body.number){
            return res.status(400).json({
                error: 'name and number missing'
            })
        }
    
        if(!body.name){
            return res.status(400).json({
                error: 'name missing'
            })
        }
    
        if(!body.number){
            return res.status(400).json({
                error: 'number missing'
            })
        }

        const person ={
            name: body.name,
            number: body.number,
            id: generateId()
        }
    
        if(personExists(body.name)){
            return res.status(400).json({
                error: 'name must be unique'
            })
        } else {
            persons = persons.concat(person)
            res.json(person)}
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
        }
    )
    
    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
    