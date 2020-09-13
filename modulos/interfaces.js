const inquirer= require('inquirer');
const funciones = require('./variables_interfaz');

      exports.Iniciar_Session = function() {
            inquirer.prompt(funciones.Iniciar_Session())
            .then(answers =>{
                  Menu_Operaciones();
            })
      }
      exports.Formulario = function() {
            inquirer.prompt(funciones.Formulario())
            .then(answers =>{
                  Menu_Operaciones();
            })
      }
      function CrearAsunto(){
            inquirer.prompt(funciones.Crear_Solicitud())
            .then(answers =>{
                  Opcion();
            });
      }

      function OpcionesFiltro(){
            inquirer.prompt([{
                  type:'list',
                  name:'opcion',
                  message:' ¿Desea ejecutar filtros en las solicitudes?',
                  choices: ['si','no']
            }])
            .then(answers =>{
                  if(answers.opcion==='si'){
                        ListaFiltro();
                  }
                  else {
                        ListaG();
                  }
            })
      }

      function Menu_Operaciones(){
            inquirer.prompt(funciones.Menu_Operaciones())
            .then(function(answers) {
                  if(answers.opcion==='Crear solicitud'){
                  CrearAsunto()
                  }
                  if(answers.opcion==='Listar solicitud'){ 
                  OpcionesFiltro()
                  }
            })
      }

      function ArmarLista(objeto){
            if(objeto!=null) return  ['1','2','3','4'];
            else return  ['7','8','9','0'];
      }
      function ListaFiltro(){
            inquirer.prompt(funciones.Filtro_Lista())
            .then(answers =>{
                  const lista = ArmarLista(answers);
                  inquirer.prompt([
                        {
                              type:'list',
                              name:'opcion',
                              message:'Solicitudes',
                              choices: lista
                        }
                  ])
                  .then(answers =>{
                        console.log(answers)
                  })
            })
      }

      function ListaG(){
            const lista = ArmarLista(null);
            inquirer.prompt([
                  {
                        type:'list',
                        name:'opcion',
                        message:'Solicitudes',
                        choices: lista
                  }
            ])
            .then(answers =>{
                  console.log(answers)
            })
      }
      function Notaciones(objeto){
            return 0;
      }
      function NuevaNotacion(objeto){
            inquirer.prompt([
                  {
                        type:'input',
                        name:'descripcion',
                        message:'Nueva notificacion'
                  }
            ])
            .then(answers =>{
                  
                  VisualizarNotificacion();
                  
            })
       }
      function Opcion(){
            inquirer.prompt(funciones.Opciones_Solicitud())
            .then(answers =>{
                  if(answers.opcion==='Continuar'){
                        CrearAsunto();
                  }
                  else {
                        Menu_Operaciones();
                  }
            })
      }
      function VisualizarNotificacion(objeto){
            console.log('Asunto: ',objeto);
            console.log('Tipo: ',objeto);
            console.log('Estado: ',objeto);
            console.log('Descricpion: ',objeto);
            console.log('--------------------');
            const array = Notaciones(objeto)
                  for (let index = 0; index < array.length; index++) {
                        console.log(Notaciones[index]);
                  }
            inquirer.prompt(OpcionesNotacion)
            .then(answers =>{
                  if(answers.opcion==='Continuar'){
                        NuevaNotacion(objeto);
                  }
                  else {
                        Menu_Operaciones();
                  }
            })
      }


     
     
      
