import React from 'react'

import './styles.css'

export function OAuthButton() {
    return (
        <div className="App">
            <h1> Login with Spotify to view your top 50 artists</h1>
            <a href={`${process.env.REACT_APP_API_ENDPOINT}/oauth/spotify`}>
                <button className="Spofity__oauth__button"> Login </button>
            </a>
        </div>
    )    
}
