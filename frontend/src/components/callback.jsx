import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'

export function CallBackPage() {
    const siteHistory = useHistory()
    const [loading, toggleLoading] = useState(true)
    const [failedLogin, setFailedLogin] = useState(false)
    useEffect(() => {
        const params = (new URL(document.location)).searchParams;
        toggleLoading(!loading)
        if (params.get('token') != null) {
            Cookies.set('spotifyToken', params.get('token'), { expires: 3600 });
            setTimeout(() => siteHistory.push('/dashboard'), 200);
        } else {
            setFailedLogin(true);
        }
    }, [])
    return (
        <div>
            <h1>Almost there</h1>
            <div className="donut" style={{ display: loading ? "inline-block" : 'none' }} />
            <div className="Top_artists_list__container">
                {
                    failedLogin && <p> Failed to authenticate you with Spotify </p>
                }
            </div>
        </div>
    )
}
