import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import HomePage from './HomePage'
import Chat from './Chat'

const Root = () => { 
    return ( 
        <Router>
            <div>
            <Route exact path="/" component={HomePage} />
            <Route path="/:room" component={Chat} />
            </div>
        </Router> 
    )
}

export default Root; 