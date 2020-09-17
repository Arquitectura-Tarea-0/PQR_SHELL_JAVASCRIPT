# PQR_SHELL_JAVASCRIPT

## Configuraciones importantes :

Antes de ejecutar, es necesario realizar la instalacion de los modulos de nodejs y algunas dependencias mas para el correcto funcionamiento de la aplicacion para el entorno de desarrollo

## Instrucciones de instalación

Instalar las herramientas necesarias:

- npm init -y
- npm install inquirer : npm para la creacion del shell interactivo
- npm install inquirer-datepicker: npm para el formato fecha en el shell

## Para ejecutar la aplicación:

como entorno de desarrollo se debe ejecutar el index.js de la siguiente forma:

npm start 

# Creaccion de los ejecutables

Para crear los ejecutables es necesario una dependencia de npm para su desarrollo, pero si estas en una maquina windows debes hacer un paso opcional que es
habilitar el uso de scripts mediante este comando:

> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned

se debe ejecutar en power shell - modo administrador

## Instrucciones de instalación

 - npm install -g pkg : npm para la creacción de los ejecutables.
 
## Instruciones de ejecucción
 - pkg index.js
 
 Al finalizar se obtiene en la misma carpeta raiz 3 ejecutables, que son: 
 - win
 - linux 
 - mac.
