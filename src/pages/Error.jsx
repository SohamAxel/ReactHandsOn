import React from 'react'
import { useRouteError } from 'react-router-dom'

const Error = () => {
  const error = useRouteError()
  return (
    <>
      <h1>Error - Something went wrong</h1>
      <pre>{error.message}</pre>
    </>
  )
}

export default Error