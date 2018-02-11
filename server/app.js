const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const timeStamp = require('unix-timestamp');
const OAuth = require('oauth');
const OAuthSignature = require('oauth-signature');
const axios = require('axios');
const Request = require('request');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const config = require('./config');
const port = process.env.PORT || 8888;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('lib/client/assets'));
app.use(allowCrossDomain);

if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/assets/index.html'));
  });
}

if (process.env.NODE_ENV === 'development') {
  app.get('/', (req, res) => {
    res.send('vue-auhentication');
  });
}

app.get('/auth/:provider', () => {
  switch (req.params.provider) {
    case 'google':
      googleAuth(req, res);
      break;
    case 'github':
      githubAuth(req, res);
      break;
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

function allowCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

const gitHubAuth = (req, res, next) => {
  axios.post('https://github.com/login/oauth/access_token', {
    client_id: config.auth.github.clientId,
    client_secret: config.auth.github.clientSecret,
    code: req.body.code,
    redirect_uri: req.body.redirectUri,
    state: req.body.state,
    grant_type: 'authorization_code',
  },
  {
    'Content-Type': 'application/json',
  }).then((response) => {
    const responseJson = parseQueryString(response.data);
    return responseJson.error
      ? res.status(500).json({ error: responseJson.error })
      : res.status(200).json(responseJson);
  })
  .catch((response) => {
    return res.status(500).json(err);
  })
};

const googleAuth = (req, res) => {
  Request({
    method: 'post',
    url: 'https://accounts.google.com/o/oauth2/token',
    form: {
      code: req.body.code,
      client_id: config.auth.google.clientId,
      client_secret: config.auth.google.clientSecret,
      redirect_uri: req.body.redirectUri,
      grant_type: 'authorization_code'
    },
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }, function (err, response, body) {
    try {
      if (!err && response.statusCode === 200) {
        var responseJson = JSON.parse(body)
        return res.json(responseJson);
      } else {
        return res.status(response.statusCode).json(err);
      }
    } catch (e) {
      return res.status(500).json(err || e);
    }
  })
}

const parseQueryString = (str) => {
  let obj = {};
  let key;
  let value;
  (str || '').split('&').forEach((keyValue) => {
    if (keyValue) {
      value = keyValue.split('=');
      key = decodeURIComponent(value[0]);
      obj[key] = (!!value[1]) ? decodeURIComponent(value[1]) : true;
    }
  });
  return obj;
}