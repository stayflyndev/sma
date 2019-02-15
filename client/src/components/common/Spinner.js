import React from 'react'
import Spinner from './spinner.gif'

export default () => {
  return (
    <div>

        <img 
        src={Spinner}
        style={{width: '100px', margin: 'auto', display: 'block'}}
        alt="loadin..."/>
      
    </div>
  )
}
