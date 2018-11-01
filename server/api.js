var express = require('express');
var router = express.Router();
var request = require('request');
var http = require('http');

/*
router.get('/api/auth/signup',( req, res) => {
  console.log('getres');
})
*/

router.post('/api/auth/signup',( req, res) => {
    var loginData = JSON.stringify(req.body);
    var url = 'http://localhost:8080/api/auth/signup';

    var options = {
      host: '127.0.0.1',
      port: 8080,
      path: '/api/auth/signup',
      method: 'POST',
      headers: {'Content-type': 'application/json'}
    };

    var req = http.request(options, function(response) {
      var str = '';
      response.on('data', function (chunk) {
        str += chunk;
      });

      response.on('end', function () {
        if(response.statusCode === 401) {
          var jesonData = JSON.parse(str);
          console.log(jesonData.errors)
          var message = jesonData.errors == undefined ? jesonData.message :jesonData.errors[0].field + ' ' + jesonData.errors[0].defaultMessage
          var  dataCreate = {success : false, message : message};
          res.json(JSON.stringify(dataCreate));
        } else {
          res.json(str);
        }

      });
    });
    req.write(loginData);
    req.end();
})



router.post('/api/auth/signin',( req, res) => {
  var loginData = JSON.stringify(req.body);


var options = {
  host: '127.0.0.1',
  port: 8080,
  path: '/api/auth/signin',
  method: 'POST',
  headers: {'Content-type': 'application/json'}
};

var req = http.request(options, function(response) {
  var str = '';
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    if(response.statusCode === 401) {
      var jesonData = JSON.parse(str);
      console.log(jesonData.errors)
      var message = 'Username or password incorrect!'
      var  dataCreate = {success : false, message : message};
      res.json(JSON.stringify(dataCreate));
    } else {
      var jesonData = JSON.parse(str);
      var message = 'Logging succesful!'
      var  dataCreate = {success : true, message : message};
      var  accessToken = jesonData.accessToken;
      console.log(accessToken);
      res.json(JSON.stringify(dataCreate));
    }

  });
});
req.write(loginData);
req.end();
})


router.post('/api/auth/hotel',( req, res) => {
  var loginData = JSON.stringify(req.body);


var options = {
  host: '127.0.0.1',
  port: 8080,
  path: '/api/auth/hotel',
  method: 'POST',
  headers: {'Content-type': 'application/json'}
};

var req = http.request(options, function(response) {
  var str = '';
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    if(response.statusCode === 401) {
      var jesonData = JSON.parse(str);
      console.log(jesonData.errors)
      var message = 'Login required!'
      var  dataCreate = {success : false, message : message};
      res.json(JSON.stringify(dataCreate));
    } else {
      var jesonData = JSON.parse(str);
      var message = 'Insert succesful!'
      var  dataCreate = {success : true, message : message};

      res.json(JSON.stringify(dataCreate));
    }

  });
});
req.write(loginData);
req.end();
})



module.exports = router;
