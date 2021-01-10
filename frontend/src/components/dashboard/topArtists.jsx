import { last, startCase } from 'lodash'

import './artist.css'
import { formatNumber } from 'utils'

export function TopArtist({ artistList }) {
    if (artistList == null ) {
        return null
    }

    return artistList.map((artist, index) => <ArtistDetail artist={artist} key={index} rank={index}/>)
}

function ArtistDetail ({ artist, rank }) {
    return (
        <div className="artists__container">
            <h2 className="text-center">{rank + 1}</h2>
            <img src={last(artist.images).url} className="artist__image"/>
            
            <h1 className="artist-title">{artist.name}</h1>
            <p>Followers: {formatNumber(artist.followers.total)}</p>
            <p className="artists__genres text-left">{convertAllToStartCases(artist.genres).join(", ")}</p>
        </div>
    )
}

function convertAllToStartCases(stringArrays) {
    return stringArrays.map((value) => startCase(value))
}
