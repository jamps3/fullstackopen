const Course = (props) => {
    console.log(props.course)
    return (
        <div>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
        </div>
    )
    }
    const Header = (props) => {
    console.log(props)
    return <h2>{props.course}</h2>
    }

    const Content = (props) => {
    return (
        <div>
        {props.parts.map(p => (
            <Part key={p.id} part={p.name} exercises={p.exercises} />
        ))}
        </div>
    );
    }

    const Part = (props) => {
    console.log(props)
    return (
        <p>
        {props.part} {props.exercises}
        </p>
    )
    }

    const Total = (props) => {
    console.log(props)
    const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <p><b>Total number of exercises: {total}</b></p>
    )
}

export default Course;