import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)  

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
      const confirmed = window.confirm(`Update ${newName}?`)
        if (confirmed) {
          const personToUpdate = persons.find(p => p.name === newName)
          const updatedPerson = { ...personToUpdate, number: newNumber }
          personService
            .update(personToUpdate.id, updatedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== personToUpdate.id ? p : returnedPerson))
              setNewName('') // clear input
              setNewNumber('') // clear input
              setNotificationMessage(`Updated '${newName}'.`)
              setNotificationType('success')
              setTimeout(() => {
                setNotificationMessage(null)
                setNotificationType(null)
              }, 5000)
            })
            .catch(error => {
              setNotificationMessage(`Information of '${newName}' has already been removed from server`)
              setNotificationType('error')
              setPersons(persons.filter(p => p.id !== personToUpdate.id))
              setTimeout(() => {
                setNotificationMessage(null)
                setNotificationType(null)
              }, 5000)
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
        setNotificationMessage(`Added '${newName}'.`)
        setNotificationType('success')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationType(null)
        }, 5000)
      })
      .catch(error => {
        setNotificationMessage('Failed to add person.')
        setNotificationType('error')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationType(null)
        }, 5000)
      })
  }

  const handleDelete = (id, name) => {
    const confirmed = window.confirm(`Delete ${name}?`)
    if (confirmed) {
      personService
        .deletePerson(id)
        .then(() => {
          setNotificationMessage(`Deleted '${name}'.`)
          setNotificationType("success")
          setPersons(persons.filter(person => person.id !== id))
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationType(null)
          }, 5000)
        })
        .catch(error => {
          setNotificationMessage(`Person '${name}' was already removed from server`)
          setNotificationType("error")
          setPersons(persons.filter(person => person.id !== id))
          setTimeout(() => {
            setNotificationMessage(null)
            setNotificationType(null)
          }, 5000)
        })
    }
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
      <Notification message={notificationMessage} type={notificationType} />
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
      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  )
}

export default App