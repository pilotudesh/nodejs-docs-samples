// Copyright 2020 Google LLC. All rights reserved.
// Use of this source code is governed by the Apache 2.0
// license that can be found in the LICENSE file.

// [START run_events_pubsub_handler]
const express = require('express');
const {toMessagePublishedEvent} = require('@google/events/cloud/pubsub/v1/MessagePublishedData');
const app = express();

app.use(express.json());
app.post('/', (req, res) => {
  if (!req.body) {
    const msg = 'no Pub/Sub message received';
    res.status(400).send(`Bad Request: ${msg}`);
    return;
  }
  // Cast to MessagePublishedEvent for IDE autocompletion
  const pubSubMessage = toMessagePublishedEvent(req.body);
  const name = pubSubMessage.message.data
    ? Buffer.from(pubSubMessage.message.data, 'base64').toString().trim()
    : 'World';
  
  res.send(`Hello, ${name}! ID: ${req.get('ce-id') || ''}`);
});

module.exports = app;
// [END run_events_pubsub_handler]
