const Persons = ({ persons, onDelete }) => {
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