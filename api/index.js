const express = require('express');
const axios = require('axios');
const query = require('query-string');
const parser = require('body-parser');
const moment = require('moment');

const env = require('./env');

const app = express();

app.use(parser.json());

app.get('/login', (req, res) => {
  const query_string = query.stringify({
    response_type: 'code',
    client_id: env.spotify_id,
    scope: env.spotify_scope,
    redirect_uri: env.redirect_uri
  })
  res.append('Access-Control-Allow-Origin', '*');
  res.json({url: `https://accounts.spotify.com/authorize?${query_string}`});
});

app.get('/callback', (req, res) => {
  const code = req.query.code || null

  const config = {
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${env.spotify_id}:${env.spotify_secret}`).toString('base64')}`
    },
    params: {
      code,
      redirect_uri: env.redirect_uri,
      grant_type: 'authorization_code'
    }
  }

  axios.request(config).catch((err) => console.log(err)).then((response) => {
    const { expires_in, refresh_token, access_token } = response.data

    const query_string = query.stringify({
      access_token,
      refresh_token,
      expires_at: moment().add(expires_in, 'seconds').valueOf()
    });

    res.redirect(`${env.frontend_uri}?${query_string}`);
  });
});

app.get('/:type/:time', (req, res, next) => {
  const type = req.params.type || '';
  const time = req.params.time || '';

  if ((type == 'artists' || type == 'tracks') && (time == 'short_term' || time == 'medium_term' || time == 'long_term')) {

    let { api_token, refresh_token, expires_at } = req.query;


    if (moment().isSameOrAfter(+expires_at)) {
      const config = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'post',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${env.spotify_id}:${env.spotify_secret}`).toString('base64')}`
        },
        params: {
          refresh_token,
          grant_type: 'refresh_token'
        }
      }

      axios.request(config).catch((err) => next(err)).then((response) => {
        api_token = response.data.access_token;
        expires_at = moment().add(response.data.expires_in, 'seconds').valueOf();
        getInformation(res, next, type, time, api_token, refresh_token, expires_at);
      });
    } else {
      getInformation(res, next, type, time, api_token, refresh_token, expires_at);
    }

  } else {
    next();
  }
});

const getInformation = (res, next, type, time_range, api_token, refresh_token, expires_at) => {
  const config = {
    url: `https://api.spotify.com/v1/me/top/${type}`,
    method: 'get',
    headers: {
      'Authorization': `Bearer ${api_token}`
    },
    params: {
      limit: 50,
      time_range
    }
  }

  axios.request(config).catch((err) => next(err)).then((response) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.json({
      spotify: response.data,
      auth: {
        api_token,
        refresh_token,
        expires_at
      },
      request_at: moment().add(1, 'hours').valueOf()
    });

  });
}

app.listen(env.port, () => {
  console.log(`Running on port: ${env.port}`);
});
