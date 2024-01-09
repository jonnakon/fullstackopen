const Header = ({course}) => {
    return(
        <h2>{course}</h2>
    )
}
  
const Content = ({course}) => {
    return(
    
        <div>
        {course.map(({name,exercises,id}) =>
            <Part key={id} name={name} exercises={exercises}/>
            )}
        </div>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce( (sum, part) => {
        return sum + part.exercises
      },0)

      return(
        <b>Total of {total} exercises</b>
      ) 

}

const Part = ({name, exercises}) => {
    return (
        <p>{name} {exercises}</p>
    )
}

const Course = ({course}) => {

    return(
        <div>
            <Header key={course.id} course={course.name}/>
            <Content course={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course
