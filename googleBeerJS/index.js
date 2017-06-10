'use strict';

exports.http = (request, response) => {
  getRamdomBeer()
    .then((beer)=>{
      response.status(200).send({
        message:'Hello BeerJS Cordoba!',
        ramdomBeer: beer
      });
    })
    .catch((err)=>{
      console.error(err);
      response.status(200).send({error: err});
    });
};

exports.event = (event, callback) => {
  callback();
};


function getRamdomBeer () {
  const http = require('http');
  return new Promise(function (resolve, reject){
    http.get({
      hostname: 'api.brewerydb.com',
      port: 80,
      path: '/v2/beer/random?key=eb11f22b0b2d86ae70b70f3b06eca9de',
      agent: false  // create a new agent just for this one request
    }, (res) => {
      var body='';
      res.on('data', (chunk)=>{
        body+=chunk;
      });
      res.on('end', ()=>{
        console.info(body);
        if(body){
          resolve(JSON.parse(body));
        } else {
          resolve();
        }
      });
      res.on('error', (err)=>{
        reject(err);
      });
    });
  });
};