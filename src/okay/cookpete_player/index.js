import players from './players' /* eslint-disable-line */
import { createReactPlayer } from './ReactPlayer' /* eslint-disable-line */

// Fall back to FilePlayer if nothing else can play the URL
const hello = () => {
    const len = players.len - 1
    const fallback = players[len] /* eslint-disable-line */

    const Yo = createReactPlayer(players, fallback);
    return (
        <><Yo /></>
    )
}

export default hello;

