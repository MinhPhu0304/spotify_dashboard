import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'

import { TopArtist } from './topArtists'
import '../home/styles.css'

export function Dashboard() {
    const [spotifyAccessToken, setSpotifyAccesToken] = useState('')
    const [artistList, setArtistList] = useState([])
    const pageHistory = useHistory()
    useEffect(() => {
        const spotifyToken = Cookies.get("spotifyToken");
        if (spotifyToken == null) {
            pageHistory.push('/')
        } else {
            setSpotifyAccesToken(spotifyToken)
        }
    }, [])

    const getTopArtists = async () => {
        const response = await fetch("https:localhost:5001/personal/top_artists", {
            method: 'GET',
            credentials: 'include',
        });
        if (response.ok) {
            const data = await response.json()
            setArtistList(data)
        } else {
            pageHistory.push('/')
        }
    }

    return (
        <div className="App">
            View your top artists
            <button className="Spofity__oauth__button" onClick={getTopArtists}> View your top artist </button>
            <TopArtist artistList={artistList}/>
        </div>
    )
}
