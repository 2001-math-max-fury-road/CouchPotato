import React from 'react'

export default class JoinPopup extends React.Component { 
    constructor() { 
        super() 

        this.joinCouch = this.joinCouch.bind(this)
    }

    joinCouch(event) { 
        event.preventDefault()
        console.log(event.target.value)
    }

    render() { 
        return ( 
            <div className='popup'>
                <div className='popup\_inner'>
                    <form id='popup-form'>
                    <label htmlFor="couchId" >Couch Id: </label>
                    <input name='couchId'></input>
                    <label htmlFor="username">Your Name: </label>
                    <input name='username'></input>
                    <button onClick={this.joinCouch}>Join Couch</button>
                    </form>
                </div>
            </div>
        )
    }
}