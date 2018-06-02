import React from 'react'
import {withRouter} from 'react-router-dom'

export default withRouter(({history}) => (
  <nav>
    <button onClick={() => history.push('/')} >Home</button>
    <button onClick={() => history.push('/delay')} >Delay</button>
    <button onClick={() => history.push('/login')} >Login</button>
  </nav>
))
