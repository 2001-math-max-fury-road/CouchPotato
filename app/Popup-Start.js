import React from 'react'
import axios from 'axios'
import randomizeRoomId from '../server/utils'

export default class StartPopup extends React.Component {
    constructor() {
        super()
        this.state = {username: ''}
        this.startCouch = this.startCouch.bind(this)
    }

    startCouch(event) {
        this.setState({username: event.target.value})
        const roomId = randomizeRoomId()
        const {data} = axios.post('/api/', roomId)

    }

    render() {
        return (
            <div className='popup'>
                <div className='popup\_inner'>
                    <form id='popup-form'>
                    <label htmlFor="username">Your Name: </label>
                    <input name='username'></input>
                    <button onClick={this.startCouch}>Start New Couch</button>
                    </form>
                </div>
            </div>
        )
    }
}
