import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'

import '../home/styles.css'

export function Dashboard() {
    const [spotifyAccessToken, setSpotifyAccesToken] = useState('')
    const pageHistory = useHistory()
    useEffect(() => {
        const spotifyToken = Cookies.get("spotifyToken");
        if (spotifyToken == null) {
            pageHistory.push('/')
        } else {
            setSpotifyAccesToken(spotifyToken)
        }
    }, [])

    return (
        <div className="App">
            View your top artists
            <button className="Spofity__oauth__button"> View your top artist </button>
        </div>
    )
}
