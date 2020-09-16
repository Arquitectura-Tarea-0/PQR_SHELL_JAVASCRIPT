const {Login,Registro,CrearPQR,Filtrar_UsuarioPQR,Notas_ID,Crear_Nota,Lista_Usuarios,Filtro_UsuarioPQR,Marcar_PQR} = require( '../Modelo/conexionAp'); 
const inquirer= require('inquirer');
const funciones = require('./variables_interfaz');
var filt = {tipo:'',estado:'',asunto:'',creacion:new Date('3000-09-13T01:50:32.201Z')};
var filtU= {tipo:'',estado:'',id:''};

      function Iniciar_Session() {
            inquirer.prompt(funciones.Iniciar_Session())
            .then(answers =>{
                  Login(answers.correo,answers.contraseña).then((req) => { console.log(req.respuesta); 
                        if(req.rol==='admin'){Menu_Admin(req);}
                        if(req.rol==='requester'){Menu_Operaciones(req);}
                  })
                  .catch((err) => {console.log(err); Opcion_Formulario(); 
                  });
            })
      }
      function Formulario() {
            inquirer.prompt(funciones.Formulario())
            .then(answers =>{
                  Registro(answers.nombre,answers.contraseña,answers.correo).then((req) => { console.log(req.respuesta); Menu_Operaciones(req);})
                  .catch((err) => {console.log(err); Opcion_Formulario(); 
                  });
            })
      }

      function CrearAsunto(res){
            inquirer.prompt(funciones.Crear_Solicitud())
            .then(answers =>{
                  CrearPQR(answers.asunto,answers.tipo,answers.descrip,res).then((req) => { console.log(req.respuesta); Menu_Operaciones(req);})
                  .catch((err) => {console.log(err); Menu_Operaciones(err); 
                  });
            });
      }

      function OpcionesFiltro(res){
            inquirer.prompt([{
                  type:'list',
                  name:'opcion',
                  message:' ¿Desea ejecutar filtros en las PQRS?',
                  choices: ['si','no']
            }])
            .then(answers =>{
                  if(answers.opcion==='si'){
                        ListaFiltro(res);
                  }
                  else {
                        
                        ListaG(filt,res);
                  }
            })
      }

      function Menu_Admin(res){
            inquirer.prompt([{
                  type:'list',
                  name:'opcion',
                  message:' ¿Que opciones desea ejecutar administrador?',
                  choices: ['Obtener Usuarios','Obtener PQRS','Salir']
            }])
            .then(answers =>{
                  switch (answers.opcion) {
                        case 'Obtener Usuarios':
                              Lista_Usuario(res);
                          break;
                        case 'Obtener PQRS':
                              OpcionesFiltroPQR({res,usuario:{id:''}});
                          break;
                        case 'Salir':
                              
                          break;
                      }
            })
      }

      //// mirar
      function OpcionesFiltroPQR(res){ 
            inquirer.prompt([{
                  type:'list',
                  name:'opcion',
                  message:' ¿Desea ejecutar filtros en las PQR?',
                  choices: ['si','no']
            }])
            .then(answers =>{
                  if(answers.opcion==='si'){
                        ListaPQRF(res);
                  }
                  else {
                        ListaPQRG(filtU,res,res.usuario.id);
                  }
            })
      }

      /// mirar 
      function ListaPQRF(res){
            inquirer.prompt(funciones.Filtro_PQRS())
            .then(answers =>{
                  ListaPQRG(answers,res,res.usuario.id);
            })
      }
      ///// mirar
      function ListaPQRG(filtro,res,id){
            var lista = [];
            Filtro_UsuarioPQR(filtro.tipo,filtro.estado,id,res.res).then((req) => {
                  for(var i in req.respuestas){lista.push(i+'-'+req.respuestas [i].subject+'-'+req.respuestas [i].request_type+'-'+req.respuestas [i].request_state+'-'+req.respuestas [i].created_at);};
                  const v=Number(i)+1;
                  lista.push(v+'-salir');
                  inquirer.prompt([
                        {
                              type:'list',
                              name:'opcion',
                              message:'selecione una pqr para ver sus respuestas',
                              choices: lista
                        }
                  ])
                  .then(answers =>{
                        var posicion = answers.opcion.split('-');
                        if(posicion[1]==='salir'){Menu_Admin(res.res);}
                        else{
                              const p = Number(posicion[0]);
                              var pqr = req.respuestas[p];
                              VisualizarNotificacionAdmin(res.res,pqr);
                            }
                  })
            })
            .catch((err) => {
                  console.log(err)
                  lista.push('Vacio');
                  inquirer.prompt([
                        {
                              type:'list',
                              name:'opcion',
                              message:'Solicitudes',
                              choices: lista
                        }

                  ])
                  .then(answers =>{
                        console.log(answers);
                        Lista_Usuarios(res);
                  })
            
            });
      }
      function Menu_Operaciones(res){
            inquirer.prompt(funciones.Menu_Operaciones())
            .then(function(answers) {
                  if(answers.opcion==='Crear PQR'){
                  CrearAsunto(res)
                  }
                  if(answers.opcion==='Listar PQRS'){ 
                  OpcionesFiltro(res)
                  }
            })
      }

      function ListaFiltro(res){
            inquirer.prompt(funciones.Filtro_Lista())
            .then(answers =>{
                  ListaG(answers,res);
            })
      }

      function ListaG(filtro,res){
            var lista = [];
            Filtrar_UsuarioPQR(filtro.tipo,filtro.estado,filtro.asunto,filtro.creacion.toISOString(),res).then((req) => {
                  for(var i in req.respuestas){lista.push(i+'-'+req.respuestas [i].subject+'-'+req.respuestas [i].request_type+'-'+req.respuestas [i].request_state+'-'+req.respuestas [i].created_at);};
                  const v=Number(i)+1;
                  lista.push(v+'-salir');
                  inquirer.prompt([
                        {
                              type:'list',
                              name:'opcion',
                              message:'selecione una pqr para ver sus respuestas',
                              choices: lista
                        }
                  ])
                  .then(answers =>{
                        var posicion = answers.opcion.split('-');
                        if(posicion[1]==='salir'){Menu_Operaciones(res);}
                        else{
                              const p = Number(posicion[0]);
                              VisualizarNotificacion(res,req.respuestas[p]);
                            }
                  })
            })
            .catch((err) => {
                  console.log(err)
                  lista.push('Vacio');
                  inquirer.prompt([
                        {
                              type:'list',
                              name:'opcion',
                              message:'Solicitudes',
                              choices: lista
                        }

                  ])
                  .then(answers =>{
                        console.log(answers);
                        Menu_Operaciones(res);
                  })
            
            });
      }
      function NuevaNotacion(res,objeto){
            inquirer.prompt([
                  {
                        type:'input',
                        name:'descripcion',
                        message:'Escriba la notificacion',
                        validate: function (value) {
                              if ((/.+/).test(value)) { return true; }
                              return 'Descripcion  requerido';
                          }
                  }
            ])
            .then(answers =>{
                     Crear_Nota(objeto.id,answers.descripcion,res).then((req) => { console.log('Se agrego correctamente'); 
                              switch (res.rol) {
                              case 'admin':
                                    VisualizarNotificacion(res,objeto); 
                              break;
                              case 'requester':
                                    VisualizarNotificacionAdmin(res,objeto); 
                              break;
                        }})
                     .catch((err) => {console.log(err); 
                  });                  
            })
       }
      /////////////////// mirar
      function Lista_Usuario(res){
            var lista = [];
            Lista_Usuarios(res).then((req) => {
                  for(var i in req.respuestas){lista.push(i+'-'+req.respuestas [i].name+'-'+req.respuestas [i].email);};
                  const v=Number(i)+1;
                  lista.push(v+'-salir');
                  inquirer.prompt([
                        {
                              type:'list',
                              name:'opcion',
                              message:'selecione el usuario correspondiente para ver sus pqr',
                              choices: lista
                        }
                  ])
                  .then(answers =>{
                        var posicion = answers.opcion.split('-');
                        if(posicion[1]==='salir'){
                              Menu_Admin(res);
                         }
                        else{
                              const p = Number(posicion[0]);
                              var elemento = req.respuestas[p];
                              OpcionesFiltroPQR( {res,usuario:elemento});
                            }
                  })
            })
            .catch((err) => {
                  console.log(err)
                  lista.push('Vacio');
                  inquirer.prompt([
                        {
                              type:'list',
                              name:'opcion',
                              message:'Solicitudes',
                              choices: lista
                        }

                  ])
                  .then(answers =>{
                        console.log(answers);
                        ////Menu_Operaciones(res);
                  })
            
            });
      }

      function Opcion_Formulario(){
            inquirer.prompt(funciones.Opciones_IF())
            .then(answers =>{
                  if(answers.opcion==='Iniciar Session'){
                        Iniciar_Session();
                  }
                  if(answers.opcion==='Continuar en el formulario'){
                        Formulario();
                  }
                  else {delete conexion;}
            })
      }
      // MIRAR
      function VisualizarNotificacion(res,objeto){
            console.log('Asunto: ',objeto.subject);
            console.log('Tipo: ',objeto.request_type);
            console.log('Estado: ',objeto.request_state);
            console.log('Descricpion: ',objeto.description);
            console.log('--------------------');
            var estado='';
            Notas_ID(objeto.id,res)
                  .then((req) =>  {
                        for(var i in req.respuestas){console.log(req.respuestas[i].description)};
                        if(Object.entries(req.respuestas).length===0){estado='Vacio';}
                        console.log(estado);
                        inquirer.prompt(funciones.Opciones_Notacion())
                        .then(answers =>{
                              switch (answers.opcion) {
                                    case 'Agregar Nota':
                                          NuevaNotacion(res,objeto);
                                      break;
                                    case 'Marcar como resuelto':
                                          Marcar_PQR(objeto,'solved',res).
                                          then((req)=>{
                                             console.log('Se cambio con exito');
                                             VisualizarNotificacion(req.req,req.objeto);
                                          }).catch((err)=> {console.log(err);})
                                      break;
                                    case 'Salir':
                                          ListaG(filt,res);
                                      break;
                                  }
                        })
                  })
                  .catch((err) => {
                        console.log(err);
                  });
           
      }

      function VisualizarNotificacionAdmin(res,objeto){
            console.log('Asunto: ',objeto.subject);
            console.log('Tipo: ',objeto.request_type);
            console.log('Estado: ',objeto.request_state);
            console.log('Descricpion: ',objeto.description);
            console.log('--------------------');
            var estado='';
            Notas_ID(objeto.id,res)
                  .then((req) =>  { 
                        for(var i in req.respuestas){console.log(req.respuestas[i].description)};
                        if(Object.entries(req.respuestas).length===0){estado='Vacio';}
                        console.log(estado);
                        inquirer.prompt(funciones.Opciones_NotacionAd())
                        .then(answers =>{
                              switch (answers.opcion) {
                                    case 'Agregar Nota':
                                          NuevaNotacion(res,objeto);
                                      break;
                                    case 'Marcar como resuelto':
                                          Marcar_PQR(objeto,'solved',res).
                                          then((req)=>{
                                             console.log('Se cambio con exito');
                                             VisualizarNotificacionAdmin(req.req,req.objeto);
                                          }).catch((err)=> {console.log(err);})
                                      break;
                                    case 'Radicar':
                                          Marcar_PQR(objeto,'settled',res).
                                          then((req)=>{
                                             console.log('Se cambio con exito');
                                             VisualizarNotificacionAdmin(req.req,req.objeto);
                                          }).catch((err)=> {console.log(err);})
                                      break;
                                    case 'Proceso':
                                          Marcar_PQR(objeto,'in_progress',res).
                                          then((req)=>{
                                             console.log('Se cambio con exito');
                                             VisualizarNotificacionAdmin(req.req,req.objeto);
                                          }).catch((err)=> {console.log(err);})
                                      break;
                                    case 'Salir':
                                          Menu_Admin(res);
                                      break;
                                  }
                        })
                  })
                  .catch((err) => {
                        console.log(err);
                  });
           
      }
      

      module.exports = {
            Formulario,
            Iniciar_Session
      };

     
     
      
