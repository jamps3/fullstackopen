import axios from "axios"

const Persons = ({ persons, setPersons }) => {
  const onDelete = (id, name) => {
    console.log("delete")
    const confirmed = window.confirm(`Delete ${name}?`)
      if (confirmed) {
        axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(`Person '${name}' was already removed from server`)
          setPersons(persons.filter(person => person.id !== id))
        })
      }
  }

  return (
    <ul>
      {persons.map(person => (
        <li key={person.name}>
          {person.name} {person.number}
          <button type="button" onClick={() => onDelete(person.id, person.name)}>delete</button>
        </li>
      ))}
    </ul>
  )
}

export default Persons