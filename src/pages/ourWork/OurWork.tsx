import { useEffect } from 'react'

function OurWork() {
  useEffect(() => {
    document.title = "Our Work - Whiteboard";
  }, []);
  return (
    <div>OurWork</div>
  )
}

export default OurWork