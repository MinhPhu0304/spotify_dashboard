import { last } from 'lodash'

export function TopArtist({ artistList }) {

    if (artistList == null ) {
        return null
    }

    return artistList.map((artist, index) => <ArtistDetail artist={artist} key={index} rank={index}/>)
}

function ArtistDetail ({ artist, rank }) {
    return (
        <div>
            <h2>{rank + 1}</h2>
            <h3>Name: {artist.name}</h3>
            <img src={last(artist.images).url}/>
            <p>Followers: {artist.followers.total}</p>
            <p>Genres: {artist.genres.join(", ")}</p>
            <p>Popularity: {artist.popularity}</p>
        </div>
    )
}
