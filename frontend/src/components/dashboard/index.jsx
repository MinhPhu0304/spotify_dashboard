import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'

import { TopArtist } from './topArtists'
import '../home/styles.css'
import './index.css'

export function Dashboard() {
    const [spotifyAccessToken, setSpotifyAccesToken] = useState('')
    const [artistList, setArtistList] = useState([])
    const pageHistory = useHistory()
    const [loading, toggleLoading] = useState(true)
    useEffect(() => {
        getTopArtists()
    }, [])

    const getTopArtists = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/personal/top_artists`, {
            mode: 'cors',
            headers: {
                'spotify-token': Cookies.get('spotifyToken')
            }
        });
        if (response.ok) {
            const data = await response.json().finally(() => toggleLoading(!loading))
            setArtistList(data)
            toggleLoading(!loading)
        }
        // } else {
        //     pageHistory.push('/')
        // }
    }

    return (
        <div>
            <h1>Your Top Artists in 2020</h1>
            <div className="donut" style={{ display: loading ? "inline-block" : 'none' }} />
            <div className="Top_artists_list__container">
                <TopArtist artistList={artistList} />
            </div>
        </div>
    )
}
