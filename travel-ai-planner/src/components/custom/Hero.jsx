import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'


function Hero() {
  return (
    <div>
        <Link to = {'/generate-itinerary'}>
            <Button>Get Started</Button>
        </Link>
    </div>
  )
}

export default Hero