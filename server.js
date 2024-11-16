const express = require('express');
const app = express();
const port = 1337;

app.get('/callback', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Spotify Token</title>
        </head>
        <body>
            <script>
                const hash = window.location.hash.substring(1);
                const params = new URLSearchParams(hash);
                const accessToken = params.get('access_token');

                if (accessToken) {
                    document.body.innerHTML = '<h1>Token :</h1><p>' + accessToken + '</p>';
                    console.log('Token :', accessToken);
                } else {
                    document.body.innerHTML = '<h1>Error : No token</h1>';
                }
            </script>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});