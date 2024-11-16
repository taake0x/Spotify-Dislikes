const fetch = require('node-fetch');
const accessToken = '...'; // Launch server.js and retrieve the token

const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
};

/**
 * @description Fetches all liked tracks from the user's Spotify account
 */
async function getLikedTracks() {
    const likedTracks = [];
    let nextUrl = 'https://api.spotify.com/v1/me/tracks';
    
    while (nextUrl) {
        const response = await fetch(nextUrl, { headers });
        if (!response.ok) {
            console.error(await response.text());
            return [];
        }

        const data = await response.json();
        likedTracks.push(...data.items);
        nextUrl = data.next;
    }

    return likedTracks.map(track => track.track.id);
}

/**
 * @description Removes liked tracks from the user's Spotify account
 * @param {string[]} trackIds - An array of track IDs to remove
 */
async function removeLikedTracks(trackIds) {
    for (let i = 0; i < trackIds.length; i += 50) {
        const idsToDelete = trackIds.slice(i, i + 50);
        const response = await fetch('https://api.spotify.com/v1/me/tracks', {
            method: 'DELETE',
            headers,
            body: JSON.stringify({ ids: idsToDelete })
        });

        if (response.ok) {
            console.log(`[🚮] Delete ${idsToDelete.length} loved songs...`);
        } else {
            console.error(await response.text());
        }
    }
}

/**
 * @description Main function
 */
async function main() {
console.log('[⏳] Fetch lobed songs...');
    const likedTracks = await getLikedTracks();
    console.log(`[🔎] ${likedTracks.length} loved songs...`);

    if (likedTracks.length > 0) {
        console.log('[🚮] Deleting favorite songs...');
        await removeLikedTracks(likedTracks);
        console.log('[✅] All loved songs have been deleted');
    } else {
        console.log('[❌] No loved songs to delete...');
    }
}

main().catch(console.error);