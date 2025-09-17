const Total = (props) => {
    console.log(props)
    return (
        <p>
        Total number of exercises: {props.exercises1 + props.exercises2 + props.exercises3}
        </p>
    )
}

export default Total;