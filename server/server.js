"use strict"; // eslint-disable-line
const express = require('express');
const app = express();
const server = require('http').Server(app); // eslint-disable-line
const port = process.env.PORT || 3000;
const path = require('path');
// const imperio = require('imperio')(server);
const imperio = require('./../../imperioDev/index.js')(server);

/* ----------------------------------
 * -----   Global Middleware   ------
 * ---------------------------------- */

// app.use(express.static(path.join(`${__dirname}/../node_modules/imperio`)));
app.use(express.static(path.join(`${__dirname}/../../imperioDev`)));
app.use(express.static(path.join(`${__dirname}/../client`)));
app.set('view engine', 'ejs');

/* ----------------------------------
 * --------      Routes      --------
 * ---------------------------------- */

 // App will serve up different pages for client & desktop
app.get('/', imperio.init(),
  (req, res) => {
    if (req.imperio.isDesktop) {
      res.render('./../client/index.ejs');
    }
    else if (req.imperio.isMobile) {
      if (req.imperio.connected) {
        res.render('./../client/mobileConn.ejs');
      }
      else {
        res.render('./../client/mobile.ejs');
      }
    }
  }
);
// Nonce in URL
app.get('/:nonce', imperio.init(),
  (req, res) => {
    if (req.imperio.isDesktop) {
      res.render('./../client/index.ejs');
    }
    else if (req.imperio.isMobile) {
      if (req.imperio.connected) {
        res.render('./../client/mobileConn.ejs');
      }
      else {
        res.render('./../client/mobile.ejs');
      }
    }
  }
);
// 404 error on invalid endpoint
app.get('*', (req, res) => {
  res.status(404)
     .render('./../client/404.html');
});

/* ----------------------------------
 * --------      Server      --------
 * ---------------------------------- */

server.listen(port, () => {
  console.log(`Listening on port ${port}`); // eslint-disable-line
});
