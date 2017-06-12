'use strict';

exports.getBeer = (request, response) => {
  getRamdomBeer()
    .then((beer)=>{
      response.status(200).send({
        message:'Hello BeerJS Cordoba!',
        data: beer,
        status: 'success'
      });
    })
    .catch((err)=>{
      console.error(err);
      response.status(200).send({
        message: err,
        status: 'error'
      });
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