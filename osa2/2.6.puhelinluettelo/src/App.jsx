import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = { name: newName, number: newNumber }
    setPersons(persons.concat(newPerson))
    setNewName('') // clear input
    setNewNumber('') // clear input
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={newFilter} onChange={handleFilterChange}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div>name: <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
          /></div>
        <div>number: <input
          value={newNumber}
          onChange={(event) => setNewNumber(event.target.value)}
          /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.filter(person =>
          person.name.toLowerCase().includes(newFilter.toLowerCase())
        ).map((person) =>
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
      <div>debug: {newName}</div>
      <div>debug: {newNumber}</div>
      <div>debug: {newFilter}</div>
    </div>
  )

}

export default App