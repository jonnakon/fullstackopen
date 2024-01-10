import Person from './Person';

const Persons = ({ persons, delPerson }) => {
  return (
    <div>
      <ul>
        {persons
          .map(person => 
            <Person
              key={person.id}
              person={person}
              delPerson={delPerson}
            />
        )}
      </ul>
    </div>
  )
}

export default Persons;