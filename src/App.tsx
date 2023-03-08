import './App.css'
import { REFRESH_TOKEN_KEY } from './auth'
import React from 'react'
import { Navigate } from 'react-router'
import { HOME, LOGIN } from './constants/paths'

function App() {
    if (!localStorage.getItem(REFRESH_TOKEN_KEY)) {
        return <Navigate to={LOGIN} />
    } else {
        return <Navigate to={HOME} />
    }
}

export default App
