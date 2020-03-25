import React from 'react'

export default class StartPopup extends React.Component { 
    constructor() { 
        super() 

        this.startCouch = this.startCouch.bind(this)
    }

    startCouch(event) { 
        event.preventDefault()
        console.log(event.target.value)
    }

    render() { 
        return ( 
            <div className='popup'>
                <div className='popup\_inner'>
                    <form id='popup-form'>
                    <label htmlFor="couchId">Couch ID: </label>
                    <input name='couchId'></input>
                    <label htmlFor="username">Your Name: </label>
                    <input name='username'></input>
                    <button onClick={this.startCouch}>Start New Couch</button>
                    </form>
                </div>
            </div>
        )
    }
}