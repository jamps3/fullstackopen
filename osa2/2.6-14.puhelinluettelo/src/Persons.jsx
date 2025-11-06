const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map(person => (
        <li key={person.name}>
          {person.name} {person.number}
          <button type="button" onClick={() => onDelete(person.name)}>delete</button>
        </li>
      ))}
    </ul>
  )
}

export default Persons