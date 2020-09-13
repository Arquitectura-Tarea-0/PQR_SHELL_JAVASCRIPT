var request = require('request');
var authToken;

exports.CrearPQR = function(asunto,descripcion){
    request.post({uri: url,headers:{Authorization:authToken},form: { subject:asunto, description:descripcion}},
    function(err, httpResponse, body) {
          if (err) return 'Error';
               var json = JSON.parse(body);
               return json.request;
      });
    }

exports.Logion = function(correo,contraseña){
        request.post({uri: url,form: { email: correo, password: contraseña}},
        function(err, httpResponse, body) {
              if (err) return 'Error';
                   var json = JSON.parse(body);
                   authToken = json.token;
                   return json.user;
          });
      }
  
exports.Registro = function(nombre,contraseña,correo){
      request.post({uri: url,form: { name:nombre, password: contraseña,email:correo}},
      function(err, httpResponse, body) {
            if (err) return ;
                 var json = JSON.parse(body);
                 authToken = json.token;
                 return json.user;
        });
      }