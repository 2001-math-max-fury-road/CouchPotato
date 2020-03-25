import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Chat from './Chat';
import JoinPopup from './Popup-Join'
import StartPopup from './Popup-Start'

export default class HomePage extends Component { 
    constructor() { 
        super()
        this.state = { showJoin: false, showStart: false }
        this.toggleJoinPopup = this.toggleJoinPopup.bind(this)
        this.toggleStartPopup = this.toggleStartPopup.bind(this)
    }

    toggleJoinPopup() { 
        this.setState({ showStart: false, showJoin: !this.state.showJoin })
    }

    toggleStartPopup() { 
        console.log('before-start', this.state)
        this.setState({ showJoin: false, showStart: !this.state.showStart })
        console.log('after-start', this.state)

    }

    render() { 
        console.log('inside render', this.state)

        return ( 

            <div id='homepage'>
                <h1>Welcome to Couch Potato!</h1>
                <button onClick={this.toggleJoinPopup}>Join a Couch</button>
                <button onClick={this.toggleStartPopup}>Start a New Couch</button>
                {this.state.showJoin ?
                <JoinPopup />
                : null 
                } 
                {this.state.showStart ?
                <StartPopup />
                : null 
                } 
            </div>
        )
    }


}