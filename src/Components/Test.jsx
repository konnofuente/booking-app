import React,{useContext} from 'react'
import { LocationContext } from '../Hooks/LocationContext'
import { useLocation } from 'react-router-dom'


function Test() {
    const location = useLocation()
    const data = location.state
    console.log(data.propertyId)

  return (
    <div style={{paddingTop:'400px'}}>
      
    </div>
  )
}

export default Test
