const Person = ({person, delPerson}) => (
      <li>
        {person.name} {person.number}
        <button onClick={() => delPerson(person.id)}>Delete</button>
      </li>
)

export default Person