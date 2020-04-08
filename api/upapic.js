
const fs = require('fs');
const { google } = require('googleapis');
const process = require('process');
const dirtree = require('directory-tree');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive']
const TOKEN_PATH = 'token.json';
const credentials =
  {"client_id":"571455866380-nenuk3sh8ent5kvu14dq49e9hhf2vgde.apps.googleusercontent.com",
  "project_id":"backon-1586359772409",
  "auth_uri":"https://accounts.google.com/o/oauth2/auth",
  "token_uri":"https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
  "client_secret":"Wakx6fiu9S18sXy-OEgBRuy7","redirect_uris":["http://serverlessbackon.now.sh"]};



/**
* Describe with given media and metaData and upload it using google.drive.create method()
 
function uploadFile(auth) {
  const drive = google.drive({version: 'v3', auth});
  const fileMetadata = {
    'name': 'photo.png'
  };
  const media = {
    mimeType: 'image/jpeg',
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
        "error" : "sei gai"
      });
    } else {
      console.log('File Id: ', file.id);
      response.status(200).json({
        "controlla" : "sei gai"
      });
    }
  });
}
*/
module.exports = (request, response) => {
  // Authorize a client with credentials, then call the Google Drive API.
  const client_secret = credentials.client_secret
  const client_id = credentials.client_id
  const redirect_uris = credentials.redirect_uris

  const dir = process.cwd() 
  console.log(dir)
  console.log(dirtree(dir))
  console.log(dirtree('../'))
  console.log(dirtree('../../'))

  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  const drive = google.drive({version: 'v3',  oAuth2Client});
  const fileMetadata = {
    'name': 'photo.png'
  };
  const media = {
    mimeType: 'image/png',
    body: fs.createReadStream('../public/backonicon.png')
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
        "error" : "sei gai"
      });
    } else {
      console.log('File Id: ', file.id);
      response.status(200).json({
        "controlla" : "sei gai"
      });
    }
  });
};