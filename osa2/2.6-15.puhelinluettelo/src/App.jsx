import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)
    if (nameExists) {
      /* alert(`${newName} is already added to phonebook`) */
      const confirmed = window.confirm(`Update ${name}?`)
        if (confirmed) {
          const personToUpdate = persons.find(p => p.name === newName)
          const updatedPerson = { ...personToUpdate, number: newNumber }
          personService
            .update(personToUpdate.id, updatedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== personToUpdate.id ? p : returnedPerson))
              setNewName('') // clear input
              setNewNumber('') // clear input
            })
            .catch(error => {
              alert(`Person '${newName}' was already removed from server`)
              setPersons(persons.filter(p => p.id !== personToUpdate.id))
            })
        }
      return
    }

    personService
      .create({ name: newName, number: newNumber })
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('') // clear input
        setNewNumber('') // clear input
      })
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} setPersons={setPersons} />
    </div>
  )
}

export default App