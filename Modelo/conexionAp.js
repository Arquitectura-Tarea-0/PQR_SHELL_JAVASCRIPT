
      request = require('request');

      let Registro = (nombre,contraseña,correo) =>{
            return new Promise((resolve, reject) => {
            request.post({uri:'https://pqr-api-rails.herokuapp.com/users',form: { name:nombre, password: contraseña,email:correo}},
            function(err, httpResponse, body) {
                  if (err) return reject('Error de conexion');
                       var json = JSON.parse(body);
                       if(json.error==='Invalid email or password') return reject('Error correo existente');
                       else return resolve(
                             {
                                respuesta:'Inicia session',
                                token: json.token,
                                rol: json.role
                             }
                       );
              });
            })};
      
      let Login = function(correo,contraseña){
            return new Promise((resolve, reject) => {
            request.post({uri:'https://pqr-api-rails.herokuapp.com/login',form: { email: correo, password: contraseña}},
            function(err, httpResponse, body) {
                  if (err) return reject('Error de conexion');
                       var json = JSON.parse(body);
                       if(json.error==='Invalid email or password') return reject('Contraseña o Email invalidos');
                       else return resolve(
                           {
                              respuesta:'Inicia session',
                              token: json.token,
                              rol: json.user.role
                           }
                       );
                  });
            
            })};

      let CrearPQR = function(asunto,tipo,descripcion,req){
            if(tipo!=''){
                  if(tipo==='Reclamo'){tipo='claim'}
                  if(tipo==='Queja'){tipo='complain'}
                  if(tipo==='Peticion'){tipo='request'}
            }
            return new Promise((resolve, reject) => {
            request.post({uri:'https://pqr-api-rails.herokuapp.com/requests/create',headers:{Authorization:req.token},form: { subject:asunto,request_type:tipo,description:descripcion}},
            function(err, httpResponse, body) {
                  if (err){req.respuesta ='Error de conexion'; return reject('Error de conexion');}
                        var json = JSON.parse(body);
                        req.respuesta ='Asunto creado con exito a las: '+json.request.created_at
                        return resolve(req);
                   });

            })};

      let Filtrar_UsuarioPQR = function(request_typ,request_stat,subjec,created_a,req){   
                  
                        if(request_typ==='Reclamo'){request_typ='claim'}
                        if(request_typ==='Queja'){request_typ='complain'}
                        if(request_typ==='Peticion'){request_typ='request'}
                        if(request_typ==='Vacio'){request_typ=''}
                  
                        if(request_stat==='Radicado'){request_stat='settled'}
                        if(request_stat==='Proceso'){request_stat='in_progress'}
                        if(request_stat==='Resuelto'){request_stat='solved'}
                        if(request_stat==='Cerrado'){request_stat='closed'}
                        if(request_stat==='Vacio'){request_stat=''}
                  
                  if(created_a==='3000-09-13T01:50:32.201Z'){created_a='';}
                  return new Promise((resolve, reject) => {
                  request.get({uri: 'https://pqr-api-rails.herokuapp.com/requests/user_requests',headers:{Authorization:req.token},form:{request_state:request_stat, request_type:request_typ, subject:subjec,created_at:created_a}},
                        function(err, httpResponse, body) {
                              if (err){req.respuesta ='Error de conexion'; return reject('Error de conexion');}
                                    var json = JSON.parse(body);
                                    return resolve(
                                          {
                                            clave :req,
                                            respuestas: json.request
                                          });
                               });
            
                  })};


      let Notas_ID = function(id,req){   
      
                  return new Promise((resolve, reject) => {
                  request.get({uri: 'https://pqr-api-rails.herokuapp.com/notes/get_notes/'+id,headers:{Authorization:req.token}},
                        function(err, httpResponse, body) {
                              if (err){req.respuesta ='Error de conexion'; return reject('Error de conexion');}
                                    var json = JSON.parse(body);
                                    return resolve(
                                          {
                                                clave :req,
                                                respuestas: json.notes
                                          });
                                    });
            
                  })};

      let Crear_Nota = function(id,descripcion,req){   

            return new Promise((resolve, reject) => {
            request.post({uri: 'https://pqr-api-rails.herokuapp.com/notes/create/'+id,headers:{Authorization:req.token},form:{description:descripcion}},
                  function(err, httpResponse, body) {
                        if (err){req.respuesta ='Error de conexion'; return reject('Error de conexion');}
                              var json = JSON.parse(body);
                              return resolve(
                                    {
                                          clave :req,
                                          respuestas: json.note
                                    });
                              });

            })};

      let Lista_Usuarios = function(req){   

            return new Promise((resolve, reject) => {
            request.get({uri: 'https://pqr-api-rails.herokuapp.com/users?',headers:{Authorization:req.token}},
                  function(err, httpResponse, body) {
                        if (err){req.respuesta ='Error de conexion'; return reject('Error de conexion');}
                              var json = JSON.parse(body);
                              return resolve(
                                    {
                                          clave :req,
                                          respuestas: json.users
                                    });
                              });

            })};

      let Filtro_UsuarioPQR = function(request_typ,request_stat,id,req){   
                  
            if(request_typ==='Reclamo'){request_typ='claim'}
            if(request_typ==='Queja'){request_typ='complain'}
            if(request_typ==='Peticion'){request_typ='request'}
            if(request_typ==='Vacio'){request_typ=''}
      
            if(request_stat==='Radicado'){request_stat='settled'}
            if(request_stat==='Proceso'){request_stat='in_progress'}
            if(request_stat==='Resuelto'){request_stat='solved'}
            if(request_stat==='Cerrado'){request_stat='closed'}
            if(request_stat==='Vacio'){request_stat=''}
            return new Promise((resolve, reject) => {
            request.get({uri: 'https://pqr-api-rails.herokuapp.com/requests/general_requests',headers:{Authorization:req.token},form:{request_state:request_stat, request_type:request_typ,user_id:id}},
                  function(err, httpResponse, body) {
                        if (err){req.respuesta ='Error de conexion'; return reject('Error de conexion');}
                              var json = JSON.parse(body);
                              return resolve(
                                    {
                                          clave :req,
                                          respuestas: json.request
                                    });
                              });

            })};

      let Marcar_PQR = function(objeto,marca,req){   
            objeto.request_state=marca;
            return new Promise((resolve, reject) => {
            request.put({uri: 'https://pqr-api-rails.herokuapp.com/requests/update/'+objeto.id,headers:{Authorization:req.token},form:{request_state:marca}},
                  function(err, httpResponse, body) {
                        if (err){req.respuesta ='Error de conexion'; return reject('Error de conexion');}
                              var json = JSON.parse(body);
                              return resolve(
                                    {
                                          objeto,
                                          req
                                    });
                              });

            })};
module.exports = {
      CrearPQR,
      Login,
      Registro,
      Filtrar_UsuarioPQR,
      Notas_ID,
      Crear_Nota,
      Lista_Usuarios,
      Filtro_UsuarioPQR,
      Marcar_PQR
};