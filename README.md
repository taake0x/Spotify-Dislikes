# Spotify-Dislikes

## Step 1: Create a Spotify Application
1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
2. Log in with your Spotify account
3. Click **Create an App**:
   - Give your app a name (e.g., `xx`).
   - Click **Create**
4. Note down your **Client ID** and **Client Secret**

## Step 2: Set Up a Redirect URI
1. In your app settings, click **Edit Settings**
2. Add a redirect URI, for example:
   - http://localhost:1337/callback
4. Click **Save**

## Step 3: Build the Authorization URL
Use this URL, replacing `YOUR_CLIENT_ID` with your actual Client ID:
   - https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=token&redirect_uri=http://localhost:8888/callback&scope=user-library-read%20user-library-modify

## Step 4: Get the Access Token
1. Paste the authorization URL into your browser.
2. Log in and click **Agree**.
3. You will be redirected to your `redirect_uri`, with the token in the URL:
http://localhost:1337/callback#access_token=YOUR_ACCESS_TOKEN&token_type=Bearer&expires_in=3600
4. Copy the `access_token` value.

## Step 5: Use the Access Token in Your Script
1. Paste the token into your script:
```javascript
const accessToken = 'YOUR_ACCESS_TOKEN';
```
2. Run node index.js
