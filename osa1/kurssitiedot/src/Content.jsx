const Content = (props) => {
    console.log(props)
    return (
        <p>
        {props.part} {props.exercises}
        </p>
    )
}

export default Content;