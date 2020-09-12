const inquirer= require('inquirer');
inquirer.registerPrompt('datepicker', require('inquirer-datepicker'));

      exports.CrearAsunto = function(){
            inquirer.prompt(crearsolicitud)
            .then(answers =>{
                  Opcion();
            });
      }

      exports.OpcionesFiltro = function(){
            inquirer.prompt([{
                  type:'list',
                  name:'opcion',
                  message:' desea ejecutar filtros en las solicitudes',
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


      function ArmarLista(objeto){
            if(objeto!=null) return  ['1','2','3','4'];
            else return  ['7','8','9','0'];
      }
      function ListaFiltro(){
            inquirer.prompt(filtroLista)
            .then(answers =>{
                  const lista = ArmarLista(answers);
                  inquirer.prompt([
                        {
                              type:'list',
                              name:'opcion',
                              message:'solicitudes',
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
                        message:'solicitudes',
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
            inquirer.prompt(opcionesSolicitud)
            .then(answers =>{
                  if(answers.opcion==='Continuar'){
                        CrearAsunto();
                  }
                  else {const menu = require('./opciones');
                        menu.menu();
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
                  else {const menu = require('./opciones');
                  menu.menu();
                  }
            })
      }
      
      const tipoS = ['tipo1','tipo2']
      const estado = ['tipo1','tipo2']
      const opciones = ['Continuar','Salir']
     
     
      const opcionesSolicitud = [
           {
                 type:'list',
                 name:'opcion',
                 message:' desea continuar o salir',
                 choices: opciones
           }
     ];
      const crearsolicitud = [
           {
                 type:'input',
                 name:'asunto',
                 message:'asunto', 
                 validate: function (value) {
                     if ((/.+/).test(value)) { return true; }
                     return 'asunto es requerido';
                 }
           },
           {
                 type:'list',
                 name:'tipo',
                 message:'tipo',
                 choices: tipoS
           },
           {
                 type:'input',
                 name:'descrip',
                 message:'descripcion',
                 validate: function (value) {
                     if ((/.+/).test(value)) { return true; }
                     return 'descripcion  requerido';
                 }
           }
     ];
     
     const filtroLista =  [
           {
                 type:'list',
                 name:'tipo',
                 message:'tipo de solicitud',
                 choices: tipoS,
                 default:''
           },
           {
                 type:'list',
                 name:'estado',
                 message:'estado de solicitud',
                 choices: estado,
                 default:''
           },
           {
                 type:'datepicker',
                 name:'creacion',
                 message:'ingrese fecha de creaccion',            
                 default:new Date('2017-09-28 17:36:05')
           },
           {
                 type:'datepicker',
                 name:'fin',
                 message:'ingrese fecha de respuesta',
                 default: new Date('2017-09-28 17:36:05')
           }
         
     ];

     const OpcionesNotacion = [
      {
            type:'list',
            name:'opcion',
            message:' desea agregar una notracion',
            choices: opciones
      }
];

