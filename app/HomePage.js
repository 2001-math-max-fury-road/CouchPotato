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
        console.log('before', this.state)
        this.setState({ showJoin: !this.state.showJoin })
        console.log('after', this.state)
    }

    toggleStartPopup() { 
        this.setState({ showStart: !this.state.showStart })
    }

    render() { 
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