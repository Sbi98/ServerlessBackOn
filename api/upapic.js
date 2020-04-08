
const fs = require('fs');
const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

// If modifying these scopes, delete token.json.
const TOKEN_PATH = 'token.json';
const credentials =
  {"client_id":"571455866380-nenuk3sh8ent5kvu14dq49e9hhf2vgde.apps.googleusercontent.com",
  "project_id":"backon-1586359772409",
  "auth_uri":"https://accounts.google.com/o/oauth2/auth",
  "token_uri":"https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
  "client_secret":"Wakx6fiu9S18sXy-OEgBRuy7","redirect_uris":["http://serverlessbackon.now.sh"]};

const code = '4/ygGSPqTJvRFWUKkRy7pgr63924BBUi-reVLh9qNy5age9_WybjD9Qatraa-pkQn4gE3Kvez969miyPD1HaYzkPs'

module.exports = (request, response) => {
  // Authorize a client with credentials, then call the Google Drive API.
  const client_secret = credentials.client_secret
  const client_id = credentials.client_id
  const redirect_uris = credentials.redirect_uris

  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
      });
    } else {
      oAuth2Client.setCredentials(JSON.parse(token));
    }
  });


  const drive = google.drive({version: 'v3',  oAuth2Client});
  const fileMetadata = {
    'name': 'photo.png'
  };
  const media = {
    mimeType: 'image/png',
    body: fs.createReadStream('public/backonicon.png')
  };
  drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id'
  }, (err, file) => {
    if (err) {
      // Handle error
      console.error(err);
      response.status(400).json({
        "error" : err
      });
    } else {
      console.log('File Id: ', file.id);
      response.status(200).json({
        "controlla" : "tutto okkkkkk"
      });
    }
  });
};