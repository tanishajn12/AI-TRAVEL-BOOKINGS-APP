import { useState } from 'react'
import Hero from './components/custom/Hero'
import Header from './components/custom/Header'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* Hero */}
      <Header/>
      <Hero/>
      
    </>
  )
}

export default App
