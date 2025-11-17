const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const className = type ? `error ${type}` : 'error'

  return (
    <div className={className}>
      {message}
    </div>
  )
}

export default Notification