import axios from "axios"
import Notification from './components/Notification'

const Persons = ({ persons, setPersons }) => {
  const onDelete = (id, name) => {
    console.log("delete")
    const confirmed = window.confirm(`Delete ${name}?`)
      if (confirmed) {
        axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(() => {
          setNotificationMessage(`Deleted '${name}'.`)
          setNotificationType("success")
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setNotificationMessage(`Person '${name}' was already removed from server`)
          setNotificationType("error")
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