const view = require('think-view');
const model = require('think-model');
const fetch = require('think-fetch');
const email = require('think-email');
const cache = require('think-cache');
const session = require('think-session');
module.exports = [
  view, //make application support view
  model(think.app),
  fetch, // HTTP request client.
  email,
  cache,
  session
];

