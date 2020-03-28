import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HomePage from './HomePage'
import Chat from './Chat'

const Root = () => {
    return (
        <Router>
            <div>
            <Route exact path="/" component={HomePage} />
            <Route path="/:couch" component={Chat} />
            </div>
        </Router>
    )
}

export default Root;
