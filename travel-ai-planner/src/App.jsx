import { useState } from 'react'

import './App.css'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2>welcome to travel ai</h2>
      <Button>Subscribe</Button>
    </>
  )
}

export default App
