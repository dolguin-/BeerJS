'use strict';

/* eslint-disable no-param-reassign */

module.exports.getBeer = function (context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');
  getRandomBeer(context)
    .then((beer)=>{
      context.log('beer: ',beer);
      var res = {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 200,
        body: {
          message: 'Hello BeerJS Cordoba!',
          data: beer,
          status: 'success'
        }
      };
      context.done(null, res);
    })
    .catch((err)=>{
      context.log(err);
      var res = {
        headers: {
          'Content-Type': 'application/json'
        },
        status: 500,
        body: JSON.stringify({
          message: err,
          status: 'error'
        })
      };
      context.done(err, res);
    });
};

function getRandomBeer(context) {
  const http = require('http');
  return new Promise(function (resolve, reject){
    http.get({
      hostname: 'api.brewerydb.com',
      port: 80,
      path: '/v2/beer/random?key=eb11f22b0b2d86ae70b70f3b06eca9de',
      agent: false
    }, (res) => {
      var body='';
      res.on('data', (chunk)=>{
        body+=chunk;
      });
      res.on('end', ()=>{
        body=JSON.parse(body);
        if(body){
          resolve({
            name: body.data.nameDisplay,
            style: body.data.style.name,
            category: body.data.style.category.name,
            description: body.data.style.description
          });
        } else {
          resolve({});
        }
      });
      res.on('error', (err)=>{
        console.log(err);
        reject(err);
      });
    });
  });
};