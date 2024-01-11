import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import personService from './services/persons'
import Notification from './Components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) =>{
    event.preventDefault()
    const personObject ={
      name: newName,
      number: newNumber,
    }

    //check if person already exist
    const personExist = persons.find(person => 
      person.name.toLowerCase() === personObject.name.toLowerCase())

    //check if the number is same as new number 
    if (personExist && personExist.number === newNumber){
      window.alert(`${personExist.name} is already added to the phonebook!`)}


    //if the number is not the same change the number
    if (personExist && personExist.number !== newNumber){
      const confirm = window.confirm(`${personExist.name} is already added to phonebook, replace the old number with a new one?`)
        
        if(confirm){
          const numberUpdate = {...personExist, number: newNumber}
          
          personService
          .update(personExist.id, numberUpdate)
          .then(returnedPerson =>{
            setNewName('')
            setNewNumber('')
            setErrorMessage(
              `${personExist.name} number replaced`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(
            persons.map(person =>person.id !== personExist.id ? person : returnedPerson))})
          .catch(error =>
            setPersons(persons
              .filter(person => 
                person.name !== personExist.name
              )
            )
          )}}
    
    //if person doesnt exist       
    if(!personExist) {
        personService
          .create(personObject)
          .then(returnedPerson =>{
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setErrorMessage(
              `${personObject.name} added to phonebook `
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
        }
  }    

  const delPerson = (id) =>{
    const person = persons.find(p => p.id === id)
    const confirm = window.confirm(`Are you sure you want to delete ${person.name}`)
    if(confirm){
      personService
        .remove(id)
        .then(returnedPerson =>{
          persons.map(person =>person.id !== id ? person : returnedPerson)
          setErrorMessage(
            `${person.name} deleted`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)}
          )
      setPersons(persons.filter(person =>person.id !==id))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const personsFilter = 
    filter === ''  ? persons : persons.filter(person => 
      person.name.toLowerCase().includes(filter.toLowerCase()))



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter
        filter={filter}
        handleFilter={handleFilter}
      />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={personsFilter}
        delPerson={delPerson}
      />
    </div>
  )

}

export default App