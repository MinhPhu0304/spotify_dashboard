import React from 'react'

import './styles.css'

export function OAuthButton() {
    return (
        <div className="App">
            <h1> Login with Spotify</h1>
            <a href="https://localhost:5001/oauth/spotify">
                <button className="Spofity__oauth__button"> Login </button>
            </a>
        </div>
    )    
}
