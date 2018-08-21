if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev') {
  const dotenv = require('dotenv');

  result = dotenv.config();

  if (result.error) {
    throw result.error;
  }
}

const env = {
  port: process.env.PORT || 8000,
  redirect_uri: process.env.REDIRECT_URI || `http://localhost:${process.env.PORT || 8000}/callback`,
  frontend_uri: process.env.FRONTEND_CB_URI || `http://localhost:8080/callback`,
  spotify_scope: 'user-top-read',
  spotify_id: process.env.SPOTIFY_CLIENT_ID,
  spotify_secret: process.env.SPOTIFY_CLIENT_SECRET
}


module.exports = env;
