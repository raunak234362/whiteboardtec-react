import React, { useEffect } from 'react'

function Error() {
  useEffect(() => {
    document.title = 'Error 404!!'
  })

  return (
    <div>Error</div>
  )
}

export default Error